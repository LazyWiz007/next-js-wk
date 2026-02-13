'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(prevState: { message: string, success: boolean }, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const token = formData.get('cf-turnstile-response') as string;

    if (!name || !email || !message) {
        return {
            success: false,
            message: 'Please fill in all required fields.',
        };
    }

    // Turnstile Verification
    if (token) {
        const verifyFormData = new FormData();
        verifyFormData.append('secret', process.env.TURNSTILE_SECRET_KEY || '');
        verifyFormData.append('response', token);

        const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            body: verifyFormData,
            method: 'POST',
        });

        const outcome = await result.json();
        if (!outcome.success) {
            console.error('Turnstile verification failed:', outcome);
            return {
                success: false,
                message: 'CAPTCHA verification failed. Please try again.',
            };
        }
    } else if (process.env.NODE_ENV === 'production') {
        return {
            success: false,
            message: 'Please complete the CAPTCHA.',
        };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Webrook Contact Form <hello@contact.webrook.in>',
            to: ['hello@webrook.in'],
            subject: `New Contact Form Submission: ${subject || 'General Inquiry'}`,
            text: `
              Name: ${name}
              Email: ${email}
              Subject: ${subject}
              Message: ${message}
          `,
            replyTo: email,
        });

        if (error) {
            console.error('Resend Error:', error);
            return {
                success: false,
                message: 'Failed to send email. Please try again later.',
            };
        }

        return {
            success: true,
            message: 'Thanks for reaching out! We\'ll get back to you shortly.',
        };
    } catch (error) {
        console.error('Submission Error:', error);
        return {
            success: false,
            message: 'An unexpected error occurred. Please try again.',
        };
    }
}
