
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-primary-foreground/10 pb-16">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-headline text-3xl font-semibold tracking-widest uppercase">
                Ortiz <span className="text-accent">Skin</span>
              </span>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
              Providing premium, luxury medical aesthetic services with unmatched credibility and polished results in the Philippines.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 border border-primary-foreground/20 hover:border-accent hover:text-accent transition-all">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="p-2 border border-primary-foreground/20 hover:border-accent hover:text-accent transition-all">
                <Instagram size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-lg mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/60">
              <li><Link href="/services" className="hover:text-accent transition-colors">Treatments & Services</Link></li>
              <li><Link href="/branches" className="hover:text-accent transition-colors">Our Branches</Link></li>
              <li><Link href="/promos" className="hover:text-accent transition-colors">Packages & Promos</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">The Ortiz Story</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg mb-6 tracking-wide">Support</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/60">
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/book" className="hover:text-accent transition-colors">Book Appointment</Link></li>
              <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg mb-6 tracking-wide">Connect</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/60">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-accent" />
                <span>+63 2 8888 0000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-accent" />
                <span>concierge@ortizskin.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-accent mt-1" />
                <span>Makati | BGC | Quezon City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/40 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Ortiz Skin Care Philippines. All rights reserved.</p>
          <p className="tracking-widest uppercase">Precision. Luxury. Credibility.</p>
        </div>
      </div>
    </footer>
  );
}
