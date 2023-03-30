// pages/product-listing.js
import Head from "next/head";
import Topbar from "@/app/Header";
import { clientPromise } from "../lib/mongodb";

const ProductListing = ({ products }) => {
  return (
    <>
      <Head>
        <title>Product Listing</title>
        <meta name="description" content="List of all products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Topbar />
        <section className="section-center">
          <h2 className="text-2xl font-semibold mb-6">All Products</h2>
          <div className="flex flex-wrap -mx-2">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2"
                >
                  <div className="bg-white shadow rounded-md p-4 h-full flex flex-col">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover object-center mb-4 rounded"
                    />
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db();

  // Fetch all products from the database
  const products = await db.collection("products").find({}).toArray();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default ProductListing;
