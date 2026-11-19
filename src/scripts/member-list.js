const name = document.getElementById("member-name");

document.querySelectorAll("[data-eng]").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    name.textContent = el.dataset.kor;
    name.classList.add(el.dataset.eng);
  });
  el.addEventListener("mouseleave", () => {
    name.textContent = "";
    name.classList.remove(el.dataset.eng);
  });
});