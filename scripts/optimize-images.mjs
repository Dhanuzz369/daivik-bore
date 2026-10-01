import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
const entries = JSON.parse(await readFile(new URL("./image-manifest.json", import.meta.url), "utf8"));
await mkdir("public/images", { recursive: true });
for (const asset of entries) {
  const width = asset.name.startsWith("hero-desktop") ? 1920 : asset.name.startsWith("hero-mobile") ? 900 : 1200;
  const info = await sharp(asset.source).resize({ width, withoutEnlargement: true }).webp({ quality: 83 }).toFile(`public/images/${asset.name}.webp`);
  console.log(`${asset.name}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`);
  if (asset.name.startsWith("hero-desktop")) await sharp(asset.source).resize(1280).webp({ quality: 82 }).toFile(`public/images/${asset.name}-1280.webp`);
}
