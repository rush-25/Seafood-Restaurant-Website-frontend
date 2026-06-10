import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredDishes = [
    {
      name: "Seafood Kottu",
      description: "Traditional Sri Lankan kottu roti with fresh seafood, eggs, and aromatic spices",
      price: "LKR 1,850",
      image: "https://images.unsplash.com/photo-1768885149216-ea51e07e3940?w=800&h=600&fit=crop&auto=format",
    },
    {
      name: "Singapore Chilli Crab",
      description: "Succulent crab cooked in a sweet and spicy tomato-based sauce",
      price: "LKR 3,500",
      image: "https://images.unsplash.com/photo-1767415742886-2cc678bc4ba5?w=800&h=600&fit=crop&auto=format",
    },
    {
      name: "Garlic Butter Prawns",
      description: "Jumbo prawns sautéed in rich garlic butter with herbs",
      price: "LKR 2,800",
      image: "https://images.unsplash.com/photo-1559742811-822873691df8?w=800&h=600&fit=crop&auto=format",
    },
    {
      name: "Grilled Fish",
      description: "Fresh catch of the day, grilled to perfection with lemon and herbs",
      price: "LKR 2,200",
      image: "https://images.unsplash.com/photo-1665401015549-712c0dc5ef85?w=800&h=600&fit=crop&auto=format",
    },
    {
      name: "Crab Curry",
      description: "Authentic Sri Lankan crab curry with coconut milk and spices",
      price: "LKR 3,200",
      image: "https://images.unsplash.com/photo-1583032353423-04fd96ef221c?w=800&h=600&fit=crop&auto=format",
    },
    {
      name: "Fried Cuttlefish",
      description: "Crispy golden cuttlefish rings with tangy dipping sauce",
      price: "LKR 1,650",
      image: "https://images.unsplash.com/photo-1597805539244-3f0848b99ad7?w=800&h=600&fit=crop&auto=format",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1778694276945-a3ee92331709?w=1920&h=1080&fit=crop&auto=format')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-8xl font-bold text-white mb-6 tracking-wide"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            OCEAN FRESH
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-accent mb-8"
          >
            Seafood Restaurant & Kottu Hut – Negombo
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/menu"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 font-['Montserrat'] font-semibold"
            >
              Explore Menu
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-['Montserrat'] font-semibold"
            >
              Reserve Table
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
              Featured Dishes
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our signature seafood creations, prepared with the freshest catches from Negombo's coastal waters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                      {dish.name}
                    </h3>
                    <span className="text-lg font-semibold text-accent">{dish.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{dish.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-['Montserrat'] font-semibold"
            >
              View Full Menu
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
