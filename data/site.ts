/**
 * Site content — copy taken verbatim from the Figma "Home" frame (node 1:273).
 */

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type Category = {
  id: string;
  name: string;
  count: string;
  image: string;
  alt: string;
  /** Rendered image size at 1440px (from Figma). */
  width: number;
  height: number;
};

export type CarSpec = "seat" | "ac" | "auto" | "petrol";

export type Car = {
  id: string;
  name: string;
  price: number;
  reviews: number;
  rating: number;
  image: string;
  alt: string;
  width: number;
  height: number;
  specs: { icon: CarSpec; label: string }[];
};

export type Stat = {
  value: string;
  label: string[];
  /** Figma uses slightly different label styles per stat. */
  labelStyle: "h5" | "h5-poppins" | "h4";
};

export type Feature = {
  id: "brands" | "driver" | "cancellation" | "security";
  title: string;
  description: string;
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  avatar: string;
  rating: number;
};

export type Faq = { id: string; question: string; answer: string };

export const site = {
  name: "Rent",
  legalName: "Car Renty Group",
  url: "https://rent-a-car-website.vercel.app",
  description:
    "Rent a car in Dubai within a minute. Compare 450+ rental companies, luxury, sports, SUV and monthly car rentals with free cancellation and quality drivers.",
  phone: "+971 50 461 7277",
  email: "info@domain.com",
  address: { street: "Warehouse 4, 5th Street,", locality: "Al Quoz, Al Quoz 3, Dubai" },
};

export const topBar = {
  location: "UAE",
  languages: ["English", "العربية"],
  language: "English",
  currencies: ["AED", "USD", "EUR"],
  currency: "AED",
  arabic: "العربية",
  locations: ["UAE", "Saudi Arabia", "Qatar", "Oman"],
};

export const nav: NavItem[] = [
  {
    label: "Rent a Car",
    href: "#cars",
    children: [
      { label: "Luxury Cars", href: "#categories" },
      { label: "Sports Cars", href: "#categories" },
      { label: "SUV", href: "#categories" },
      { label: "Monthly Rental", href: "#categories" },
    ],
  },
  {
    label: "Brands",
    href: "#cars",
    children: [
      { label: "Toyota", href: "#cars" },
      { label: "BMW", href: "#cars" },
      { label: "Honda", href: "#cars" },
      { label: "Lamborghini", href: "#cars" },
    ],
  },
  {
    label: "Yacht Rental",
    href: "#offer",
    children: [
      { label: "Hourly Yacht", href: "#offer" },
      { label: "Daily Yacht", href: "#offer" },
    ],
  },
  { label: "Promotion", href: "#offer" },
  { label: "Contact Us", href: "#contact" },
];

export const hero = {
  eyebrow: "Rent a car in",
  city: "Dubai",
  title: "Find your dreams car within a minute",
  description:
    "Lorem ipsum dolor sit amet consectetur. Eget praesent feugiat eu eu. Habitant tortor praesent vestibulum suscipit.",
  search: {
    locationPlaceholder: "Pick up location...",
    pickupDateLabel: "Pick up date",
    pickupDate: "2025-06-15",
    timeLabel: "Time",
    pickupTime: "10:00",
    dropoffDateLabel: "Drop off date",
    dropoffDate: "2025-06-25",
    dropoffTime: "10:00",
    submit: "Search",
  },
};

export const statistics = {
  title: { before: "Why you should ", highlight: "rent a car", after: " with us?" },
  items: [
    { value: "450", label: ["rental", "companies"], labelStyle: "h5" },
    { value: "315", label: ["rental cars", "registered"], labelStyle: "h5-poppins" },
    { value: "35k", label: ["satisfied", "clients"], labelStyle: "h4" },
    { value: "60", label: ["seconds average", "booking time"], labelStyle: "h5" },
  ] satisfies Stat[],
};

export const carFind = {
  title: "Find car rental and driver services near you",
  cityLabel: "Select City",
  cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
  cta: "See More",
  categories: [
    { id: "luxury", name: "Luxury", count: "560 Cars", image: "/images/category-luxury-lamborghini-green.png", alt: "Green Lamborghini Aventador luxury car", width: 268, height: 98 },
    { id: "sports", name: "Sports", count: "265 Cars", image: "/images/category-sports-lamborghini-white.png", alt: "White Lamborghini Aventador SV sports car", width: 268, height: 101 },
    { id: "suv", name: "Suv", count: "768 Cars", image: "/images/category-suv-mercedes-glk.png", alt: "Silver Mercedes-Benz GLK SUV", width: 210, height: 111 },
    { id: "monthly", name: "Monthly", count: "560 Cars", image: "/images/category-monthly-mercedes-ml.png", alt: "Grey Mercedes-Benz ML for monthly rental", width: 250, height: 127 },
    { id: "high-price", name: "High Price", count: "560 Cars", image: "/images/category-monthly-mercedes-ml.png", alt: "Grey Mercedes-Benz ML premium SUV", width: 250, height: 127 },
    { id: "driver", name: "Car with Driver", count: "768 Cars", image: "/images/category-suv-mercedes-glk.png", alt: "Silver Mercedes-Benz GLK with driver", width: 210, height: 111 },
    { id: "electric", name: "Electric", count: "560 Cars", image: "/images/category-electric-lamborghini-yellow.png", alt: "Yellow Lamborghini Huracán", width: 224, height: 107 },
    { id: "convertible", name: "Convertible", count: "265 Cars", image: "/images/category-sports-lamborghini-white.png", alt: "White Lamborghini convertible", width: 268, height: 99 },
  ] satisfies Category[],
};

const defaultSpecs: Car["specs"] = [
  { icon: "seat", label: "4 Seat" },
  { icon: "ac", label: "Ac" },
  { icon: "auto", label: "Auto" },
  { icon: "petrol", label: "Petrol" },
];

export const bookCars = {
  title: "Book Your Suitable Car",
  description: "Lorem ipsum dolor sit amet consectetur. Maecenas aliquam id ac suspendisse praesent",
  filters: [
    { id: "price", label: "Price", options: ["Low to High", "High to Low"] },
    { id: "price-range", label: "Price", options: ["Under $80", "$80 – $120", "Above $120"] },
    { id: "location", label: "Location", options: ["Dubai", "Abu Dhabi", "Sharjah"] },
    { id: "color", label: "Color", options: ["Black", "Red", "Blue", "White"] },
    { id: "rating", label: "Rating", options: ["5 stars", "4 stars & up", "3 stars & up"] },
  ],
  cta: "Rent Now",
  cars: [
    { id: "land-cruiser", name: "Land Cruser", price: 80, reviews: 45, rating: 5, image: "/images/car-toyota-land-cruiser-black.png", alt: "Black Toyota Land Cruiser", width: 272, height: 140, specs: defaultSpecs },
    { id: "allien-15", name: "Allien 15", price: 70, reviews: 45, rating: 5, image: "/images/car-toyota-allien-red.png", alt: "Red Toyota Land Cruiser", width: 272, height: 140, specs: defaultSpecs },
    { id: "bmw", name: "BMW", price: 120, reviews: 45, rating: 5, image: "/images/car-bmw-x6-blue.png", alt: "Blue BMW X6", width: 290, height: 147, specs: defaultSpecs },
    { id: "honda-jazz", name: "Honda Jazz", price: 70, reviews: 45, rating: 5, image: "/images/car-honda-jazz-black.png", alt: "Black Honda Jazz hatchback", width: 232, height: 132, specs: defaultSpecs },
  ] satisfies Car[],
};

export const offer = {
  eyebrow: "Limited Offer",
  highlight: "30%",
  title: " Off For First Time Rent a Car",
  cta: "Get Started",
  image: "/images/offer-banner-supercar-night.jpg",
  alt: "Black supercar driving on a mountain road at night",
};

export const experience = {
  eyebrow: "Explore Our First Class Services",
  title: { before: "Feel the best experience ", highlight: "rental", after: " deals" },
  description:
    "Lorem ipsum dolor sit amet consectetur. Maecenas aliquam id ac suspendisse praesent tristique cras faucibus aenean. At erat.",
  image: "/images/experience-honda-hrv.png",
  alt: "White Honda HR-V on a display platform",
  features: [
    { id: "brands", title: "Variety of Brands", description: "Lorem ipsum dolor sit amet placerat mauris mauris nunc." },
    { id: "driver", title: "Quality Driver", description: "Lorem ipsum dolor sit amet placerat mauris mauris nunc." },
    { id: "cancellation", title: "Free Cancellation", description: "Lorem ipsum dolor sit amet placerat mauris mauris nunc." },
    { id: "security", title: "Best Security", description: "Lorem ipsum dolor sit amet placerat mauris mauris nunc." },
  ] satisfies Feature[],
};

export const testimonials = {
  eyebrow: "Customers Story",
  title: "5000+ happy customers with their best rental experience",
  description:
    "Lorem ipsum dolor sit amet consectetur. Maecenas aliquam id ac suspendisse praesent tristique cras faucibus aenean. At erat.",
  rating: { score: 4.5, count: 1295, text: "4.5 (1295) star reviews from our client on ", platform: "Trustpilot" },
  items: [
    {
      id: "esther",
      name: "Esther Howard",
      rating: 5,
      avatar: "/images/avatar-esther-howard.png",
      quote: "Lorem ipsum dolor sit amet consectetur. Pharetra dolor ultrices magna vel eleifend Vestibulum senectus vestibulum  grants.",
    },
    {
      id: "jenny",
      name: "Jenny Wilson",
      rating: 5,
      avatar: "/images/avatar-jenny-wilson.png",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type specimen book. It has survived not only specimen book. It has survived not just.",
    },
    {
      id: "dianne",
      name: "Dianne Russell",
      rating: 5,
      avatar: "/images/avatar-dianne-russell.png",
      quote: "Lorem ipsum dolor sit amet consectetur. Pharetra dolor ultrices magna vel eleifend Vestibulum senectus vestibulum  grants.",
    },
  ] satisfies Testimonial[],
};

const faqQuestion = "Lorem ipsum dolor sit amet consectetur. Dolor eros proin";
const faqAnswer =
  "Lorem ipsum dolor sit amet consectetur. Phasellus eu sollicitudin diam scelerisque lorem. Blandit aliquam a vitae nunc. Elit enim id mauris pharetra placerat mattis vestibulum eu.";

export const faq = {
  title: "Frequently Ask Questions",
  description: "Lorem ipsum dolor sit amet consectetur. Maecenas aliquam id ac suspendisse praesent",
  defaultOpen: 1,
  items: Array.from({ length: 6 }, (_, i) => ({ id: `faq-${i + 1}`, question: faqQuestion, answer: faqAnswer })) satisfies Faq[],
};

export const appCta = {
  title: "Download the free car rent app",
  description: "Lorem ipsum dolor sit amet consectetur. Maecenas",
  tag: "You",
  image: "/images/app-phone-mockup.png",
  alt: "Rent mobile app showing the Browse Car screen",
};

export const storeBadges = [
  { id: "app-store", label: "Download on the App Store", href: "#", image: "/images/badge-app-store.png" },
  { id: "google-play", label: "Get it on Google Play", href: "#", image: "/images/badge-google-play.png" },
];

export const footer = {
  columns: [
    { title: "Company", links: ["Car Rental", "Brands", "Yacht Rental", "Blog", "Contact Us"] },
    { title: "Location In Dubai", links: ["Al Barsha", "Al Barsha Heights", "Al Quoz", "Bur Dubai", "Business Bay", "City Walk", "Deira"] },
    { title: "Location In Dubai", links: ["Dubai Downtown", "Dubai Hills", "Dubai Mall", "Bur Dubai", "Dubai Marina", "Dubai Media City", "International City"] },
    { title: "Location In Dubai", links: ["Al Barsha", "Al Barsha Heights", "Al Quoz", "Bur Dubai", "Business Bay", "City Walk", "Deira"] },
  ],
  contactTitle: "Contact Us",
  socials: [
    { id: "facebook", label: "Facebook", href: "https://facebook.com" },
    { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
    { id: "twitter", label: "Twitter", href: "https://twitter.com" },
    { id: "instagram", label: "Instagram", href: "https://instagram.com" },
  ],
  copyright: "© 2023 Car Renty Group",
  legal: [
    { label: "Terms of Use", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};
