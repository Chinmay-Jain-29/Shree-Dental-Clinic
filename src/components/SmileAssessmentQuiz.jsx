import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  MessageSquare,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

const questions = [
  {
    id: 1,
    title: "What is your primary dental concern right now?",
    options: [
      { label: "Sharp or throbbing toothache (especially when chewing or at night)", tag: "Pain / Infection", recommended: "Root Canal Evaluation" },
      { label: "Stained, yellowed, or uneven teeth / smile gap", tag: "Aesthetics", recommended: "Cosmetic Smile Makeover / Whitening" },
      { label: "Missing one or more teeth / loose dentures", tag: "Restoration", recommended: "Dental Implant or Zirconia Bridge" },
      { label: "Pain in the back of the jaw / swollen wisdom tooth gum", tag: "Wisdom Tooth", recommended: "Wisdom Tooth Surgical Assessment" },
      { label: "Bleeding gums while brushing or bad breath", tag: "Gums", recommended: "Ultrasonic Deep Scaling & Gum Care" },
      { label: "Routine 6-month checkup & teeth cleaning", tag: "Preventive", recommended: "Comprehensive Dental Examination" }
    ]
  },
  {
    id: 2,
    title: "How long have you noticed this issue?",
    options: [
      { label: "Started suddenly in the last 1–3 days (acute/urgent)", urgency: "High" },
      { label: "A few weeks, comes and goes with food temperatures", urgency: "Moderate" },
      { label: "Ongoing for several months or a long-standing desire", urgency: "Routine" }
    ]
  },
  {
    id: 3,
    title: "Do you experience dental anxiety or fear of needles?",
    options: [
      { label: "Yes, I am quite nervous about dental pain", note: "Anxiety-free protocol with pre-numbing topical gel" },
      { label: "A little uneasy, but manageable", note: "Standard gentle care & step-by-step explanation" },
      { label: "No, I am completely comfortable with dental procedures", note: "Standard clinical care" }
    ]
  }
];

export default function SmileAssessmentQuiz({ onOpenBooking }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (option) => {
    const updatedAnswers = { ...answers, [currentStep]: option };
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const selectedPrimary = answers[0] || {};
  const selectedUrgency = answers[1] || {};
  const selectedAnxiety = answers[2] || {};

  const handleShareAssessment = () => {
    const text = `*Self-Assessment Result - Shree Dental Care*\n\n` +
      `🩺 *Concern:* ${selectedPrimary.label || "Dental Consultation"}\n` +
      `📋 *Recommended:* ${selectedPrimary.recommended || "General Evaluation"}\n` +
      `⏳ *Timeline:* ${selectedUrgency.label || "Recent"}\n` +
      `😌 *Comfort Need:* ${selectedAnxiety.note || "Standard care"}\n\n` +
      `*Clinic:* Shree Dental Care (Dr. Shrikant Rao, BDS)\n` +
      `*Address:* Shop 2, Royal Arcade, Sec 27 Pradhikaran, Nigdi`;

    window.open(`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dentist-100 text-dentist-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-dentist-600" />
            <span>Interactive Self-Check</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Not Sure What Treatment You Need?
          </h2>
          <p className="text-sm text-slate-600">
            Take our 30-second dental guide. Dr. Shrikant Rao’s clinical framework helps identify the right care path.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-card border border-slate-200/90 relative">
          
          {!showResult ? (
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-6 pb-4 border-b border-slate-100">
                <span>Step {currentStep + 1} of {questions.length}</span>
                <span className="text-dentist-600 font-extrabold">
                  {Math.round(((currentStep + 1) / questions.length) * 100)}% Completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-6">
                <div 
                  className="bg-dentist-600 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 leading-snug">
                {questions[currentStep].title}
              </h3>

              {/* Options list */}
              <div className="space-y-3">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full p-4 rounded-2xl border border-slate-200 hover:border-dentist-500 hover:bg-dentist-50/50 text-left transition-all flex items-center justify-between group active:scale-[0.99]"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-dentist-900">
                      {opt.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-dentist-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Panel */
            <div className="space-y-6 animate-in fade-in zoom-in-95">
              
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    Recommended Clinical Next Step
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {selectedPrimary.recommended || "Comprehensive Dental Evaluation"}
                  </h3>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 block uppercase">Concern</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 mt-1 block">
                    {selectedPrimary.tag || "General"}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 block uppercase">Urgency</span>
                  <span className="text-xs sm:text-sm font-bold text-amber-600 mt-1 block">
                    {selectedUrgency.urgency || "Standard"} Priority
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 block uppercase">Consultation</span>
                  <span className="text-xs sm:text-sm font-bold text-dentist-700 mt-1 block">
                    ₹200 – ₹500
                  </span>
                </div>
              </div>

              {/* Comfort reassurance note */}
              <div className="p-4 rounded-2xl bg-tealbrand-50/70 border border-tealbrand-200 text-xs text-tealbrand-900 leading-relaxed">
                <strong>Anxiety-Free Promise: </strong>
                {selectedAnxiety.note || "Dr. Shrikant Rao uses topical numbing gel before every procedure for a gentle, reassuring experience."}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking(selectedPrimary.recommended)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm text-white bg-dentist-600 hover:bg-dentist-700 shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation for this</span>
                </button>

                <button
                  onClick={handleShareAssessment}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-semibold text-xs sm:text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Send Assessment via WhatsApp</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-3.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

