// Botão único do site. Com `as={Link}` vira link com a mesma aparência.
export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const isNativeButton = Tag === 'button';
  const extra = isNativeButton
    ? {
        type: rest.type ?? 'button',
        disabled: disabled || loading,
        'aria-busy': loading || undefined,
      }
    : {};

  return (
    <Tag className={`btn btn--${variant} ${className}`.trim()} {...rest} {...extra}>
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </Tag>
  );
}
