'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, MapPin, Phone, Github, Linkedin, Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'
import emailjs from '@emailjs/browser'
import VariableProximity from '@/components/ui/VariableProximity'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/kunj24',
    color: 'text-white hover:text-white hover:shadow-white/50 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/kunj-mungalpara/',
    color: 'text-blue-400 hover:text-blue-300 hover:shadow-blue-400/50 hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.9)]'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/kunj_mungalpara',
    color: 'text-pink-400 hover:text-pink-300 hover:shadow-pink-400/50 hover:drop-shadow-[0_0_15px_rgba(244,114,182,0.9)]'
  },
  
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'kunjmungalpara@gmail.com',
    href: 'mailto:kunjmungalpara@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 78xxxxxxx6 (contact via email)',
    href: '#'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Junagadh, Gujarat, India',
    href: '#'
  }
]

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>()

  // Animations removed per user request: no entrance or interaction animations on contact page

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Check if environment variables are loaded
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      
      console.log('EmailJS Config Check:', {
        serviceId: serviceId ? 'Set' : 'Missing',
        templateId: templateId ? 'Set' : 'Missing', 
        publicKey: publicKey ? 'Set' : 'Missing'
      })
      
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is incomplete. Please check   your environment variables.')
      }

      // Initialize EmailJS
      emailjs.init(publicKey)

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,           // For {{name}} in template
          from_name: data.name,      // For {{from_name}} in template  
          from_email: data.email,    // For {{from_email}} in template
          subject: data.subject,     // For {{subject}} in template
          message: data.message      // For {{message}} in template
        }
      )
      
      console.log('Email sent successfully:', result)
      setIsSubmitted(true)
      
      // Reset form after successful submission
      setTimeout(() => {
        reset()
        setIsSubmitted(false)
      }, 3000)
      
    } catch (error) {
      console.error('Error sending email:', error)
      
      // More detailed error message
      let errorMessage = 'Failed to send message. '
      if (error instanceof Error) {
        errorMessage += error.message
      } else {
        errorMessage += 'Please check your internet connection and try again.'
      }
      
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/10 to-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
          >
            <VariableProximity
              label="Let's Connect"
              fromFontVariationSettings="'wght' 400, 'wdth' 100"
              toFontVariationSettings="'wght' 700, 'wdth' 90"
              containerRef={titleRef as React.MutableRefObject<HTMLElement | null>}
              radius={220}
              gradientWords={[0]}
              className=""
            />
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Ready to bring your ideas to life? I&apos;m always excited to discuss new projects 
            and creative opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          {/* Contact Form */}
          <div ref={formRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 gradient-text">
                Send a Message
              </h3>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {isSubmitted && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-400 dark:border-green-600 rounded-lg animate-fade-in relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 animate-pulse" />
                <p className="text-green-800 dark:text-green-200 font-medium relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thanks for your message! I&apos;ll get back to you soon.
                </p>
              </div>
            )}

            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
              noValidate
              autoComplete="on"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    type="text"
                    id="name"
                    autoComplete="name"
                    autoCapitalize="words"
                    spellCheck="false"
                    className={cn(
                      'w-full px-4 py-3 glass rounded-lg transition-all duration-300 focus:scale-105 focus:-translate-y-1 focus:shadow-[0_0_20px_rgba(46,230,193,0.4)]',
                      'focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-primary/5',
                      errors.name && 'border-red-500 focus:ring-red-500'
                    )}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    id="email"
                    autoComplete="email"
                    spellCheck="false"
                    className={cn(
                      'w-full px-4 py-3 glass rounded-lg transition-all duration-300 focus:scale-105 focus:-translate-y-1 focus:shadow-[0_0_20px_rgba(46,230,193,0.4)]',
                      'focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-primary/5',
                      errors.email && 'border-red-500 focus:ring-red-500'
                    )}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  {...register('subject', { 
                    required: 'Subject is required',
                    minLength: { value: 5, message: 'Subject must be at least 5 characters' }
                  })}
                  type="text"
                  id="subject"
                  autoComplete="off"
                  spellCheck="true"
                  className={cn(
                    'w-full px-4 py-3 glass rounded-lg transition-all duration-300 focus:scale-105 focus:-translate-y-1 focus:shadow-[0_0_20px_rgba(46,230,193,0.4)]',
                    'focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-primary/5',
                    errors.subject && 'border-red-500 focus:ring-red-500'
                  )}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' }
                  })}
                  id="message"
                  rows={6}
                  autoComplete="off"
                  spellCheck="true"
                  className={cn(
                    'w-full px-4 py-3 glass rounded-lg transition-all duration-300 focus:scale-[1.02] focus:-translate-y-1 focus:shadow-[0_0_20px_rgba(46,230,193,0.4)] resize-none',
                    'focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-primary/5',
                    errors.message && 'border-red-500 focus:ring-red-500'
                  )}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full min-h-[48px] px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(46,230,193,0.6),0_0_50px_rgba(255,77,166,0.4)] active:scale-95 relative overflow-hidden group'
                )}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-x" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                
                {/* Floating particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                      style={{
                        left: `${15 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: '1.2s'
                      }}
                    />
                  ))}
                </div>
                
                {isSubmitting ? (
                  <span className="block text-center text-base relative z-10 flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="block text-center text-base relative z-10 group-hover:tracking-wider transition-all duration-500">Send Message</span>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 gradient-text">
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-8">
                Prefer a more direct approach? You can reach me through any of these channels.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => {
                const isClickable = !!info.href && info.href !== '#'
                const Wrapper: React.ElementType = isClickable ? 'a' : 'div'
                const wrapperProps = isClickable
                  ? { href: info.href }
                  : {}

                return (
                  <Wrapper
                    key={info.label}
                    {...wrapperProps}
                    className="flex items-center p-4 glass rounded-lg hover:bg-primary/5 transition-all duration-500 md:hover:scale-110 md:hover:-translate-y-1 md:hover:shadow-[0_10px_30px_rgba(46,230,193,0.3)] group touch-manipulation min-h-[64px] relative overflow-hidden"
                  >
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 relative z-10">
                      <info.icon className="w-6 h-6 text-primary group-hover:animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </Wrapper>
                )
              })}
            </div>

            <div className="pt-8 border-t border-border">
              <h4 className="text-lg font-semibold mb-4">Follow me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn('p-3 glass rounded-lg transition-all duration-300 md:hover:scale-125 md:hover:rotate-12 md:hover:shadow-lg touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center group relative overflow-hidden', social.color)}
                    aria-label={social.name}
                  >
                    {/* Rotating ring on hover */}
                    <div className="absolute inset-[-2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 rounded-lg animate-spin-slow" style={{ animationDuration: '3s' }}>
                        <div className="absolute inset-0 rounded-lg border border-current opacity-50" />
                      </div>
                    </div>
                    <social.icon className="w-6 h-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg] relative z-10" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 glass rounded-xl">
              <h4 className="text-lg font-semibold mb-2 gradient-text">
                Ready to start a project?
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Let&apos;s schedule a call to discuss your ideas. Send me an email with your preferred time slots.
              </p>
              <a
                href="mailto:kunjmungalpara@gmail.com?subject=Schedule a Call - Project Discussion&body=Hi Kunj,%0D%0A%0D%0AI'd like to schedule a call to discuss a potential project.%0D%0A%0D%0AProject details:%0D%0A-%0D%0A%0D%0APreferred time slots:%0D%0A-%0D%0A%0D%0ABest regards"
                className="inline-flex items-center px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}