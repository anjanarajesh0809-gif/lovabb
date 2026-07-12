import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "hi";

const dict = {
  en: {
    brand: "Little Blossoms",
    tagline: "Soft threads for tiny wonders",
    search: "Search dresses, rompers, sets…",
    home: "Home", shop: "Shop", cart: "Cart", orders: "Orders", login: "Login", register: "Register", logout: "Logout", admin: "Admin",
    heroTitle: "Dressing India's littlest hearts",
    heroSub: "Handpicked baby clothes in soft cottons and pastel palettes. Made for cuddles, twirls, and first steps.",
    shopNow: "Shop now", exploreNew: "Explore new arrivals",
    featuredCats: "Shop by category", newArrivals: "New arrivals", popular: "Loved by parents", promoTitle: "Free shipping across India",
    promoSub: "On all orders over ₹999. Gentle returns within 15 days.",
    addToCart: "Add to cart", quickAdd: "Quick add", buyNow: "Buy now",
    price: "Price", sortBy: "Sort by", category: "Category", size: "Size", all: "All",
    lowHigh: "Price: Low to High", highLow: "Price: High to Low", newest: "Newest first", featured: "Featured",
    resultsEmpty: "No products match your filters",
    description: "Description", relatedProducts: "You may also love", quantity: "Quantity",
    cartTitle: "Your cart", cartEmpty: "Your cart is empty", continueShopping: "Continue shopping", checkout: "Checkout",
    subtotal: "Subtotal", shipping: "Shipping", total: "Total", free: "Free",
    customerDetails: "Customer details", shippingAddress: "Shipping address", orderSummary: "Order summary", payment: "Payment",
    name: "Full name", email: "Email", phone: "Phone", address: "Address", city: "City", state: "State", pincode: "PIN code",
    placeOrder: "Place order", processing: "Processing…",
    orderSuccess: "Thank you for your order!", orderSuccessSub: "A tiny box of joy is on its way.",
    orderNo: "Order number", paidWith: "Paid with", card: "Card", upi: "UPI", cod: "Cash on delivery",
    myOrders: "My orders", noOrders: "No orders yet",
    status: "Status", placed: "Placed", packed: "Packed", shipped: "Shipped", delivered: "Delivered",
    forgot: "Forgot password?", password: "Password", confirmPassword: "Confirm password", noAccount: "New here?", haveAccount: "Have an account?",
    resetPwd: "Reset password", resetSent: "Reset link sent to your email (demo).",
    dashboard: "Dashboard", productsMgmt: "Products", ordersMgmt: "Orders", addProduct: "Add product", edit: "Edit", delete: "Delete",
    revenue: "Revenue", totalOrders: "Total orders", totalProducts: "Total products",
    footerAbout: "About", footerHelp: "Help", footerPolicies: "Policies", footerContact: "Contact",
    aboutText: "A family-run studio crafting gentle clothing for babies across India.",
    remove: "Remove", update: "Update",
  },
  hi: {
    brand: "लिटिल ब्लॉसम्स",
    tagline: "नन्हे दिलों के लिए मुलायम धागे",
    search: "ड्रेस, रोम्पर, सेट खोजें…",
    home: "होम", shop: "शॉप", cart: "कार्ट", orders: "ऑर्डर्स", login: "लॉगिन", register: "साइन अप", logout: "लॉगआउट", admin: "एडमिन",
    heroTitle: "भारत के नन्हे दिलों के लिए",
    heroSub: "मुलायम कॉटन और पेस्टल रंगों में चुनिंदा बेबी कपड़े।",
    shopNow: "अभी खरीदें", exploreNew: "नए आगमन देखें",
    featuredCats: "श्रेणी अनुसार खरीदें", newArrivals: "नए आगमन", popular: "पेरेंट्स की पसंद", promoTitle: "पूरे भारत में मुफ्त शिपिंग",
    promoSub: "₹999 से अधिक के सभी ऑर्डर पर। 15 दिनों में आसान रिटर्न।",
    addToCart: "कार्ट में डालें", quickAdd: "जल्दी जोड़ें", buyNow: "अभी खरीदें",
    price: "कीमत", sortBy: "क्रमबद्ध करें", category: "श्रेणी", size: "साइज़", all: "सभी",
    lowHigh: "कीमत: कम से अधिक", highLow: "कीमत: अधिक से कम", newest: "नवीनतम पहले", featured: "फीचर्ड",
    resultsEmpty: "कोई उत्पाद नहीं मिला",
    description: "विवरण", relatedProducts: "आपको ये भी पसंद आ सकते हैं", quantity: "मात्रा",
    cartTitle: "आपका कार्ट", cartEmpty: "आपका कार्ट खाली है", continueShopping: "शॉपिंग जारी रखें", checkout: "चेकआउट",
    subtotal: "उप-योग", shipping: "शिपिंग", total: "कुल", free: "मुफ्त",
    customerDetails: "ग्राहक विवरण", shippingAddress: "शिपिंग पता", orderSummary: "ऑर्डर सारांश", payment: "भुगतान",
    name: "पूरा नाम", email: "ईमेल", phone: "फ़ोन", address: "पता", city: "शहर", state: "राज्य", pincode: "पिन कोड",
    placeOrder: "ऑर्डर करें", processing: "प्रक्रिया में…",
    orderSuccess: "आपके ऑर्डर के लिए धन्यवाद!", orderSuccessSub: "खुशियों का एक नन्हा डिब्बा रास्ते में है।",
    orderNo: "ऑर्डर नंबर", paidWith: "भुगतान माध्यम", card: "कार्ड", upi: "यूपीआई", cod: "कैश ऑन डिलीवरी",
    myOrders: "मेरे ऑर्डर", noOrders: "अभी कोई ऑर्डर नहीं",
    status: "स्थिति", placed: "प्राप्त", packed: "पैक", shipped: "भेजा गया", delivered: "डिलीवर",
    forgot: "पासवर्ड भूल गए?", password: "पासवर्ड", confirmPassword: "पासवर्ड की पुष्टि करें", noAccount: "नए हैं?", haveAccount: "खाता है?",
    resetPwd: "पासवर्ड रीसेट करें", resetSent: "रीसेट लिंक भेज दिया गया (डेमो)।",
    dashboard: "डैशबोर्ड", productsMgmt: "उत्पाद", ordersMgmt: "ऑर्डर्स", addProduct: "उत्पाद जोड़ें", edit: "संपादित करें", delete: "हटाएं",
    revenue: "राजस्व", totalOrders: "कुल ऑर्डर", totalProducts: "कुल उत्पाद",
    footerAbout: "हमारे बारे में", footerHelp: "सहायता", footerPolicies: "नीतियां", footerContact: "संपर्क",
    aboutText: "पूरे भारत में शिशुओं के लिए मुलायम कपड़े बनाने वाला परिवार-संचालित स्टूडियो।",
    remove: "हटाएं", update: "अपडेट",
  },
} as const;

type Key = keyof (typeof dict)["en"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "en", setLang: () => {}, t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "en" || saved === "hi") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  };
  const t = (k: Key) => dict[lang][k];
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);