

export const offsetXYFromParent = (clientX, clientY, offsetParent) => {
  const isBody = offsetParent === offsetParent.ownerDocument.body;
  const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();

  const x = clientX + offsetParent.scrollLeft - offsetParentRect.left;
  const y = clientY + offsetParent.scrollTop - offsetParentRect.top;

  return {x, y};
}

