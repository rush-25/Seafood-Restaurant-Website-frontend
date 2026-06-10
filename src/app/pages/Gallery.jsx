import { useState } from "react";
import { motion } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { X } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1559742811-822873691df8?w=800&h=1000&fit=crop&auto=format",
      alt: "Garlic butter prawns",
    },
    {
      url: "https://images.unsplash.com/photo-1767415742886-2cc678bc4ba5?w=800&h=600&fit=crop&auto=format",
      alt: "Singapore chilli crab",
    },
    {
      url: "https://images.unsplash.com/photo-1589534345827-e619f9b2dd2b?w=800&h=1200&fit=crop&auto=format",
      alt: "Coastal beach view",
    },
    {
      url: "https://images.unsplash.com/photo-1778591103012-eb50e49f8ec2?w=800&h=600&fit=crop&auto=format",
      alt: "Restaurant interior",
    },
    {
      url: "https://images.unsplash.com/photo-1665401015549-712c0dc5ef85?w=800&h=900&fit=crop&auto=format",
      alt: "Grilled fish platter",
    },
    {
      url: "https://images.unsplash.com/photo-1703756292793-287f082d3a45?w=800&h=800&fit=crop&auto=format",
      alt: "Fresh seafood selection",
    },
    {
      url: "https://images.unsplash.com/photo-1743592322694-4ccb9c78b3bc?w=800&h=1100&fit=crop&auto=format",
      alt: "Sunset by the ocean",
    },
    {
      url: "https://images.unsplash.com/photo-1768885149216-ea51e07e3940?w=800&h=700&fit=crop&auto=format",
      alt: "Seafood kottu",
    },
    {
      url: "https://images.unsplash.com/photo-1766832255363-c9f060ade8b0?w=800&h=900&fit=crop&auto=format",
      alt: "Elegant dining setup",
    },
    {
      url: "https://images.unsplash.com/photo-1583032353423-04fd96ef221c?w=800&h=600&fit=crop&auto=format",
      alt: "Crab curry special",
    },
    {
      url: "https://images.unsplash.com/photo-1763030596047-4f709a9d4683?w=800&h=1200&fit=crop&auto=format",
      alt: "Fishing boat at sunset",
    },
    {
      url: "https://images.unsplash.com/photo-1519351635902-7c60d09cb2ed?w=800&h=700&fit=crop&auto=format",
      alt: "Lobster platter",
    },
    {
      url: "https://images.unsplash.com/photo-1778694276945-a3ee92331709?w=800&h=1100&fit=crop&auto=format",
      alt: "Ocean view dining",
    },
    {
      url: "https://images.unsplash.com/photo-1597805539244-3f0848b99ad7?w=800&h=800&fit=crop&auto=format",
      alt: "Fried cuttlefish",
    },
    {
      url: "https://images.unsplash.com/photo-1763994683476-5121580d9d48?w=800&h=900&fit=crop&auto=format",
      alt: "Asian seafood feast",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1724031948257-8b3c68232ccc?w=1920&h=600&fit=crop&auto=format')",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center">
          <h1
            className="text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Gallery
          </h1>
          <p className="text-accent text-lg">A visual journey through our culinary creations</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
            <Masonry gutter="1.5rem">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-['Poppins'] text-sm">
                      Click to view
                    </span>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
