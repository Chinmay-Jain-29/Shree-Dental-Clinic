import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

const cases = [
  {
    id: 'whitening',
    title: 'Professional Teeth Whitening',
    subtitle: 'Stubborn tea/coffee stains removed in a single 45-minute chairside session.',
    badge: 'Same-Day Result',
    beforeDesc: 'Heavy yellow discoloration and tea stains',
    afterDesc: 'Bright, natural smile 7 shades lighter',
    beforeColor: 'from-amber-100 to-amber-200',
    afterColor: 'from-sky-50 to-white',
    timeTaken: '45 Minutes'
  },
  {
    id: 'crown',
    title: 'Fractured Molar Restored with Zirconia Crown',
    subtitle: 'Tooth saved after root canal treatment and restored with metal-free CAD-CAM crown.',
    badge: '15-Yr Durability',
    beforeDesc: 'Deep decay & fractured cusps with severe pain',
    afterDesc: 'Natural translucency, exact bite alignment',
    beforeColor: 'from-stone-300 to-stone-400',
    afterColor: 'from-slate-50 to-white',
    timeTaken: '2 Sittings'
  },
  {
    id: 'diastema',
    title: 'Front Teeth Gap Closure (Diastema)',
    subtitle: 'Aesthetic composite bonding performed without shaving natural enamel.',
    badge: 'Conservative Care',
    beforeDesc: '3mm mid-line gap causing speech & confidence issues',
    afterDesc: 'Harmonious, seamless smile line',
    beforeColor: 'from-amber-50 to-slate-200',
    afterColor: 'from-white to-sky-50',
    timeTaken: '60 Minutes'
  },
  {
    id: 'implant',
    title: 'Single Tooth Dental Implant',
    subtitle: 'Permanent titanium replacement for a missing upper premolar.',
    badge: 'Lifetime Solution',
    beforeDesc: 'Missing tooth gap preventing proper chewing',
    afterDesc: '100% natural chewing power & bone preservation',
    beforeColor: 'from-slate-200 to-slate-300',
    afterColor: 'from-white to-sky-50',
    timeTaken: 'Planned Treatment'
  }
];

export default function SmileGallery({ onOpenBooking }) {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const activeCase = cases[activeCaseIndex];

  return (
    <section id="smile-gallery" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tealbrand-100 text-tealbrand-800 text-xs font-bold uppercase tracking-wider">
            Clinical Proof & Results
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Smile Transformations at Shree Dental Care
          </h2>
          <p className="text-base text-slate-600">
            Realize the transformative power of conservative, precision dentistry. Explore typical results achieved by Dr. Shrikant Rao.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {cases.map((c, index) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(index);
                setSliderPos(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCaseIndex === index
                  ? 'bg-dentist-600 text-white shadow-md shadow-dentist-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {c.title.split(' ')[0]} {c.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Interactive Before & After Visual Component */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Visual Interactive Comparison Slider Area */}
            <div className="md:col-span-7">
              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-inner border border-slate-200 bg-slate-900 select-none">
                
                {/* AFTER Layer (Full Width background) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-100 via-white to-dentist-50 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-dentist-500/10 border-2 border-dentist-500 flex items-center justify-center text-dentist-600 mb-3">
                    <Sparkles className="w-12 h-12" />
                  </div>
                  <span className="text-xs font-bold text-tealbrand-700 uppercase tracking-wider mb-1">
                    RESULT: RESTORED & HEALTHY
                  </span>
                  <h4 className="text-lg font-extrabold text-slate-900 max-w-xs">
                    {activeCase.afterDesc}
                  </h4>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Post-Treatment</span>
                  </div>
                </div>

                {/* BEFORE Layer (Clipped according to slider position) */}
                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-tr from-stone-200 via-amber-100/90 to-stone-300 flex flex-col items-center justify-center p-6 text-center border-r-2 border-white shadow-2xl"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div className="w-24 h-24 rounded-full bg-stone-500/10 border-2 border-amber-600/40 flex items-center justify-center text-amber-800 mb-3 shrink-0">
                    <Eye className="w-12 h-12" />
                  </div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 shrink-0">
                    BEFORE TREATMENT
                  </span>
                  <h4 className="text-lg font-extrabold text-slate-900 max-w-xs shrink-0">
                    {activeCase.beforeDesc}
                  </h4>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-xs font-semibold shrink-0">
                    <span>Initial Examination</span>
                  </div>
                </div>

                {/* Slider Handle Divider */}
                <div 
                  className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white text-dentist-700 shadow-xl border-2 border-dentist-600 flex items-center justify-center text-xs font-extrabold">
                    ⟷
                  </div>
                </div>

                {/* Floating Slider Labels */}
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md pointer-events-none">
                  BEFORE
                </span>
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md pointer-events-none">
                  AFTER
                </span>
              </div>

              {/* Range Input Slider for touch and mouse accessibility */}
              <div className="mt-4 px-2">
                <input 
                  type="range" 
                  min="5" 
                  max="95" 
                  value={sliderPos} 
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full accent-dentist-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  aria-label="Drag to compare before and after"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                  <span>← Slide for Before</span>
                  <span className="text-dentist-600 font-bold">Drag slider to compare</span>
                  <span>Slide for After →</span>
                </div>
              </div>
            </div>

            {/* Case Narrative & Consultation Hook */}
            <div className="md:col-span-5 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-dentist-100 text-dentist-800">
                {activeCase.badge}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {activeCase.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeCase.subtitle}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Procedure Duration:</span>
                  <span className="font-bold text-slate-800">{activeCase.timeTaken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Comfort:</span>
                  <span className="font-bold text-emerald-600">Zero to minimal pain</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Doctor:</span>
                  <span className="font-bold text-dentist-700">Dr. Shrikant Rao (BDS)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm text-white bg-dentist-600 hover:bg-dentist-700 shadow-md transition-colors"
                >
                  <span>Book Similar Transformation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

