const nodemailer = require("nodemailer");

const sendEmail = async(email, code) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        var subject = 'OTP code';
        var htmlContent = `
        <font size="+1">Hello ${email}, this is your OTP code:</font>
        <hr>
        <center><h2>${code}</h2></center>
        <hr>
        <font size="+1">
  		<p>Please input it in 60 seconds!<br>
        Thank you for using our service!
        </p>
        </font>
        <h3>Dat Huynh<h3>
        `;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: htmlContent
        });

        console.log("Email sent sucessfully");
    } catch (error) {
        console.log(error, "Email not sent");
    }
};

module.exports = sendEmail;