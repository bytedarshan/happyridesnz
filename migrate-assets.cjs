const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dni1i56yo',
  api_key: '438175276471648',
  api_secret: 'pInj45bFGACufEMuLpssosOfcQs'
});

const publicDir = path.join(__dirname, 'public');
const mappingFile = path.join(__dirname, 'cloudinary_mapping.json');

const main = async () => {
  console.log('Scanning public directory...');
  const files = fs.readdirSync(publicDir);
  const imageExtensions = ['.png', '.jpg', '.jpeg'];
  const imageFiles = files.filter(f => imageExtensions.includes(path.extname(f).toLowerCase()));
  
  console.log(`Found ${imageFiles.length} images to migrate.`);
  
  let mapping = {};
  if (fs.existsSync(mappingFile)) {
    try {
      mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
      console.log(`Loaded ${Object.keys(mapping).length} already uploaded items from cache.`);
    } catch (e) {
      console.error('Error parsing mapping file:', e);
    }
  }
  
  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    if (mapping[filename]) {
      console.log(`[${i+1}/${imageFiles.length}] Skipping (cached): ${filename}`);
      continue;
    }
    
    const filePath = path.join(publicDir, filename);
    const publicId = path.parse(filename).name;
    
    console.log(`[${i+1}/${imageFiles.length}] Uploading ${filename} to Cloudinary...`);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'happyrides',
        public_id: publicId,
        overwrite: true
      });
      
      mapping[filename] = result.secure_url;
      fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2), 'utf8');
      console.log(`Uploaded! URL: ${result.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${filename}:`, err);
    }
  }
  
  console.log('Migration finished! Mapping written to cloudinary_mapping.json');
  
  // Now, let's rewrite mockData.js and SiteContext.jsx
  console.log('Rewriting src/data/mockData.js...');
  const mockDataPath = path.join(__dirname, 'src', 'data', 'mockData.js');
  if (fs.existsSync(mockDataPath)) {
    let content = fs.readFileSync(mockDataPath, 'utf8');
    Object.keys(mapping).forEach(filename => {
      // Replace exact occurrences inside quotes
      const regex = new RegExp(`(["'])${filename}(["'])`, 'g');
      content = content.replace(regex, `$1${mapping[filename]}$2`);
    });
    fs.writeFileSync(mockDataPath, content, 'utf8');
    console.log('src/data/mockData.js updated successfully!');
  }
  
  console.log('Rewriting src/context/SiteContext.jsx...');
  const siteContextPath = path.join(__dirname, 'src', 'context', 'SiteContext.jsx');
  if (fs.existsSync(siteContextPath)) {
    let content = fs.readFileSync(siteContextPath, 'utf8');
    Object.keys(mapping).forEach(filename => {
      const regex = new RegExp(`(["'])${filename}(["'])`, 'g');
      content = content.replace(regex, `$1${mapping[filename]}$2`);
    });
    fs.writeFileSync(siteContextPath, content, 'utf8');
    console.log('src/context/SiteContext.jsx updated successfully!');
  }
};

main().catch(err => {
  console.error('Migration failed:', err);
});
