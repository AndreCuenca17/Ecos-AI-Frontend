import { useRef, useState } from "react"

export default function Paciente() {
  const wsRef = useRef<WebSocket | null>(null)
  const [log, setLog] = useState<string[]>([])
  const send = () => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket(import.meta.env.VITE_WS_URL)
      wsRef.current.onmessage = (e) => setLog((l) => [...l, e.data])
      wsRef.current.onopen = () => wsRef.current?.send("hola")
    } else {
      wsRef.current.send("ping")
    }
  }
  return (
    <main className="min-h-dvh p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Compañero de Voz</h1>
      <button className="w-full h-14 rounded-2xl bg-blue-600 text-white" onClick={send}>Probar conexión</button>
      <ul className="mt-4 space-y-1 text-sm">{log.map((l,i)=><li key={i} className="rounded bg-zinc-100 p-2">{l}</li>)}</ul>
    </main>
  )
}