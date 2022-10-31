import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-4 mx-auto max-w-5xl">
      <h1 className="pt-16 text-3xl font-bold">
        Hello world
      </h1>
      <p className="py-4 text-xl font-base">
        This page will get some more information soon.<br/>
        Lets just say it will be related to information security.
      </p>
      <p className="py-4 text-xl font-base">
        While you are here... checkout some of our <Link className="underline" href="/posts">posts</Link>
      </p>
    </main>
  )
}
