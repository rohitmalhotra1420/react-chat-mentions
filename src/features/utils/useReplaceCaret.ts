import { useEffect, RefObject } from "react";

function replaceCaret(element: HTMLDivElement) {
  // Place the caret at the end of the element
  const target = document.createTextNode("");
  element.appendChild(target);

  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === element;

  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const selection = window.getSelection();

    if (selection !== null) {
      const range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    if (element instanceof HTMLElement) element.focus();
  }
}

export const useReplaceCaret = (
  element: RefObject<HTMLDivElement>,
  html: string
) => {
  useEffect(() => {
    element.current !== null && replaceCaret(element.current);
  }, [element, html]);
};
