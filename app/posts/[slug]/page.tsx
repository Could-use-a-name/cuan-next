export default async function Post({ params }) {
  return (
    <main className="p-4 mx-auto max-w-5xl">
      <h1 className="pt-16 text-3xl font-bold">
        You found the post with slug - {params.slug}
      </h1>
      <p className="py-4 text-xl font-base">
        This page will get some more information soon.<br/>
        Lets just say it will be related to information security.
      </p>
    </main>
  )
}
