export const getResizeConfig = (cardType) => {
  if (cardType === 'main') {
    return false;
  }

  return {
    top: false,
    bottom: false,
    left: true,
    right: true,
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false,
  };
};
