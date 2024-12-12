export function getTextColorForBackground(rgb: {
  r: number;
  g: number;
  b: number;
}): "black" | "white" {
  const { r, g, b } = rgb;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "black" : "white";
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}
