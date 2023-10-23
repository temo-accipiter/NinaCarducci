/*************************************************************************************/
/*** optimisation d'images : changement de format, compression, redimensionnement ***/
/***********************************************************************************/
import sharp from "sharp";
import * as glob from "glob"; // module pour la recherche de fichiers
import path from "path"; // module pour la gestion des chemins de fichiers
import fs from "fs"; // module pour la gestion des fichiers

const rootDirectory = "assets/images/"; // Dossier où se trouvent les images sources
const sizes = [300]; // Les tailles de redimensionnement
const quality = 50; // Niveau de compression WebP
const outputDirectory = "assets/optimisedemages/"; // Dossier de stockage pour les images optimisées

(async () => {
  const imageFiles = glob.sync("**/*.{jpg,png}", { cwd: rootDirectory }); // Recherche des images récursivement dans le dossier racine

  for (const imagePath of imageFiles) {
    // itèration à travers la liste des chemins de fichiers stockés dans le tableau imageFiles
    const image = sharp(path.join(rootDirectory, imagePath)); // Création d'une instance Sharp pour l'image en cours

    for (const size of sizes) {
      const fileNameWithoutExtension = path.basename(
        imagePath,
        path.extname(imagePath),
      ); // recuperation du nom de fichier sans extension

      // Création du chemin de sortie en conservant la structure de dossier source
      const relativeImagePath = path.dirname(imagePath);
      const outputFolder = path.join(outputDirectory, relativeImagePath);
      const outputImagePath = path.join(
        outputFolder,
        `${fileNameWithoutExtension}_${size}.webp`,
      );

      fs.mkdirSync(outputFolder, { recursive: true }); // Création de dossier de sortie de manière récursive s'il n'existe pas

      await image
        .clone() // création de la copie de l'image
        .resize(size) // redimensionnement
        .webp({ quality }) // changement de format et compression
        .toFile(outputImagePath); // enregistrement des images

      //  indique que l'image a été redimensionnée et enregistrée avec succès
      console.log(
        `Image ${imagePath} resized to ${size} and saved to ${outputImagePath}`,
      );
    }
  }
})().catch((err) => console.error(err.stack)); // gérer les erreurs qui pourraient survenir lors de l'exécution du script
