import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DentalCategoriesSection from './components/DentalCategoriesSection';
import Services from './components/Services';
import ModernDentalGallery from './components/ModernDentalGallery';
import ToothNavigator from './components/ToothNavigator';
import SmileAssessmentQuiz from './components/SmileAssessmentQuiz';
import TreatmentCostEstimator from './components/TreatmentCostEstimator';
import DoctorProfile from './components/DoctorProfile';
import SmileGallery from './components/SmileGallery';
import SterilizationAndHygiene from './components/SterilizationAndHygiene';
import LocationAndHours from './components/LocationAndHours';
import Testimonials from './components/Testimonials';
import InlineAppointmentSection from './components/InlineAppointmentSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import AppointmentModal from './components/AppointmentModal';
import CustomCursor from './components/CustomCursor';
import PageIntroLoader from './components/PageIntroLoader';
import { initSmoothScroll } from './utils/smoothScroll';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState(null);
  const [introFinished, setIntroFinished] = useState(false);

  // Initialize Lenis Smooth Scroll linked to GSAP ScrollTrigger
  useEffect(() => {
    const scrollInstance = initSmoothScroll();
    return () => {
      scrollInstance?.destroy();
    };
  }, []);

  const handleOpenBooking = (treatmentName = null) => {
    setPreselectedTreatment(treatmentName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedTreatment(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-dentist-500 selection:text-white pb-14 sm:pb-0 relative overflow-x-hidden">
      
      {/* 1. Cinematic Intro Page Loader (1–1.5s) */}
      <PageIntroLoader onComplete={() => setIntroFinished(true)} />

      {/* 2. Precision Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 3. Navigation Bar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main>
        {/* 4. Cinematic Hero Section with GSAP Animations */}
        <Hero 
          onOpenBooking={() => handleOpenBooking()} 
          introFinished={introFinished}
        />

        {/* 5. Dedicated Visual Categories: Explore the World of Dental Care */}
        <DentalCategoriesSection onOpenBooking={(cat) => handleOpenBooking(cat)} />

        {/* 6. Image-Based Specialized Treatments Explorer */}
        <Services onSelectTreatmentForBooking={(treatment) => handleOpenBooking(treatment)} />

        {/* 7. Dedicated Premium Masonry Gallery with GSAP Flip */}
        <ModernDentalGallery onOpenBooking={(tag) => handleOpenBooking(tag)} />

        {/* 8. Interactive Tooth Discomfort Navigator */}
        <ToothNavigator onOpenBooking={(treatment) => handleOpenBooking(treatment)} />

        {/* 9. Interactive 30-Second Dental Self-Check Quiz */}
        <SmileAssessmentQuiz onOpenBooking={(treatment) => handleOpenBooking(treatment)} />

        {/* 10. Transparent Treatment Cost Estimator */}
        <TreatmentCostEstimator onOpenBooking={(treatment) => handleOpenBooking(treatment)} />

        {/* 11. Doctor Bio & Clinical Philosophy */}
        <DoctorProfile onOpenBooking={() => handleOpenBooking()} />

        {/* 12. Interactive Smile Transformation Before/After Slider */}
        <SmileGallery onOpenBooking={() => handleOpenBooking()} />

        {/* 13. Sterilization & Anxiety-Free Dentistry Standards */}
        <SterilizationAndHygiene onOpenBooking={() => handleOpenBooking()} />

        {/* 14. Location, Directions & Working Hours */}
        <LocationAndHours onOpenBooking={() => handleOpenBooking()} />

        {/* 15. Verified Patient Reviews (Swiper.js Carousel) */}
        <Testimonials />

        {/* 16. Prominent Inline Appointment Section */}
        <InlineAppointmentSection />

        {/* 17. Frequently Asked Questions */}
        <FaqSection onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* 18. Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 19. Floating Action Buttons (WhatsApp + Mobile Bottom Bar) */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />

      {/* 20. Interactive Appointment Booking Wizard Modal */}
      <AppointmentModal 
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedTreatment={preselectedTreatment}
      />

    </div>
  );
}
