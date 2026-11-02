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

// O EmailJS rejeita com um objeto ({ status, text }), não com um Error comum.
function describeError(err) {
  return err?.text || err?.message || String(err);
}

// Salva a mensagem no banco (para o dashboard) e avisa o dono por e-mail.
export async function sendContact(data) {
  const supabase = await getSupabase();
  const { error } = await supabase.from('messages').insert(data);
  if (error)
    throw new Error('Não foi possível enviar a mensagem. Tente de novo em instantes.');

  try {
    await sendEmail(data);
  } catch (err) {
    console.error('Falha no envio de e-mail:', err);
    const friendly =
      'Sua mensagem foi registrada, mas o aviso por e-mail falhou. Se for urgente, escreva direto para o meu e-mail.';
    // Em desenvolvimento mostra o motivo real; em produção, só a mensagem amigável.
    throw new Error(
      import.meta.env.DEV ? `${friendly} (${describeError(err)})` : friendly,
      {
        cause: err,
      },
    );
  }
}
