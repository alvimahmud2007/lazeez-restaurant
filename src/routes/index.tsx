import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import {
  Flame, Star, MapPin, Phone, Clock, Instagram, Facebook, Mail,
  Search, ShoppingBag, Menu as MenuIcon, X, Quote, MessageCircle, ChevronRight,
} from "lucide-react";

import heroPlatter from "@/assets/hero-platter.jpg";
import foodpandaLogo from "@/assets/foodpanda.png.asset.json";
import facebookLogo from "@/assets/facebook.png.asset.json";
import lazeezLogo from "@/assets/lazeez-logo.png.asset.json";
import dishBiryani from "@/assets/dish-biryani.jpg";
import dishKabab from "@/assets/dish-kabab.jpg";
import dishBbq from "@/assets/dish-bbq.jpg";
import dishChowmein from "@/assets/dish-chowmein.jpg";
import dishPasta from "@/assets/dish-pasta.jpg";
import dishPizza from "@/assets/dish-pizza.jpg";
import dishChargha from "@/assets/dish-chargha.jpg";
import aboutInterior from "@/assets/about-interior.jpg";
import storefrontAsset from "@/assets/lazeez-storefront.png.asset.json";
const storefront = storefrontAsset.url;
import g3 from "@/assets/gallery-3.png.asset.json";
import g4 from "@/assets/gallery-4.png.asset.json";
import g5 from "@/assets/gallery-5.png.asset.json";
import g6 from "@/assets/gallery-6.png.asset.json";
import g7 from "@/assets/gallery-7.png.asset.json";
import g8 from "@/assets/gallery-8.png.asset.json";
import g9 from "@/assets/gallery-9.png.asset.json";
import g10 from "@/assets/gallery-10.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lazeez Thai Chinese & Kabab — Authentic Flavors in Dhaka" },
      { name: "description", content: "Premium Thai, Chinese & Pakistani cuisine in Lalbagh, Dhaka. Fresh ingredients, authentic recipes, unforgettable taste. Order online today." },
      { property: "og:title", content: "Lazeez Thai Chinese & Kabab" },
      { property: "og:description", content: "Authentic Thai, Chinese & Pakistani flavors in Dhaka. Order now." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

// ---------- Data ----------
const featured = [
  { name: "Hyderabadi Dum Biryani", price: 300, tag: "Chef's Special", img: dishBiryani, desc: "Slow-cooked basmati, saffron, tender meat & secret garam masala." },
  { name: "Beef Sheesh Kabab", price: 330, tag: "Smoked on Charcoal", img: dishKabab, desc: "Hand-minced beef, charcoal-grilled with mint & lemon." },
  { name: "Thai Spicy Beef", price: 450, tag: "Signature", img: dishBbq, desc: "Tender beef wok-tossed with Thai chilies, basil and aromatic spices." },
  { name: "Chicken Chowmein", price: 270, tag: "Wok Tossed", img: dishChowmein, desc: "Hand-pulled noodles tossed with Thai chili & garden veg." },
  { name: "Pasta Alfredo", price: 300, tag: "Italian", img: dishPasta, desc: "Silky parmesan cream, fettuccine, garlic & fresh herbs." },
  { name: "Pizza Special", price: 780, tag: "Wood-Fired", img: dishPizza, desc: "House-stretched dough, mozzarella & fire-blistered crust." },
];

const menuCategories = ["All", "Main Dish", "Rice Bowl", "Rice", "Chicken Curry", "Beef Curry", "Vegetable", "BBQ", "Karai", "Appetizers", "Soup", "Chowmein", "Meat Box", "Pasta", "Broast & Fried", "Pizza", "Burgers", "Breads", "Beverages"];

const menuItems: { name: string; category: string; price: string; desc?: string }[] = [
  // Main Dish
  { name: "Combo - 1", category: "Main Dish", price: "200", desc: "Fried rice, vegetable, chicken fry." },
  { name: "Combo - 2", category: "Main Dish", price: "250", desc: "Fried rice, vegetable, Szechuan chicken curry, chicken fry." },
  { name: "Peri Peri Chicken", category: "Main Dish", price: "320", desc: "Fried rice, vegetable, chicken chili onion, peri-peri chicken." },
  { name: "Cashew Chicken", category: "Main Dish", price: "350", desc: "Fried rice, vegetable, spring roll, cashew chicken, coleslaw." },
  { name: "Hydrebadi Dum Biriyani", category: "Main Dish", price: "300", desc: "Basmati rice cooked with chicken, served with salad." },
  { name: "Lazeez Special Kachi", category: "Main Dish", price: "350 / 900", desc: "1:1 / 1:3 — Kachi mutton 2 pcs, basmati rice, salad." },

  // Rice Bowl
  { name: "Chicken Lover", category: "Rice Bowl", price: "190", desc: "Fried rice served with chicken chilli onion & salad." },
  { name: "Thai Lover", category: "Rice Bowl", price: "190", desc: "Fried rice served with Thai fry chicken & salad." },
  { name: "BBQ Lover", category: "Rice Bowl", price: "199", desc: "Fried rice served with BBQ chicken curry & salad." },
  { name: "Katsu Chicken", category: "Rice Bowl", price: "210", desc: "Fried rice served with katsu chicken & salad." },

  // Rice (1:3)
  { name: "Lazeez Special Rice", category: "Rice", price: "450", desc: "1:3 — Prawn, capsicum, tomato." },
  { name: "Egg Fried Rice", category: "Rice", price: "350", desc: "1:3" },
  { name: "Chicken Fried Rice", category: "Rice", price: "400", desc: "1:3" },

  // Chicken Curry (1:3)
  { name: "Chicken Chili Onion", category: "Chicken Curry", price: "350", desc: "1:3" },
  { name: "Chicken Masala Curry", category: "Chicken Curry", price: "420", desc: "1:3" },
  { name: "Chicken Sizzling", category: "Chicken Curry", price: "450", desc: "1:3" },
  { name: "Sweet and Sour Chicken", category: "Chicken Curry", price: "400", desc: "1:3" },
  { name: "Chicken Jhal Fry", category: "Chicken Curry", price: "500", desc: "1:3 — Sonali murgi 8 pcs." },

  // Beef Curry (1:3)
  { name: "Beef Chili Onion", category: "Beef Curry", price: "400", desc: "1:3" },
  { name: "Beef Sizzling", category: "Beef Curry", price: "500", desc: "1:3" },
  { name: "Beef Zinjer Mushroom", category: "Beef Curry", price: "550", desc: "1:3" },

  // Vegetable (1:3)
  { name: "Thai Vegetable", category: "Vegetable", price: "350", desc: "1:3" },
  { name: "Chinese Vegetable", category: "Vegetable", price: "300", desc: "1:3" },

  // BBQ
  { name: "Bihari Chicken Boti", category: "BBQ", price: "230" },
  { name: "Chicken Tawa Chap", category: "BBQ", price: "250" },
  { name: "Tandoori Leg/Breast", category: "BBQ", price: "220", desc: "Luchi, raita, dam masala." },
  { name: "Kundan Lal Tandoori", category: "BBQ", price: "300" },
  { name: "Afgani Sizzling Malai Boti", category: "BBQ", price: "260" },
  { name: "Beef Sheesh Kabab", category: "BBQ", price: "420" },

  // Karai
  { name: "Chicken Patiya Karai", category: "Karai", price: "280" },
  { name: "Peshwari Butter Murgh", category: "Karai", price: "300" },
  { name: "Tikka Butter Masala", category: "Karai", price: "300" },

  // Beverages
  { name: "Regular Hot Coffee", category: "Beverages", price: "140" },
  { name: "Black Coffee", category: "Beverages", price: "120" },
  { name: "Classic Cold Coffee", category: "Beverages", price: "160" },
  { name: "Oreo Milk Shake", category: "Beverages", price: "180" },
  { name: "Strawberry Milk Shake", category: "Beverages", price: "180" },
  { name: "KitKat Shake", category: "Beverages", price: "180" },
  { name: "Lemon Mint", category: "Beverages", price: "140" },
  { name: "Nawabi Lassi", category: "Beverages", price: "150" },
  { name: "Coke / Fanta / Sprite", category: "Beverages", price: "30" },
  { name: "Water", category: "Beverages", price: "20 / 30", desc: "500ml / 1000ml" },
  { name: "Pineapple Juice", category: "Beverages", price: "120" },
  { name: "Orange Juice", category: "Beverages", price: "150" },
  { name: "Apple Juice", category: "Beverages", price: "150" },
  { name: "Mango Juice", category: "Beverages", price: "130" },

  // Appetizers
  { name: "French Fry", category: "Appetizers", price: "120" },
  { name: "Chicken Cashewnut Salad", category: "Appetizers", price: "350" },
  { name: "Cheese French Fry", category: "Appetizers", price: "220" },
  { name: "Green Chicken Salad", category: "Appetizers", price: "300" },
  { name: "Green Salad", category: "Appetizers", price: "100" },
  { name: "Chicken Nachos", category: "Appetizers", price: "250" },
  { name: "Mexican Nachos", category: "Appetizers", price: "280" },
  { name: "Garlic Mushroom", category: "Appetizers", price: "300" },
  { name: "Chicken Wonthon (6 pcs)", category: "Appetizers", price: "220" },
  { name: "Buffalo Wing (6 pcs)", category: "Appetizers", price: "300" },
  { name: "Hot Wings (Spicy / BBQ)", category: "Appetizers", price: "280" },
  { name: "Crispy Wing (6 pcs)", category: "Appetizers", price: "260" },

  // Soup (1:1 / 1:3)
  { name: "Thai Soup (Clear / Thick)", category: "Soup", price: "150 / 450", desc: "1:1 / 1:3" },
  { name: "Chicken Corn Soup", category: "Soup", price: "150 / 400", desc: "1:1 / 1:3" },
  { name: "Tom Yam Soup", category: "Soup", price: "220 / 550", desc: "1:1 / 1:3" },
  { name: "Cream of Mushroom Soup", category: "Soup", price: "240 / 650", desc: "1:1 / 1:3" },

  // Chowmein (1:1 / 1:3)
  { name: "Chicken Chowmein", category: "Chowmein", price: "280 / 450", desc: "1:1 / 1:3" },
  { name: "Chicken Prawn Mix Chowmein", category: "Chowmein", price: "320 / 500", desc: "1:1 / 1:3" },
  { name: "Lazeez Special Hakka", category: "Chowmein", price: "350 / 500", desc: "1:1 / 1:3" },
  { name: "Pad Thai Noodles", category: "Chowmein", price: "250 / 550", desc: "1:1 / 1:3" },

  // Meat Box
  { name: "Classic", category: "Meat Box", price: "200", desc: "Chicken, french fry, sausage, secret sauce." },
  { name: "BBQ", category: "Meat Box", price: "240", desc: "BBQ chicken, french fry, sausage, secret sauce." },
  { name: "Meatball Blaster", category: "Meat Box", price: "220", desc: "Chicken, french fry, sausage, meatball, secret sauce." },
  { name: "Naga Meat Box", category: "Meat Box", price: "220", desc: "Chicken, sausage, naga sauce." },
  { name: "Nuggets Moon Star", category: "Meat Box", price: "320", desc: "Nuggets, chicken, french fry, secret sauce." },
  { name: "Cheese Overloaded", category: "Meat Box", price: "300", desc: "Chicken, french fry, sausage, cheese, secret sauce." },

  // Pasta
  { name: "Pasta Basta", category: "Pasta", price: "290", desc: "Oven baked — mushroom, capsicum, sauce, chicken, cheese." },
  { name: "Meatball Pasta", category: "Pasta", price: "300", desc: "Oven baked — chicken, meatball, cheese, sauce." },
  { name: "Sausage Pasta", category: "Pasta", price: "300", desc: "Oven baked — chicken, sausage, cheese, sauce." },
  { name: "Naga Pasta", category: "Pasta", price: "300", desc: "Oven baked — chicken, green chilli, capsicum, naga sauce, cheese." },
  { name: "Pasta Alfredo", category: "Pasta", price: "320", desc: "Pan pasta." },
  { name: "Lazeez Special Pasta", category: "Pasta", price: "380", desc: "Oven baked — beef, chicken, mushroom, cheese." },

  // Broast & Fried
  { name: "Danish Chicken", category: "Broast & Fried", price: "250", desc: "French fry, bun, sauce." },
  { name: "Thai Fried Chicken", category: "Broast & Fried", price: "250 / 500", desc: "3 / 6 pcs" },
  { name: "Crispy Fried Chicken", category: "Broast & Fried", price: "300 / 600", desc: "3 / 6 pcs" },
  { name: "Crispy Fried Combo", category: "Broast & Fried", price: "250", desc: "French fry, bun, sauce, chicken fry." },

  // Pizza (8" / 10" / 12")
  { name: "BBQ Meat Blast", category: "Pizza", price: "400 / 420 / 620", desc: `8" / 10" / 12" — Secret sauce, chicken, mushroom, capsicum, onion, tomato, cheese.` },
  { name: "Sausage Delight", category: "Pizza", price: "380 / 490 / 610", desc: `8" / 10" / 12" — Secret sauce, chicken, sausage, cheese.` },
  { name: "Meatball Pizza", category: "Pizza", price: "380 / 490 / 610", desc: `8" / 10" / 12"` },
  { name: "Italian Pizza", category: "Pizza", price: "450 / 570 / 720", desc: `8" / 10" / 12" — Secret sauce, beef, chicken, salami, cheese.` },
  { name: "Lazeez Special Pizza", category: "Pizza", price: "450 / 560 / 750", desc: `8" / 10" / 12" — Chicken, onion, tomato, black olive, prawn, sausage, cheese.` },
  { name: "Cheese Overloaded", category: "Pizza", price: "470 / 610 / 800", desc: `8" / 10" / 12" — Secret sauce, chicken, jalapeno, overloaded cheese.` },

  // Burgers
  { name: "Cheese Delight", category: "Burgers", price: "170 / 230", desc: "Chicken / Beef" },
  { name: "Crispy Juicy", category: "Burgers", price: "200" },
  { name: "Grill Chicken Burger", category: "Burgers", price: "220" },
  { name: "Naga Burger", category: "Burgers", price: "180" },
  { name: "Beef Cheese Burger", category: "Burgers", price: "250" },

  // Breads (Luchi / Roti / Nan)
  { name: "Luchi", category: "Breads", price: "10" },
  { name: "Plain Nan", category: "Breads", price: "30" },
  { name: "Butter Nan", category: "Breads", price: "40" },
  { name: "Garlic Nan", category: "Breads", price: "50" },
];

const testimonials = [
  { name: "Tahmid R.", rating: 5, text: "The Hyderabadi biryani is the best I've had outside of India. Atmosphere is intimate and the kababs — unreal." },
  { name: "Nadia K.", rating: 5, text: "Took my parents for their anniversary. The Murgh Chargha was theatrical and delicious. Will return." },
  { name: "Arif H.", rating: 5, text: "Lazeez has quietly become Lalbagh's best fine-dining spot. Thai chowmein hits perfectly every time." },
  { name: "Sumaiya I.", rating: 5, text: "Delivery was hot, packaged beautifully, tasted like dining in. The pasta alfredo is creamy heaven." },
];

const gallery = [g3.url, g4.url, g5.url, g6.url, g7.url, g8.url, g9.url, g10.url];

// ---------- Components ----------
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#featured", label: "Featured" },
    { href: "#menu", label: "Menu" },
    { href: "#offer", label: "Offer" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-background/60 border-b border-gold/10">
      <div className="container-luxe flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-2">
          <img src={lazeezLogo.url} alt="Lazeez Thai Chinese & Kabab" className="h-10 w-10 rounded-full object-cover shrink-0" />
          <div className="min-w-0 leading-tight">
            <div className="font-display text-lg tracking-wide">Lazeez</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Thai · Chinese · Kabab</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-foreground/80 hover:text-gold transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="https://wa.me/8801738275656?text=Hi%20Lazeez!%20I%27d%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer" className="rounded-full border border-gold/40 px-5 py-2 text-sm hover:bg-gold hover:text-ink transition-all">Order Now</a>
        </div>
        <button className="md:hidden text-gold" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gold/10 bg-background">
          <div className="container-luxe flex flex-col gap-4 py-6">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-foreground/80 hover:text-gold">{l.label}</a>
            ))}
            <a href="https://wa.me/8801738275656?text=Hi%20Lazeez!%20I%27d%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="rounded-full border border-gold/40 px-5 py-2 text-center text-sm">Order Now</a>
          </div>
        </div>
      )}
    </header>
  );
}

function EmberField({ count = 18 }: { count?: number }) {
  const embers = useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
    size: 2 + Math.random() * 4,
    id: i,
  })), [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map(e => (
        <span
          key={e.id}
          className="absolute bottom-0 block rounded-full bg-gold animate-ember"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
            boxShadow: "0 0 8px var(--gold)",
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden bg-ink">
      {/* Radial gold glow */}
      <div className="absolute inset-0 opacity-60" style={{ background: "var(--gradient-radial-gold)" }} />
      <div className="absolute inset-0 bg-noise" />
      <EmberField count={24} />

      {/* Rotating platter */}
      <motion.div
        style={{ y, rotate, opacity }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] md:w-[80vw] max-w-[1200px] aspect-square"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="relative w-full h-full"
        >
          <img
            src={heroPlatter}
            alt="Premium platter of biryani, kababs, BBQ chicken and Thai dishes"
            className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
            width={1600}
            height={1600}
          />
        </motion.div>
      </motion.div>

      {/* Foreground content */}
      <div className="relative z-10 container-luxe pt-32 pb-20 md:pt-40 min-h-screen flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold" />
            <span className="text-xs uppercase tracking-[0.4em] text-gold">Since 2021 · Dhaka</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
            <span className="block">Authentic Thai,</span>
            <span className="block">Chinese &</span>
            <span className="block text-gold-gradient italic">Pakistani Flavors</span>
          </h1>
          <p className="mt-8 max-w-md text-base md:text-lg text-foreground/70 leading-relaxed">
            Fresh ingredients. Authentic recipes. Unforgettable taste — served the way it was meant to be.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#menu" className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.9_0.12_90)] to-[oklch(0.65_0.14_70)] px-8 py-4 text-sm font-semibold text-ink shadow-[0_20px_60px_-20px_oklch(0.82_0.15_85_/_0.6)] hover:scale-[1.03] transition-transform">
              View Menu <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="https://wa.me/8801738275656?text=Hi%20Lazeez!%20I%27d%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-8 py-4 text-sm font-semibold text-foreground hover:bg-gold/10 transition-colors">
              <MessageCircle size={16} /> Order Now
            </a>
          </div>
        </motion.div>

        {/* Bottom marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-auto pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
        >
          {[
            { v: "50+", l: "Signature Dishes" },
            { v: "10K+", l: "Happy Guests" },
            { v: "4.9★", l: "Average Rating" },
            { v: "30min", l: "Avg Delivery" },
          ].map(s => (
            <div key={s.l}>
              <div className="font-display text-3xl md:text-4xl text-gold-gradient">{s.v}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
}

function SectionHeader({ kicker, title, subtitle }: { kicker: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-2xl mx-auto mb-16"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-8 bg-gold" />
        <span className="text-xs uppercase tracking-[0.4em] text-gold">{kicker}</span>
        <div className="h-px w-8 bg-gold" />
      </div>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-foreground/70 leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-luxe grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-2xl border border-gold/20" />
          <img
            src={storefront}
            alt="Lazeez restaurant storefront in Lalbagh, Dhaka"
            loading="lazy"
            width={1200}
            height={800}
            className="relative rounded-xl object-cover w-full h-[480px] shadow-[var(--shadow-deep)]"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:block rounded-xl bg-card border border-gold/30 p-6 shadow-[var(--shadow-gold)]">
            <div className="font-display text-4xl text-gold-gradient">2021</div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-1">Est. in Dhaka</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.4em] text-gold">Our Story</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            A taste of three nations, <span className="text-gold-gradient italic">one table.</span>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed">
            Founded in 2021 in the heart of Lalbagh,Dhaka. Lazeez was born from a simple obsession —
            food that doesn't compromise. We hand-mince our kababs each morning, slow-cook
            biryani in sealed handi pots, and wok-fire Thai noodles to order.
          </p>
          <p className="mt-4 text-foreground/70 leading-relaxed">
            From the smoky charcoal of Pakistani BBQ to the bright chilies of Bangkok and the
            wok-breath of Chinese street kitchens — every dish is built on real fire, real
            spice, and real time.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {["Wood-Fire Grill", "Hand-Made Daily", "No Shortcuts"].map(v => (
              <div key={v} className="rounded-xl border border-gold/20 bg-card/50 p-4 text-center">
                <div className="text-xs uppercase tracking-wider text-gold">{v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCard({ item, index }: { item: typeof featured[0]; index: number }) {
  const [adding, setAdding] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card hover:border-gold/40 transition-all duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          width={800}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full border border-gold/40 bg-ink/60 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
          {item.tag}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-2xl leading-tight">{item.name}</h3>
        <p className="mt-2 text-sm text-foreground/60 line-clamp-2">{item.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-display text-2xl text-gold-gradient">Tk {item.price}</div>
          <button
            onClick={() => { setAdding(true); setTimeout(() => setAdding(false), 1200); }}
            className={`relative inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-xs font-medium transition-all ${adding ? "bg-gold text-ink scale-95" : "hover:bg-gold/10"}`}
          >
            <ShoppingBag size={14} />
            {adding ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Featured() {
  return (
    <section id="featured" className="relative py-24 md:py-32 bg-ink">
      <div className="container-luxe">
        <SectionHeader
          kicker="Featured Dishes"
          title={<>The dishes <span className="text-gold-gradient italic">we're known for</span></>}
          subtitle="A curated selection from our wood-fire grills, sealed handi pots, and screaming-hot woks."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item, i) => <FeaturedCard key={item.name} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ThreeDShowcase() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-radial-gold)" }} />
      <EmberField count={16} />
      <div className="container-luxe relative">
        <SectionHeader
          kicker="The Experience"
          title={<>Crafted with <span className="text-gold-gradient italic">fire & precision</span></>}
        />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {[
            { img: dishBiryani, label: "Hyderabadi Biryani", spin: 30 },
            { img: dishKabab, label: "Charcoal Kabab Platter", spin: 40 },
          ].map((d) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square max-w-md mx-auto"
              style={{ perspective: 1200 }}
            >
              <div className="absolute inset-8 rounded-full border border-gold/20 animate-spin-slow" />
              <div className="absolute inset-16 rounded-full border border-gold/10 animate-spin-slow" style={{ animationDirection: "reverse" }} />
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: d.spin, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-full"
              >
                <img
                  src={d.img}
                  alt={d.label}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="absolute inset-0 w-full h-full object-cover rounded-full shadow-[var(--shadow-gold)]"
                />
              </motion.div>
              <div className="absolute -bottom-4 inset-x-0 text-center">
                <div className="inline-block rounded-full border border-gold/30 bg-ink/80 backdrop-blur px-5 py-2 text-xs uppercase tracking-[0.3em] text-gold">
                  {d.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = menuItems.filter(i =>
    (active === "All" || i.category === active) &&
    (query === "" || i.name.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <section id="menu" className="relative py-24 md:py-32 bg-ink">
      <div className="container-luxe">
        <SectionHeader
          kicker="Full Menu"
          title={<>Built for <span className="text-gold-gradient italic">every craving</span></>}
        />

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search dishes…"
              className="w-full rounded-full bg-card border border-gold/20 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-gold/60 transition-colors"
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {menuCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                active === cat
                  ? "bg-gold text-ink"
                  : "border border-gold/20 text-foreground/70 hover:border-gold/50 hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-2 max-w-5xl mx-auto">
          {filtered.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="group flex items-baseline gap-4 py-5 border-b border-gold/10"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3">
                  <h4 className="font-display text-xl truncate">{item.name}</h4>
                  <div className="flex-1 border-b border-dashed border-gold/20" />
                  <div className="font-display text-xl text-gold-gradient shrink-0">Tk {item.price}</div>
                </div>
                <p className="mt-1 text-sm text-foreground/60">{item.desc}</p>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground">No dishes match your search.</div>
          )}
        </div>
      </div>
    </section>
  );
}

function SpecialOffer() {
  return (
    <section id="offer" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-[oklch(0.18_0.04_40)] to-ink" />
      <EmberField count={30} />
      <div className="container-luxe relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative grid md:grid-cols-2 gap-8 items-center rounded-3xl border border-gold/30 bg-ink/60 backdrop-blur p-8 md:p-12 overflow-hidden"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame size={18} className="text-ember" />
              <span className="text-xs uppercase tracking-[0.4em] text-gold">Lazeez Special</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl leading-tight">
              Murgh E <span className="text-gold-gradient italic">Chargha</span>
            </h2>
            <p className="mt-4 text-foreground/70 max-w-md">
              Whole chicken marinated 24 hours, steamed in aromatic spices, then deep-fried
              to a shattering golden crust. Served with naan & house chutneys.
            </p>
            <div className="mt-8 flex items-baseline gap-4">
              <div className="font-display text-6xl md:text-7xl text-gold-gradient">৳999</div>
              <div className="text-sm text-muted-foreground line-through">৳1,400</div>
            </div>
            <a
              href="https://wa.me/8801738275656?text=Hi%20Lazeez!%20I%27d%20like%20to%20order%20Murgh-e-Chargha"
              target="_blank" rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.9_0.12_90)] to-[oklch(0.65_0.14_70)] px-8 py-4 text-sm font-semibold text-ink hover:scale-[1.03] transition-transform animate-pulse-glow"
            >
              <Flame size={16} /> Order Chargha
            </a>
          </div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <div className="absolute inset-0 rounded-full bg-ember/20 blur-3xl" />
            <img
              src={dishChargha}
              alt="Lazeez Special Murgh E Chargha — whole roasted chicken with flames"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative rounded-2xl object-cover w-full h-full shadow-[0_30px_80px_-20px_oklch(0.65_0.22_40_/_0.4)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeader
          kicker="Guest Reviews"
          title={<>Loved by <span className="text-gold-gradient italic">Dhaka's food lovers</span></>}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-2xl border border-gold/15 bg-card p-6 hover:border-gold/40 transition-colors"
            >
              <Quote size={28} className="text-gold/40 mb-4" />
              <p className="text-sm text-foreground/80 leading-relaxed">"{t.text}"</p>
              <div className="mt-6 pt-4 border-t border-gold/10 flex items-center justify-between">
                <div>
                  <div className="font-display text-lg">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Verified Guest</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="relative py-24 md:py-32 bg-ink">
      <div className="container-luxe">
        <SectionHeader
          kicker="From the Kitchen"
          title={<>The <span className="text-gold-gradient italic">Lazeez gallery</span></>}
        />
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="break-inside-avoid overflow-hidden rounded-xl border border-gold/15 group"
            >
              <img
                src={src}
                alt={`Lazeez kitchen ${i + 1}`}
                loading="lazy"
                width={800}
                height={800}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CONTACT = {
  address: "20, Lalbagh, Dhaka",
  phone: "01876295250, 01715159251",
  phoneHref: `https://wa.me/8801738275656?text=${encodeURIComponent("Hi Lazeez! I'd like to place an order.")}`,
  whatsapp: "+8801738275656",
  whatsappHref: `https://wa.me/8801738275656?text=${encodeURIComponent("Hi Lazeez! I'd like to place an order.")}`,
  facebook: "https://www.facebook.com/share/1ELXUAiZB3/?mibextid=wwXIfr",
  foodpanda: "https://foodpanda.go.link/iiBmw",
  email: "lazeezrest11@gmail.com",
  emailHref: "mailto:lazeezrest11@gmail.com",
};

function Contact() {
  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent("Lalbagh, Dhaka")}&output=embed`;
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeader
          kicker="Visit Lazeez"
          title={<>Find us in the <span className="text-gold-gradient italic">heart of Dhaka</span></>}
        />
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-6">
            {[
              { icon: MapPin, label: "Address", value: CONTACT.address },
              { icon: Phone, label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
              { icon: Clock, label: "Open Daily", value: "12:00 PM — 11:30 PM" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-gold/15 bg-card p-6">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/30 bg-ink">
                  <Icon size={20} className="text-gold" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
                  {href
                    ? <a href={href} target="_blank" rel="noreferrer" className="font-display text-2xl hover:text-gold transition-colors break-all">{value}</a>
                    : <div className="font-display text-2xl">{value}</div>
                  }
                </div>
              </div>
            ))}

            <a
              href={CONTACT.whatsappHref}
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold text-ink hover:scale-[1.02] transition-transform"
            >
              <MessageCircle size={18} /> Order on WhatsApp
            </a>

            <div className="grid grid-cols-3 gap-3">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center justify-center gap-2 rounded-full border border-gold/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-ink transition-colors"
              >
                <Phone size={16} /> Call
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-gold/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-ink transition-colors"
              >
                <Facebook size={16} /> Facebook
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center justify-center gap-2 rounded-full border border-gold/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-ink transition-colors"
              >
                <Mail size={16} /> Email
              </a>
            </div>

            <a
              href={CONTACT.foodpanda}
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-3 rounded-full bg-[#FF2B85] px-8 py-4 text-sm font-semibold text-white hover:scale-[1.02] transition-transform shadow-[0_10px_30px_-10px_oklch(0.65_0.25_0_/_0.6)]"
            >
              <img src={foodpandaLogo.url} alt="" className="h-6 w-6 rounded-full object-cover bg-white" />
              Order on Foodpanda
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gold/20 min-h-[400px]">
            <iframe
              src={mapsSrc}
              title="Lazeez Restaurant Location"
              className="w-full h-full min-h-[400px] grayscale-[30%] contrast-110"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-ink py-16">
      <div className="container-luxe grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src={lazeezLogo.url} alt="Lazeez Thai Chinese & Kabab" className="h-10 w-10 rounded-full object-cover shrink-0" />
            <div className="leading-tight">
              <div className="font-display text-lg">Lazeez</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Thai · Chinese · Kabab</div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-foreground/60">
            Premium Thai, Chinese & Pakistani cuisine served from the heart of Dhaka since 2021.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="https://www.facebook.com/share/1ELXUAiZB3/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 hover:bg-gold hover:text-ink transition-colors">
              <Facebook size={16} />
            </a>
            <a href="mailto:lazeezrest11@gmail.com" aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 hover:bg-gold hover:text-ink transition-colors">
              <Mail size={16} />
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Menu</div>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><a href="#featured" className="hover:text-gold">Featured</a></li>
            <li><a href="#menu" className="hover:text-gold">Full Menu</a></li>
            <li><a href="#offer" className="hover:text-gold">Specials</a></li>
            <li><a href="#contact" className="hover:text-gold">Order</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Hours</div>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>Mon — Thu · 12:00 — 23:00</li>
            <li>Fri — Sun · 12:00 — 23:30</li>
            <li>Delivery until 23:00</li>
          </ul>
        </div>
      </div>
      <div className="container-luxe mt-12 pt-6 border-t border-gold/10 flex flex-col md:flex-row justify-between gap-2 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Lazeez Thai Chinese & Kabab. All rights reserved.</div>
        <div>20, Lalbagh, Dhaka · +88 01876295250</div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <About />
        <Featured />
        <ThreeDShowcase />
        <MenuSection />
        <SpecialOffer />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingSocial />
    </div>
  );
}

function FloatingSocial() {
  const items = [
    {
      href: CONTACT.whatsappHref,
      label: "WhatsApp",
      bg: "bg-[#25D366]",
      content: <MessageCircle size={22} className="text-white" strokeWidth={2.4} />,
    },
    {
      href: CONTACT.facebook,
      label: "Facebook",
      bg: "bg-white",
      content: <img src={facebookLogo.url} alt="" className="h-full w-full object-contain" />,
    },
    {
      href: CONTACT.foodpanda,
      label: "Foodpanda",
      bg: "bg-[#FF2B85]",
      content: <img src={foodpandaLogo.url} alt="" className="h-8 w-8 object-contain" />,
    },
  ];
  return (
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 flex flex-col gap-3">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target="_blank"
          rel="noreferrer"
          aria-label={it.label}
          className={`grid h-12 w-12 place-items-center overflow-hidden rounded-full shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] ring-1 ring-black/10 transition-transform hover:scale-110 ${it.bg}`}
        >
          {it.content}
        </a>
      ))}
    </div>
  );
}
