(() => {
  const init = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll(".about-grid,.projects-heading,.project-row,.playground>.display-heading,.play-tags,.contact-content");
    if (reduced) {
      revealItems.forEach(el => el.classList.add("is-visible"));
      return;
    }
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".brand", {y: -12, opacity: 0, duration: .7, ease: "power2.out"});
      gsap.from(".hero-copy > *", {y: 28, opacity: 0, duration: .8, stagger: .12, delay: .15, ease: "power3.out"});
      gsap.from(".mascot-stage", {y: 35, opacity: 0, scale: .94, duration: 1, delay: .25, ease: "power3.out"});
      gsap.to(".mascot", {y: -10, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut"});
      gsap.to(".shape-circle", {y: -15, x: 7, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut"});
      gsap.to(".shape-triangle", {rotation: 35, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut"});
      gsap.utils.toArray(".about-grid,.projects-heading,.project-row,.playground>.display-heading,.play-tags,.contact-content").forEach(el => {
        gsap.from(el, {y: 35, opacity: 0, duration: .75, ease: "power2.out",
          scrollTrigger: {trigger: el, start: "top 88%", once: true}});
      });
      gsap.to(".spark-a", {y: -12, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut"});
    } else {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      }), {threshold: .12});
      revealItems.forEach(el => { el.classList.add("reveal"); observer.observe(el); });
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();