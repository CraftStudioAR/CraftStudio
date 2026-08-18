const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'kre7pjni';

export function cld(publicId: string, transforms = "f_auto,q_auto") {
  if (!publicId) return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
  if (publicId.startsWith('http://') || publicId.startsWith('https://') || publicId.startsWith('/')) {
    return publicId;
  }
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export function getImageUrl(publicIdOrUrl?: string): string {
  if (!publicIdOrUrl) return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
  if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://') || publicIdOrUrl.startsWith('/')) {
    return publicIdOrUrl;
  }
  return cld(publicIdOrUrl);
}
