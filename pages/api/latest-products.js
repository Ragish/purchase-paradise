// pages/api/latest-products.js
import nextConnect from "next-connect";
import clientPromise from "../../lib/mongodb";

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch the latest 5 products from the database
    const products = await db
      .collection("products")
      .find({})
      .sort({ created_at: -1 })
      .limit(5)
      .toArray();

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default handler;
