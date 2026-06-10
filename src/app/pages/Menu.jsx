import { useState } from "react";
import { motion } from "motion/react";
import { Download, ChefHat } from "lucide-react";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("Seafood Specialties");

  const categories = [
    { id: "Seafood Specialties", label: "Seafood Specialties", icon: "🦞" },
    { id: "Kottu & Roti", label: "Kottu & Roti", icon: "🍛" },
    { id: "Rice & Noodles", label: "Rice & Noodles", icon: "🍜" },
    { id: "Chicken & Meat", label: "Chicken & Meat", icon: "🍖" },
    { id: "Soup & Salads", label: "Soup & Salads", icon: "🥗" },
    { id: "Beverages", label: "Beverages", icon: "🍹" },
  ];

  const menuItems = {
    "Seafood Specialties": [
      { name: "Fresh Grilled Lobster", description: "500g grilled lobster with garlic butter sauce, chips & salad", price: "8,990.00", signature: true },
      { name: "Lobster Thermidor", description: "500g lobster with wine, cheese, fresh cream & baked. Served with chips & salad", price: "11,900.00", signature: true },
      { name: "Jumbo Seafood Platter", description: "Fresh lobster, prawns, cuttlefish, red snapper with chips & salad", price: "19,900.00", signature: true },
      { name: "Grilled Prawns with Garlic Sauce", description: "Tiger prawns grilled with signature garlic sauce", price: "2,590.00" },
      { name: "Hot Butter Crab", description: "500g fresh crab cooked in rich butter sauce", price: "2,990.00" },
      { name: "Chilli Crab with Moringa", description: "500g crab in sweet and spicy tomato chilli sauce", price: "2,890.00", spicy: true },
      { name: "Grilled Seer Fish", description: "Premium seer fish grilled to perfection with garlic sauce", price: "2,890.00" },
      { name: "Hot Butter Cuttlefish", description: "Fresh cuttlefish in creamy butter sauce", price: "2,390.00" },
      { name: "Prawn Curry", description: "Traditional Sri Lankan prawn curry with rice or roti", price: "1,990.00", spicy: true },
      { name: "Crab Curry", description: "Authentic crab curry with home-baked spices and coconut cream", price: "2,290.00", spicy: true },
      { name: "Seafood Fried Rice", description: "Mixed seafood with fragrant fried rice", price: "2,590.00" },
      { name: "Prawns Aglio Olio Fettuccine", description: "Large prawns with fettuccine, chilli & garlic", price: "2,590.00" },
    ],
    "Kottu & Roti": [
      { name: "Seafood Kottu", description: "Mixed seafood with chopped roti and spices", price: "2,790.00", signature: true },
      { name: "Mixed Kottu", description: "Combination of meats with traditional kottu preparation", price: "2,590.00" },
      { name: "Prawns Kottu", description: "Fresh prawns mixed with chopped roti", price: "1,990.00" },
      { name: "Chicken Kottu", description: "Classic chicken kottu with Sri Lankan spices", price: "1,890.00" },
      { name: "Beef Kottu", description: "Tender beef pieces with chopped roti", price: "1,990.00" },
      { name: "Cheese Kottu", description: "Loaded with melted cheese and vegetables", price: "1,890.00" },
      { name: "Egg Kottu", description: "Simple and delicious egg kottu", price: "1,390.00" },
      { name: "Cheese Roti", description: "Fluffy roti filled with melted cheese", price: "1,290.00" },
      { name: "Banana Roti", description: "Sweet roti with fresh banana filling", price: "1,290.00" },
      { name: "Egg Roti", description: "2 pieces served with dhal curry and coconut sambol", price: "990.00" },
    ],
    "Rice & Noodles": [
      { name: "Seafood Fried Rice", description: "Mixed seafood with fragrant fried rice", price: "2,590.00" },
      { name: "Mixed Fried Rice", description: "Combination of meats and vegetables", price: "2,490.00" },
      { name: "Prawn Fried Rice", description: "Fresh prawns with aromatic fried rice", price: "1,990.00" },
      { name: "Chicken Fried Rice", description: "Classic chicken fried rice", price: "1,890.00" },
      { name: "Seafood Fried Noodles", description: "Mixed seafood with wok-tossed noodles", price: "2,590.00" },
      { name: "Mixed Fried Noodles", description: "Combination noodles with meats and vegetables", price: "2,490.00" },
      { name: "Prawn Fried Noodles", description: "Fresh prawns with stir-fried noodles", price: "1,990.00" },
      { name: "Chicken Fried Noodles", description: "Classic chicken noodles", price: "1,890.00" },
      { name: "Chicken Biryani", description: "Aromatic basmati rice layered with spiced chicken", price: "1,890.00", spicy: true },
    ],
    "Chicken & Meat": [
      { name: "Mixed Grill Platter", description: "Pork, chicken, beef, fish, egg with chips & salad", price: "3,490.00", signature: true },
      { name: "Lanka Beef Steak", description: "250g grilled with pepper sauce, salad & vegetables", price: "2,990.00" },
      { name: "Pork Sizzler", description: "Served with mushrooms and chips", price: "2,790.00" },
      { name: "Beef Curry", description: "Home-baked spices with coconut cream, served with rice", price: "2,590.00", spicy: true },
      { name: "Pork Chop Platter", description: "Served with salad and fried rice or chips", price: "2,590.00" },
      { name: "Mutton Curry", description: "Traditional preparation with coconut cream and spices", price: "2,490.00", spicy: true },
      { name: "Devilled Pork", description: "Spicy devilled pork with vegetables and rice", price: "2,490.00", spicy: true },
      { name: "Grilled Chicken with Mushroom Sauce", description: "Served with chips and salad or vegetables", price: "2,190.00" },
      { name: "Chicken Curry", description: "Authentic Sri Lankan chicken curry with rice", price: "1,790.00", spicy: true },
    ],
    "Soup & Salads": [
      { name: "Tom Yum", description: "Prawns, seafood, chicken or vegetable", price: "1,690.00", spicy: true },
      { name: "Seafood Soup", description: "Rich seafood broth with fresh catches", price: "1,490.00" },
      { name: "Crab Soup", description: "Delicate crab soup with aromatic herbs", price: "1,490.00" },
      { name: "Prawn Soup", description: "Fresh prawn soup with spices", price: "1,390.00" },
      { name: "S/House Chef Salad", description: "Special house salad with chef's selection", price: "1,490.00" },
      { name: "Tuna Salad", description: "Fresh tuna with crisp greens", price: "1,490.00" },
      { name: "Avocado & Iceberg Salad", description: "Fresh avocado with crisp iceberg lettuce", price: "1,390.00" },
      { name: "Mango & Papaya Salad", description: "Tropical fruit salad with tangy dressing", price: "1,290.00" },
    ],
    "Beverages": [
      { name: "Mango Lassi", description: "Creamy yogurt drink with fresh mango", price: "850.00" },
      { name: "Chocolate Milkshake", description: "Rich and creamy chocolate shake", price: "850.00" },
      { name: "Vanilla Milkshake", description: "Classic vanilla milkshake", price: "800.00" },
      { name: "Mixed Fruit Juice", description: "Tropical blend of fresh fruits", price: "800.00" },
      { name: "Fresh Mango Juice", description: "100% fresh mango juice", price: "750.00" },
      { name: "Watermelon Juice", description: "Refreshing fresh watermelon juice", price: "700.00" },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1778694276945-a3ee92331709?w=1920&h=1080&fit=crop&auto=format')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6"
          >
            <ChefHat className="w-10 h-10 text-accent" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold text-white mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Our Menu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-accent text-xl mb-8"
          >
            Discover the finest seafood and authentic Sri Lankan flavors
          </motion.p>

          {/* <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-['Montserrat'] font-semibold"
            onClick={() => window.print()}
          >
            <Download className="w-5 h-5" />
            Download Full Menu
          </motion.button> */}
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Navigation */}
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative p-6 rounded-2xl text-center transition-all duration-300 overflow-hidden group ${activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-card hover:bg-card/80 border border-border text-white"
                    }`}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-['Montserrat'] font-semibold text-sm">
                    {category.label}
                  </h3>
                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 border-2 border-accent rounded-2xl"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Menu Items List */}
          <div className="max-w-5xl mx-auto">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 text-center">
                <h2
                  className="text-4xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {activeCategory}
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
              </div>

              <div className="space-y-6">
                {menuItems[activeCategory].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative bg-card border border-border rounded-xl p-6 hover:border-accent transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3
                            className="text-xl font-bold text-white group-hover:text-accent transition-colors"
                            style={{ fontFamily: "'Cinzel', serif" }}
                          >
                            {item.name}
                          </h3>
                          {item.signature && (
                            <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-['Montserrat'] font-semibold rounded">
                              SIGNATURE
                            </span>
                          )}
                          {item.spicy && (
                            <span className="text-red-500 text-lg" title="Spicy">
                              🌶️
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-accent">
                          LKR {item.price}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Service Charge Notice */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-card border border-border rounded-lg px-8 py-4">
              <p className="text-muted-foreground text-sm">
                * A 10% service charge will be added to the above prices
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
