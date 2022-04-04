export function getTitleText(pGElement: SVGGElement) {
  let title = pGElement && pGElement.querySelector("title");
  let titleText = title && title.textContent;

  if (titleText) {
    titleText = titleText.trim();
  }

  return titleText || '';
}