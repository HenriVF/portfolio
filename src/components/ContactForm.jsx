import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../schemas/contactSchema';
import { sendContact } from '../services/contactService';
import Button from './Button';
import Field from './Field';

export default function ContactForm() {
  const [feedback, setFeedback] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (data) => {
    setFeedback(null);
    try {
      await sendContact(data);
      setFeedback({
        type: 'success',
        text: 'Mensagem enviada! Respondo assim que possível.',
      });
      reset();
    } catch (error) {
      setFeedback({ type: 'error', text: error.message });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field id="name" label="Nome" error={errors.name?.message}>
        <input
          id="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
      </Field>
      <Field id="email" label="E-mail" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
      </Field>
      <Field id="message" label="Mensagem" error={errors.message?.message}>
        <textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message}
          {...register('message')}
        />
      </Field>

      <Button type="submit" loading={isSubmitting}>
        {isSubmitting ? 'Enviando…' : 'Enviar mensagem'}
      </Button>

      {feedback && (
        <p
          className={`feedback feedback--${feedback.type}`}
          role={feedback.type === 'error' ? 'alert' : 'status'}
        >
          {feedback.text}
        </p>
      )}
    </form>
  );
}
