
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { SERVICES } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  const categories = ['Skincare', 'Laser', 'Body', 'Injectables'];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-48 pb-24 bg-white">
        <div className="container mx-auto px-6 text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-headline">Treatments & Artistry</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our curated portfolio of medical aesthetic services is designed to enhance your natural beauty with precision, safety, and a luxurious touch.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-40">
        <div className="container mx-auto px-6">
          <div className="space-y-32">
            {categories.map((cat) => (
              <div key={cat} className="space-y-12">
                <div className="flex items-center space-x-6">
                  <h2 className="text-2xl font-headline tracking-widest uppercase">{cat}</h2>
                  <div className="h-[1px] bg-muted flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                  {SERVICES.filter(s => s.category === cat).map((service) => (
                    <Link key={service.id} href={`/services/${service.slug}`} className="group space-y-6 block">
                      <div className="relative h-[400px] overflow-hidden">
                        <Image 
                          src={service.imageUrl}
                          alt={service.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-headline group-hover:text-accent transition-colors">{service.name}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                        <div className="pt-2 flex items-center text-xs font-bold uppercase tracking-widest">
                          <span>Learn More</span>
                          <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                  {/* Empty state placeholder for other categories if no items */}
                  {SERVICES.filter(s => s.category === cat).length === 0 && (
                    <div className="col-span-3 py-12 text-center text-muted-foreground italic">
                      Coming Soon to Ortiz Clinic.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-secondary/10">
        <div className="container mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-headline">Ready to reveal your best skin?</h2>
          <Button asChild size="lg" className="rounded-none px-12 h-14 bg-primary tracking-widest uppercase">
            <Link href="/book">Reserve Your Consultation</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
