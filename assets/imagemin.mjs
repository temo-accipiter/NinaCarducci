import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

const files = await imagemin(['assets/images/*.{jpg,png}', 'assets/images/gallery/concerts/*.{jpg,png}', 'assets/images/gallery/entreprise/*.{jpg,png}', 'assets/images/gallery/mariage/*.{jpg,png}', 'assets/images/gallery/portraits/*.{jpg,png}', 'assets/images/slider/*.{jpg,png}'], {
	destination: 'assets/build/imagesmin',
	plugins: [
		imageminWebp({quality: 50})
	]
});

console.log(files);
//=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]