// File: pages/api/mpesa/callback.ts
// Handle M-Pesa payment callbacks
import { NextApiRequest, NextApiResponse } from 'next';

interface CallbackData {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: Array<{
          Name: string;
          Value: string | number;
        }>;
      };
    };
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const callbackData: CallbackData = req.body;
    const { stkCallback } = callbackData.Body;

    console.log('M-Pesa Callback Received:', JSON.stringify(callbackData, null, 2));

    if (stkCallback.ResultCode === 0) {
      // Payment successful
      const metadata = stkCallback.CallbackMetadata?.Item || [];
      
      const paymentData = {
        MerchantRequestID: stkCallback.MerchantRequestID,
        CheckoutRequestID: stkCallback.CheckoutRequestID,
        Amount: metadata.find(item => item.Name === 'Amount')?.Value || 0,
        MpesaReceiptNumber: metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value || '',
        TransactionDate: metadata.find(item => item.Name === 'TransactionDate')?.Value || '',
        PhoneNumber: metadata.find(item => item.Name === 'PhoneNumber')?.Value || '',
        status: 'completed',
        timestamp: new Date().toISOString()
      };

      // Here you would typically:
      // 1. Save the successful transaction to your database
      // 2. Send confirmation email/SMS to the donor
      // 3. Update any internal systems
      // 4. Generate receipt

      console.log('Payment successful:', paymentData);
      
      // You can implement database storage here
      // await saveTransactionToDatabase(paymentData);
      
    } else {
      // Payment failed
      console.log('Payment failed:', {
        MerchantRequestID: stkCallback.MerchantRequestID,
        CheckoutRequestID: stkCallback.CheckoutRequestID,
        ResultCode: stkCallback.ResultCode,
        ResultDesc: stkCallback.ResultDesc
      });
      
      // Handle failed payment
      // await updateTransactionStatus(stkCallback.CheckoutRequestID, 'failed');
    }

    // Always respond with success to M-Pesa
    res.status(200).json({
      ResultCode: 0,
      ResultDesc: 'Accepted'
    });

  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(200).json({
      ResultCode: 0,
      ResultDesc: 'Accepted'
    });
  }
}
