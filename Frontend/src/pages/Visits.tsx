import React, { useEffect, useState } from 'react';
import { getExperiences, submitBooking } from '../lib/api/experiences';
import { Experience } from '../lib/api/types';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';
import { Calendar, Users, MapPin, CheckCircle2 } from 'lucide-react';

export const Visits: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-08-15');
  const [guests, setGuests] = useState(2);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    const data = await getExperiences();
    setExperiences(data);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExp) return;
    const res = await submitBooking({ experienceId: selectedExp.id, date: bookingDate, guests });
    setConfirmation(`Booking Confirmed! Pass Code: ${res.bookingId}`);
    setTimeout(() => {
      setConfirmation(null);
      setSelectedExp(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <GoldLabel>VILLAGE LOOM COURTYARDS</GoldLabel>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#3F0F17]">
          Step Into the Craft
        </h1>
        <p className="font-editorial text-lg italic text-[#8A7A68]">
          Immerse yourself in authentic loom courtyards. Share tea with Shilp Guru masters, watch natural dyeing, and try your hand at shuttle weaving.
        </p>
      </div>

      {confirmation && (
        <div className="p-4 bg-[#0B3D2E]/20 border border-[#0B3D2E] text-[#0B3D2E] rounded text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{confirmation}</span>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded-[6px] overflow-hidden shadow-fabric space-y-4 p-6 flex flex-col justify-between">
            <img src={exp.image} alt={exp.title} className="w-full h-56 object-cover rounded" />
            
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono text-[#8A7A68] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C9A227]" /> {exp.location}
              </span>
              <h3 className="font-display font-bold text-xl text-[#3F0F17]">{exp.title}</h3>
              <p className="font-editorial text-xs italic text-[#8A7A68]">{exp.description}</p>
            </div>

            <div className="pt-4 border-t border-[#C9A227]/20 flex items-center justify-between">
              <div>
                <span className="font-display font-bold text-lg text-[#6B1E28]">₹{exp.price.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-[#8A7A68] block">{exp.duration}</span>
              </div>
              <Button variant="gold" size="sm" onClick={() => setSelectedExp(exp)}>
                Reserve Visit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Reservation Modal */}
      {selectedExp && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#FBF7EF] border-2 border-[#C9A227] rounded p-8 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-display font-bold text-xl text-[#3F0F17]">
              Reserve {selectedExp.title}
            </h3>

            <form onSubmit={handleBooking} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Select Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Guest Count</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setSelectedExp(null)}>
                  Cancel
                </Button>
                <Button variant="gold" size="sm" type="submit">
                  Confirm Reservation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
