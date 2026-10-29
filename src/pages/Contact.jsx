import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <section className="section section--narrow">
      <h1>Contato</h1>
      <p className="muted">
        Conte o que você precisa. A mensagem chega direto no meu e-mail.
      </p>
      <ContactForm />
    </section>
  );
}
