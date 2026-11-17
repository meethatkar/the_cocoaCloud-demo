import * as THREE from "three";

/**
 * Service to generate high-DPI dynamic canvas textures for custom text inscriptions
 */
export function generatePlaqueTexture({
  text = "Happy Birthday",
  bgColor = "#2C1B18", // Dark chocolate or gold
  textColor = "#D4AF37", // Metallic gold
  borderColor = "#D4AF37",
}) {
  if (typeof document === "undefined") return null;

  const width = 1024;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  const radius = 30;
  ctx.roundRect(10, 10, width - 20, height - 20, radius);
  ctx.fill();

  // Ornate double border
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 240, 212, 0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(24, 24, width - 48, height - 48, radius - 8);
  ctx.stroke();

  // Text calligraphy
  ctx.fillStyle = textColor;
  ctx.font = "italic bold 56px 'Georgia', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Subtle drop shadow for 3D realism
  ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 4;

  const displayText = text.length > 28 ? text.slice(0, 26) + "..." : text;
  ctx.fillText(displayText, width / 2, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

