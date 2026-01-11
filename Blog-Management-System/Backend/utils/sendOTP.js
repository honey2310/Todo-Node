import transporter from "../config/mail.js";

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: `"Blog App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Account - OTP",
    html: `<h3>Your OTP is: <b>${otp}</b></h3><p>Valid for 10 minutes</p>`
  });
};

export default sendOTP;
