import formData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';
dotenv.config();

const MAILGUN_API_KEY: any = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN: any = process.env.MAILGUN_DOMAIN;
const BASE_URL: any = process.env.BASE_URL;
const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: MAILGUN_API_KEY });

export default class MailService {
  /**
   * Verify Email
   *
   * @param {*} data
   * @returns
   */
  static async verifyEmail(data: any) {
    try {
      const messageData = {
        from: `Solid Offers <noreply@${MAILGUN_DOMAIN}>`,
        to: data.email,
        subject: 'Verify your email',
        html: `
        <p>
          Hi there, 
          <br/>
          To verify your SolidOffers account, please 
          <a target="_blank" href=${`${BASE_URL}/email_verify/${data.token}`}>Click Here</a>
          or use this link:
        </p>
        <a target="_blank" href=${`${BASE_URL}/email_verify/${data.token}`}>
            ${`${BASE_URL}/email_verify/${data.token}`}
        </a>
        <p>
          The link will expire in 12 hours.
          If nothing happens after clicking, copy, and paste the link in your browser.
        </p>
        `,
      };
      const result = await client.messages.create(MAILGUN_DOMAIN, messageData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Reset Password
   *
   * @param {*} data
   * @returns
   */
  static async resetPassword(data: any) {
    try {
      const messageData = {
        from: 'Solid Offers <noreply@solidoffers.com>',
        to: data.email,
        subject: 'Reset your password',
        html: `
        <p>
          Hi there, 
          <br/>
          To set up a new password to your SolidOffers account, please 
          <a target="_blank" href=${`${BASE_URL}/password_resets/${data.id}/${data.token}`}>
            Click Here
          </a>
          or use this link:
        </p>
        <a target="_blank" href=${`${BASE_URL}/password_resets/${data.id}/${data.token}`}>
            ${`${BASE_URL}/password_resets/${data.id}/${data.token}`}
        </a>
        <p>
          The link will expire in 12 hours.
          If nothing happens after clicking, copy, and paste the link in your browser.
        </p>
        `,
      };
      const result = await client.messages.create(MAILGUN_DOMAIN, messageData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Payment failed
   *
   * @param {*} data
   * @returns
   */
  static async paymentFailed(data: any) {
    try {
      const messageData = {
        from: 'Solid Offers <noreply@solidoffers.com>',
        to: data.email,
        subject: 'Payment Failed',
        html: `
        <p>
          Hi there, 
          Your payment failed.
        `,
      };
      const result = await client.messages.create(MAILGUN_DOMAIN, messageData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}
