export const clinicInfo = {
  name: "Shree Dental Care",
  tagline: "Advanced & Gentle Dentistry in Nigdi-Pradhikaran",
  doctor: {
    name: "Dr. Shrikant Rao",
    qualifications: "B.D.S. (Bachelor of Dental Surgery)",
    role: "Chief Dental Surgeon & Implantologist",
    experience: "12+ Years of Clinical Excellence",
    philosophy: "We believe in conservative, patient-first dentistry. Our goal is to preserve your natural teeth with painless, technologically advanced care in a comfortable, anxiety-free setting.",
    practoUrl: "https://www.practo.com",
    consultationFee: "₹200 – ₹500",
    specializations: [
      "Rotary Endodontics (Painless Root Canal)",
      "Cosmetic Smile Designing",
      "Fixed Prosthodontics (Zirconia Crowns & Bridges)",
      "Surgical Tooth Extractions & Impactions",
      "Dental Implants & Rehabilitation"
    ]
  },
  contact: {
    phone: "+91 95118 33202",
    displayPhone: "+91 95118 33202",
    whatsapp: "919511833202",
    email: "info@shreedentalcare.in",
    address: {
      shop: "Shop Number 2, Royal Arcade",
      landmark: "Near Swimming Tank / Akurdi BSNL Office",
      sector: "Sector No. 27, Pradhikaran",
      area: "Nigdi, Pimpri-Chinchwad",
      city: "Pune, Maharashtra",
      pincode: "411044"
    },
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.495208945672!2d73.7663456!3d18.6416972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9ea42456073%3A0xb35a51806f7df26e!2sPradhikaran%2C%20Nigdi%2C%20Pimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=Shop+Number+2,+Royal+Arcade,+Sector+27,+Pradhikaran,+Nigdi,+Pimpri-Chinchwad,+Maharashtra+411044"
  },
  timings: {
    schedule: "Monday to Saturday: 12:00 PM – 8:00 PM",
    days: "Monday – Saturday",
    hours: "12:00 PM – 08:00 PM",
    sunday: "Closed",
    lunchBreak: "No break during operating hours"
  },
  highlights: [
    { label: "Patient Rating", value: "4.9 / 5.0", subtext: "Based on 350+ Reviews" },
    { label: "Happy Smiles", value: "15,000+", subtext: "Treated in PCMC" },
    { label: "Experience", value: "12+ Years", subtext: "Clinical Expertise" },
    { label: "Consultation Fee", value: "₹200 - ₹500", subtext: "Affordable & Transparent" }
  ]
};

export const treatments = [
  {
    id: "rct",
    title: "Root Canal Treatment (RCT)",
    badge: "Most Popular",
    category: "Endodontics",
    icon: "ShieldAlert",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    tagline: "Single & Two-sitting painless root canals to save infected teeth.",
    description: "State-of-the-art motorized rotary endodontics with digital apex locators for exact precision, zero guesswork, and maximum comfort.",
    benefits: [
      "Relieves acute throbbing toothache immediately",
      "Preserves your natural tooth structure for life",
      "Computerized rotary instrumentation for smooth, painless cleaning",
      "Completed in 1 or 2 sittings with modern dental anesthesia"
    ],
    duration: "45–60 mins / session",
    painLevel: "Virtually Painless (Local Numbing)",
    aftercare: "Crown recommended to protect tooth longevity"
  },
  {
    id: "cosmetic",
    title: "Cosmetic Dentistry & Smile Makeover",
    badge: "Aesthetic Excellence",
    category: "Aesthetics",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    tagline: "Design your dream radiant smile with custom ceramic veneers & whitening.",
    description: "Tailored aesthetic enhancements including chairside teeth whitening, direct composite bonding, ceramic veneers, and diastema (gap) closures.",
    benefits: [
      "Instant teeth whitening up to 6–8 shades lighter",
      "Closes unsightly gaps between front teeth",
      "Ultra-thin ceramic veneers for chipped or discolored teeth",
      "Digital smile preview tailored to your facial symmetry"
    ],
    duration: "1–2 visits",
    painLevel: "Completely Painless",
    aftercare: "Long-lasting results with routine brushing & cleanings"
  },
  {
    id: "crowns",
    title: "Crowns & Dental Bridges",
    badge: "Durable & Natural",
    category: "Prosthodontics",
    icon: "Crown",
    image: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=800&q=80",
    tagline: "Premium metal-free Zirconia and ceramic restorations with exact shade match.",
    description: "Engineered with CAD-CAM digital technology to restore chewed or fractured teeth with lifelike translucency and unmatched bite strength.",
    benefits: [
      "100% biocompatible, metal-free Zirconia & E-max porcelain",
      "Natural tooth translucency that blends seamlessly",
      "Bridges to replace missing teeth without surgery",
      "Warranty up to 15 years on select premium Zirconia crowns"
    ],
    duration: "2 short visits",
    painLevel: "Comfortable procedure",
    aftercare: "Floss regularly & maintain hygiene"
  },
  {
    id: "implants",
    title: "Dental Implants",
    badge: "Permanent Solution",
    category: "Implantology",
    icon: "Anchor",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80",
    tagline: "Titanium root replacements that look, feel, and function like real teeth.",
    description: "The gold standard for missing teeth replacement. Prevents facial bone loss and restores 100% natural chewing efficiency.",
    benefits: [
      "Permanent, lifetime solution for single or multiple missing teeth",
      "No need to trim adjacent healthy teeth (unlike bridges)",
      "Preserves youthful jawbone contour and facial shape",
      "High biocompatibility with Osseointegration technology"
    ],
    duration: "Multi-stage planned surgery",
    painLevel: "Under gentle local anesthesia",
    aftercare: "Functions just like your real teeth"
  },
  {
    id: "wisdom",
    title: "Wisdom Tooth & Extractions",
    badge: "Gentle Surgery",
    category: "Oral Surgery",
    icon: "Scissors",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    tagline: "Atraumatic surgical removal for painful, impacted, or crowded third molars.",
    description: "Safe, minimally invasive surgical extraction techniques ensuring fast healing, minimal swelling, and complete relief from jaw pain.",
    benefits: [
      "Immediate relief from severe jaw stiffness and pericoronitis",
      "Protects adjacent molars from decay and root resorption",
      "Microsurgical tools ensure preservation of surrounding bone",
      "Detailed post-op recovery protocol with medication"
    ],
    duration: "30–45 mins",
    painLevel: "Thorough local anesthesia with zero sharp pain",
    aftercare: "Soft diet for 3–5 days, cold compress"
  },
  {
    id: "gums",
    title: "Gum Surgeries & Deep Scaling",
    badge: "Foundation Health",
    category: "Periodontics",
    icon: "HeartPulse",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    tagline: "Ultrasonic cleaning, flap surgeries, and laser therapy for healthy gums.",
    description: "Reverse bleeding gums, bad breath, and loose teeth caused by periodontitis. Healthy pink gums are the foundation of every strong tooth.",
    benefits: [
      "Painless ultrasonic calculus & plaque removal",
      "Eliminates chronic bad breath (halitosis) and bleeding",
      "Flap surgery and bone grafting for advanced bone loss",
      "Tightens loose teeth and stops receding gumlines"
    ],
    duration: "30–45 mins",
    painLevel: "Mild sensitivity managed with topical numbing gel",
    aftercare: "Warm salt water rinses & interdental brush"
  }
];

export const patientTestimonials = [
  {
    id: 1,
    name: "Rajesh Kulkarni",
    location: "Sector 26, Pradhikaran",
    rating: 5,
    treatment: "Root Canal & Zirconia Crown",
    review: "I was terrified of root canals after a bad experience elsewhere. Dr. Shrikant Rao was extremely patient, explained every step on the digital X-ray, and I didn't feel a single needle prick! The clinic is spotless and timings in the evening are very convenient for office goers.",
    date: "Verified Patient • 3 weeks ago",
    platform: "Practo Verified"
  },
  {
    id: 2,
    name: "Pooja Patil",
    location: "Nigdi, PCMC",
    rating: 5,
    treatment: "Smile Makeover & Teeth Whitening",
    review: "Got my teeth cleaned and whitened before my brother's wedding. Dr. Rao gave very honest advice without pushing unnecessary treatments. The consultation fee was very reasonable and the clinic staff is very polite. Highly recommended for families in Nigdi!",
    date: "Verified Patient • 1 month ago",
    platform: "Google Review"
  },
  {
    id: 3,
    name: "Amol Deshmukh",
    location: "Akurdi / Pradhikaran",
    rating: 5,
    treatment: "Impacted Wisdom Tooth Extraction",
    review: "My horizontal wisdom tooth was causing excruciating headache and ear pain. Dr. Rao performed the surgical extraction so smoothly within 25 minutes. Post-surgery swelling was minimal and recovery was swift. Best dental surgeon in Pradhikaran.",
    date: "Verified Patient • 2 months ago",
    platform: "Practo Verified"
  },
  {
    id: 4,
    name: "Sunita Joshi",
    location: "Sector 27, Nigdi",
    rating: 5,
    treatment: "Dental Implant & Bridge",
    review: "Very clean clinic right near Royal Arcade and swimming pool. Dr. Shrikant Rao is very humble and experienced. He clearly explained all options within my budget. Eating comfortably now after 2 years. Very grateful!",
    date: "Verified Patient • 2 months ago",
    platform: "Google Review"
  }
];

export const faqs = [
  {
    q: "How do I reach Shree Dental Care in Nigdi-Pradhikaran?",
    a: "The clinic is located at Shop Number 2, Royal Arcade, Sector No. 27, Pradhikaran, Nigdi. Prominent landmarks include the Pradhikaran Swimming Tank and the Akurdi BSNL Office. It is easily accessible within 5–7 minutes from Akurdi Railway Station and Old Mumbai-Pune Highway."
  },
  {
    q: "Is prior appointment booking mandatory?",
    a: "While walk-ins are welcomed during clinic hours (12:00 PM – 8:00 PM, Mon–Sat), we strongly recommend booking in advance or messaging on WhatsApp (+91 95118 33202) to avoid waiting time, especially between 5 PM and 8 PM."
  },
  {
    q: "Is Root Canal Treatment (RCT) painful at Shree Dental Care?",
    a: "No. Dr. Shrikant Rao uses advanced computer-guided rotary endodontics and computerized local anesthesia techniques. The area is completely numb before any treatment begins, so you feel virtually zero discomfort during the procedure."
  },
  {
    q: "What is the consultation fee?",
    a: "The standard initial consultation and examination fee is approximately ₹200 to ₹500 depending on the clinical diagnostic evaluation and booking channel. We provide completely transparent upfront estimates for all procedures before starting."
  },
  {
    q: "Are Sundays open for emergency treatments?",
    a: "Our regular operational timings are Monday to Saturday, 12:00 PM to 8:00 PM (Sundays closed). However, for acute dental emergencies or traumatic injuries, you can message our helpline number (+91 95118 33202) for urgent guidance."
  },
  {
    q: "What safety and sterilization standards do you follow?",
    a: "We maintain strict hospital-grade sterilization protocols including Class B vacuum autoclaving, individual sealed sterile instrument pouches opened in front of the patient, and medical-grade surface disinfection between every consultation."
  }
];
