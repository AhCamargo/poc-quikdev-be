import { Resend } from "resend";

if (!process.env.API_KEY_RESEND) {
  throw new Error("Chave de API ReSend não definida");
}

const resend = new Resend(process.env.API_KEY_RESEND);

// const copyEmail: string = process.env.EMAIL_KEY_OWNER || "";

export async function sendEmail(
  recipient: string,
  subject: string,
  content: string
): Promise<void> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [...recipient, "andre.camargo500@gmail.com"],
      subject: subject,
      html: content,
    });
    console.log("E-mail enviado com sucesso para:", recipient);
  } catch (error) {
    throw new Error("Erro ao enviar e-mail");
  }
}
