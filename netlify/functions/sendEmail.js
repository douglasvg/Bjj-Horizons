const Mailgun = require('mailgun-js');
    const formData = require('form-data');
    const mailgun = new Mailgun(formData);

    exports.handler = async (event) => {
      // Parse the POST request body (e.g., from a contact form)
      const data = JSON.parse(event.body);
      const { name, email, message } = data;

      // Initialize Mailgun client
      const mg = mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY,
      });

      try {
        // Send email via Mailgun
        const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
          from: `${name} <${email}>`,
          to: [process.env.RECIPIENT_EMAIL_ADDRESS], // Your email address
          subject: 'New Contact Form Submission',
          text: message,
        });

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Email sent successfully!' }),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to send email' }),
        };
      }
    };
