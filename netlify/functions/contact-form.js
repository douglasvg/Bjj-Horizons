const mailgun = require('mailgun-js')({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });

    exports.handler = async (event) => {
      if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
      }

      try {
        const data = JSON.parse(event.body);
        const { name, email, message } = data;

        const mailgunData = {
          from: `${name} <${email}>`,
          to: process.env.RECIPIENT_EMAIL_ADDRESS,
          subject: 'New Contact Form Submission',
          text: message,
        };

        const mailgunResponse = await mailgun.messages().send(mailgunData);

        console.log("Mailgun Response:", mailgunResponse);

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Email sent!' }),
        };
      } catch (error) {
        console.error('Error sending email:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
        };
      }
    };
