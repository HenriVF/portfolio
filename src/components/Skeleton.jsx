export default function Skeleton({ height = '1rem', width = '100%' }) {
  return <div className="skeleton" style={{ height, width }} aria-hidden="true" />;
}
