import React, { useRef } from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { patientTestimonials } from '../data/clinicData';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Testimonials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section id="reviews" className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dentist-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Swiper Nav Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <span>Verified Patient Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Trusted by Hundreds Across PCMC
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Real feedback from patients in Nigdi, Pradhikaran, Akurdi, and Ravet regarding Dr. Shrikant Rao's gentle hands and honest clinical consultations.
            </p>
          </div>

          {/* Custom Carousel Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              ref={prevRef}
              className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center text-slate-700 hover:bg-dentist-600 hover:text-white hover:border-dentist-600 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              ref={nextRef}
              className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center text-slate-700 hover:bg-dentist-600 hover:text-white hover:border-dentist-600 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Rating Scorecard Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/80 mb-12 flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="text-4xl sm:text-5xl font-black text-slate-900">
              4.9
            </div>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                Average Practo & Google Rating (350+ Reviews)
              </p>
            </div>
          </div>

          <div className="h-10 w-px bg-slate-200 hidden sm:block" />

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-tealbrand-600 shrink-0" />
              <span>98% Recommended by Practo Patients</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-tealbrand-600 shrink-0" />
              <span>Virtually Painless Anesthesia Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Swiper Testimonial Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 28,
            },
          }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="pb-14"
        >
          {patientTestimonials.map((review) => (
            <SwiperSlide key={review.id} className="h-auto">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-300 h-full flex flex-col justify-between group">
                <div>
                  {/* Star Rating and Platform Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-dentist-600" />
                      <span>{review.platform}</span>
                    </span>
                  </div>

                  {/* Treatment Tag */}
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-dentist-50 text-dentist-700 mb-3.5 border border-dentist-100">
                    Treatment: {review.treatment}
                  </span>

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    "{review.review}"
                  </p>
                </div>

                {/* Patient Credentials */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {review.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {review.location}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {review.date}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
