export type Product = {
  id: string;
  slug: string;
  name: { en: string; hi: string };
  description: { en: string; hi: string };
  price: number;
  discountPrice?: number;
  category: "dresses" | "rompers" | "sets" | "ethnic" | "accessories";
  sizes: string[];
  badge?: "new" | "sale" | "popular";
  featured?: boolean;
  color: string; // gradient
  emoji: string;
};

const g = (a: string, b: string) => `linear-gradient(135deg, ${a}, ${b})`;

export const products: Product[] = [
  {
    id: "1", slug: "blossom-frock", name: { en: "Blossom Frock", hi: "ब्लॉसम फ्रॉक" },
    description: { en: "A soft cotton frock with hand-embroidered pastel florals. Breathable, gentle on delicate skin.", hi: "मुलायम कॉटन फ्रॉक हाथ की कढ़ाई वाले फूलों के साथ।" },
    price: 1299, discountPrice: 999, category: "dresses", sizes: ["0-6M", "6-12M", "1-2Y", "2-3Y"],
    badge: "sale", featured: true, color: g("#fde2e4", "#fad0c4"), emoji: "🌸",
  },
  {
    id: "2", slug: "sunshine-romper", name: { en: "Sunshine Romper", hi: "सनशाइन रोम्पर" },
    description: { en: "A cheerful yellow romper perfect for sunny afternoons.", hi: "धूप वाली दोपहर के लिए चमकीला पीला रोम्पर।" },
    price: 899, category: "rompers", sizes: ["0-6M", "6-12M", "1-2Y"],
    badge: "new", featured: true, color: g("#fff1c1", "#ffe0a3"), emoji: "☀️",
  },
  {
    id: "3", slug: "mint-cloud-set", name: { en: "Mint Cloud Set", hi: "मिंट क्लाउड सेट" },
    description: { en: "Two-piece organic cotton set in soothing mint.", hi: "सुखदायक मिंट रंग में दो-पीस ऑर्गेनिक सेट।" },
    price: 1499, discountPrice: 1199, category: "sets", sizes: ["6-12M", "1-2Y", "2-3Y", "3-4Y"],
    badge: "popular", featured: true, color: g("#d0f4de", "#a9def9"), emoji: "☁️",
  },
  {
    id: "4", slug: "little-lehenga", name: { en: "Little Lehenga", hi: "लिटिल लहंगा" },
    description: { en: "Festive mini lehenga with soft embroidery for special occasions.", hi: "खास मौकों के लिए मुलायम कढ़ाई वाला मिनी लहंगा।" },
    price: 2499, discountPrice: 1999, category: "ethnic", sizes: ["1-2Y", "2-3Y", "3-4Y"],
    badge: "popular", featured: true, color: g("#ffd6e0", "#c9a7eb"), emoji: "✨",
  },
  {
    id: "5", slug: "peach-pinafore", name: { en: "Peach Pinafore", hi: "पीच पिनाफोर" },
    description: { en: "Everyday pinafore in warm peach cotton.", hi: "गर्म पीच कॉटन में रोज़ पहनने वाला पिनाफोर।" },
    price: 1099, category: "dresses", sizes: ["6-12M", "1-2Y", "2-3Y"],
    color: g("#ffd6ba", "#fec89a"), emoji: "🍑",
  },
  {
    id: "6", slug: "bunny-sleepsuit", name: { en: "Bunny Sleepsuit", hi: "बनी स्लीपसूट" },
    description: { en: "Cozy sleepsuit with bunny ears hood.", hi: "बनी कान वाले हुड के साथ आरामदायक स्लीपसूट।" },
    price: 899, discountPrice: 749, category: "rompers", sizes: ["0-6M", "6-12M"],
    badge: "sale", color: g("#e4c1f9", "#f5c6ec"), emoji: "🐰",
  },
  {
    id: "7", slug: "lavender-anarkali", name: { en: "Lavender Anarkali", hi: "लैवेंडर अनारकली" },
    description: { en: "Traditional anarkali in soft lavender with gota work.", hi: "गोटा वर्क के साथ मुलायम लैवेंडर अनारकली।" },
    price: 2299, category: "ethnic", sizes: ["1-2Y", "2-3Y", "3-4Y", "4-5Y"],
    badge: "new", color: g("#dcd6f7", "#a6b1e1"), emoji: "🪷",
  },
  {
    id: "8", slug: "cotton-cap-set", name: { en: "Cotton Cap & Booties", hi: "कॉटन कैप और बूटीज़" },
    description: { en: "Soft knit cap and booties gift set.", hi: "मुलायम बुनी हुई कैप और बूटीज़ गिफ्ट सेट।" },
    price: 599, category: "accessories", sizes: ["One Size"],
    color: g("#cddafd", "#bde0fe"), emoji: "🧦",
  },
  {
    id: "9", slug: "rose-tutu", name: { en: "Rose Tutu Dress", hi: "रोज़ टूटू ड्रेस" },
    description: { en: "Twirl-worthy tutu dress in blush rose.", hi: "ब्लश रोज़ में घूमने लायक टूटू ड्रेस।" },
    price: 1799, discountPrice: 1499, category: "dresses", sizes: ["1-2Y", "2-3Y", "3-4Y"],
    badge: "popular", color: g("#ffc2d1", "#ffb3c6"), emoji: "🌹",
  },
  {
    id: "10", slug: "sky-overalls", name: { en: "Sky Overalls", hi: "स्काई ओवरऑल" },
    description: { en: "Denim-look overalls in sky blue soft cotton.", hi: "स्काई ब्लू मुलायम कॉटन में ओवरऑल।" },
    price: 1399, category: "sets", sizes: ["6-12M", "1-2Y", "2-3Y"],
    color: g("#bde0fe", "#a2d2ff"), emoji: "☁️",
  },
  {
    id: "11", slug: "berry-kurta-set", name: { en: "Berry Kurta Set", hi: "बेरी कुर्ता सेट" },
    description: { en: "Kurta and pyjama in berry cotton.", hi: "बेरी रंग के कॉटन में कुर्ता और पजामा।" },
    price: 1299, category: "ethnic", sizes: ["6-12M", "1-2Y", "2-3Y", "3-4Y"],
    color: g("#f7b7a3", "#ea9ab2"), emoji: "🫐",
  },
  {
    id: "12", slug: "hair-bow-trio", name: { en: "Hair Bow Trio", hi: "हेयर बो ट्रायो" },
    description: { en: "Three soft satin bows in pastel shades.", hi: "पेस्टल रंगों में तीन सैटिन बो।" },
    price: 349, category: "accessories", sizes: ["One Size"],
    badge: "new", color: g("#fce1e4", "#fad2e1"), emoji: "🎀",
  },
];

export const categories = [
  { id: "dresses", en: "Dresses", hi: "ड्रेसेस", emoji: "👗" },
  { id: "rompers", en: "Rompers", hi: "रोम्पर्स", emoji: "🧸" },
  { id: "sets", en: "Sets", hi: "सेट्स", emoji: "👚" },
  { id: "ethnic", en: "Ethnic", hi: "एथनिक", emoji: "🪷" },
  { id: "accessories", en: "Accessories", hi: "एक्सेसरीज़", emoji: "🎀" },
] as const;

export const allSizes = ["0-6M", "6-12M", "1-2Y", "2-3Y", "3-4Y", "4-5Y", "One Size"];

export function getProduct(idOrSlug: string) {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function relatedProducts(p: Product, n = 4) {
  return products.filter((x) => x.id !== p.id && x.category === p.category).slice(0, n);
}

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}