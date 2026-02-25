'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Send, Loader2 } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    // Check if coming from payment
    const pending = localStorage.getItem('payment_pending')
    if (pending) {
      const data = JSON.parse(pending)
      setEmail(data.email || '')
    }
  }, [])

  const handleSendOTP = async () => {
    if (!email) return
    setSending(true)
    
    // Simulate sending OTP - in real app, call API
    setTimeout(() => {
      setSending(false)
      setSent(true)
      localStorage.setItem('auth_email', email)
      router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back</span>
          </Link>
          
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-light">N</span>
            <span className="font-medium text-sm">Natasha</span>
          </Link>
          
          <div className="w-16" />
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl font-semibold mb-2">Sign In</h1>
            <p className="text-text-secondary">Enter your email to receive a verification code</p>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-muted-bg border border-border-subtle focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSendOTP}
            disabled={!email || sending}
            className="w-full py-4 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending Code...
              </>
            ) : (
              <>
                Send Verification Code
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-text-tertiary text-sm mt-6">
            I'll send a 6-digit code to your email
          </p>
        </div>
      </main>
    </div>
  )
}
