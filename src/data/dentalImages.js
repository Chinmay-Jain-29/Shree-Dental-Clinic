// Curated, realistic, high-resolution dental and clinic photography from Unsplash
// Adheres strictly to healthcare authenticity rules: clean environments, professional clinicians, natural smiles

export const dentalCategories = [
  {
    id: "general-dentistry",
    title: "General Dentistry",
    subtitle: "Routine Checkups & Preventive Care",
    description: "Gentle oral examinations, intraoral digital diagnostics, and comprehensive patient consultations.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-4/3",
    badge: "Preventive & Routine",
    highlights: ["Digital Intraoral Imaging", "Biannual Teeth Cleaning", "Family Oral Health Plans"]
  },
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    subtitle: "Endodontic Tooth Preservation",
    description: "Modern computerized rotary endodontics with computerized apex locators for painless tooth rescue.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-4/3",
    badge: "Pain-Free Rotary",
    highlights: ["Single / Dual Sitting", "Apex Locator Precision", "Save Natural Root Structure"]
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    subtitle: "Smile Makeovers & Veneers",
    description: "Aesthetic porcelain veneers, direct composite bonding, and harmonious facial smile line design.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-4/3",
    badge: "Aesthetic Excellence",
    highlights: ["Ultra-Thin Veneers", "Gap Closures (Diastema)", "Facial Symmetry Alignment"]
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    subtitle: "Permanent Tooth Replacement",
    description: "Bio-compatible titanium root replacements that restore complete chewing strength and prevent bone loss.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-4/3",
    badge: "Lifetime Durability",
    highlights: ["Titanium Osseointegration", "Preserves Facial Bone", "Zero Adjacent Tooth Shaving"]
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    subtitle: "Chairside Smile Brightening",
    description: "Professional LED laser-activated whitening lifting stubborn stains up to 6–8 shades lighter safely.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-4/3",
    badge: "Same-Day Glow",
    highlights: ["Safe Enamel Formula", "Gum Barrier Protection", "Long-Lasting Radiance"]
  },
  {
    id: "orthodontics",
    title: "Braces & Orthodontics",
    subtitle: "Clear Aligners & Malocclusion",
    description: "Digital teeth alignment using discrete clear aligners and precision ceramic braces for teens and adults.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-4/3",
    badge: "Discreet Alignment",
    highlights: ["Invisible Clear Aligners", "Bite Correction", "Custom Digital Scans"]
  },
  {
    id: "wisdom-tooth",
    title: "Wisdom Tooth Extraction",
    subtitle: "Atraumatic Oral Surgery",
    description: "Minimally invasive surgical removal of impacted third molars with local numbing and rapid recovery.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-4/3",
    badge: "Gentle Surgery",
    highlights: ["Zero Sharp Pain", "Bone Preservation", "Detailed Post-Op Care"]
  },
  {
    id: "gum-care",
    title: "Gum Care & Periodontics",
    subtitle: "Deep Ultrasonic Scaling",
    description: "Targeted subgingival plaque removal and periodontal therapy to stop bleeding and reverse gum disease.",
    image: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-4/3",
    badge: "Foundation Health",
    highlights: ["Ultrasonic Tartar Removal", "Fresh Breath Restoration", "Loose Tooth Stabilization"]
  }
];

export const modernDentalGallery = [
  {
    id: "gal-1",
    title: "Modern Ergonomic Dental Operatory",
    category: "Clinic Interior",
    description: "Pristine treatment bay featuring ergonomic patient seating and computerized diagnostic displays.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "col-span-1 md:col-span-2 row-span-2",
    tag: "Sterile Operatory"
  },
  {
    id: "gal-2",
    title: "Gentle Oral Consultation",
    category: "General Dentistry",
    description: "Dr. Shrikant Rao reviewing intraoral findings with patient before starting conservative treatment.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=85",
    aspectRatio: "col-span-1 row-span-1",
    tag: "Consultation"
  },
  {
    id: "gal-3",
    title: "Dental Implant & Prosthetic Precision",
    category: "Dental Implants",
    description: "Anatomical demonstration models illustrating biocompatible titanium fixture integration.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=85",
    aspectRatio: "col-span-1 row-span-1",
    tag: "Implantology"
  },
  {
    id: "gal-4",
    title: "Precision Dental Instrumentation",
    category: "Clinic Interior",
    description: "Hospital-grade autoclaved micro-instruments for minimally invasive restorative care.",
    image: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=800&q=85",
    aspectRatio: "col-span-1 row-span-1",
    tag: "High Precision"
  },
  {
    id: "gal-5",
    title: "Aesthetic Shade Analysis & Whitening",
    category: "Cosmetic Dentistry",
    description: "Computerized dental shade matching ensuring restorations replicate real enamel translucency.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=85",
    aspectRatio: "col-span-1 md:col-span-2 row-span-1",
    tag: "Shade Matching"
  },
  {
    id: "gal-6",
    title: "Clear Aligner & Orthodontic Consultation",
    category: "Orthodontics",
    description: "Digital alignment scans and transparent clear aligners planned for seamless smile symmetry.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=85",
    aspectRatio: "col-span-1 row-span-1",
    tag: "Clear Aligners"
  },
  {
    id: "gal-7",
    title: "Radiant Healthy Smile Results",
    category: "Cosmetic Dentistry",
    description: "Lifelike symmetry and enamel health restored through conservative dental care.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=85",
    aspectRatio: "col-span-1 row-span-1",
    tag: "Healthy Smile"
  },
  {
    id: "gal-8",
    title: "Hospital-Grade Surgical Sterilization",
    category: "Clinic Interior",
    description: "Sealed autoclave sterilization pouches ensuring uncompromised cross-infection protection.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=85",
    aspectRatio: "col-span-1 row-span-1",
    tag: "Class-B Sterilization"
  }
];
