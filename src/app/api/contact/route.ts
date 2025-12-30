import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, phone, requirement, message } = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'adityahavaldar07@gmail.com',
            subject: `New Portfolio Inquiry from ${firstName} ${lastName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #333; border-bottom: 2px solid #00bcd4; padding-bottom: 10px;">New Project Inquiry</h2>
                    
                    <div style="margin-top: 20px;">
                        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                        <p><strong>Requirement:</strong> <span style="background-color: #e0f7fa; color: #006064; padding: 4px 8px; border-radius: 4px;">${requirement}</span></p>
                    </div>

                    <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                        <h3 style="margin-top: 0; color: #555;">Message:</h3>
                        <p style="color: #666; line-height: 1.6;">${message}</p>
                    </div>

                    <div style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
                        <p>This email was sent from your portfolio website.</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        if (error instanceof Error && (error as { responseCode?: number }).responseCode === 535) {
            console.error('Authentication failed. Please check your EMAIL_USER and EMAIL_PASS. You likely need an App Password if using Gmail.');
        }
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
}
