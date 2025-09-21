export default function Cuidador() {
  return (
    <main className="min-h-dvh p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Panel del Cuidador</h1>
      <section className="grid gap-3">
        <button className="h-11 rounded-xl bg-zinc-900 text-white">Editar autobiografía</button>
        <button className="h-11 rounded-xl bg-zinc-900 text-white">Agregar recordatorio</button>
      </section>
    </main>
  )
}