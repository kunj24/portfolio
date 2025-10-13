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
    color: 'hover:text-gray-700 dark:hover:text-gray-300'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/kunj-mungalpara-539b3a293',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/kunj_mungalpara',
    color: 'hover:text-pink-600'
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
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/10 to-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
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
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? I&apos;m always excited to discuss new projects 
            and creative opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
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
              <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200 font-medium">
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
                      'w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200',
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
                      'w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200',
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
                    'w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200',
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
                    'w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 resize-none',
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
                  'w-full px-8 py-4 bg-primary text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {isSubmitting ? (
                  <span className="block text-center">Sending...</span>
                ) : (
                  <span className="block text-center">Send Message</span>
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
                    className="flex items-center p-4 glass rounded-lg hover:bg-primary/5 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <info.icon className="w-6 h-6 text-primary" />
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
                    className={cn('p-3 glass rounded-lg', social.color)}
                    aria-label={social.name}
                  >
                    <social.icon className="w-6 h-6" />
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