// File: lib/mpesa.ts
// Utility functions for M-Pesa integration
export interface PaymentRequest {
  phone: string;
  amount: number;
  purpose?: string;
  name: string;
  email?: string;
  anonymous?: boolean;
}

export interface PaymentResponse {
  success: boolean;
  message?: string;
  CheckoutRequestID?: string;
  MerchantRequestID?: string;
  transactionId?: string;
  error?: string;
}

export class MpesaService {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async initiatePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/mpesa/stkpush`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Payment initiation error:', error);
      return {
        success: false,
        error: 'Failed to initiate payment'
      };
    }
  }

  async checkPaymentStatus(CheckoutRequestID: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/mpesa/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ CheckoutRequestID }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Status check error:', error);
      return {
        success: false,
        error: 'Failed to check payment status'
      };
    }
  }

  formatPhoneNumber(phone: string): string {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, '');
    
    // Handle different formats
    if (cleaned.startsWith('0')) {
      return '254' + cleaned.substring(1);
    } else if (cleaned.startsWith('254')) {
      return cleaned;
    } else if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
      return '254' + cleaned;
    }
    
    return cleaned;
  }

  validatePaymentRequest(data: PaymentRequest): { isValid: boolean; error?: string } {
    if (!data.phone || !data.amount || !data.name) {
      return {
        isValid: false,
        error: 'Phone number, amount, and name are required'
      };
    }

    if (data.amount < 1) {
      return {
        isValid: false,
        error: 'Amount must be at least 1 KES'
      };
    }

    const formattedPhone = this.formatPhoneNumber(data.phone);
    if (!formattedPhone.match(/^254[17]\d{8}$/)) {
      return {
        isValid: false,
        error: 'Invalid phone number format'
      };
    }

    return { isValid: true };
  }
}
