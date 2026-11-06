import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare, 
  MapPin, 
  Sparkles, 
  ChevronRight,
  Loader2,
  Award
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clinicInfo, treatments } from '../data/clinicData';
import AnimatedButton from './AnimatedButton';

gsap.registerPlugin(ScrollTrigger);

export default function InlineAppointmentSection() {
  const [treatment, setTreatment] = useState(treatments[0].title);
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredSlot, setPreferredSlot] = useState("05:30 PM");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [painLevel, setPainLevel] = useState("Moderate");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const formCardRef = useRef(null);
  const floatingShapeRef = useRef(null);

  const availableSlots = [
    "12:30 PM", "01:30 PM", "02:30 PM", "03:30 PM", 
    "04:30 PM", "05:30 PM", "06:30 PM", "07:15 PM"
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Stagger entrance of columns
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo(
        formCardRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Ambient floating background shape
      gsap.to(floatingShapeRef.current, {
        y: -15,
        rotation: 8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleSendWhatsApp = () => {
    const text = `*New Appointment Request - Shree Dental Care*\n\n` +
      `👤 *Patient Name:* ${patientName}\n` +
      `📞 *Phone:* ${patientPhone}\n` +
      `🩺 *Concern / Treatment:* ${treatment}\n` +
      `📅 *Preferred Date:* ${preferredDate}\n` +
      `⏰ *Preferred Time:* ${preferredSlot}\n` +
      `⚡ *Pain / Urgency:* ${painLevel}\n\n` +
      `*Clinic Address:* Shop No. 2, Royal Arcade, Sector 27, Pradhikaran, Nigdi\n` +
      `*Doctor:* Dr. Shrikant Rao (BDS)`;

    window.open(`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section 
      ref={sectionRef} 
      id="book-appointment" 
      className="py-24 bg-gradient-to-br from-dentist-950 via-slate-900 to-dentist-950 text-white relative overflow-hidden"
    >
      {/* Decorative floating ambient shapes */}
      <div 
        ref={floatingShapeRef}
        className="absolute top-10 right-10 w-96 h-96 bg-dentist-500/15 rounded-full blur-3xl pointer-events-none" 
      />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-tealbrand-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Reassurance & Doctor Credentials */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-dentist-300 text-xs font-bold uppercase tracking-wider border border-white/15 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-dentist-400" />
              <span>Easy In-Person Scheduling</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Begin Your Journey to a Pain-Free Smile.
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Reserve your personalized consultation with <strong>Dr. Shrikant Rao (BDS)</strong> at Shree Dental Care. Walk-ins are welcomed, but reserved appointments guarantee minimal waiting time.
            </p>

            {/* Reassurance Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Transparent Initial Examination Fee: <strong>₹200 – ₹500</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Operating Hours: <strong>Mon–Sat 12:00 PM – 8:00 PM</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>100% Autoclaved Sterilization Protocol (Class B)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Near Swimming Tank / Akurdi BSNL Office, Sector 27 Pradhikaran</span>
              </div>
            </div>

            {/* Direct Phone Assistance Banner */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between gap-4 pt-4">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Need immediate assistance?</span>
                <span className="text-base font-bold text-white">{clinicInfo.contact.phone}</span>
              </div>
              <AnimatedButton
                href={`tel:${clinicInfo.contact.phone.replace(/\s+/g, '')}`}
                variant="secondary"
                size="sm"
                iconComponent={Phone}
              >
                Call Clinic
              </AnimatedButton>
            </div>

          </div>

          {/* Right Column: Prominent Appointment Form Card */}
          <div ref={formCardRef} className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 text-slate-800 shadow-2xl border border-white/20">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        Book Your Consultation
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Dr. Shrikant Rao (BDS) • Chief Dental Surgeon
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-dentist-50 text-dentist-700 border border-dentist-100">
                      Standard Fee: ₹200–₹500
                    </span>
                  </div>

                  {/* Treatment Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Select Dental Concern / Treatment
                    </label>
                    <select
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      className="w-full py-3 px-4 rounded-xl border border-slate-300 focus:border-dentist-600 focus:ring-2 focus:ring-dentist-500/20 text-sm font-medium text-slate-800 bg-white cursor-pointer transition-all"
                    >
                      {treatments.map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title}
                        </option>
                      ))}
                      <option value="Toothache & Emergency Consultation">
                        Acute Toothache / Emergency Consultation
                      </option>
                      <option value="Routine Teeth Cleaning & Checkup">
                        Routine Scaling & Dental Checkup
                      </option>
                      <option value="Second Opinion & Consultation">
                        Second Opinion Consultation
                      </option>
                    </select>
                  </div>

                  {/* Date & Time Slot Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-dentist-600" />
                        <span>Preferred Date</span>
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl border border-slate-300 focus:border-dentist-600 focus:ring-2 focus:ring-dentist-500/20 text-sm font-medium text-slate-800 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-dentist-600" />
                        <span>Slot (12 PM - 8 PM)</span>
                      </label>
                      <select
                        value={preferredSlot}
                        onChange={(e) => setPreferredSlot(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl border border-slate-300 focus:border-dentist-600 focus:ring-2 focus:ring-dentist-500/20 text-sm font-medium text-slate-800 bg-white cursor-pointer transition-all"
                      >
                        {availableSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Patient Name & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-dentist-600" />
                        <span>Patient Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rajesh Patil"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl border border-slate-300 focus:border-dentist-600 focus:ring-2 focus:ring-dentist-500/20 text-sm text-slate-800 placeholder-slate-400 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-dentist-600" />
                        <span>Mobile Number</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 98765 43210"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl border border-slate-300 focus:border-dentist-600 focus:ring-2 focus:ring-dentist-500/20 text-sm text-slate-800 placeholder-slate-400 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Urgency Level Buttons */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Current Pain / Discomfort Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Mild Checkup", "Moderate Pain", "Severe Toothache"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setPainLevel(lvl)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                            painLevel === lvl
                              ? 'bg-dentist-50 border-dentist-600 text-dentist-800 shadow-xs ring-1 ring-dentist-500/30'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm sm:text-base text-white bg-dentist-600 hover:bg-dentist-700 shadow-lg shadow-dentist-600/30 transition-all cursor-pointer disabled:opacity-75"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Reserving Your Consultation...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm & Reserve Consultation Slot</span>
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              ) : (
                /* Instant Confirmation State */
                <div className="py-6 space-y-6 text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h4 className="text-2xl font-extrabold text-slate-900">
                      Appointment Details Reserved!
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Thank you, <strong className="text-slate-900">{patientName}</strong>. Your requested slot is ready for priority check-in.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left text-sm space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Concern:</span>
                      <span className="font-bold text-slate-900">{treatment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Date & Time:</span>
                      <span className="font-bold text-slate-900">{preferredDate} at {preferredSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Location:</span>
                      <span className="font-bold text-slate-900 text-right">Royal Arcade #2, Sector 27 Pradhikaran</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Consultation Fee:</span>
                      <span className="font-extrabold text-dentist-700">₹200 – ₹500</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <AnimatedButton
                      onClick={handleSendWhatsApp}
                      variant="whatsapp"
                      size="lg"
                      iconComponent={MessageSquare}
                      className="w-full justify-center"
                    >
                      Send Confirmation to Dr. Rao via WhatsApp
                    </AnimatedButton>

                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

