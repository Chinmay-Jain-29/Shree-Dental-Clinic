import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar, Navigation, X } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export default function FloatingActions({ onOpenBooking }) {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Hide tooltip automatically after 8 seconds
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(
    "Hello Dr. Shrikant Rao, I would like to book a dental consultation at Shree Dental Care."
  )}`;

  return (
    <>
      {/* Desktop & Mobile Floating WhatsApp Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-5 z-40 flex flex-col items-end">
        {showTooltip && (
          <div className="mb-2 bg-slate-900 text-white text-xs font-medium py-1.5 px-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
            <span>Ask Dr. Rao directly on WhatsApp</span>
            <button 
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110 active:scale-95 group"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-7 h-7" />
          <span className="sr-only">Chat on WhatsApp</span>
        </a>
      </div>

      {/* Mobile-Only Bottom Sticky Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${clinicInfo.contact.phone.replace(/\s+/g, '')}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200"
        >
          <Phone className="w-4 h-4 text-dentist-600" />
          <span>Call Doctor</span>
        </a>

        <a
          href={clinicInfo.contact.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200"
        >
          <Navigation className="w-4 h-4 text-dentist-600" />
          <span>Map</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-2 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-dentist-600 hover:bg-dentist-700 shadow-md"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Slot</span>
        </button>
      </div>
    </>
  );
}

