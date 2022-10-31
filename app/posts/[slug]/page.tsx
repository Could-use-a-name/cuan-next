import { client, sanityImage } from '../../../lib/sanity';
import Image from 'next/image';
import { Content } from '../../../components/BlockContent';

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

export default async function Post({ params }) {
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
      <div className="flex flex-col gap-2">
        <Content blocks={post.body} />
      </div>
    </main>
  )
}
