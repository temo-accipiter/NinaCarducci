import sharp from 'sharp';
import * as glob from 'glob';
import path from 'path';
import fs from 'fs';

const rootDirectory = 'assets/images/nina/';   // Dossier où se trouvent les images sources
const sizes = [500];   // Les tailles de redimensionnement
const quality = 50;   // Niveau de compression WebP
const outputDirectory = 'assets/optimisedimages/nina/';   // Dossier de stockage pour les images optimisées

(async () => {
  const imageFiles = glob.sync('**/*.{jpg,png}', { cwd: rootDirectory });   // Recherche des images récursivement dans le dossier racine

  for (const imagePath of imageFiles) {
    const image = sharp(path.join(rootDirectory, imagePath));   // Création d'une instance Sharp pour l'image en cours

    for (const size of sizes) {
      const fileNameWithoutExtension = path.basename(imagePath, path.extname(imagePath));   // Obtenir le nom de fichier sans extension

      // Création du chemin de sortie en conservant la structure de dossier source
      const relativeImagePath = path.dirname(imagePath);
      const outputFolder = path.join(outputDirectory, relativeImagePath);
      const outputImagePath = path.join(outputFolder, `${fileNameWithoutExtension}_${size}.webp`);

      fs.mkdirSync(outputFolder, { recursive: true });

      await image.clone().resize(size).webp({ quality }).toFile(outputImagePath);
      console.log(`Image ${imagePath} resized to ${size} and saved to ${outputImagePath}`);
    }
  }
})().catch((err) => console.error(err.stack));
