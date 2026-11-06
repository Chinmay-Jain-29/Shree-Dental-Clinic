import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';
import { faqs, clinicInfo } from '../data/clinicData';

export default function FaqSection({ onOpenBooking }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (index) => {
    setOpenIdx(openIdx === index ? -1 : index);
  };

  return (
    <section id="faqs" className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dentist-100 text-dentist-800 text-xs font-bold uppercase tracking-wider">
            Patient Questions & Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600">
            Have questions before your visit? Here is everything you need to know about visiting Shree Dental Care.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen 
                    ? 'border-dentist-400 bg-dentist-50/40 shadow-xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-extrabold text-dentist-600 bg-dentist-100 rounded-md w-6 h-6 flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-dentist-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-dentist-100/60">
                    <p className="pl-9">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have More Questions Box */}
        <div className="mt-12 p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/80 text-center space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Still have questions about a specific treatment or cost?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Dr. Shrikant Rao and our clinic support team are happy to assist you with transparent advice and immediate guidance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(
                "Hello Dr. Shrikant Rao, I have a specific dental query regarding treatment at Shree Dental Care."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-dentist-600 hover:bg-dentist-700 shadow-sm transition-colors"
            >
              <span>Book Consultation (₹200–₹500)</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

