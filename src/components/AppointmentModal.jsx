import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Loader2,
  ChevronRight
} from 'lucide-react';
import gsap from 'gsap';
import { clinicInfo, treatments } from '../data/clinicData';
import AnimatedButton from './AnimatedButton';

export default function AppointmentModal({ isOpen, onClose, preselectedTreatment }) {
  const [treatment, setTreatment] = useState(preselectedTreatment || treatments[0].title);
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

  const modalRef = useRef(null);
  const formFieldsRef = useRef([]);

  const availableSlots = [
    "12:30 PM", "01:30 PM", "02:30 PM", "03:30 PM", 
    "04:30 PM", "05:30 PM", "06:30 PM", "07:15 PM"
  ];

  useEffect(() => {
    if (preselectedTreatment) {
      setTreatment(preselectedTreatment);
    }
  }, [preselectedTreatment]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Stagger entrance of form fields
      requestAnimationFrame(() => {
        if (modalRef.current) {
          gsap.fromTo(
            modalRef.current,
            { scale: 0.94, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
          );
        }

        const validFields = formFieldsRef.current.filter(Boolean);
        if (validFields.length) {
          gsap.fromTo(
            validFields,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
          );
        }
      });
    } else {
      document.body.style.overflow = 'unset';
      setIsSubmitted(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    setIsLoading(true);

    // Simulated short realistic submission delay for motion polish
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 700);
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        role="dialog"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-dentist-950 via-dentist-900 to-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-dentist-300 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-dentist-400" />
            <span>Priority Doctor Appointment</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Shree Dental Care
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Dr. Shrikant Rao (BDS) • Sector 27 Pradhikaran, Nigdi
          </p>
        </div>

        {/* Modal Body */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
            
            {/* Treatment Selector */}
            <div ref={(el) => (formFieldsRef.current[0] = el)}>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Dental Concern / Treatment
              </label>
              <select
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 focus:border-dentist-600 focus:ring-2 focus:ring-dentist-500/20 text-sm font-medium text-slate-800 bg-white transition-all cursor-pointer"
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

            {/* Date and Time Slot Picker */}
            <div ref={(el) => (formFieldsRef.current[1] = el)} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 focus:border-dentist-600 focus:ring-2 focus:ring-dentist-500/20 text-sm font-medium text-slate-800 transition-all"
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
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 focus:border-dentist-600 focus:ring-2 focus:ring-dentist-500/20 text-sm font-medium text-slate-800 bg-white transition-all cursor-pointer"
                >
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Patient Name & Mobile Number */}
            <div ref={(el) => (formFieldsRef.current[2] = el)} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-dentist-600" />
                  <span>Patient Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 focus:border-dentist-600 focus:ring-2 focus:ring-dentist-500/20 text-sm text-slate-800 placeholder-slate-400 transition-all"
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
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 focus:border-dentist-600 focus:ring-2 focus:ring-dentist-500/20 text-sm text-slate-800 placeholder-slate-400 transition-all"
                  required
                />
              </div>
            </div>

            {/* Urgency / Pain Level Selector */}
            <div ref={(el) => (formFieldsRef.current[3] = el)}>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Current Pain / Urgency Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Mild Checkup", "Moderate Pain", "Severe Toothache"].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setPainLevel(lvl)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
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

            {/* Fee Note */}
            <div ref={(el) => (formFieldsRef.current[4] = el)} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 flex items-center justify-between">
              <span>Standard Consultation Fee:</span>
              <span className="font-extrabold text-dentist-800">₹200 – ₹500</span>
            </div>

            {/* Submit Button with Animated Loading State */}
            <div ref={(el) => (formFieldsRef.current[5] = el)} className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-dentist-600 hover:bg-dentist-700 shadow-md shadow-dentist-600/25 transition-all cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Reserving Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Appointment Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation State with Direct WhatsApp Integration */
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-slate-900">
                Appointment Details Ready!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Thank you, <strong className="text-slate-900">{patientName}</strong>. Your requested slot is reserved for verification.
              </p>
            </div>

            {/* Summary Ticket */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left text-xs sm:text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Treatment:</span>
                <span className="font-bold text-slate-900">{treatment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="font-bold text-slate-900">{preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time Slot:</span>
                <span className="font-bold text-slate-900">{preferredSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Urgency:</span>
                <span className="font-bold text-amber-600">{painLevel}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between">
                <span className="text-slate-500">Clinic Address:</span>
                <span className="font-semibold text-slate-800 text-right">
                  Royal Arcade #2, Sec 27, Pradhikaran
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="space-y-3">
              <AnimatedButton
                onClick={handleSendWhatsApp}
                variant="whatsapp"
                size="lg"
                iconComponent={MessageSquare}
                className="w-full justify-center"
              >
                Send via WhatsApp to Dr. Rao
              </AnimatedButton>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
