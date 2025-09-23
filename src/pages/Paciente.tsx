// apps/web/src/pages/Paciente.tsx
"use client"
import { useAzureSTT } from "../hooks/useAzureSTT"

export default function Paciente() {
  const { listening, partials, finals, error, start, stop } = useAzureSTT()

  return (
    <main className="min-h-dvh p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Compañero de Voz</h1>

      <button
        className={`w-full h-14 rounded-2xl text-white ${listening ? "bg-red-600" : "bg-blue-600"}`}
        onClick={listening ? stop : start}
      >
        {listening ? "Detener" : "Hablar"}
      </button>

      {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

      <section className="mt-4 space-y-2">
        {partials && <p className="rounded-xl bg-zinc-100 p-3">{partials}</p>}
        {finals.map((t, i) => (
          <p key={i} className="rounded-xl bg-zinc-50 border p-3">{t}</p>
        ))}
      </section>
    </main>
  )
}