import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function App() {
  const [status, setStatus] = useState<'checking' | 'ok' | 'error'>('checking')

  useEffect(() => {
    supabase.from('_test_connection').select('*').limit(1).then(({ error }) => {
      // "relation does not exist" means we reached Supabase — connection is good
      setStatus(error?.code === '42P01' || !error ? 'ok' : 'error')
    })
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Hello, iPhone! 👋</h1>
      <p className="text-gray-500 text-center text-sm">
        Open in Safari → tap the Share icon → <strong>Add to Home Screen</strong>
      </p>
      <p className="mt-4 text-sm">
        Supabase:{' '}
        {status === 'checking' && <span className="text-gray-400">checking…</span>}
        {status === 'ok' && <span className="text-green-600 font-medium">connected</span>}
        {status === 'error' && <span className="text-red-500 font-medium">failed — check env vars</span>}
      </p>
      <pre className="mt-4 text-xs text-gray-400 text-left">
        URL: {import.meta.env.VITE_SUPABASE_URL ?? 'undefined'}{'\n'}
        KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '***set***' : 'undefined'}
      </pre>
    </div>
  )
}
