const Mailgun = require('mailgun.js');
    const formData = require('form-data');

    const mailgun = new Mailgun(formData);

    exports.handler = async (event) => {
      if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
      }

      try {
        const data = JSON.parse(event.body);
        const { name, email, message } = data;

        const mg = mailgun.client({
          username: 'api',
          key: process.env.MAILGUN_API_KEY,
        });

        const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
          from: `${name} <${email}>`,
          to: [process.env.RECIPIENT_EMAIL_ADDRESS],
          subject: 'New Contact Form Submission',
          text: message,
        });

        console.log("Mailgun Response:", result);

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
