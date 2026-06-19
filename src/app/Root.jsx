import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ScrollToTop, BackToTopButton } from "./components/ScrollToTop";
import { Toaster } from "./components/components/sonner";

export default function Root() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
      <WhatsAppButton />
      <Toaster position="bottom-right" />
    </div>
  );
}
