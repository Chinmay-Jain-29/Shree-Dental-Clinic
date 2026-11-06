import React, { useEffect, useRef } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Calendar, 
  Navigation, 
  ShieldCheck, 
  Car, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clinicInfo } from '../data/clinicData';

gsap.registerPlugin(ScrollTrigger);

export default function LocationAndHours({ onOpenBooking }) {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const mapFrameRef = useRef(null);

  const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday

  const weekSchedule = [
    { day: "Monday", hours: "12:00 PM – 8:00 PM", dayIdx: 1 },
    { day: "Tuesday", hours: "12:00 PM – 8:00 PM", dayIdx: 2 },
    { day: "Wednesday", hours: "12:00 PM – 8:00 PM", dayIdx: 3 },
    { day: "Thursday", hours: "12:00 PM – 8:00 PM", dayIdx: 4 },
    { day: "Friday", hours: "12:00 PM – 8:00 PM", dayIdx: 5 },
    { day: "Saturday", hours: "12:00 PM – 8:00 PM", dayIdx: 6 },
    { day: "Sunday", hours: "Closed (Emergency on Call)", dayIdx: 0, isClosed: true },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions;

      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: isDesktop ? -30 : 0, y: isDesktop ? 0 : 25 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo(
        mapFrameRef.current,
        { opacity: 0, x: isDesktop ? 30 : 0, y: isDesktop ? 0 : 25 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="location" className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dentist-100 text-dentist-800 text-xs font-bold uppercase tracking-wider">
            Visit Our Clinic
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clinic Location & Operating Hours
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Conveniently situated in Sector 27 Pradhikaran, Nigdi with ample parking and easy connectivity from Akurdi, Ravet, and Nigdi bus stops.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Address, Hours & Landmark Highlights */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-dentist-600 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {clinicInfo.name}
                  </h3>
                  <p className="text-xs font-semibold text-dentist-600">
                    {clinicInfo.doctor.name} ({clinicInfo.doctor.qualifications})
                  </p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 space-y-1 pl-1 border-l-2 border-dentist-300 ml-1">
                <p className="font-semibold text-slate-900">{clinicInfo.contact.address.shop}</p>
                <p className="text-dentist-700 font-medium">📍 {clinicInfo.contact.address.landmark}</p>
                <p>{clinicInfo.contact.address.sector}</p>
                <p>{clinicInfo.contact.address.area}</p>
                <p>{clinicInfo.contact.address.city} - {clinicInfo.contact.address.pincode}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={clinicInfo.contact.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-dentist-600 hover:bg-dentist-700 shadow-md transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                </a>

                <a
                  href={`tel:${clinicInfo.contact.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <Phone className="w-4 h-4 text-dentist-600" />
                  <span>Call Desk</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Table Card */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-dentist-600" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">Weekly Timings</h3>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                  Mon – Sat Evening
                </span>
              </div>

              <div className="divide-y divide-slate-200 text-xs sm:text-sm">
                {weekSchedule.map((item) => {
                  const isToday = item.dayIdx === todayIndex;
                  return (
                    <div 
                      key={item.day}
                      className={`py-2.5 flex items-center justify-between px-2 rounded-lg transition-colors ${
                        isToday ? 'bg-dentist-100/70 font-bold text-dentist-950' : 'text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.day}</span>
                        {isToday && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-dentist-600 text-white font-bold">
                            Today
                          </span>
                        )}
                      </div>
                      <span className={item.isClosed ? 'text-red-500 font-semibold' : 'text-slate-800 font-medium'}>
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Standard Consultation Fee:</span>
                <span className="font-bold text-dentist-700">₹200 – ₹500</span>
              </div>
            </div>

            {/* Accessibility Perks */}
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
                <Car className="w-4 h-4 text-dentist-600 shrink-0" />
                <span>Roadside Parking</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ground Level Access</span>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive View & Landmarks Guide */}
          <div ref={mapFrameRef} className="lg:col-span-7 space-y-4">
            
            <div className="w-full h-80 sm:h-96 lg:h-[460px] rounded-3xl overflow-hidden border border-slate-200 shadow-card relative bg-slate-100">
              {/* Google Maps Real Iframe Embed */}
              <iframe
                title="Shree Dental Care Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.603332857416!2d73.7663456!3d18.6416972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9ea42456073%3A0xb35a51806f7df26e!2sSector%20No.%2027%2C%20Pradhikaran%2C%20Nigdi%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411044!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>

              {/* Floating Overlay Badge on Map */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-200/80 max-w-xs hidden sm:block">
                <p className="text-xs font-bold text-slate-900">
                  📍 Royal Arcade, Shop No. 2
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Sector 27 Pradhikaran, near Swimming Tank & Akurdi BSNL Office
                </p>
                <a
                  href={clinicInfo.contact.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-[11px] font-bold text-dentist-600 hover:text-dentist-700 flex items-center gap-1"
                >
                  <span>Open in Google Maps App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Landmark Guidance Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-dentist-50 border border-dentist-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-dentist-800">
                  Landmark Navigation Tips:
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Located right next to the <strong>Pradhikaran Swimming Tank</strong> and opposite the <strong>Akurdi BSNL Office</strong> on the main connecting road between Sector 26 and Sector 27.
                </p>
              </div>

              <button
                onClick={onOpenBooking}
                className="shrink-0 w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-dentist-600 hover:bg-dentist-700 shadow transition-colors cursor-pointer text-center"
              >
                Book Appointment
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
