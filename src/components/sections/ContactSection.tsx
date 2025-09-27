'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'
import { cn } from '@/lib/utils'

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
    href: 'https://github.com/yourusername',
    color: 'hover:text-gray-700 dark:hover:text-gray-300'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/yourusername',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/yourusername',
    color: 'hover:text-blue-400'
  }
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@yourname.com',
    href: 'mailto:hello@yourname.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'New York, NY',
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

  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.2 })
  useSlideInAnimation(formRef, 'left', { delay: 0.4 })
  useSlideInAnimation(infoRef, 'right', { delay: 0.4 })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would send the data to your backend
      console.log('Form submitted:', data)
      
      setIsSubmitted(true)
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
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
            Let&apos;s <span className="gradient-text">Connect</span>
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    className={cn(
                      'w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300',
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
                    className={cn(
                      'w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300',
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
                  className={cn(
                    'w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300',
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
                  className={cn(
                    'w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none',
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
                  'w-full px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed',
                  isSubmitting && 'animate-pulse'
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="loading-dots mr-2">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </span>
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
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center p-4 glass rounded-lg hover:bg-primary/5 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
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
                    className={cn(
                      'p-3 glass rounded-lg hover:scale-110 transition-all duration-300',
                      social.color
                    )}
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
                Let&apos;s schedule a call to discuss your ideas and see how we can work together.
              </p>
              <a
                href="https://calendly.com/yourname"
                target="_blank"
                rel="noopener noreferrer"
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