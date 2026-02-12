//Javascript File
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () => navbar.classList.toggle("sticky", window.scrollY> 0));

const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

const toggleMenu = () => menu && menu.classList.toggle("active");

if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
document.querySelectorAll(".menu a").forEach((link) => link.addEventListener("click", toggleMenu));


//Scroll Reveal
const sr = ScrollReveal( {
    origin: "bottom",
    distance: "40px",
    duration: 1000,
    delay: 400,
    easing: "ease-in-out",
});

sr.reveal(".hero-headlines", {origin: "left"});
sr.reveal(".hero-page img", {origin: "left"});
sr.reveal(".about");
sr.reveal(".about h1", {delay: "500"});
sr.reveal(".about p", {delay: "700"});
sr.reveal(".about-info", {delay: "1000"});
sr.reveal(".collection h1");
sr.reveal(".collection-container", {delay: "900"});
sr.reveal(".review h1");
sr.reveal(".review-container", {delay: "800"});
sr.reveal(".callout");
sr.reveal(".contact");

// Car booking form: filter cars by selected region
const carByRegion = {
  Ontario: ["AUDI RS 6", "BMW M2 GT", "DODGE CHALLENGER SRT", "PORSCHE 911 GT3", "MERCEDES-BENZ  AMG G-CLASS (G WAGON)"],
  Alberta: ["LEXUS LS", "AUDI RS 5", "LAMBORGHINI AVENTADOR SVJ", "ASTON MARTIN DBX"],
  Manitoba: ["MERCEDES-BENZ AMG GT R", "LAMBORGHINI GALLARDO 50TH ANNIVERSARIO", "CHEVROLET CORVETTE ZR1 CONVERTIBLE", "PORSCHE CAYENNE TURBO GT"],
  "Quebec City": ["ROLLS ROYCE PHANTOM DROPHEAD CONVERTIBLE", "MERCEDES-BENZ AMG G63 S", "FERRARI F90 STRADALE"],
  "British Columbia": ["BENTLEY CONTINENTAL GT", "RANGE ROVER SV", "BMW X5 M"],
  "Nova Scotia": ["TOYOTA GR SUPRA", "NISSAN GT-R", "LAMBORGHINI URUS S"]
};

function updateCarOptions() {
  const locationSelect = document.getElementById("location");
  const carSelect = document.getElementById("car-type");
  if (!locationSelect || !carSelect) return;

  const region = locationSelect.value;
  const cars = carByRegion[region] || [];
  const currentValue = carSelect.value;

  carSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select a car";
  placeholder.disabled = true;
  placeholder.selected = true;
  carSelect.appendChild(placeholder);

  cars.forEach((car) => {
    const option = document.createElement("option");
    option.value = car;
    option.textContent = car;
    if (car === currentValue) option.selected = true;
    carSelect.appendChild(option);
  });

  if (!cars.includes(currentValue)) carSelect.selectedIndex = 0;
}

const locationSelect = document.getElementById("location");
if (locationSelect) {
  locationSelect.addEventListener("change", updateCarOptions);
  updateCarOptions();
}