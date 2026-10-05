(function typeRole() {
  const el = document.getElementById("typed-role");
  const phrases = [
    "Security Researcher",
    "Penetration Tester",
    "Cloud Engineer",
    "Access Control Breaker"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 80);
  }

  tick();
})();

// Boot Date
document.getElementById("bootDate").textContent = new Date().toUTCString();
document.getElementById("year").textContent = new Date().getFullYear();

// Mini Interactive Terminal
(function initTerminal() {
  const body = document.getElementById("terminalBody");
  const input = document.getElementById("terminalInput");

  const sectionMap = {
    about: "#about",
    skills: "#skills",
    certifications: "#certifications",
    experience: "#experience",
    education: "#education",
    projects: "#projects",
    home: "#home"
  };

  function println(html) {
    const p = document.createElement("p");
    p.innerHTML = html;
    body.appendChild(p);
    body.scrollTop = body.scrollHeight;
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    println(`<span class="prompt-symbol">guest@0x1zanag1:~$</span> ${raw}`);

    if (!cmd) return;

    if (cmd === "help") {
      println(
        "Available commands: <span class='hl'>help</span>, <span class='hl'>whoami</span>, " +
        "<span class='hl'>about</span>, <span class='hl'>skills</span>, <span class='hl'>certifications</span>, " +
        "<span class='hl'>experience</span>, <span class='hl'>education</span>, <span class='hl'>projects</span>, " +
        "<span class='hl'>sudo</span>, <span class='hl'>clear</span>"
      );
    } else if (cmd === "whoami") {
      println("guest (limited privileges). Try <span class='hl'>sudo</span>.");
    } else if (cmd === "sudo" || cmd === "sudo su") {
      println("<span class='err'>[sudo] password for guest: ACCESS DENIED — nice try.</span>");
    } else if (cmd === "clear") {
      body.innerHTML = "";
    } else if (sectionMap[cmd]) {
      println(`Navigating to <span class="hl">${cmd}</span>...`);
      document.querySelector(sectionMap[cmd]).scrollIntoView({ behavior: "smooth" });
    } else {
      println(`<span class="err">bash: ${cmd}: command not found</span>`);
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
      runCommand(input.value);
      input.value = "";
    }
  });
})();