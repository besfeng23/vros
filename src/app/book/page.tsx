
"use client";

import { useState } from 'react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BRANCHES, SERVICES } from '@/lib/data';
import { Calendar as CalendarIcon, Clock, MapPin, Sparkles, Check } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function BookPage() {
  const [date, setDate] = useState<Date>();
  const [step, setStep] = useState(1);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-headline">Reserve Your Experience</h1>
            <p className="text-muted-foreground max-w-md mx-auto">Follow our simple steps to book a consultation or treatment at your preferred branch.</p>
          </div>

          <div className="bg-white border border-muted shadow-sm p-12">
            {/* Progress Bar */}
            <div className="flex justify-between items-center mb-12 max-w-xs mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all",
                    step >= s ? "bg-accent text-white" : "bg-muted text-muted-foreground"
                  )}>
                    {s}
                  </div>
                  {s < 3 && <div className={cn("w-12 h-[1px]", step > s ? "bg-accent" : "bg-muted")} />}
                </div>
              ))}
            </div>

            <form className="space-y-12">
              {step === 1 && (
                <div className="space-y-8 animate-fade-in-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase tracking-widest">Preferred Branch</Label>
                      <Select>
                        <SelectTrigger className="rounded-none h-12 border-muted focus:ring-accent">
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                          {BRANCHES.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase tracking-widest">Desired Service</Label>
                      <Select>
                        <SelectTrigger className="rounded-none h-12 border-muted focus:ring-accent">
                          <SelectValue placeholder="Select Service" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICES.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-widest">Preferred Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal rounded-none h-12 border-muted",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button type="button" onClick={() => setStep(2)} className="w-full rounded-none h-14 bg-primary tracking-widest uppercase">
                    Continue to Details
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-fade-in-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase tracking-widest">Full Name</Label>
                      <Input placeholder="E.g. Maria Clara" className="rounded-none h-12 border-muted focus:ring-accent" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase tracking-widest">Phone Number</Label>
                      <Input placeholder="+63 9xx xxx xxxx" className="rounded-none h-12 border-muted focus:ring-accent" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-widest">Email Address</Label>
                    <Input placeholder="maria@example.com" className="rounded-none h-12 border-muted focus:ring-accent" />
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-none h-14 tracking-widest uppercase border-muted">
                      Back
                    </Button>
                    <Button type="button" onClick={() => setStep(3)} className="flex-[2] rounded-none h-14 bg-primary tracking-widest uppercase">
                      Confirm Reservation
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center space-y-8 py-8 animate-fade-in-up">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 text-accent mb-4">
                    <Sparkles size={40} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-headline">Reservation Pending</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Thank you for choosing Ortiz Clinic. Our concierge will contact you shortly to confirm your slot.
                    </p>
                  </div>
                  <div className="bg-secondary/10 p-6 border border-secondary text-left space-y-4 max-w-md mx-auto">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">Next Steps</p>
                    <ul className="text-sm space-y-3 text-muted-foreground">
                      <li className="flex items-start"><Check size={14} className="mr-2 mt-1 text-accent shrink-0" /> Check your email for a summary.</li>
                      <li className="flex items-start"><Check size={14} className="mr-2 mt-1 text-accent shrink-0" /> Expect a call from our Makati branch.</li>
                    </ul>
                  </div>
                  <Button asChild className="rounded-none h-14 px-12 bg-primary tracking-widest uppercase mt-8">
                    <a href="/">Return Home</a>
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
