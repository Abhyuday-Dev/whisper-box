import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    if (error) {
      console.error('Error sending verification email:', error);
      return { success: false, message: 'Failed to send verification email.' };
    }

    return { success: true, message: 'Verification email sent successfully.' };
  } catch (error) {
    console.error('Exception occurred while sending verification email:', error);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
