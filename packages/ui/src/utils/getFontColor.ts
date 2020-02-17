const getFontColor = hex => {
  const formatHex = hex => (hex.charAt(0) == '#' ? hex.substring(1, 7) : hex);

  const hexToRed = hex => parseInt(formatHex(hex).substring(0, 2), 16);
  const hexToGreen = hex => parseInt(formatHex(hex).substring(2, 4), 16);
  const hexToBlue = hex => parseInt(formatHex(hex).substring(4, 6), 16);

  const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

  const red = hexToRed(hex);
  const green = hexToGreen(hex);
  const blue = hexToBlue(hex);

  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness > threshold ? '#000' : '#fff';
};

export default getFontColor;
