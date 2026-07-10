/* js/data.js */
const PROPERTIES_DATA = [
  {
    id: "prop-01",
    title: "The Obsidian modern Villa",
    type: "villa",
    location: "Beverly Hills, CA",
    price: 14500000,
    beds: 6,
    baths: 8,
    area: 9200,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tag: "Exclusive",
    description: "An architectural tour de force, this ultra-modern villa is situated on a private promontory offering panoramic ocean and city views. Features soaring ceiling heights, an infinity edge pool, and fully automated smart home systems."
  },
  {
    id: "prop-02",
    title: "Aura Sky Penthouse",
    type: "penthouse",
    location: "Miami Beach, FL",
    price: 8900000,
    beds: 4,
    baths: 5,
    area: 5400,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tag: "New Release",
    description: "Suspended high above the Atlantic ocean, this stunning penthouse features private elevator entry, wrapping glass terraces, a rooftop dip pool, and custom millwork throughout by Italian designers."
  },
  {
    id: "prop-03",
    title: "Verdant Hills Manor",
    type: "mansion",
    location: "Aspen, CO",
    price: 18500000,
    beds: 7,
    baths: 9,
    area: 12400,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tag: "Price Upon Request",
    description: "A mountain retreat unlike any other. Designed with natural stone, steel, and timber, this expansive estate offers direct ski-in/ski-out access, a 500-bottle wine cellar, private wellness spa, and spectacular alpine vistas."
  },
  {
    id: "prop-04",
    title: "The Hudson Duplex",
    type: "apartment",
    location: "Manhattan, NY",
    price: 4200000,
    beds: 3,
    baths: 3.5,
    area: 3200,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tag: "Classic Style",
    description: "Meticulously restored duplex apartment in the heart of Chelsea. Boasts original exposed brickwork, a private landscaped courtyard, professional chef's kitchen, and high ceilings."
  },
  {
    id: "prop-05",
    title: "Malibu Coastal Estate",
    type: "villa",
    location: "Malibu, CA",
    price: 12800000,
    beds: 5,
    baths: 6,
    area: 7800,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tag: "Beachfront",
    description: "Perched steps away from sandy Malibu beach, this organic modern villa blends indoor and outdoor luxury living seamlessly. Includes pocket sliding glass doors, a heated lap pool, and a private path to the beach."
  },
  {
    id: "prop-06",
    title: "The Summit Residence",
    type: "mansion",
    location: "San Francisco, CA",
    price: 9500000,
    beds: 5,
    baths: 6.5,
    area: 8400,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tag: "Mid-Century Modern",
    description: "Designed by renowned architect William Wurster, this Pacific Heights residence has been completely modernized while retaining its mid-century heritage. Panoramic Golden Gate Bridge views."
  },
  {
    id: "prop-07",
    title: "Vista Sol Penthouse",
    type: "penthouse",
    location: "Miami Beach, FL",
    price: 6400000,
    beds: 3,
    baths: 4,
    area: 4100,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tag: "Newly Decorated",
    description: "A bright, coastal-inspired penthouse featuring a private terrace hot tub, custom white oak flooring, smart lighting, and 360-degree bay views. Includes full hotel-style concierge service access."
  },
  {
    id: "prop-08",
    title: "The Scandinavian Flats",
    type: "apartment",
    location: "Manhattan, NY",
    price: 2600000,
    beds: 2,
    baths: 2,
    area: 1900,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tag: "Minimalist",
    description: "A sleek, minimalist retreat high above Tribeca. Fully customized built-in storage, heated basalt bathroom floors, premium Miele appliances, and light-filled rooms with floor-to-ceiling windows."
  }
];

const AGENTS_DATA = [
  {
    id: "agent-01",
    name: "Sarah Jenkins",
    role: "Founder & Principal Broker",
    experience: "18 Years Experience",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    email: "s.jenkins@veridianestates.com",
    phone: "+1 (310) 555-0190"
  },
  {
    id: "agent-02",
    name: "Marcus Vance",
    role: "Director of Luxury Residential",
    experience: "12 Years Experience",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80",
    email: "m.vance@veridianestates.com",
    phone: "+1 (212) 555-0144"
  },
  {
    id: "agent-03",
    name: "Elena Rostova",
    role: "International Client Advisor",
    experience: "10 Years Experience",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80",
    email: "e.rostova@veridianestates.com",
    phone: "+1 (305) 555-0177"
  }
];

const TESTIMONIALS_DATA = [
  {
    id: "test-01",
    quote: "Veridian Estates redefined what to expect from a luxury agency. Their market knowledge was flawless, and the transaction was managed with utmost discretion.",
    author: "Robert & Clara Dumont",
    role: "Venture Partners",
    location: "Beverly Hills"
  },
  {
    id: "test-02",
    quote: "The private off-market listings Marcus provided gave us access to properties we couldn't find anywhere else. The entire transaction was extremely seamless.",
    author: "James H. Sterling",
    role: "Tech Entrepreneur",
    location: "Miami Beach"
  },
  {
    id: "test-03",
    quote: "For international buyers, the local rules can be complex. Elena guided us through every step. She is professional, responsive, and a absolute pleasure to work with.",
    author: "Charlotte V.",
    role: "Founder, V-Designs",
    location: "London & New York"
  }
];
