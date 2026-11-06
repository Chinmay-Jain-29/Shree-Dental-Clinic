import React, { useState } from 'react';
import { ShieldAlert, Sparkles, Crown, Anchor, Scissors, HeartPulse, ChevronRight, CheckCircle2 } from 'lucide-react';

const zones = [
  {
    id: 'molars',
    name: 'Molars & Chewing Teeth',
    icon: ShieldAlert,
    commonIssues: 'Deep decay, throbbing night pain, cracked cusps',
    treatment: 'Root Canal Treatment (RCT) & Zirconia Crown',
    tagline: 'Save your natural chewing tooth with painless computerized rotary endodontics.',
    features: ['Computerized Apex Locator', 'Single or dual sitting', 'Natural translucent crown match']
  },
  {
    id: 'front',
    name: 'Front Teeth & Smile Line',
    icon: Sparkles,
    commonIssues: 'Discoloration, tea/coffee stains, mid-line gaps, chipped edges',
    treatment: 'Cosmetic Veneers & Teeth Whitening',
    tagline: 'Achieve a radiant, symmetrical smile with conservative aesthetic bonding.',
    features: ['Instant 6-8 shade whitening', 'Ultra-thin E-max porcelain veneers', 'Enamel-preserving bonding']
  },
  {
    id: 'wisdom',
    name: 'Wisdom Teeth (Third Molars)',
    icon: Scissors,
    commonIssues: 'Impacted tooth, cheek biting, severe jaw tightness & swelling',
    treatment: 'Atraumatic Surgical Extraction',
    tagline: 'Minimally invasive removal of angled or locked wisdom teeth under complete local numbing.',
    features: ['Digital X-ray planning', 'Zero sharp pain guarantee', 'Rapid recovery protocol']
  },
  {
    id: 'missing',
    name: 'Missing Tooth Gap',
    icon: Anchor,
    commonIssues: 'Difficulty chewing, bone loss, shifting adjacent teeth',
    treatment: 'Dental Implants & Fixed Bridges',
    tagline: 'Permanent bio-compatible titanium root replacement that lasts a lifetime.',
    features: ['Lifelong stability', 'Preserves youthful jawbone contour', 'No trimming of adjacent teeth']
  },
  {
    id: 'gums',
    name: 'Gums & Dental Foundation',
    icon: HeartPulse,
    commonIssues: 'Bleeding while brushing, bad breath, red swollen gums, loose teeth',
    treatment: 'Ultrasonic Deep Scaling & Gum Therapy',
    tagline: 'Gentle ultrasonic tartar removal to revitalize healthy pink gums.',
    features: ['Painless ultrasonic scaling', 'Subgingival pocket cleaning', 'Freshens breath immediately']
  }
];

export default function ToothNavigator({ onOpenBooking }) {
  const [activeZoneId, setActiveZoneId] = useState('molars');
  const activeZone = zones.find((z) => z.id === activeZoneId) || zones[0];
  const IconComponent = activeZone.icon;

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dentist-100 text-dentist-800 text-xs font-bold uppercase tracking-wider">
            Interactive Dental Map
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Where is Your Discomfort or Concern?
          </h2>
          <p className="text-sm text-slate-600">
            Select a region in the mouth to learn about the typical cause and Dr. Shrikant Rao's gentle treatment approach.
          </p>
        </div>

        {/* Zone Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {zones.map((zone) => {
            const ZoneIcon = zone.icon;
            const isSelected = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZoneId(zone.id)}
                className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-dentist-600 text-white shadow-md shadow-dentist-600/25 ring-2 ring-dentist-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <ZoneIcon className="w-4 h-4" />
                <span>{zone.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Zone Showcase Card */}
        <div className="max-w-3xl mx-auto bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-dentist-600 text-white flex items-center justify-center shadow-sm">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-dentist-600 uppercase tracking-wide">
                  Identified Clinical Area
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {activeZone.name}
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200">
              Dr. Rao's Solution
            </span>
          </div>

          <div className="py-5 space-y-4">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70">
              <span className="text-xs font-bold text-slate-500 block uppercase">Typical Patient Symptoms:</span>
              <p className="text-sm font-medium text-slate-800 mt-0.5">
                {activeZone.commonIssues}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-dentist-700 uppercase tracking-wider">
                Recommended Solution:
              </span>
              <h4 className="text-lg font-black text-slate-900 mt-0.5">
                {activeZone.treatment}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {activeZone.tagline}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {activeZone.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-tealbrand-600 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Initial Examination: <strong className="text-slate-800 font-bold">₹200 – ₹500</strong>
            </span>

            <button
              onClick={() => onOpenBooking(activeZone.treatment)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-bold text-xs sm:text-sm text-white bg-dentist-600 hover:bg-dentist-700 shadow transition-colors"
            >
              <span>Consult for {activeZone.name.split(' ')[0]}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

