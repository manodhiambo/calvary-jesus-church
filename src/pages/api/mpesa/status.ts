// File: pages/api/mpesa/status.ts
// Check transaction status
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { CheckoutRequestID } = req.body;

  if (!CheckoutRequestID) {
    return res.status(400).json({
      success: false,
      error: 'CheckoutRequestID is required'
    });
  }

  try {
    // Get access token
    const tokenResponse = await fetch(`${req.headers.origin}/api/mpesa/token`, {
      method: 'POST',
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.success) {
      throw new Error('Failed to get access token');
    }

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE || '174379';
    const passkey = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    const password = Buffer.from(businessShortCode + passkey + timestamp).toString('base64');

    const queryPayload = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: CheckoutRequestID,
    };

    const queryUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';
    
    const queryResponse = await fetch(queryUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryPayload),
    });

    const queryData = await queryResponse.json();

    res.status(200).json({
      success: true,
      data: queryData
    });

  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
