// apps/web/src/hooks/useAzureSTT.ts
import { useEffect, useRef, useState } from "react"
import { createSpeechRecognizer } from "../lib/speech"

export function useAzureSTT() {
  const recRef = useRef<Awaited<ReturnType<typeof createSpeechRecognizer>> | null>(null)
  const [listening, setListening] = useState(false)
  const [partials, setPartials] = useState<string>("")
  const [finals, setFinals] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const start = async () => {
    try {
      const bundle = await createSpeechRecognizer()
      recRef.current = bundle
      const { recognizer } = bundle

      recognizer.recognizing = (_s, e) => setPartials(e.result.text)     // parciales
      recognizer.recognized = (_s, e) => {
        if (e.result.reason === 3 /* RecognizedSpeech */) {
          setFinals((f) => [...f, e.result.text])
          setPartials("")
        }
      }
      recognizer.canceled = (_s, e) => setError(`canceled: ${e.errorDetails}`)
      recognizer.sessionStopped = () => setListening(false)

      await new Promise<void>((resolve, reject) => {
        recognizer.startContinuousRecognitionAsync(() => resolve(), (err) => reject(err))
      })
      setListening(true)
    } catch (e: any) {
      setError(e?.message ?? "error starting STT")
      setListening(false)
    }
  }

  const stop = async () => {
    setListening(false)
    await recRef.current?.stop()
    recRef.current = null
  }

  return { listening, partials, finals, error, start, stop, setFinals }
}