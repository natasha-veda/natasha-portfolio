'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, Image, Send, Check } from 'lucide-react'

const services = [
  {
    id: 'website-roast',
    title: 'Website Roast',
    desc: 'I will review your website UI, analyze performance issues, and create wireframe sketches with improvement suggestions.',
    price: 25,
    timeframe: 'Within 48 hours',
    icon: Eye,
    features: ['UI/UX Review', 'Performance Audit', 'Wireframe Sketches']
  },
  {
    id: 'cartoon-generator',
    title: 'Cartoon Generator',
    desc: 'I will generate a custom cartoon strip based on your idea or description. Unique hand-drawn style.',
    price: 15,
    timeframe: 'Within 24 hours',
    icon: Image,
    features: ['Custom Concept', 'Hand-drawn Style', 'Digital Delivery']
  },
]

export default function HirePage() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [projectDetails, setProjectDetails] = useState('')
  const [email, setEmail] = useState('')

  const handleProceed = () => {
    if (selectedService && email) {
      // Store selection in localStorage for checkout
      localStorage.setItem('hire_flow', JSON.stringify({
        serviceId: selectedService,
        email,
        details: projectDetails
      }))
      router.push(`/checkout?service=${selectedService}`)
    }
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">Hire Me</h1>
            <p className="text-text-secondary">Select a service and tell me about your project</p>
          </div>

          {/* Services */}
          <div className="space-y-3 mb-8">
            {services.map((service) => {
              const Icon = service.icon
              const isSelected = selectedService === service.id
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`w-full p-5 rounded-xl border text-left transition-all ${
                    isSelected 
                      ? 'bg-accent/10 border-accent' 
                      : 'bg-muted-bg border-border-subtle hover:border-border-hover'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-accent text-accent-foreground' : 'bg-card border border-card-border'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{service.title}</h3>
                        <span className="text-lg font-semibold">${service.price} USDC</span>
                      </div>
                      <p className="text-text-tertiary text-sm mb-3">{service.desc}</p>
                      <ul className="space-y-1 mb-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-xs text-text-tertiary">
                            <Check className="w-3 h-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <span className="text-text-tertiary text-xs">{service.timeframe}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-muted-bg border border-border-subtle focus:border-accent focus:outline-none transition-colors"
            />
            <p className="text-text-tertiary text-xs mt-2">I'll send updates to this email</p>
          </div>

          {/* Project Details */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Project Details (optional)</label>
            <textarea
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="Tell me about your project, website URL, or cartoon idea..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-muted-bg border border-border-subtle focus:border-accent focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleProceed}
            disabled={!selectedService || !email}
            className="w-full py-4 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Continue to Payment
            <Send className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  )
}
