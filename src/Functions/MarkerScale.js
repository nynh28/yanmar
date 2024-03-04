export function MarkerScale(url, scale = 30) {
  return new window.google.maps.MarkerImage(
    url,
    new window.google.maps.Size(scale, scale), // size
    new window.google.maps.Point(0, 0), // origin
    new window.google.maps.Point(scale / 2, scale / 2),// anchor
    new window.google.maps.Size(scale, scale),// scaledSize
  );
}