document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Header & Active Nav Link on Scroll
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // 2. Mobile Menu Toggle (Hamburger)
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.textContent = navMenu.classList.contains("active")
        ? "✕"
        : "☰";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.textContent = "☰";
      });
    });
  }

  // 3. Dark / Light Theme Toggle Switch (Default: Terang)
  const toggleInput = document.getElementById("theme-toggle-input");

  // Cek preferensi tersimpan di localStorage (default terang jika belum diset)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (toggleInput) toggleInput.checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    if (toggleInput) toggleInput.checked = false;
  }

  if (toggleInput) {
    toggleInput.addEventListener("change", () => {
      if (toggleInput.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // 4. Typing Effect for Hero Subtitle
  const heroTitleElement = document.querySelector("#home h2");
  if (heroTitleElement) {
    const roles = [
      "IT & Network Support",
      "Web Developer",
      "Network Administrator",
      "Laravel Enthusiast",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      let currentRole = roles[roleIndex];

      if (isDeleting) {
        heroTitleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        heroTitleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1000);
  }
});
