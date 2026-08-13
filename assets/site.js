document.addEventListener("click", (event) => {
  const button = event.target.closest(".faqList button");
  if (!button) return;

  const item = button.closest("article");
  const list = item.parentElement;

  for (const article of list.children) {
    const articleButton = article.querySelector("button");
    const isSelected = article === item;
    article.classList.toggle("open", isSelected);
    articleButton?.setAttribute("aria-expanded", String(isSelected));
    const marker = articleButton?.querySelector("b");
    if (marker) marker.textContent = isSelected ? "−" : "+";
  }
});
