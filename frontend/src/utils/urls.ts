export const getImageUrl = (imagePath: string) => {
  return `${process.env['PUBLIC_ASSETS'] ?? process.env['NEXT_PUBLIC_API_URL']}/${imagePath}`;
};
