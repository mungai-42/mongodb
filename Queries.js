// queries.js
// Run with: node queries.js

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://mungaisamuel624_db_user:<db_password>@cluster0.jx8jeho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // --- BASIC CRUD ---

    console.log("\nFind all Fiction books:");
    console.log(await books.find({ genre: "Fiction" }).toArray());

    console.log("\nBooks published after 2010:");
    console.log(await books.find({ published_year: { $gt: 2010 } }).toArray());

    console.log("\nBooks by James Clear:");
    console.log(await books.find({ author: "James Clear" }).toArray());

    console.log("\nUpdate price of Atomic Habits to 1300:");
    await books.updateOne({ title: "Atomic Habits" }, { $set: { price: 1300 } });

    console.log("\nDelete The Alchemist:");
    await books.deleteOne({ title: "The Alchemist" });

    // --- ADVANCED QUERIES ---

    console.log("\nBooks in stock and published after 2010:");
    console.log(await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

    console.log("\nProjection: title, author, price only:");
    console.log(await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray());

    console.log("\nSorted by price ascending:");
    console.log(await books.find().sort({ price: 1 }).toArray());

    console.log("\nSorted by price descending:");
    console.log(await books.find().sort({ price: -1 }).toArray());

    console.log("\nPagination (first 5):");
    console.log(await books.find().limit(5).toArray());

    console.log("\nPagination (next 5):");
    console.log(await books.find().skip(5).limit(5).toArray());

    // --- AGGREGATION PIPELINES ---

    console.log("\nAverage price by genre:");
    console.log(await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray());

    console.log("\nAuthor with most books:");
    console.log(await books.aggregate([
      { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 }
    ]).toArray());

    console.log("\nBooks grouped by decade:");
    console.log(await books.aggregate([
      {
        $project: {
          decade: {
            $concat: [
              { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
              "s"
            ]
          }
        }
      },
      { $group: { _id: "$decade", count: { $sum: 1 } } }
    ]).toArray());

    // --- INDEXING ---
    console.log("\nCreating index on title:");
    await books.createIndex({ title: 1 });

    console.log("Creating compound index on author + published_year:");
    await books.createIndex({ author: 1, published_year: -1 });

    console.log("\nExplain plan for search by title:");
    const explain = await books.find({ title: "Atomic Habits" }).explain("executionStats");
    console.log(JSON.stringify(explain.executionStats, null, 2));

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
