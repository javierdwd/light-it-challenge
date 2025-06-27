import nodemailer from 'nodemailer';

import env from '@/libs/env';
import { ReturnType } from '@sinclair/typebox';

interface EmailServiceError extends Error {
  code?: string;
  responseCode?: number;
}

type NodeMailerTransporter = ReturnType<typeof nodemailer.createTransport>;
type NodeMailerResult = Awaited<ReturnType<NodeMailerTransporter['sendMail']>>;

interface EmailServiceResult {
  success: boolean;
  messageId: NodeMailerResult['messageId'];
  accepted: NodeMailerResult['accepted'];
  rejected: NodeMailerResult['rejected'];
  response: NodeMailerResult['response'];
}

interface EmailServiceSendOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class EmailService {
  private transporter: NodeMailerTransporter;

  constructor() {
    const config = {
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT),
      secure: parseInt(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5,
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    };

    this.transporter = nodemailer.createTransport(config);

    this.verifyConnection();
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('📧 SMTP server connection verified');
    } catch (error) {
      console.error('❌ SMTP server connection failed:', (error as Error).message);

      // throw new Error('❌ Email service initialization failed');
    }
  }

  async sendEmail(emailData: EmailServiceSendOptions, retryCount = 0): Promise<EmailServiceResult> {
    const maxRetries = 3;
    const retryDelay = 1000 * Math.pow(2, retryCount); // Exponential backoff

    try {
      const mailOptions = {
        ...this.prepareMailOptions(emailData),
        headers: {
          'X-Mailer': 'Custom Node.js Mailer v1.0',
          'X-Email-ID': this.generateEmailId(),
        },
      };

      // Send email with timeout
      const info = (await Promise.race([
        this.transporter.sendMail(mailOptions),
        this.createTimeoutPromise(30_000),
      ])) as NodeMailerResult;

      this.logEmailSuccess(info, mailOptions);

      return {
        success: true,
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response,
      };
    } catch (error) {
      // Retry sending the email
      if (this.shouldRetry(error as EmailServiceError) && retryCount < maxRetries) {
        console.warn(
          `Email send failed (attempt ${retryCount + 1}/${maxRetries + 1}): ${(error as Error).message}`,
        );

        await this.delay(retryDelay);
        return this.sendEmail(emailData, retryCount + 1);
      }

      this.logEmailError(error as EmailServiceError, emailData, retryCount);

      throw new Error(
        `Email sending failed after ${retryCount + 1} attempts: ${(error as Error).message}`,
      );
    }
  }

  prepareMailOptions(emailData: EmailServiceSendOptions) {
    return {
      from: {
        name: 'Light-it Javi Challenge',
        address: env.SMTP_USER,
      },
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    };
  }

  shouldRetry(error: EmailServiceError) {
    const retryableErrors = ['ECONNRESET', 'ENOTFOUND', 'ECONNREFUSED', 'ETIMEDOUT', 'ESOCKET'];

    const temporarySmtpCodes = [421, 450, 451, 452];

    return (
      retryableErrors.some((code) => error.code === code) ||
      temporarySmtpCodes.some((code) => error.responseCode === code) ||
      error.message.includes('timeout')
    );
  }

  generateEmailId() {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  createTimeoutPromise(timeout: number) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email send timeout')), timeout);
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  logEmailSuccess(info: NodeMailerResult, mailOptions: ReturnType<typeof this.prepareMailOptions>) {
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      to: mailOptions.to,
      subject: mailOptions.subject,
      accepted: info.accepted,
      rejected: info.rejected,
      timestamp: new Date().toISOString(),
    });
  }

  logEmailError(
    error: EmailServiceError,
    emailData: { to: string; subject: string },
    retryCount: number,
  ) {
    console.error('Email sending failed:', {
      error: error.message,
      code: error.code,
      responseCode: error.responseCode,
      to: emailData.to,
      subject: emailData.subject,
      retryCount,
      timestamp: new Date().toISOString(),
    });
  }

  async close() {
    if (this.transporter) {
      this.transporter.close();
      console.log('Email service closed');
    }
  }
}

const emailService = new EmailService();

export default emailService;
