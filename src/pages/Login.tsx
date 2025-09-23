// apps/web/src/pages/Login.tsx
import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle")
  const [msg, setMsg] = useState("")
  const nav = useNavigate()

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } })
    if (error) { setStatus("error"); setMsg(error.message); return }
    setStatus("sent"); setMsg("Revisa tu correo para el enlace mágico.")
  }

  // Si ya hay sesión, redirige
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) nav("/paciente") // o decide según rol más tarde
  })

  return (
    <main className="min-h-dvh grid place-items-center bg-zinc-50">
      <div className="w-full max-w-sm rounded-2xl border p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">Entrar</h1>
        <form className="grid gap-3" onSubmit={sendOtp}>
          <input className="h-11 rounded-xl border px-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <button className="h-11 rounded-xl bg-zinc-900 text-white" disabled={status==="sending"}>
            {status==="sending" ? "Enviando..." : "Continuar"}
          </button>
        </form>
        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </div>
    </main>
  )
}