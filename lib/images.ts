// lib/images.ts
// Real French Bulldog images from the Dog CEO API

export const FRENCHIE_IMAGES: Record<string, string> = {
  brindle: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_10006.jpg',
  fawn: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_10014.jpg',
  cream: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_10026.jpg',
  blue: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_10029.jpg',
  chocolate: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_10096.jpg',
  lilac: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_10112.jpg',
  isabella: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_10130.jpg',
  'new-shade-isabella': 'https://images.dog.ceo/breeds/bulldog-french/n02108915_10150.jpg',
  black: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_10172.jpg',
  'blue-tan': 'https://images.dog.ceo/breeds/bulldog-french/n02108915_10209.jpg',
  'chocolate-tan': 'https://images.dog.ceo/breeds/bulldog-french/n02108915_10255.jpg',
  'lilac-tan': 'https://images.dog.ceo/breeds/bulldog-french/n02108915_1030.jpg',
  'blue-merle': 'https://images.dog.ceo/breeds/bulldog-french/n02108915_1065.jpg',
  'chocolate-merle': 'https://images.dog.ceo/breeds/bulldog-french/n02108915_1092.jpg',
  'lilac-merle': 'https://images.dog.ceo/breeds/bulldog-french/n02108915_1115.jpg',
  pied: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_11206.jpg',
  fluffy: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_1139.jpg',
  platinum: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_1167.jpg',
};

export function getFrenchieImage(id: string): string {
  return FRENCHIE_IMAGES[id] || FRENCHIE_IMAGES['brindle'];
}
