import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Error terjadi.' }])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Chat AI Bebas</h1>
        <div className="space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className={`p-2 rounded ${msg.role === 'user' ? 'bg-gray-700' : 'bg-gray-900'}`}>
              <b>{msg.role === 'user' ? 'Kamu' : 'AI'}:</b> {msg.content}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-2 text-black"
            placeholder="Tulis sesuatu..."
          />
          <button onClick={sendMessage} className="bg-blue-600 px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
      </div>
    </div>
  )
}
