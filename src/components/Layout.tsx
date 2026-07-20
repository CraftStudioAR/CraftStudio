import { useOutlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <div className="relative">
      <Nav />
      {/* Sin AnimatePresence: la página vieja se desmonta al instante y la
          nueva hace fade-in. Evita depender del ciclo de exit-unmount. */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {element}
      </motion.main>
      <Footer />
    </div>
  );
}
