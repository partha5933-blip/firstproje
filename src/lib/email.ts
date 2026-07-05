import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { LeadInput, BookingInput } from "@/lib/validation";

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: SMTPTransport.MailOptions["attachments"];
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isEmailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

function getTransporter() {
  if (!isEmailConfigured()) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
}

export async function sendMail(options: SendMailOptions) {
  const transporter = getTransporter();

  if (!transporter) {
    return { skipped: true, reason: "Email credentials are not configured." };
  }

  await transporter.sendMail({
    from: `"Lux Lens Studio" <${process.env.GMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
    attachments: options.attachments
  });

  return { skipped: false };
}

export function leadAdminTemplate(lead: LeadInput) {
  return `
    <div style="font-family:Arial,sans-serif;background:#050505;color:#f7f7f2;padding:32px">
      <h1 style="color:#d7b56d">New photography lead</h1>
      <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(lead.phone || "Not provided")}</p>
      <p><strong>Service:</strong> ${escapeHtml(lead.serviceInterested || "Not specified")}</p>
      <p><strong>Budget:</strong> ${escapeHtml(lead.budget || "Not specified")}</p>
      <p><strong>Location:</strong> ${escapeHtml(lead.location || "Not specified")}</p>
      <p><strong>Message:</strong> ${escapeHtml(lead.message || "No message")}</p>
    </div>
  `;
}

export function customerConfirmationTemplate(name: string) {
  return `
    <div style="font-family:Arial,sans-serif;background:#050505;color:#f7f7f2;padding:32px">
      <h1 style="color:#d7b56d">Thank you, ${escapeHtml(name)}</h1>
      <p>Your inquiry has been received. A studio producer will reply with availability, creative direction, and next steps.</p>
      <p style="color:#a7a29a">Lux Lens Studio</p>
    </div>
  `;
}

export async function notifyLeadTeam(lead: LeadInput) {
  if (!process.env.GMAIL_USER) {
    return { skipped: true };
  }

  return sendMail({
    to: process.env.GMAIL_USER,
    subject: `New lead: ${lead.name}`,
    html: leadAdminTemplate(lead),
    replyTo: lead.email
  });
}

export async function sendLeadConfirmation(lead: LeadInput) {
  return sendMail({
    to: lead.email,
    subject: "We received your photography inquiry",
    html: customerConfirmationTemplate(lead.name)
  });
}

export async function notifyBookingTeam(booking: BookingInput) {
  if (!process.env.GMAIL_USER) {
    return { skipped: true };
  }

  return sendMail({
    to: process.env.GMAIL_USER,
    subject: `Booking request: ${booking.service}`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#050505;color:#f7f7f2;padding:32px">
        <h1 style="color:#d7b56d">New booking request</h1>
        <p><strong>Name:</strong> ${escapeHtml(booking.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
        <p><strong>Service:</strong> ${escapeHtml(booking.service)}</p>
        <p><strong>Date:</strong> ${escapeHtml(booking.date)}</p>
        <p><strong>Time:</strong> ${escapeHtml(booking.time)}</p>
        <p><strong>Location:</strong> ${escapeHtml(booking.location)}</p>
        <p><strong>Message:</strong> ${escapeHtml(booking.message || "No message")}</p>
      </div>
    `,
    replyTo: booking.email
  });
}
