const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
const svgIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#0d9488"/>
  <path d="M256 128L128 256l128 128 128-128L256 128z" fill="white" opacity="0.8"/>
  <circle cx="256" cy="256" r="64" fill="white"/>
</svg>`;

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create splash directory if it doesn't exist
const splashDir = path.join(__dirname, '..', 'public', 'splash');
if (!fs.existsSync(splashDir)) {
  fs.mkdirSync(splashDir, { recursive: true });
}

// Icon sizes to generate
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Generate icons
iconSizes.forEach(size => {
  const iconPath = path.join(iconsDir, `icon-${size}x${size}.png`);
  // In a real implementation, you would use a library like sharp to resize the SVG
  // For this example, we'll just create a placeholder file
  fs.writeFileSync(iconPath, `Icon ${size}x${size} placeholder`);
  console.log(`Created ${iconPath}`);
});

// Create shortcut icons
const shortcuts = ['dashboard', 'requests', 'rooms'];
shortcuts.forEach(shortcut => {
  const shortcutPath = path.join(iconsDir, `${shortcut}-shortcut.png`);
  fs.writeFileSync(shortcutPath, `Shortcut icon for ${shortcut}`);
  console.log(`Created ${shortcutPath}`);
});

// Create splash screen placeholders
const splashScreens = [
  { name: 'apple-splash-2048-2732.jpg', width: 2048, height: 2732 },
  { name: 'apple-splash-2732-2048.jpg', width: 2732, height: 2048 },
  { name: 'apple-splash-1668-2388.jpg', width: 1668, height: 2388 },
  { name: 'apple-splash-2388-1668.jpg', width: 2388, height: 1668 },
  { name: 'apple-splash-1536-2048.jpg', width: 1536, height: 2048 },
  { name: 'apple-splash-2048-1536.jpg', width: 2048, height: 1536 },
  { name: 'apple-splash-1668-2224.jpg', width: 1668, height: 2224 },
  { name: 'apple-splash-2224-1668.jpg', width: 2224, height: 1668 },
  { name: 'apple-splash-1620-2160.jpg', width: 1620, height: 2160 },
  { name: 'apple-splash-2160-1620.jpg', width: 2160, height: 1620 },
  { name: 'apple-splash-1284-2778.jpg', width: 1284, height: 2778 },
  { name: 'apple-splash-2778-1284.jpg', width: 2778, height: 1284 },
  { name: 'apple-splash-1170-2532.jpg', width: 1170, height: 2532 },
  { name: 'apple-splash-2532-1170.jpg', width: 2532, height: 1170 },
  { name: 'apple-splash-1125-2436.jpg', width: 1125, height: 2436 },
  { name: 'apple-splash-2436-1125.jpg', width: 2436, height: 1125 },
  { name: 'apple-splash-1242-2688.jpg', width: 1242, height: 2688 },
  { name: 'apple-splash-2688-1242.jpg', width: 2688, height: 1242 },
  { name: 'apple-splash-828-1792.jpg', width: 828, height: 1792 },
  { name: 'apple-splash-1792-828.jpg', width: 1792, height: 828 },
  { name: 'apple-splash-1242-2208.jpg', width: 1242, height: 2208 },
  { name: 'apple-splash-2208-1242.jpg', width: 2208, height: 1242 },
  { name: 'apple-splash-750-1334.jpg', width: 750, height: 1334 },
  { name: 'apple-splash-1334-750.jpg', width: 1334, height: 750 },
  { name: 'apple-splash-640-1136.jpg', width: 640, height: 1136 },
  { name: 'apple-splash-1136-640.jpg', width: 1136, height: 640 }
];

splashScreens.forEach(splash => {
  const splashPath = path.join(splashDir, splash.name);
  fs.writeFileSync(splashPath, `Splash screen ${splash.width}x${splash.height} placeholder`);
  console.log(`Created ${splashPath}`);
});

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Create screenshot placeholders
const screenshots = [
  { name: 'dashboard.png', width: 1280, height: 720 },
  { name: 'mobile-dashboard.png', width: 720, height: 1280 }
];

screenshots.forEach(screenshot => {
  const screenshotPath = path.join(screenshotsDir, screenshot.name);
  fs.writeFileSync(screenshotPath, `Screenshot ${screenshot.width}x${screenshot.height} placeholder`);
  console.log(`Created ${screenshotPath}`);
});

console.log('All PWA assets generated successfully!');