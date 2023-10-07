const images = Array.from({ length: 120 }, (_, i) => {
  return require(`./${ i }.jpg`);
});

export default images;
