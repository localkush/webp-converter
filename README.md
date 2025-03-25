# WebP Image Converter

A simple Node.js tool to convert JPG/PNG images to WebP format with optimized quality for web use.

## Features

- Batch convert all JPG/PNG images from an input folder to WebP format
- Preserve folder structure in the output
- Configure quality settings for optimal web performance
- Option to automatically delete original files after conversion

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) installed (version 14 or higher recommended)
2. Clone or download this repository
3. Install dependencies:

```
npm install
```

## Usage

1. Place your JPG/PNG images in the `input` folder (will be created automatically if it doesn't exist)
2. Run the converter:

```
npm start
```

3. Find your converted WebP images in the `output` folder

## Configuration

You can customize the conversion process by editing the `config.js` file:

- `inputDir`: Directory containing your original images
- `outputDir`: Directory where WebP images will be saved
- `quality`: WebP compression quality (1-100, higher = better quality but larger file size)
- `deleteOriginals`: Whether to delete original files after conversion

Example configuration:

```js
module.exports = {
  inputDir: './my-images',
  outputDir: './webp-images',
  quality: 85,
  deleteOriginals: false
};
```

### Advanced Options

You can uncomment and modify the `sharpOptions` section in `config.js` for more advanced control:

```js
sharpOptions: {
  withMetadata: true,    // Preserve image metadata (EXIF)
  lossless: true,        // Use lossless compression
  nearLossless: 60       // Near-lossless mode (0-100)
}
```

## Recommended Quality Settings

- **75-80**: Good quality with excellent compression (recommended for most websites)
- **85-90**: High quality with good compression (for images where quality is important)
- **95+**: Very high quality with less compression (use only when necessary)

## License

MIT 