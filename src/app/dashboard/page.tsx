'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, LogOut, Eye, Image, Clock, CheckCircle, XCircle, Copy, ExternalLink } from 'lucide-react'

const mockOrders = [
  {
    id: 'ORD-001',
    service: 'website-roast',
    title: 'Website Roast',
    price: 25,
    status: 'completed',
    date: '2026-02-20',
    details: 'https://example.com - Reviewed UI and gave feedback',
    icon: Eye,
  },
  {
    id: 'ORD-002',
    service: 'cartoon-generator',
    title: 'Cartoon Generator',
    price: 15,
    status: 'in_progress',
    date: '2026-02-22',
    details: 'A cartoon about a programmer debugging at 3am',
    icon: Image,
  },
]

const statusConfig = {
  pending: { label: 'Pending', color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Clock },
  in_progress: { label: 'In Progress', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Clock },
  completed: { label: 'Completed', color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle },
}

export default function DashboardPage() {
  const router = useRouter()
  const [orders, setOrders] = useState(mockOrders)
  const [email, setEmail] = useState('')
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const storedEmail = localStorage.getItem('auth_email')
    
    if (!token) {
      router.push('/auth')
      return
    }
    
    setEmail(storedEmail || 'user@example.com')
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_email')
    localStorage.removeItem('hire_flow')
    localStorage.removeItem('payment_pending')
    router.push('/')
  }

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopied(id)
    setTimeout(() => setCopied(''), 2000)
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
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
            <p className="text-text-secondary">{email}</p>
          </div>

          {/* New Order Button */}
          <Link
            href="/hire"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-colors mb-8"
          >
            New Order
          </Link>

          {/* Orders List */}
          <div>
            <h2 className="text-sm font-medium text-text-tertiary uppercase tracking-widest mb-4">Your Orders</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-12 text-text-tertiary">
                <p>No orders yet</p>
                <Link href="/hire" className="text-accent hover:underline mt-2 inline-block">
                  Place your first order
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => {
                  const Icon = order.icon
                  const status = statusConfig[order.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div 
                      key={order.id} 
                      className="p-5 rounded-xl bg-muted-bg border border-border-subtle"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-card border border-card-border">
                          <Icon className="w-5 h-5 text-text-secondary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{order.title}</h3>
                              <button
                                onClick={() => copyId(order.id)}
                                className="text-text-tertiary hover:text-text-secondary transition-colors"
                              >
                                {copied === order.id ? (
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                              <StatusIcon className="w-3 h-3 inline mr-1" />
                              {status.label}
                            </span>
                          </div>
                          
                          <p className="text-text-tertiary text-sm mb-2">{order.details}</p>
                          
                          <div className="flex items-center gap-4 text-xs text-text-tertiary">
                            <span>${order.price} USDC</span>
                            <span>{order.date}</span>
                            <span className="font-mono">{order.id}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
