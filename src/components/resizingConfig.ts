export const getResizeConfig = (cardType) => {
  if (cardType === 'main') {
    return false;
  }

  return {
    top: true,
    bottom: true,
    left: true,
    right: true,
    topLeft: true,
    topRight: true,
    bottomLeft: true,
    bottomRight: true,
  };
};
