// apps/web/src/lib/speech.ts
import * as sdk from "microsoft-cognitiveservices-speech-sdk"

export type RecognizerBundle = {
  recognizer: sdk.SpeechRecognizer
  stop: () => Promise<void>
}

export async function createSpeechRecognizer(
  tokenEndpoint = import.meta.env.VITE_SPEECH_TOKEN_URL ?? "http://localhost:8000/speech/token",
  language = "es-PE"
): Promise<RecognizerBundle> {
  // 1) pedir token y región al backend
  const r = await fetch(tokenEndpoint)
  const { token, region } = await r.json()

  // 2) config con token temporal
  const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(token, region)
  speechConfig.speechRecognitionLanguage = language

  // 3) micrófono como fuente de audio
  const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput()

  // 4) reconocedor continuo
  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)

  const stop = async () => {
    await new Promise<void>((resolve) => {
      recognizer.stopContinuousRecognitionAsync(() => resolve(), (e) => resolve())
    })
    recognizer.close()
  }

  return { recognizer, stop }
}