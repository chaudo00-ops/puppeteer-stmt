import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, "src", "assets", "logo-transparent.png");
const outputPath = join(__dirname, "src", "assets", "logo-optimized.png");

async function optimizeLogo() {
  console.log("Optimizing logo...");
  console.log(`Input: ${inputPath}`);
  console.log(`Output: ${outputPath}`);

  // Optimize the logo: resize to smaller dimensions and compress
  await sharp(inputPath)
    .resize(240, null, { // Resize width to 240px (half of original 120px display size needs less data)
      withoutEnlargement: true,
      fit: "inside",
    })
    .png({
      quality: 80,
      compressionLevel: 9,
      effort: 10,
    })
    .toFile(outputPath);

  console.log("Logo optimized successfully!");
}

optimizeLogo().catch(console.error);
