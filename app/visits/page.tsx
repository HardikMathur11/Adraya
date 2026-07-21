'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle, Compass, ShieldCheck } from 'lucide-react';
import { EXPERIENCES, Experience } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { GoldLabel } from '@/components/ui/GoldLabel';
import { Badge } from '@/components/ui/Badge';

export default function VisitsPage() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(EXPERIENCES[0]);
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-15');
  const [guests, setGuests] = useState<number>(2);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // Custom Gold/Ivory Calendar dates generator
  const calendarDates = [
    { day: '12', date: '2026-08-12', available: true },
    { day: '13', date: '2026-08-13', available: false },
    { day: '14', date: '2026-08-14', available: true },
    { day: '15', date: '2026-08-15', available: true },
    { day: '16', date: '2026-08-16', available: true },
    { day: '17', date: '2026-08-17', available: false },
    { day: '18', date: '2026-08-18', available: true },
  ];

  return (
    <div className="space-y-16 pb-24">
      
      {/* Golden-Hour Courtyard Hero Image */}
      <section className="relative h-[65vh] min-h-[480px] w-full overflow-hidden bg-[var(--color-wine)] text-[var(--color-ivory)] flex items-center justify-center text-center">
        <Image
          src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1800"
          alt="Golden hour loom courtyard"
          fill
          priority
          className="object-cover brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-wine)] via-[var(--color-oxblood)]/50 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 py-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-light)] bg-[var(--color-oxblood)]/80 px-4 py-1.5 rounded-full border border-[var(--color-gold)]/40">
            Loom Residency & Private Cultural Journeys
          </span>

          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[var(--color-ivory)] drop-shadow-md">
            Step Into the Craft
          </h1>

          <p className="font-editorial text-xl sm:text-2xl text-[var(--color-ivory)]/90 italic max-w-2xl mx-auto leading-relaxed">
            Experience the living heritage of Indian handloom weaving in private village courtyard residencies across Assam, Uttar Pradesh, and Tamil Nadu.
          </p>
        </div>
      </section>

      {/* Experience Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
            Residency Options
          </span>
          <h2 className="font-display text-3xl font-bold text-[var(--color-wine)] mt-1">
            Curated Artisan Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp) => {
            const isSelected = selectedExperience?.id === exp.id;

            return (
              <div
                key={exp.id}
                className={`bg-[var(--color-cream)] border-2 rounded-[var(--radius-card)] overflow-hidden shadow-fabric transition-all flex flex-col justify-between ${
                  isSelected ? 'border-[var(--color-gold)] ring-2 ring-[var(--color-gold)]/30' : 'border-[var(--color-gold)]/30'
                }`}
              >
                <div className="relative h-64 w-full overflow-hidden bg-[var(--color-wine)]">
                  <Image src={exp.image} alt={exp.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 z-10">
                    <GoldLabel>{exp.duration}</GoldLabel>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xl text-[var(--color-oxblood)]">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-[var(--color-taupe)] flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                      {exp.location}
                    </p>
                    <p className="font-editorial text-sm italic text-[var(--color-charcoal)] leading-relaxed mt-3">
                      "{exp.description}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-gold)]/20">
                    <div>
                      <span className="text-[10px] text-[var(--color-taupe)] uppercase tracking-widest block font-semibold">
                        Experience Investment
                      </span>
                      <span className="font-display font-bold text-xl text-[var(--color-wine)]">
                        ₹{exp.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[var(--color-taupe)] block">{exp.groupSize}</span>
                    </div>

                    <Button
                      variant={isSelected ? 'gold' : 'primary'}
                      size="md"
                      onClick={() => {
                        setSelectedExperience(exp);
                        setBookingConfirmed(false);
                      }}
                    >
                      {isSelected ? '✓ Selected' : 'Select Date & Book'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Gold/Ivory Date Picker & Booking Summary Section */}
      {selectedExperience && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-[var(--color-wine)] text-[var(--color-ivory)] border-2 border-[var(--color-gold)] rounded-[var(--radius-card)] p-8 shadow-2xl space-y-6">
            
            <div className="border-b border-[var(--color-gold)]/30 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[var(--color-gold-light)] uppercase tracking-widest font-semibold block">
                  Step 2: Reserve Experience Date
                </span>
                <h3 className="font-display font-bold text-2xl text-[var(--color-ivory)]">
                  {selectedExperience.title}
                </h3>
              </div>
              <Badge variant="verified">Guaranteed Private Access</Badge>
            </div>

            {bookingConfirmed ? (
              <div className="p-8 bg-[var(--color-oxblood)] border border-[var(--color-gold)] rounded text-center space-y-4">
                <CheckCircle className="w-14 h-14 text-[var(--color-gold)] mx-auto" />
                <h4 className="font-display font-bold text-xl text-[var(--color-ivory)]">
                  Residency Reservation Confirmed!
                </h4>
                <p className="text-sm font-editorial italic text-[var(--color-ivory)]/90">
                  You are booked for {selectedExperience.title} on <strong className="text-[var(--color-gold)]">{selectedDate}</strong> for {guests} Guests. An artisan concierge will reach out via WhatsApp with local travel directions.
                </p>
                <Button variant="gold" size="md" onClick={() => setBookingConfirmed(false)}>
                  Modify Booking
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Custom Gold/Ivory Calendar */}
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-gold-light)] block mb-3">
                    Select Available Date (August 2026):
                  </span>
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDates.map((d) => (
                      <button
                        key={d.date}
                        disabled={!d.available}
                        onClick={() => setSelectedDate(d.date)}
                        className={`p-3 rounded border text-center font-display transition-all cursor-pointer ${
                          !d.available
                            ? 'opacity-30 cursor-not-allowed bg-gray-800 border-gray-700'
                            : selectedDate === d.date
                            ? 'bg-[var(--color-gold)] text-[var(--color-wine)] font-bold border-white shadow-md'
                            : 'bg-[var(--color-oxblood)] text-[var(--color-ivory)] border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/30'
                        }`}
                      >
                        <span className="block text-[10px] font-sans uppercase">AUG</span>
                        <span className="text-lg font-bold">{d.day}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Count */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-gold)]/20">
                  <span className="text-xs font-semibold uppercase text-[var(--color-gold-light)]">
                    Number of Guests:
                  </span>
                  <div className="flex items-center border border-[var(--color-gold)]/40 rounded bg-[var(--color-oxblood)]">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="px-3 py-1 text-sm font-bold text-[var(--color-ivory)]"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-bold text-[var(--color-gold)]">{guests}</span>
                    <button
                      onClick={() => setGuests(guests + 1)}
                      className="px-3 py-1 text-sm font-bold text-[var(--color-ivory)]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="p-4 bg-[var(--color-oxblood)]/80 border border-[var(--color-gold)]/30 rounded flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-[var(--color-gold-light)] uppercase block">Total Experience Fee</span>
                    <span className="font-display font-bold text-xl text-[var(--color-gold)]">
                      ₹{(selectedExperience.price * guests).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Button variant="gold" size="lg" onClick={() => setBookingConfirmed(true)}>
                    Confirm & Reserve Loom Residency
                  </Button>
                </div>

              </div>
            )}

          </div>
        </section>
      )}

    </div>
  );
}
