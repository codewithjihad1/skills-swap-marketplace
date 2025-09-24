import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mdjihadhossain793@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});


// Send email function
export const sendEmail = async (to: string, subject: string, msg: string) => {
  try {
    await transporter.sendMail({
      from: "mdjihadhossain793@gmail.com",
      to,
      subject,
      html: msg,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

