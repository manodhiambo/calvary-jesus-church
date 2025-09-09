// File: pages/api/mpesa/stkpush.ts
// Initiate STK Push payment
import { NextApiRequest, NextApiResponse } from 'next';

const BUSINESS_SHORT_CODE = process.env.MPESA_BUSINESS_SHORT_CODE || '174379';
const PASSKEY = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
const STK_PUSH_URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL || 'https://your-domain.com/api/mpesa/callback';

interface STKPushRequest {
  phone: string;
  amount: number;
  purpose?: string;
  name: string;
  email?: string;
}

// Generate password for STK Push
function generatePassword(shortCode: string, passkey: string, timestamp: string): string {
  return Buffer.from(shortCode + passkey + timestamp).toString('base64');
}

// Generate timestamp
function generateTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hour}${minute}${second}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone, amount, purpose = 'General Fund', name, email }: STKPushRequest = req.body;

  // Validate required fields
  if (!phone || !amount || !name) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: phone, amount, name'
    });
  }

  // Format phone number (ensure it starts with 254)
  let formattedPhone = phone.replace(/\D/g, ''); // Remove non-digits
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '254' + formattedPhone.substring(1);
  } else if (formattedPhone.startsWith('7') || formattedPhone.startsWith('1')) {
    formattedPhone = '254' + formattedPhone;
  }

  try {
    // First, get access token
    const tokenResponse = await fetch(`${req.headers.origin}/api/mpesa/token`, {
      method: 'POST',
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.success) {
      throw new Error('Failed to get access token');
    }

    const timestamp = generateTimestamp();
    const password = generatePassword(BUSINESS_SHORT_CODE, PASSKEY, timestamp);

    const stkPushPayload = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: BUSINESS_SHORT_CODE,
      PhoneNumber: formattedPhone,
      CallBackURL: CALLBACK_URL,
      AccountReference: `CJC-${purpose.replace(/\s+/g, '').toUpperCase()}`,
      TransactionDesc: `Calvary Jesus Church - ${purpose} - ${name}`,
    };

    const stkResponse = await fetch(STK_PUSH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkPushPayload),
    });

    const stkData = await stkResponse.json();

    if (stkResponse.ok && stkData.ResponseCode === '0') {
      // Store transaction details in database or session here
      // For now, we'll just return success
      
      res.status(200).json({
        success: true,
        message: 'STK Push sent successfully',
        CheckoutRequestID: stkData.CheckoutRequestID,
        MerchantRequestID: stkData.MerchantRequestID,
        ResponseCode: stkData.ResponseCode,
        ResponseDescription: stkData.ResponseDescription,
        CustomerMessage: stkData.CustomerMessage,
        transactionId: `CJC-${Date.now()}`
      });
    } else {
      res.status(400).json({
        success: false,
        error: stkData.ResponseDescription || stkData.errorMessage || 'STK Push failed',
        code: stkData.ResponseCode || stkData.errorCode
      });
    }
  } catch (error) {
    console.error('STK Push error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
