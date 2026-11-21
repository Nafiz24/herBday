import { useState, useRef, useEffect } from 'react'
import { botName, welcomeMessage, fallbackMessage, botKnowledge } from '../data/chatbotData'

function clean(text) {
  return ' ' + text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ') + ' '
}

function getAnswer(question) {
  const text = clean(question)
  let bestAnswer = fallbackMessage
  let bestScore = 0

  for (const item of botKnowledge) {
    let score = 0
    for (const keyword of item.keywords) {
      if (text.includes(' ' + keyword + ' ')) {
        score += 1 + keyword.split(' ').length // longer phrases count more
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestAnswer = item.answer
    }
  }
  return bestAnswer
}

// A chat bubble with a little heart inside it
function ChatHeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
         strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
      <path
        d="M12 15.6s-3.6-2.1-3.6-4.5a1.9 1.9 0 0 1 3.6-.9 1.9 1.9 0 0 1 3.6.9c0 2.4-3.6 4.5-3.6 4.5Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" className="h-7 w-7" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

// The little hearts that float up when the mouse is on the button.
// left = where it starts, delay = when it starts (so they don't all rise together)
const floatingHearts = [
  { left: '10%', delay: '0s', size: 'text-sm' },
  { left: '45%', delay: '0.5s', size: 'text-base' },
  { left: '75%', delay: '1s', size: 'text-xs' },
]

function Chatbot() {
  const [open, setOpen] = useState(false) // is the chat window open?
  const [input, setInput] = useState('') // what she is typing
  const [messages, setMessages] = useState([{ from: 'bot', text: welcomeMessage }])
  const bottomRef = useRef(null)

  // Scroll to the newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function handleSend(event) {
    event.preventDefault()
    const question = input.trim()
    if (!question) return

    const answer = getAnswer(question)
    setMessages((old) => [...old, { from: 'user', text: question }, { from: 'bot', text: answer }])
    setInput('')
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-28 right-4 z-40 flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-2xl backdrop-blur-md">
          {/* header */}
          <div className="flex items-center justify-between bg-wine px-4 py-3 text-blush">
            <span className="font-script text-2xl font-bold italic">{botName}</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-2xl leading-none">
              &times;
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className={msg.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <p
                  className={
                    msg.from === 'user'
                      ? 'max-w-[80%] rounded-2xl rounded-br-sm bg-rose px-4 py-2 text-white'
                      : 'max-w-[80%] rounded-2xl rounded-bl-sm bg-blush px-4 py-2 text-wine'
                  }
                >
                  {msg.text}
                </p>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* input box */}
          <form onSubmit={handleSend} className="flex gap-2 border-t border-wine/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about her..."
              className="min-w-0 flex-1 rounded-full border border-wine/30 bg-white px-4 py-2 focus:outline-2 focus:outline-rose"
            />
            <button type="submit" className="rounded-full bg-wine px-5 py-2 font-semibold text-blush hover:bg-wine/85">
              Send
            </button>
          </form>
        </div>
      )}

      {/* ===== The floating button. "group" lets the parts inside react when the mouse is on it ===== */}
      <div className="group fixed bottom-6 right-4 z-40 flex items-center">
        {/* label that slides out to the left on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-full mr-3 translate-x-4 whitespace-nowrap rounded-full
                     border border-white/70 bg-white/80 px-4 py-2 font-script text-xl font-bold italic text-wine
                     opacity-0 shadow-lg backdrop-blur-md transition duration-500
                     group-hover:translate-x-0 group-hover:opacity-100
                     group-focus-within:translate-x-0 group-focus-within:opacity-100"
        >
          {open ? 'Close' : 'How NAFUU Can Help You??❣️'}
        </span>

        {/* tiny hearts that float up on hover */}
        {floatingHearts.map((heart, index) => (
          <span
            key={index}
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-full text-rose opacity-0 group-hover:animate-float-up ${heart.size}`}
            style={{ left: heart.left, animationDelay: heart.delay }}
          >
            ❤
          </span>
        ))}

        {/* soft glowing ring that pulses all the time (stops when chat is open) */}
        {!open && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-rose animate-glow-pulse motion-reduce:animate-none"
          />
        )}

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close chat' : 'Open chat'}
          className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full
                     border border-white/70 bg-[linear-gradient(135deg,#f08bb0,#d6456b_55%,#a3245a)] text-white shadow-xl
                     transition-transform duration-500 hover:scale-110 hover:shadow-2xl
                     focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {/* warm golden color that spreads from the middle on hover (like your other tabs) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-40 w-40 scale-0 rounded-full
                       bg-[linear-gradient(135deg,#ffd36b,#f2994a_50%,#d6456b)]
                       transition-transform duration-700 ease-out
                       group-hover:scale-100 group-focus-within:scale-100"
          />

          {/* the icon: wiggles on hover, swaps to an X when the chat is open */}
          <span className="relative z-10 transition-transform duration-500 group-hover:animate-wiggle motion-reduce:animate-none">
            {open ? <CloseIcon /> : <ChatHeartIcon />}
          </span>
        </button>
      </div>
    </>
  )
}

export default Chatbot
