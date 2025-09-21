export default function Login() {
  return (
    <main className="min-h-dvh grid place-items-center bg-zinc-50">
      <div className="w-full max-w-sm rounded-2xl border p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">Entrar</h1>
        <form className="grid gap-3">
          <input className="h-11 rounded-xl border px-3" placeholder="Email" />
          <button className="h-11 rounded-xl bg-zinc-900 text-white">Continuar</button>
        </form>
      </div>
    </main>
  )
}