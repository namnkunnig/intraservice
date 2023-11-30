import "./style.css";

const options = getOptions();
const areas = document.querySelector(".areas");
const list = document.querySelector(".list");

if (list && options) {
  const test = options.map((option) => {
    return `<li>${option}</li>`;
  });
  list.innerHTML = test.join("");
}

areas?.addEventListener("click", toggleList);
areas?.addEventListener("change", filterList);

function toggleList() {
  list?.classList.toggle("visible");
}

function filterList() {
  return;
}

function getOptions(): string[] {
  return [
    "Förskola och utbildning",
    "Litteratur och bibliotek",
    "Stadsutveckling",
    "Motion och idrott",
    "Trafik och gator",
    "Arbetsliv och jobb",
    "Kommun och politik",
  ];
}
