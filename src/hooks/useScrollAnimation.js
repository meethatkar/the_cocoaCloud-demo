import { useEffect } from "react";
import gsap from "gsap";

/**
 * Hook to manage GSAP scroll triggers and header glass effects
 */
export function useScrollAnimation() {
  useEffect(() => {
    // Reveal animated items on mount
    const elements = document.querySelectorAll(".gsap-reveal");
    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    }
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return { scrollToSection };
}

