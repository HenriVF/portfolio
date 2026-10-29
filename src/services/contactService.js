import { getSupabase } from './supabaseClient';

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

async function sendEmail({ name, email, message }) {
  const { serviceId, templateId, publicKey } = emailConfig;
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Envio de e-mail não configurado.');
  }
  const { default: emailjs } = await import('@emailjs/browser');
  await emailjs.send(
    serviceId,
    templateId,
    { from_name: name, reply_to: email, message },
    { publicKey },
  );
}

// Salva a mensagem no banco (para o dashboard) e avisa o dono por e-mail.
export async function sendContact(data) {
  const supabase = await getSupabase();
  const { error } = await supabase.from('messages').insert(data);
  if (error)
    throw new Error('Não foi possível enviar a mensagem. Tente de novo em instantes.');

  try {
    await sendEmail(data);
  } catch {
    throw new Error(
      'Sua mensagem foi registrada, mas o aviso por e-mail falhou. Se for urgente, escreva direto para o meu e-mail.',
    );
  }
}
