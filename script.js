const tabs = document.querySelectorAll(".et-hero-tab");
const slider = document.getElementById("tabSlider");
const container = document.querySelector(".et-hero-tabs-container");
const sections = document.querySelectorAll(".et-slide");
const tabHeight = 70;

function moveSliderToTab(tab) {
  slider.style.width = `${tab.offsetWidth}px`;
  slider.style.left = `${tab.offsetLeft}px`;
}

function setActiveTab(tab) {
  tabs.forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
  moveSliderToTab(tab);
}

function handleClickEvents() {
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      window.scrollTo({
        top: target.offsetTop - tabHeight + 1,
        behavior: "smooth",
      });
      setActiveTab(tab);
    });
  });
}

function handleScrollEvents() {
  const scrollY = window.scrollY;

  // Make navbar sticky
  const tabsOffset = container.offsetTop + container.offsetHeight - tabHeight;
  if (scrollY > tabsOffset) {
    container.classList.add("et-hero-tabs-container--top");
  } else {
    container.classList.remove("et-hero-tabs-container--top");
  }

  // Find current section
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop - tabHeight;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      setActiveTab(tabs[index]);
    }
  });
}

function handleResize() {
  const active = document.querySelector(".et-hero-tab.active");
  if (active) moveSliderToTab(active);
}

window.addEventListener("scroll", handleScrollEvents);
window.addEventListener("resize", handleResize);

// Initialize
handleClickEvents();
setActiveTab(tabs[0]);

const projects = document.getElementById("tab-projects");
const btn = document
  .getElementById("projectBtn")
  .addEventListener("click", () => {
    projects.scrollIntoView({
      behavior: "smooth",
    });
  });
