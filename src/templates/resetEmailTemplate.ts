const resetEmailTemplate = (resetLink: string, name: string, expire: Date) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Reset Password</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px;">
    <tr>
      <td style="padding: 20px;">
        <h2 style="margin: 0 0 16px; font-size: 18px; color: #111827;">Reset your password</h2>
        <p style="margin: 0 0 16px; font-size: 14px; color: #374151;">
          Hi ${name},  
          <br><br>
          We received a request to reset your password. Click the link below to set a new one:
        </p>
        <p style="margin: 0 0 16px;">
          <a href="${resetLink}" style="display: inline-block; padding: 10px 18px; background: #2563eb; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 14px;">
            Reset Password
          </a>
        </p>
        <p style="margin: 0 0 12px; font-size: 12px; color: #6b7280;">
          Or copy and paste this URL into your browser:<br>
          <a href="${resetLink}" style="color: #2563eb; word-break: break-all;">${resetLink}</a>
        </p>
        <p style="margin: 0; font-size: 12px; color: #6b7280;">
          If you didn’t request this, you can safely ignore this email.  
          This link will expire in ${Math.floor((expire.getTime() - Date.now()) / 3600000)} hours.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export default resetEmailTemplate;
