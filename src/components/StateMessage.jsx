export default function StateMessage({ title, message, action }) {
  return (
    <div className="state" role="alert">
      <h2 className="state__title">{title}</h2>
      {message && <p className="state__text">{message}</p>}
      {action}
    </div>
  );
}
