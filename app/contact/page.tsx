'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-emerald-deep text-ivory">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-deep/80 backdrop-blur-md border-b border-champagne/20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-champagne" />
              <span className="text-xl font-light tracking-[0.2em] text-ivory font-heading">APEX</span>
            </Link>
            <div className="hidden lg:flex items-center gap-12">
              <Link href="/services" className="text-sm text-ivory/90 hover:text-champagne transition-colors tracking-wide font-body">SERVICES</Link>
              <Link href="/fleet" className="text-sm text-ivory/90 hover:text-champagne transition-colors tracking-wide font-body">FLEET</Link>
              <Link href="/about" className="text-sm text-ivory/90 hover:text-champagne transition-colors tracking-wide font-body">ABOUT</Link>
              <Link href="/contact" className="text-sm text-champagne transition-colors tracking-wide font-body">CONTACT</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-ivory hover:bg-champagne/10 font-light tracking-wide font-body">
                  MEMBER LOGIN
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-champagne hover:bg-champagne-light text-black font-light tracking-wide px-8 font-body">
                  RESERVE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <section className="py-32 px-8 bg-emerald-deep">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="border-l-2 border-r-2 border-champagne inline-block px-8 py-3 mb-8">
                <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">GET IN TOUCH</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 font-heading">
                Contact Us
              </h1>
              <p className="text-xl text-ivory/90 font-light max-w-2xl mx-auto font-body leading-relaxed">
                We're here to assist you 24/7. Reach out for bookings, inquiries, or support
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              <Card className="p-10 bg-emerald-dark/50 border-2 border-champagne/20 text-center hover:border-champagne/60 transition-all duration-300">
                <div className="w-12 h-12 rounded-full border-2 border-champagne/40 flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-6 h-6 text-champagne" />
                </div>
                <h3 className="text-xl font-light mb-2 text-champagne font-heading">Phone</h3>
                <p className="text-ivory/85 font-light mb-4 font-body">Available 24/7</p>
                <a href="tel:+18005551234" className="text-sm font-light hover:text-champagne transition-colors font-body">
                  +1 (800) 555-1234
                </a>
              </Card>

              <Card className="p-10 bg-emerald-dark/50 border-2 border-champagne/20 text-center hover:border-champagne/60 transition-all duration-300">
                <div className="w-12 h-12 rounded-full border-2 border-champagne/40 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-6 h-6 text-champagne" />
                </div>
                <h3 className="text-xl font-light mb-2 text-champagne font-heading">Email</h3>
                <p className="text-ivory/85 font-light mb-4 font-body">Response within 1 hour</p>
                <a href="mailto:concierge@apex.com" className="text-sm font-light hover:text-champagne transition-colors font-body">
                  concierge@apex.com
                </a>
              </Card>

              <Card className="p-10 bg-emerald-dark/50 border-2 border-champagne/20 text-center hover:border-champagne/60 transition-all duration-300">
                <div className="w-12 h-12 rounded-full border-2 border-champagne/40 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-6 h-6 text-champagne" />
                </div>
                <h3 className="text-xl font-light mb-2 text-champagne font-heading">Hours</h3>
                <p className="text-ivory/85 font-light mb-4 font-body">Always available</p>
                <span className="text-sm font-light font-body">24/7 Service</span>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl font-light mb-8 font-heading">Send us a message</h2>
                <Card className="p-10 bg-emerald-dark/50 border-2 border-champagne/20">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full border-2 border-champagne flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8 text-champagne" />
                      </div>
                      <h3 className="text-2xl font-light mb-3 text-champagne font-heading">Message sent!</h3>
                      <p className="text-sm text-ivory/90 font-light font-body">
                        We'll get back to you shortly
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-sm font-light text-champagne font-body">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-2 bg-emerald-deep border-champagne/30 text-ivory focus:border-champagne"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm font-light text-champagne font-body">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-2 bg-emerald-deep border-champagne/30 text-ivory focus:border-champagne"
                            placeholder="+1 (555) 000-0000"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-light text-champagne font-body">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-2 bg-emerald-deep border-champagne/30 text-ivory focus:border-champagne"
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject" className="text-sm font-light text-champagne font-body">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="mt-2 bg-emerald-deep border-champagne/30 text-ivory focus:border-champagne"
                          placeholder="How can we help?"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-sm font-light text-champagne font-body">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="mt-2 bg-emerald-deep border-champagne/30 text-ivory focus:border-champagne min-h-[150px]"
                          placeholder="Tell us more about your needs..."
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-champagne hover:bg-champagne-light text-black font-light tracking-wide h-12 font-body"
                      >
                        SEND MESSAGE
                      </Button>
                    </form>
                  )}
                </Card>
              </div>

              <div>
                <h2 className="text-4xl font-light mb-8 font-heading">Office Locations</h2>
                <div className="space-y-6">
                  <Card className="p-8 bg-emerald-dark/50 border-2 border-champagne/20">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-champagne/40 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-champagne" />
                      </div>
                      <div>
                        <h3 className="font-light text-lg mb-1 text-champagne font-heading">New York</h3>
                        <p className="text-sm text-ivory/90 font-light font-body">
                          432 Park Avenue<br />
                          New York, NY 10022
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 bg-emerald-dark/50 border-2 border-champagne/20">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-champagne/40 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-champagne" />
                      </div>
                      <div>
                        <h3 className="font-light text-lg mb-1 text-champagne font-heading">Los Angeles</h3>
                        <p className="text-sm text-ivory/90 font-light font-body">
                          8560 Sunset Boulevard<br />
                          Los Angeles, CA 90069
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 bg-emerald-dark/50 border-2 border-champagne/20">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-champagne/40 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-champagne" />
                      </div>
                      <div>
                        <h3 className="font-light text-lg mb-1 text-champagne font-heading">Miami</h3>
                        <p className="text-sm text-ivory/90 font-light font-body">
                          1428 Brickell Avenue<br />
                          Miami, FL 33131
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 bg-champagne text-black border-2 border-champagne">
                    <h3 className="font-light text-lg mb-3 font-heading">Emergency Support</h3>
                    <p className="text-sm font-light mb-4 font-body">
                      24/7 immediate assistance for active rides
                    </p>
                    <a href="tel:+18005559999" className="text-sm font-light hover:underline font-body">
                      +1 (800) 555-9999
                    </a>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-champagne/20 py-16 px-8 bg-emerald-deep">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-champagne" />
              <span className="text-xl font-light tracking-[0.2em] text-ivory font-heading">APEX</span>
            </div>
            <p className="text-sm text-ivory/50 font-light tracking-wide font-body">
              Extraordinary journeys for extraordinary lives
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm text-ivory/85">
            <Link href="/services" className="hover:text-champagne transition-colors tracking-wide font-body">Services</Link>
            <Link href="/fleet" className="hover:text-champagne transition-colors tracking-wide font-body">Fleet</Link>
            <Link href="/about" className="hover:text-champagne transition-colors tracking-wide font-body">About</Link>
            <Link href="/contact" className="hover:text-champagne transition-colors tracking-wide font-body">Contact</Link>
          </div>

          <div className="text-center pt-8 border-t border-champagne/20">
            <p className="text-xs text-ivory/40 tracking-wider font-body">&copy; 2024 APEX. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
