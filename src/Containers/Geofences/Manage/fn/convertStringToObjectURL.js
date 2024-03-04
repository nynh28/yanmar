export function convertStringToObjectURL(svgStr) {
  let blob = new Blob([svgStr], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
}
