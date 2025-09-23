import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const nav = useNavigate()
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) nav("/")
      else setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) nav("/")
      else setReady(true)
    })
    return () => { sub.subscription.unsubscribe() }
  }, [])
  if (!ready) return null
  return <>{children}</>
}