document.querySelectorAll(".member-banner").forEach((div) => {
  const name = div.dataset.member;
  const color = `var(--${name})`;
  div.querySelector(".banner").style.boxShadow = `0 0 12px ${color}`;
  div.querySelectorAll("a").forEach((a) => {
    a.style.textShadow = `0 0 12px ${color}`;
    a.style.webkitTextStroke = `0.5px ${color}`;
  });
});
