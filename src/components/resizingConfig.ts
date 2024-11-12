// resizingConfig.js
export const getResizeConfig = (cardType) => {
  if (cardType === 'main') {
    return false; // Main cards are not resizable
  }

  return {
    top: false, // Disable resizing from the top
    bottom: false, // Disable resizing from the bottom
    left: true, // Enable resizing from the left
    right: true, // Enable resizing from the right
    topLeft: false, // Disable top-left corner resizing
    topRight: false, // Disable top-right corner resizing
    bottomLeft: false, // Disable bottom-left corner resizing
    bottomRight: false, // Enable bottom-right corner resizing
  };
};
