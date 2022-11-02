import { toHTML } from '@portabletext/to-html';
import { client, sanityImage } from '../../../lib/sanity';
import Image from 'next/image';

import type { PortableTextComponents } from '@portabletext/to-html';

const portabletextComponents: PortableTextComponents = {
  block: {
    'h1': (props) => {
      return `<h1 class="py-4 text-3xl">${props.children}</h1>`;
    },
    'h2': (props) => {
      return `<h2 class="py-2 text-2xl">${props.children}</h1>`;
    },
    'h3': (props) => {
      return `<h3 class="py-1 text-xl">${props.children}</h1>`;
    },
    'normal': (props) => {
      return `<p class="text-base">${props.children}</h1>`;
    },
  }
}

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    publishedAt,
    shortDescription,
    categories->{
      title,
      description,
    },
    body,
    author->{
      name,
      shortDescription,
      title,
      image,
    },
  }`;
  const params = { slug };
  const post = await client.fetch(query, params);
  return post;
}

export async function generateStaticParams() {
  const posts = await client.fetch<[{slug: {current: string}}]>('*[_type == "post"]{slug}');

  return posts.map((post: {slug: {current: string}}) => ({
    slug: post.slug.current,
  }));
}

export default async function Post({ params }: any) {
  const post = await getPost(params.slug);
  const date = new Date(post.publishedAt);

  return (
    <main className="p-4 mx-auto max-w-5xl">
      <div className="flex flex-col md:flex-row pt-8">
        <Image
          className='rounded shadow'
          src={sanityImage(post.mainImage).width(600).height(500).url()}
          width="600"
          height="500"
          alt={post.mainImage.alt || ''}
          priority={true}
        />
        <h1 className="bg-slate-600 self-start md:self-end md:-ml-16 md:mb-16 p-2 md:rounded text-3xl font-bold">
          {post.title}
        </h1>
      </div>

      <div className='py-4 gap-2 flex flex-row items-center'>
        <Image src={sanityImage(post.author.image).width(50).height(50).url()}
          className="rounded-full"
          height="50"
          width="50"
          alt={post.author.image.alt || ''}
        />
        <div className="flex flex-col">
          <span className="text-xl">{post.author.name}</span>
          <span className="text-xs">{date.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2" dangerouslySetInnerHTML={{__html: toHTML(post.body, {components: portabletextComponents})}}>
      </div>
    </main>
  )
}


