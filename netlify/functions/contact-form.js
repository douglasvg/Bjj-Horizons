const mailgun = require('mailgun-js')({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });

    exports.handler = async (event) => {
      if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
      }

      try {
        const { name, email, message } = JSON.parse(event.body);

        const data = {
          from: email,
          to: process.env.RECIPIENT_EMAIL_ADDRESS,
          subject: `New Contact Form Submission from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await mailgun.messages().send(data);

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Email sent successfully' }),
        };
      } catch (error) {
        console.error('Error sending email:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to send email' }),
        };
      }
    };
