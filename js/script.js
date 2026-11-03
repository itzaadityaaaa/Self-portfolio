(() => {
  const projects = [
    {title:"Personal Portfolio", category:"WEB / IDENTITY", desc:"A playful home for the things I make.", url:"https://itzaadityaaaa.github.io/Portfolio/", visual:"✳"},
    {title:"AURA Headphones", category:"INTERACTIVE WEB", desc:"A product experience built around motion and sound.", url:"https://itzaadityaaaa.github.io/Animated-Website/", visual:"◒"},
    {title:"Login Window", category:"WEB / UI", desc:"A simple login interface for a web application.", url:"https://itzaadityaaaa.github.io/Aaditya-Patil-login/", visual:"⌘"},
    {title:"Web Experiments", category:"CREATIVE CODE", desc:"Little browser experiments and interaction studies.", url:"#", visual:"✣"},
    {title:"E-Waste Platform", category:"SOCIAL IMPACT / CONCEPT", desc:"A concept connecting local collectors with recyclers.", url:"#", visual:"↗"}
  ];
  const renderProjects = () => {
    const list = document.querySelector("#projectList");
    if (!list) return;
    list.innerHTML = projects.map((p, i) => `
      <a class="project-row" href="${p.url}" ${p.url === "#" ? 'aria-label="'+p.title+' — add your project URL in js/script.js"' : 'target="_blank" rel="noopener noreferrer"'}>
        <span class="project-category">${String(i+1).padStart(2,"0")} / ${p.category}</span>
        <span class="project-title">${p.title}</span>
        <span class="project-desc">${p.desc}</span>
        <span class="project-arrow" aria-hidden="true">↗</span>
      </a>`).join("");
  };
  const initMenu = () => {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("open", open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    }));
  };
  const initRoleCycle = () => {
    const role = document.querySelector(".eyebrow-roles");
    if (!role || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const roles = ["AI & ML STUDENT", "DEVELOPER", "CREATOR", "IDEA MAKER"];
    let index = 0;
    let timer;
    const typeRole = () => {
      const phrase = roles[index];
      let character = 0;
      const typeNextCharacter = () => {
        character += 1;
        role.textContent = phrase.slice(0, character);
        if (character < phrase.length) {
          timer = window.setTimeout(typeNextCharacter, 85);
        } else {
          timer = window.setTimeout(eraseCharacter, 1500);
        }
      };
      typeNextCharacter();
    };
    const eraseCharacter = () => {
      role.textContent = role.textContent.slice(0, -1);
      if (role.textContent) {
        timer = window.setTimeout(eraseCharacter, 45);
      } else {
        index = (index + 1) % roles.length;
        timer = window.setTimeout(typeRole, 180);
      }
    };

    timer = window.setTimeout(eraseCharacter, 1800);
  };
  const initTags = () => {
    const note = document.querySelector("#tagNote");
    if (!note) return;
    document.querySelectorAll(".play-tag").forEach(tag => {
      const activate = () => {
        document.querySelectorAll(".play-tag").forEach(t => t.classList.remove("active"));
        tag.classList.add("active");
        note.textContent = tag.dataset.note;
      };
      tag.addEventListener("mouseenter", activate);
      tag.addEventListener("click", activate);
      tag.addEventListener("focus", activate);
    });
  };
  const initSparkGame = () => {
    const board = document.querySelector("#sparkBoard");
    const target = document.querySelector("#sparkTarget");
    const startButton = document.querySelector("#sparkStart");
    const scoreDisplay = document.querySelector("#sparkScore");
    const timeDisplay = document.querySelector("#sparkTime");
    const message = document.querySelector("#sparkMessage");
    const hint = document.querySelector("#sparkHint");
    if (!board || !target || !startButton || !scoreDisplay || !timeDisplay || !message || !hint) return;

    let score = 0;
    let timeLeft = 15;
    let timer;
    let isPlaying = false;

    const moveTarget = () => {
      target.style.left = `${12 + Math.random() * 76}%`;
      target.style.top = `${18 + Math.random() * 64}%`;
    };
    const finishGame = () => {
      isPlaying = false;
      window.clearInterval(timer);
      target.hidden = true;
      message.textContent = `Time's up! You caught ${score} spark${score === 1 ? "" : "s"}.`;
      message.hidden = false;
      hint.textContent = score >= 10 ? "Lightning fast. The workshop is impressed." : "Nice try. Think you can beat that score?";
      startButton.disabled = false;
      startButton.innerHTML = 'PLAY AGAIN <span aria-hidden="true">↗</span>';
    };
    const startGame = () => {
      window.clearInterval(timer);
      score = 0;
      timeLeft = 15;
      isPlaying = true;
      scoreDisplay.textContent = "00";
      timeDisplay.textContent = String(timeLeft);
      message.hidden = true;
      target.hidden = false;
      startButton.disabled = true;
      startButton.textContent = "GAME ON!";
      hint.textContent = "Go! Catch the spark before it jumps away.";
      moveTarget();
      const endAt = Date.now() + 15000;
      timer = window.setInterval(() => {
        timeLeft = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
        timeDisplay.textContent = String(timeLeft);
        if (timeLeft === 0) finishGame();
      }, 100);
    };

    target.addEventListener("click", () => {
      if (!isPlaying) return;
      score += 1;
      scoreDisplay.textContent = String(score).padStart(2, "0");
      target.classList.remove("is-hit");
      void target.offsetWidth;
      target.classList.add("is-hit");
      moveTarget();
    });
    startButton.addEventListener("click", startGame);
  };
  document.addEventListener("DOMContentLoaded", () => { renderProjects(); initMenu(); initRoleCycle(); initTags(); initSparkGame(); });
})();