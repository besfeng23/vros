
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { BRANCHES } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BranchesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-48 pb-24">
        <div className="container mx-auto px-6 text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-headline">Our Branches</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Find an Ortiz Clinic oasis near you. Each location is designed to provide the same level of luxury and medical excellence.
          </p>
        </div>
      </section>

      <section className="pb-40">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {BRANCHES.map((branch, index) => (
              <div key={branch.id} className={cn(
                "flex flex-col lg:flex-row gap-16 items-center",
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              )}>
                <div className="flex-1 relative h-[500px] w-full">
                  <Image 
                    src={branch.imageUrl}
                    alt={branch.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-headline">{branch.name}</h2>
                    <div className="flex items-start text-muted-foreground">
                      <MapPin size={18} className="mr-3 mt-1 text-accent shrink-0" />
                      <p>{branch.address}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <Phone size={16} className="mr-3 text-accent" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail size={16} className="mr-3 text-accent" />
                        <span>{branch.email}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start text-sm">
                        <Clock size={16} className="mr-3 text-accent mt-0.5" />
                        <span>{branch.hours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button asChild className="rounded-none px-10 h-14 bg-primary tracking-widest uppercase">
                      <Link href={`/book?branch=${branch.id}`}>Book at this Branch</Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-none px-10 h-14 border-primary text-primary tracking-widest uppercase">
                      <Link href={`/branches/${branch.slug}`}>View Location Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Utility function duplicated for this file or imported if needed
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
