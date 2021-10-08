import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>NextJS Blog by Lazar</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Lazar Djordjevic lazardjordjevic blog nextjs" />
      </Head>
      <h1 className="page-title">Lazar Djordjevic</h1>
      <h2 className="page-subtitle">NextJS blog</h2>
    </>
  )
}
