// app/index.js

import Header from "@/components/header/Header";
import Head from "next/head";
import Banner from "@/components/banner/Banner";
import LatestProducts from "./products";
import { clientPromise } from "@/lib/mongodb";

export default function Home({ initialProducts }) {
  return (
    <>
      <Head>
        <title>My Website</title>
        <meta name="description" content="My new website using Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Banner />
        <LatestProducts initialProducts={initialProducts} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db();

  // Fetch the latest 5 products from the database
  const products = await db
    .collection("products")
    .find({})
    .sort({ created_at: -1 })
    .limit(5)
    .toArray();

  return {
    props: {
      initialProducts: JSON.parse(JSON.stringify(products)),
    },
  };
}
