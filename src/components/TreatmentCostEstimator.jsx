import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck, Sparkles, MessageSquare, Info } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

const treatmentOptions = [
  {
    id: 'consultation',
    name: 'Comprehensive Consultation & Digital X-Ray',
    category: 'Diagnostics',
    costMin: 200,
    costMax: 500,
    included: 'Intraoral examination, digital X-ray analysis, full treatment plan',
    duration: '20 mins',
    popular: true
  },
  {
    id: 'rct',
    name: 'Rotary Root Canal Treatment (Per Tooth)',
    category: 'Endodontics',
    costMin: 2500,
    costMax: 4500,
    included: 'Computerized rotary instrumentation, painless numbing, sterile canal dressing',
    duration: '1–2 sittings'
  },
  {
    id: 'zirconia_crown',
    name: 'Premium Metal-Free Zirconia Crown',
    category: 'Prosthodontics',
    costMin: 6000,
    costMax: 11000,
    included: 'CAD-CAM precision fit, 10-15 year warranty card, lifelike translucency',
    duration: '2 visits'
  },
  {
    id: 'whitening',
    name: 'Chairside Teeth Whitening (Smile Brightening)',
    category: 'Cosmetics',
    costMin: 5000,
    costMax: 8500,
    included: 'Same-day 6–8 shades lighter result, gum barrier protection, polish',
    duration: '45 mins'
  },
  {
    id: 'wisdom_extraction',
    name: 'Surgical Wisdom Tooth Extraction (Impacted)',
    category: 'Oral Surgery',
    costMin: 3000,
    costMax: 6000,
    included: 'Atraumatic surgical removal, bone preservation, suture removal',
    duration: '35 mins'
  },
  {
    id: 'scaling',
    name: 'Ultrasonic Deep Scaling & Teeth Polishing',
    category: 'Preventive',
    costMin: 800,
    costMax: 1500,
    included: 'Subgingival plaque & tartar removal, stain polishing, gum health check',
    duration: '30 mins'
  },
  {
    id: 'implant',
    name: 'Dental Implant (Titanium Fixture + Abutment)',
    category: 'Implantology',
    costMin: 22000,
    costMax: 35000,
    included: 'Permanent bio-compatible titanium post, 3D surgical guide planning',
    duration: 'Multi-stage'
  }
];

export default function TreatmentCostEstimator({ onOpenBooking }) {
  const [selectedIds, setSelectedIds] = useState(['consultation']);

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length === 1) return; // Keep at least one selected
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedTreatments = treatmentOptions.filter(t => selectedIds.includes(t.id));
  const totalMin = selectedTreatments.reduce((acc, curr) => acc + curr.costMin, 0);
  const totalMax = selectedTreatments.reduce((acc, curr) => acc + curr.costMax, 0);

  // Approximate 3-month or 6-month no-cost EMI estimate
  const emiPerMonth = Math.round(totalMin / 3);

  const handleShareEstimate = () => {
    const names = selectedTreatments.map(t => `• ${t.name}`).join('\n');
    const text = `*Treatment Cost Inquiry - Shree Dental Care*\n\n` +
      `Hello Dr. Shrikant Rao, I checked the estimate for:\n${names}\n\n` +
      `💰 *Estimated Range:* ₹${totalMin.toLocaleString()} – ₹${totalMax.toLocaleString()}\n` +
      `📍 *Clinic:* Shop 2, Royal Arcade, Sector 27 Pradhikaran, Nigdi\n\n` +
      `Could I schedule an in-person consultation (₹200–₹500) to confirm my exact treatment plan?`;

    window.open(`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dentist-100 text-dentist-800 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-dentist-600" />
            <span>Transparent Pricing Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Estimate Your Treatment Cost
          </h2>
          <p className="text-base text-slate-600">
            No surprise billing or hidden costs. Select one or more treatments below to preview typical price ranges at Shree Dental Care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Treatment Selector List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1 mb-1">
              <span>Select Procedures to calculate:</span>
              <span className="text-dentist-600">{selectedIds.length} item(s) selected</span>
            </div>

            {treatmentOptions.map((opt) => {
              const isChecked = selectedIds.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleSelection(opt.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-white border-dentist-500 shadow-md ring-1 ring-dentist-500/20'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                    isChecked ? 'bg-dentist-600 border-dentist-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-3" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        {opt.name}
                      </h4>
                      <span className="text-xs font-extrabold text-dentist-700">
                        ₹{opt.costMin.toLocaleString()} – ₹{opt.costMax.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      {opt.included}
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                      <span>Category: {opt.category}</span>
                      <span>•</span>
                      <span>Duration: {opt.duration}</span>
                      {opt.popular && (
                        <>
                          <span>•</span>
                          <span className="text-dentist-600 font-bold">Standard First Step</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Price Summary & Action Box */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  Estimated Summary
                </h3>
                <span className="text-xs font-bold text-tealbrand-700 bg-tealbrand-50 px-2.5 py-1 rounded-full border border-tealbrand-100">
                  Doctor Verified
                </span>
              </div>

              {/* Total Price Range Display */}
              <div className="p-5 rounded-2xl bg-dentist-50/70 border border-dentist-100 text-center">
                <span className="text-xs font-bold text-dentist-800 uppercase tracking-wider block">
                  Approximate Total Investment
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                  ₹{totalMin.toLocaleString()} – ₹{totalMax.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  *Final cost confirmed after clinical exam by Dr. Shrikant Rao (BDS)
                </p>
              </div>

              {/* Selected Breakdown List */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-500 uppercase tracking-wide block">
                  Selected Items:
                </span>
                <div className="divide-y divide-slate-100 max-h-44 overflow-y-auto pr-1">
                  {selectedTreatments.map(t => (
                    <div key={t.id} className="py-2 flex justify-between items-center text-slate-700">
                      <span className="truncate pr-2 font-medium">{t.name.split('(')[0]}</span>
                      <span className="font-bold text-slate-900 shrink-0">
                        ₹{t.costMin.toLocaleString()}–{t.costMax.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 0% Interest EMI Hint */}
              {totalMin >= 5000 && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 block">Easy Payment / EMI</span>
                    <span className="text-[11px] text-slate-500">Starting from ~₹{emiPerMonth.toLocaleString()}/mo on major cards</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    0% Options
                  </span>
                </div>
              )}

              {/* CTAs */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => onOpenBooking(selectedTreatments[0]?.name)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-dentist-600 hover:bg-dentist-700 shadow-md transition-colors"
                >
                  <span>Book Initial Consultation (₹200–₹500)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleShareEstimate}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Send Estimate to Doctor on WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Zero obligations. Clear clinical advice provided in person.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

