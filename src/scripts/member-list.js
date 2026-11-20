let activeElement = null;

document.addEventListener("mouseover", (event) => {
  if (!(event.target instanceof Element)) return;

  const element = event.target.closest("[data-eng]");

  if (!element || element === activeElement) return;
  if (element.contains(event.relatedTarget)) return;

  const name = document.getElementById("member-name");
  if (!name) return;

  if (activeElement) {
    name.classList.remove(activeElement.dataset.eng);
  }

  activeElement = element;
  name.textContent = element.dataset.kor;
  name.classList.add(element.dataset.eng);
});

document.addEventListener("mouseout", (event) => {
  if (!(event.target instanceof Element)) return;

  const element = event.target.closest("[data-eng]");

  if (!element || element !== activeElement) return;
  if (element.contains(event.relatedTarget)) return;

  const name = document.getElementById("member-name");
  if (!name) return;

  name.textContent = "";
  name.classList.remove(element.dataset.eng);

  activeElement = null;
});
