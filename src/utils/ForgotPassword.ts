import { sendEmail } from "./mail";

export const ForgotPassword = async (email: string, resetLink: string) => {
  await sendEmail({
    to: email,
    subject: "🚨 Password Amnesia Detected!",
    text: `Uh-oh… you forgot your password. No judgment. Reset it here: ${resetLink}`,
    html: `
      <div style="font-family: 'Arial', sans-serif; padding: 30px; background: #f9f9f9; color: #333;">
        <h1 style="color: #4A90E2; margin-bottom: 10px;">Oops… Forgot Something?</h1>
        <p style="font-size: 16px;">Looks like your memory took a little vacation. Don’t worry, it happens to everyone. Yes, even us.</p>
        
        <p style="font-size: 16px;">Click the button below to reset your password and get back in the game:</p>
        
        <div style="margin: 20px 0;">
          <a href="${resetLink}" 
             style="display:inline-block; background-color:#4A90E2; color:#fff; padding:12px 24px; border-radius:6px; font-weight:bold; text-decoration:none; font-size:16px;">
            Reset My Password
          </a>
        </div>
        
        <p style="font-size: 14px; color: #888;">If you didn’t ask for this, don’t panic. Just ignore this email and your secret remains safe.</p>

        <hr style="margin: 30px 0; border:none; border-top:1px solid #ddd;" />

        <p style="font-size: 12px; color: #999;">Bare Minimum Planner — because remembering everything is hard.</p>
      </div>
    `,
  });
};
