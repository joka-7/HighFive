export default function Spinner({ label }: { label?: string }) {
  return (
    <div className="center" role="status" aria-live="polite" aria-busy="true">
      <div className="spinner" aria-hidden="true" />
      {label && <p className="muted">{label}</p>}
    </div>
  );
}
