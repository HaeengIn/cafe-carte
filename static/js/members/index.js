document.querySelectorAll(".member-profile").forEach((div) => {
  const name = div.dataset.member;
  const color = `var(--${name})`;
  div.querySelector("img").style.boxShadow = `0 0 12px ${color}`;
  const span = div.querySelector("span");
  span.style.textShadow = `0 0 12px ${color}`;
  span.style.webkitTextStroke = `0.5px ${color}`;
});
