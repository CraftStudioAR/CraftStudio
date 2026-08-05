const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export function cld(publicId: string, transforms = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
