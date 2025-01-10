const Transporter = require("../middleware/Email.config");
const Verification_Email_Template = require("../middleware/EmailTemplate");

const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await Transporter.transporter.sendMail({
      from: '"Trendy Fashion" <mayankvagadia17@gmail.com>', // sender address
      to: email,
      subject: "Verify your email",
      text: "Verify your email",
      html: Verification_Email_Template.Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendVerificationCode };
