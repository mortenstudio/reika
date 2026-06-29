import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod/v4";

const schema = z.object({
  firstName: z.string().min(1, "Fornavn er påkrevd"),
  lastName: z.string().min(1, "Etternavn er påkrevd"),
  phone: z.string().min(1, "Telefonnummer er påkrevd"),
  email: z.email("Ugyldig e-postadresse"),
  company: z.string().optional(),
  hasProperty: z.string().optional(),
  interestedModel: z.string().optional(),
  privacyConsent: z.literal("on"),
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      replyTo: parsed.email,
      subject: `Ny kontaktforespørsel fra ${parsed.firstName} ${parsed.lastName}`,
      html: `
        <h2>Ny kontaktforespørsel</h2>
        <p><strong>Navn:</strong> ${parsed.firstName} ${parsed.lastName}</p>
        <p><strong>Telefon:</strong> ${parsed.phone}</p>
        <p><strong>E-post:</strong> ${parsed.email}</p>
        ${parsed.company ? `<p><strong>Firma:</strong> ${parsed.company}</p>` : ""}
        ${parsed.hasProperty ? `<p><strong>Har tomt:</strong> ${parsed.hasProperty}</p>` : ""}
        ${parsed.interestedModel ? `<p><strong>Interessert i modell:</strong> ${parsed.interestedModel}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validering feilet", details: error.issues },
        { status: 400 },
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Kunne ikke sende skjema. Prøv igjen senere." },
      { status: 500 },
    );
  }
}
