import { useState } from "react"
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  const navLinks = ["Home", "About", "Projects", "Contact"];

  const topBar = {
    closed: { translateY: 0, rotate: 0 },
    open:   { translateY: 10, rotate: 45 },
  };
  const midBar = {
    closed: { opacity: 1, width: "2rem" },
    open:   { opacity: 0, width: 0 },
  };
  const botBar = {
    closed: { translateY: 0, rotate: 0 },
    open:   { translateY: -10, rotate: -45 },
  };

  return (
    <>
      <nav className="flex items-center w-full h-20 bg-background z-99">
        <div className="absolute -top-4 -left-4 bg-white p-6 rounded-full z-50">
          <motion.button
            className="flex flex-col gap-1 cursor-pointer w-8 h-8 items-center justify-center"
            onClick={toggleNav}
            animate={isOpen ? "open" : "closed"}
            whileTap={{ scale: 0.85 }}
          >
            <motion.span
              variants={topBar}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="block bg-background h-1.5 w-8 rounded-full origin-center"
            />
            <motion.span
              variants={midBar}
              transition={{ duration: 0.3 }}
              className="block bg-background h-1.5 w-8 rounded-full"
            />
            <motion.span
              variants={botBar}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="block bg-background h-1.5 w-8 rounded-full origin-center"
            />
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="fullscreen-menu"
            initial={{ clipPath: "circle(0% at 3% 3%)" }}
            animate={{ clipPath: "circle(150% at 3% 3%)" }}
            exit={{ clipPath: "circle(0% at 3% 3%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-white z-40 flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                  className="text-background text-3xl font-bold tracking-tight hover:text-accent transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}