import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    console.log(email);
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Whisper-Box | Verification OTP",
      react: VerificationEmail({ username: username, otp: verifyCode }),
    });
    console.log("here");
    return { success: true, message: `Verification email send successfully` };
  } catch (EmailError) {
    console.log(`Error sending verification email`, EmailError);
    return { success: false, message: `Failed to send verification email` };
  }
}
