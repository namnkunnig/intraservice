import "./style.css";

const options = getOptions();
const areas = document.querySelector(".areas");
const list = document.querySelector(".list");
const selected = document.querySelector(".selected");

if (list && options) {
  const test = options.map((option) => {
    return `<li>${option}</li>`;
  });
  list.innerHTML = test.join("");
}

areas?.addEventListener("click", toggleList);
areas?.addEventListener("change", filterList);
list?.addEventListener("click", handleSelect);
selected?.addEventListener("click", handleDeselect);

function toggleList() {
  list?.classList.toggle("visible");
}

function filterList() {
  return;
}

function handleSelect({ target }: Event) {
  const { textContent: foo } = target as HTMLLIElement;
  const bar = Array.from(selected?.childNodes.values() || []);
  const trash = "X";

  const notAlreadySelcted = !bar.some((item) => {
    return item.textContent?.replace(trash, "") === foo;
  });

  if (notAlreadySelcted && selected) {
    selected.innerHTML += `<li>${foo}<button data-identifier="${foo}" type="button">${trash}</button></li>`;
  }

  toggleList();
}

function handleDeselect({ target }: Event) {
  const element = target as HTMLLIElement;
  element?.parentNode?.parentNode?.removeChild(element.parentNode);
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
