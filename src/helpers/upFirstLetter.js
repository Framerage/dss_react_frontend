const upFirstLetter = text => {
  const formatText = text.toLowerCase();
  return formatText[0].toUpperCase() + formatText.slice(1, formatText.length);
};
module.exports = upFirstLetter;
