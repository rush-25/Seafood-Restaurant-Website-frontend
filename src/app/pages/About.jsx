import { motion } from "motion/react";
import { Waves, Award, Users, Heart } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Waves,
      title: "Fresh from the Ocean",
      description: "We source our seafood daily from local Negombo fishermen, ensuring the highest quality and freshness.",
    },
    {
      icon: Award,
      title: "Authentic Flavors",
      description: "Traditional Sri Lankan recipes passed down through generations, prepared with passion and expertise.",
    },
    {
      icon: Users,
      title: "Family Tradition",
      description: "Three generations of culinary excellence, serving Negombo's coastal community since 1985.",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every dish is crafted with care, bringing together the finest ingredients and authentic spices.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1778591103012-eb50e49f8ec2?w=1920&h=800&fit=crop&auto=format')",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h1
            className="text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Our Story
          </h1>
          <p className="text-accent text-lg">
            A legacy of authentic Sri Lankan seafood excellence
          </p>
        </div>
      </section>

      {/* Story Section - Split Screen */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Negombo's Premier Seafood Destination
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ocean Fresh was born from a simple vision: to bring the authentic taste of Negombo's coastal bounty to every table. What started as a small family-run kottu hut in 1985 has blossomed into one of Sri Lanka's most beloved seafood restaurants.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our founder, Chef Ranjith Fernando, grew up watching his father prepare traditional Sri Lankan seafood dishes for local fishermen. He learned that the secret to exceptional seafood cuisine lies not just in technique, but in respecting the ocean's gifts and honoring the heritage of Sri Lankan flavors.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we continue that legacy, sourcing our seafood from the same waters and preparing it with the same dedication to authenticity and quality that defined our humble beginnings.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1766832255363-c9f060ade8b0?w=800&h=800&fit=crop&auto=format"
                alt="Restaurant interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>

          {/* Chef Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden order-2 lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1703756292793-287f082d3a45?w=800&h=800&fit=crop&auto=format"
                alt="Fresh seafood preparation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2
                className="text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Master of Seafood Craft
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our head chef brings over 30 years of experience in preparing authentic Sri Lankan seafood. Every morning, he personally selects the finest catches from Negombo's fishing boats, ensuring that only the best reaches your plate.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                From the famous Singapore Chilli Crab to our signature Seafood Kottu, each recipe has been perfected over decades, balancing traditional techniques with contemporary refinement.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe in honest, flavorful cooking that lets the natural taste of the ocean shine through, complemented by Sri Lanka's vibrant spice palette.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
