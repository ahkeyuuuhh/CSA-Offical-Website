import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { to, message, contactId } = await request.json();

    if (!to || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured. Email not sent.');
      return NextResponse.json({ 
        success: true,
        message: 'Reply saved (email service not configured)',
        emailSent: false
      });
    }

    // Dynamically import Resend to avoid initialization issues
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Format message with line breaks
    const formattedMessage = message.replace(/\n/g, '<br>');

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: 'CSA Prints <onboarding@resend.dev>',
        to: [to],
        subject: 'Re: Your Contact Form Submission',
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">CSA Prints & Design</h1>
  </div>
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="color: #374151; font-size: 16px; line-height: 1.6;">
      Thank you for contacting us. Here's our response to your inquiry:
    </p>
    <div style="background: white; padding: 20px; border-left: 4px solid #8b5cf6; border-radius: 8px; margin: 20px 0;">
      <p style="color: #1f2937; font-size: 15px; line-height: 1.8; margin: 0;">
        ${formattedMessage}
      </p>
    </div>
    <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
      If you have any further questions, feel free to reply to this email or contact us directly.
    </p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
    <div style="color: #9ca3af; font-size: 13px;">
      <p style="margin: 5px 0;"><strong>CSA Prints & Design</strong></p>
      <p style="margin: 5px 0;">Email: info@csaprint.com</p>
      <p style="margin: 5px 0;">Phone: (555) 123-4567</p>
      <p style="margin: 5px 0;">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</p>
    </div>
  </div>
</div>`,
      });

      if (error) {
        console.error('Resend API error:', error);
        return NextResponse.json({ 
          success: true,
          message: 'Reply saved but email failed to send',
          emailSent: false,
          error: error.message
        });
      }

      console.log('Email sent successfully to:', to);
      console.log('Email ID:', data?.id);
      
      return NextResponse.json({ 
        success: true,
        message: 'Reply sent successfully',
        emailSent: true
      });

    } catch (emailError: any) {
      console.error('Email sending error:', emailError);
      
      return NextResponse.json({ 
        success: true,
        message: 'Reply saved but email failed to send',
        emailSent: false,
        error: emailError.message
      });
    }

  } catch (error: any) {
    console.error('Error in send-reply route:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send reply' },
      { status: 500 }
    );
  }
}
