export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="font-serif italic text-5xl md:text-7xl text-navy mb-6">{title}</h1>
        <p className="text-xl text-ink/60 font-medium">Próximamente...</p>
      </div>
    </div>
  );
}
