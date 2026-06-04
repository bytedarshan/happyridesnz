/**
 * Cloudinary Secure Signed Upload Utility
 * Performs client-side signed uploads using browser-native Web Crypto API (SHA-1).
 */

export const generateSHA1 = async (string) => {
  const msgBuffer = new TextEncoder().encode(string);
  const hashBuffer = await window.crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export const uploadToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary environment variables are not configured in Vercel or .env file!');
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = 'happyrides';

  // Parameters to sign must be sorted alphabetically
  const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = await generateSHA1(signatureString);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  formData.append('timestamp', timestamp);
  formData.append('api_key', apiKey);
  formData.append('signature', signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
  }

  const data = await response.json();
  return data.secure_url;
};
