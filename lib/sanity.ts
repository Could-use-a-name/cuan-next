import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: process.env.SANITY_PROJECTID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2021-03-25',
  useCdn: true,
});

const sanityImageBuilder = imageUrlBuilder(client);

export function sanityImage(source: any) {
  return sanityImageBuilder.image(source);
}