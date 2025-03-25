/**
 * WebP Converter Configuration
 * Adjust these settings to customize the conversion process
 */
module.exports = {
  // Input directory where your original JPG/PNG images are located
  inputDir: './input',
  
  // Output directory where WebP images will be saved
  outputDir: './output',
  
  // Quality setting (1-100)
  // Higher values = better quality but larger file size
  // 75-85 is recommended for web content
  quality: 80,
  
  // Whether to delete original files after conversion
  // Set to true to automatically remove source files
  deleteOriginals: false,
  
  // Additional options for specific use cases
  // You can uncomment and modify these as needed
  
  // Advanced sharp options
  // sharpOptions: {
  //   // Whether to preserve metadata (EXIF, etc)
  //   withMetadata: false,
  //   
  //   // Lossless compression (makes files larger but perfect quality)
  //   // lossless: true,
  //   
  //   // Near lossless mode (0-100)
  //   // nearLossless: 60,
  // }
}; 