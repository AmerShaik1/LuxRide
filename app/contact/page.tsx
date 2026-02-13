'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-emerald-900">
      <SiteHeader />

      <main className="pt-20">
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="border-l-2 border-r-2 border-gold-400 inline-block px-8 py-3 mb-8">
                <span className="text-gold-400 text-sm tracking-[0.3em] font-light font-body">
                  GET IN TOUCH
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-ivory font-heading">
                Contact Concierge
              </h1>
              <p className="text-xl text-ivory/70 font-light max-w-2xl mx-auto font-body">
                We're here to assist you 24/7. Reach out for reservations, inquiries, or support
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              <Card className="p-8 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all hover:shadow-2xl hover:shadow-gold-400/10 text-center">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="text-lg font-light mb-3 text-ivory font-heading">Phone</h3>
                <p className="text-ivory/70 font-light mb-6 text-sm font-body">Available 24/7</p>
                <a href="tel:+18005551234" className="text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors font-body">
                  +1 (800) 555-1234
                </a>
              </Card>

              <Card className="p-8 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all hover:shadow-2xl hover:shadow-gold-400/10 text-center">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="text-lg font-light mb-3 text-ivory font-heading">Email</h3>
                <p className="text-ivory/70 font-light mb-6 text-sm font-body">Response within 1 hour</p>
                <a href="mailto:concierge@aurello.com" className="text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors font-body">
                  concierge@aurello.com
                </a>
              </Card>

              <Card className="p-8 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all hover:shadow-2xl hover:shadow-gold-400/10 text-center">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="text-lg font-light mb-3 text-ivory font-heading">Hours</h3>
                <p className="text-ivory/70 font-light mb-6 text-sm font-body">Always available</p>
                <span className="text-sm font-medium text-gold-400 font-body">24/7 Service</span>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-light mb-8 text-ivory font-heading">Send a Message</h2>
                <Card className="p-8 bg-emerald-800/50 border-gold-400/20">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-gold-400/20 flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8 text-gold-400" />
                      </div>
                      <h3 className="text-xl font-light mb-3 text-ivory font-heading">Message Received</h3>
                      <p className="text-sm text-ivory/70 font-light font-body">
                        Our concierge will respond shortly
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-sm font-light text-ivory/80 font-body">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-2 bg-emerald-900/50 border-gold-400/30 text-ivory placeholder:text-ivory/40 focus:border-gold-400"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm font-light text-ivory/80 font-body">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-2 bg-emerald-900/50 border-gold-400/30 text-ivory placeholder:text-ivory/40 focus:border-gold-400"
                            placeholder="+1 (555) 000-0000"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-light text-ivory/80 font-body">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-2 bg-emerald-900/50 border-gold-400/30 text-ivory placeholder:text-ivory/40 focus:border-gold-400"
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject" className="text-sm font-light text-ivory/80 font-body">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="mt-2 bg-emerald-900/50 border-gold-400/30 text-ivory placeholder:text-ivory/40 focus:border-gold-400"
                          placeholder="How may we assist you?"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-sm font-light text-ivory/80 font-body">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="mt-2 bg-emerald-900/50 border-gold-400/30 text-ivory placeholder:text-ivory/40 focus:border-gold-400 min-h-[150px]"
                          placeholder="Please share your requirements..."
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide h-12 font-body shadow-lg shadow-gold-400/20"
                      >
                        SEND MESSAGE
                      </Button>
                    </form>
                  )}
                </Card>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-light mb-8 text-ivory font-heading">Our Locations</h2>
                <div className="space-y-6">
                  <Card className="p-6 bg-emerald-800/50 border-gold-400/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="font-light mb-2 text-ivory text-lg font-heading">New York</h3>
                        <p className="text-sm text-ivory/70 font-light font-body leading-relaxed">
                          432 Park Avenue<br />
                          New York, NY 10022
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-emerald-800/50 border-gold-400/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="font-light mb-2 text-ivory text-lg font-heading">Los Angeles</h3>
                        <p className="text-sm text-ivory/70 font-light font-body leading-relaxed">
                          8560 Sunset Boulevard<br />
                          Los Angeles, CA 90069
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-emerald-800/50 border-gold-400/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="font-light mb-2 text-ivory text-lg font-heading">Miami</h3>
                        <p className="text-sm text-ivory/70 font-light font-body leading-relaxed">
                          1428 Brickell Avenue<br />
                          Miami, FL 33131
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gold-400 border-gold-400">
                    <h3 className="font-light mb-3 text-emerald-900 text-lg font-heading">Emergency Support</h3>
                    <p className="text-sm text-emerald-900/80 font-light mb-4 font-body leading-relaxed">
                      24/7 immediate assistance for active journeys
                    </p>
                    <a href="tel:+18005559999" className="text-sm font-medium text-emerald-900 hover:underline font-body">
                      +1 (800) 555-9999
                    </a>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
