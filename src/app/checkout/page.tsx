'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Copy, Check, Wallet, Loader2 } from 'lucide-react'

const baseAddress = "0x4Dc57350E7Dc03B4CFEF2B8847089F63C4040B5B"

const serviceDetails: Record<string, { title: string; price: number }> = {
  'website-roast': { title: 'Website Roast', price: 25 },
  'cartoon-generator': { title: 'Cartoon Generator', price: 15 },
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [email, setEmail] = useState('')
  const [verifying, setVerifying] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('hire_flow')
    if (stored) {
      const data = JSON.parse(stored)
      setEmail(data.email)
    }
  }, [])

  const serviceId = searchParams.get('service') || 'website-roast'
  const service = serviceDetails[serviceId] || serviceDetails['website-roast']

  const copyAddress = () => {
    navigator.clipboard.writeText(baseAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVerifyPayment = async () => {
    if (!txHash) return
    setVerifying(true)
    
    setTimeout(() => {
      setVerifying(false)
      localStorage.setItem('payment_pending', JSON.stringify({
        txHash,
        serviceId,
        email,
        amount: service.price
      }))
      router.push('/auth?verify=true')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/hire" className="flex items-center gap-2">
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">Checkout</h1>
            <p className="text-text-secondary">Pay with USDC on Base or Solana</p>
          </div>

          <div className="p-5 rounded-xl bg-muted-bg border border-border-subtle mb-6">
            <h2 className="text-sm font-medium text-text-tertiary uppercase tracking-widest mb-4">Order Summary</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{service.title}</h3>
                <p className="text-text-tertiary text-sm">Payment to Natasha</p>
              </div>
              <span className="text-2xl font-semibold">${service.price} USDC</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-card-border mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5" />
              <h2 className="font-medium">Payment Address (Base)</h2>
            </div>
            
            <div className="p-4 rounded-lg bg-muted-bg mb-4">
              <code className="text-sm break-all font-mono text-text-secondary">{baseAddress}</code>
            </div>

            <button
              onClick={copyAddress}
              className="w-full py-3 border border-border-subtle rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-muted-bg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Address
                </>
              )}
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Transaction Hash (after payment)
            </label>
            <input
              type="text"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 rounded-lg bg-muted-bg border border-border-subtle focus:border-accent focus:outline-none transition-colors font-mono text-sm"
            />
            <p className="text-text-tertiary text-xs mt-2">
              Send exactly {service.price} USDC to the address above, then paste your transaction hash here
            </p>
          </div>

          <button
            onClick={handleVerifyPayment}
            disabled={!txHash || verifying}
            className="w-full py-4 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {verifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying Payment...
              </>
            ) : (
              'Verify Payment'
            )}
          </button>

          <p className="text-center text-text-tertiary text-sm mt-6">
            Payment issues? Message me on Telegram
          </p>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>}>
      <CheckoutContent />
    </Suspense>
  )
}
