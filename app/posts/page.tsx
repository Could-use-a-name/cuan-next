import { client, sanityImage } from "../../lib/sanity";
import Image from "next/image";
import Link from "next/link";

async function getPosts() {
  const query = `*[_type == "post"]{
    title,
    slug,
    mainImage,
    publishedAt,
    shortDescription,
    author->{
      name,
    },
  }`;
  const post = await client.fetch(query);
  return post;
}

export default async function Posts() {
  const posts = await getPosts();
  return (
    <main className="p-4 mx-auto max-w-5xl">
      <h1 className="pt-16 text-3xl font-bold">Hello world</h1>
      <p className="py-4 text-xl font-base">
        This page will get some more information soon.
        <br />
        Lets just say it will be related to information security.
      </p>

      <div className="flex flex-column py-8">
        {posts.map((post: any, index: number) => (
          <Link key={index} href={`/posts/${post.slug.current}`} className="w-full">
            <div className="flex flex-row items-center gap-2 w-full">
              <Image
                className="rounded"
                src={sanityImage(post.mainImage).height(100).width(200).url()}
                height="100"
                width="200"
                alt={post.mainImage.alt || ""}
              />
              <div>
                <h2 className="text-3xl underline">{post.title}</h2>
                <p className="text-base">{post.shortDescription}</p>
                <p className="text-sm">Written by {post.author.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
