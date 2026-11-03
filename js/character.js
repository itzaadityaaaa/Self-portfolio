(() => {
  const init = () => {
    const mascot = document.querySelector("#mascot");
    const stage = document.querySelector("#mascotStage");
    if (!mascot || !stage) return;
    const eyes = [...mascot.querySelectorAll(".eye")];
    let resetTimer;
    const react = (wave = true) => {
      mascot.classList.remove("is-happy", "is-waving");
      void mascot.offsetWidth;
      mascot.classList.add("is-happy");
      if (wave) mascot.classList.add("is-waving");
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => mascot.classList.remove("is-happy", "is-waving"), 1200);
    };
    mascot.addEventListener("click", () => react());
    mascot.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); react(); }
    });
    // Track the pointer with small pupil offsets; keep movement intentionally restrained.
    stage.addEventListener("pointermove", e => {
      if (matchMedia("(pointer: coarse)").matches) return;
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      eyes.forEach((eye, i) => {
        eye.style.transform = `translate(${x * 5}px, ${y * 4}px)`;
      });
      mascot.style.rotate = `${x * 3}deg`;
    });
    stage.addEventListener("pointerleave", () => {
      eyes.forEach(eye => eye.style.transform = "");
      mascot.style.rotate = "";
    });
    // A single friendly greeting on load.
    setTimeout(() => react(false), 850);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();