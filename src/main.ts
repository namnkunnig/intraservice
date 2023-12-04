import { doc } from "prettier";
import "./style.css";

const options = getOptions();
const form = document.querySelector(".form");
const areas = document.querySelector(".areas");
const list = document.querySelector(".list");
const selected = document.querySelector(".selected");
const submit = document.querySelector(".submit");
const result = document.querySelector(".result");
const entry = document.querySelector(".entry");
const error = document.querySelector(".error");
const registered = document.querySelector(".registered-areas");

areas?.addEventListener("click", toggleList);
areas?.addEventListener("input", filterList);
list?.addEventListener("click", handleSelect);
selected?.addEventListener("click", handleDeselect);
submit?.addEventListener("click", handleSubmit);
areas?.setAttribute("autocomplete", "off");
window.addEventListener("click", closeList);

function handleSubmit() {
  if (!form || !result || !registered) return;
  const element = form as HTMLFormElement;

  const valid = element.checkValidity();
  if (!valid) {
    return;
  }

  const areasValid = checkSelectedAreas();
  if (!areasValid) {
    return;
  }
  const children = selected?.children || [];
  for (let child of children) {
    const li = document.createElement("li");
    const text = document.createTextNode(child.textContent?.slice(0, -1) || "");
    li.appendChild(text);
    registered.appendChild(li);
  }
  result?.classList.toggle("visible");
  entry?.classList.toggle("visible");
}

function closeList() {
  list?.classList.remove("visible");
}

function toggleList(event?: Event) {
  event?.stopPropagation();
  resetList();
  list?.classList.toggle("visible");
}

function filterList({ target }: Event) {
  if (!list) return;
  const element = target as HTMLInputElement;
  const query = element.value;

  const filteredOptions = options
    .filter((option) => option.includes(query))
    .map((option) => {
      return `<li>${option}</li>`;
    });
  list.innerHTML = filteredOptions?.join("");
}

function handleSelect(event: Event) {
  event.stopPropagation();
  const { target } = event;

  const { textContent: foo } = target as HTMLLIElement;
  const bar = Array.from(selected?.childNodes.values() || []);
  const trash = "X";

  const notAlreadySelcted = !bar.some((item) => {
    return item.textContent?.replace(trash, "") === foo;
  });

  if (notAlreadySelcted && selected) {
    selected.innerHTML += `<li>${foo}<button data-identifier="${foo}" type="button">${trash}</button></li>`;
  }
  clearAreaInput();
  toggleList();
  const errorElement = error as HTMLInputElement;
  errorElement.classList.remove("visible");
}

function handleDeselect({ target }: Event) {
  const element = target as HTMLLIElement;
  const isButton = element.tagName === "BUTTON";

  isButton && element?.parentNode?.parentNode?.removeChild(element.parentNode);
}

function clearAreaInput() {
  if (!areas) return;
  const element = areas as HTMLInputElement;
  element.value = "";
}

function resetList() {
  if (!list) return;
  list.innerHTML = options
    .map((option) => {
      return `<li>${option}</li>`;
    })
    .join("");
}

function checkSelectedAreas() {
  if (!selected || !areas) return;
  const element = selected as HTMLInputElement;
  const itemsSelected = element.childElementCount !== 0;
  const errorElement = error as HTMLInputElement;

  if (!itemsSelected) {
    errorElement.classList.toggle("visible");
    return false;
  }
  return true;
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
