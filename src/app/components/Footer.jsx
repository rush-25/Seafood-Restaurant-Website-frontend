import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl text-accent mb-4">OCEAN FRESH</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience the finest seafood and authentic Sri Lankan flavors at Negombo's premier coastal dining destination.
            </p>
          </div>

          <div>
            <h4 className="text-lg text-white mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="/" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                Home
              </a>
              <a href="/menu" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                Menu
              </a>
              <a href="/about" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                About Us
              </a>
              <a href="/contact" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg text-white mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-primary transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              Beach Road, Negombo
              <br />
              Sri Lanka
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Ocean Fresh - Seafood Restaurant & Kottu Hut. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
