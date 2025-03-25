const sharp = require('sharp');
const { globSync } = require('glob');
const fs = require('fs-extra');
const path = require('path');

// Load configuration
let config;
try {
  config = require('./config.js');
  console.log('Configuration loaded from config.js');
} catch (error) {
  console.log('Using default configuration (config.js not found or invalid)');
  config = {
    inputDir: './input',
    outputDir: './output',
    quality: 80,  // 0-100, higher means better quality but larger file size
    deleteOriginals: false,  // Set to true if you want to delete original files after conversion
  };
}

// Create output directory if it doesn't exist
fs.ensureDirSync(config.outputDir);

// Create input directory if it doesn't exist
fs.ensureDirSync(config.inputDir);

// Find all jpg and png files in the input directory
const imageFiles = globSync(`${config.inputDir}/**/*.{jpg,jpeg,png}`, { nocase: true });

if (imageFiles.length === 0) {
  console.log('No image files found in the input directory.');
  console.log(`Please add JPG/PNG images to the "${config.inputDir}" folder and run the script again.`);
  process.exit(0);
}

console.log(`Found ${imageFiles.length} images to convert...`);

// Process each image
(async () => {
  let successCount = 0;
  let errorCount = 0;

  for (const imagePath of imageFiles) {
    try {
      // Generate output path, preserving directory structure
      const relativePath = path.relative(config.inputDir, imagePath);
      const outputPath = path.join(
        config.outputDir, 
        path.dirname(relativePath),
        `${path.basename(relativePath, path.extname(relativePath))}.webp`
      );

      // Create directory if it doesn't exist
      fs.ensureDirSync(path.dirname(outputPath));

      // Prepare WebP conversion options
      const webpOptions = { quality: config.quality };
      
      // Add any advanced options if they exist
      if (config.sharpOptions) {
        Object.assign(webpOptions, config.sharpOptions);
      }

      // Convert image to WebP
      await sharp(imagePath)
        .webp(webpOptions)
        .toFile(outputPath);

      // Delete original if configured
      if (config.deleteOriginals) {
        fs.removeSync(imagePath);
      }

      successCount++;
      console.log(`Converted: ${relativePath} → ${path.relative(config.outputDir, outputPath)}`);
    } catch (error) {
      console.error(`Error converting ${imagePath}:`, error.message);
      errorCount++;
    }
  }

  console.log('\nConversion completed!');
  console.log(`Successfully converted: ${successCount} images`);
  if (errorCount > 0) {
    console.log(`Failed to convert: ${errorCount} images`);
  }
  console.log(`Output saved to: ${path.resolve(config.outputDir)}`);
})(); 