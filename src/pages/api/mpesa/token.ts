// File: pages/api/mpesa/token.ts
// Generate access token for Daraja API
import { NextApiRequest, NextApiResponse } from 'next';

const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || 'NzgOIRzuOHws4KE5gAFFTPYddpJSXuowiko7GRIjpC8x2QJ5';
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET || '7OLWPjGdoAgrqeoYJ1S2XU0a9R54BQBDCqUqXba9jiNuY2DkgkCvy7TWGN3lRVm5';
const AUTH_URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    
    const response = await fetch(AUTH_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      res.status(200).json({
        success: true,
        access_token: data.access_token,
        expires_in: data.expires_in
      });
    } else {
      res.status(400).json({
        success: false,
        error: data.errorMessage || 'Failed to generate token'
      });
    }
  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
