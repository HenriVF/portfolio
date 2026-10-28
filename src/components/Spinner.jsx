export default function Spinner({ label = 'Carregando' }) {
  return (
    <div className="page-spinner" role="status">
      <span className="spinner spinner--large" aria-hidden="true" />
      <span>{label}…</span>
    </div>
  );
}
