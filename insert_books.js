// insert_books.js
// Run with: node insert_books.js

const { MongoClient } = require("mongodb");

// Replace with your Atlas connection string
const uri = "mongodb+srv://mungaisamuel624_db_user:<db_password>@cluster0.jx8jeho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    const sampleBooks = [
      {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        published_year: 2018,
        price: 1200,
        in_stock: true,
        pages: 320,
        publisher: "Penguin"
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        published_year: 1988,
        price: 800,
        in_stock: true,
        pages: 208,
        publisher: "HarperOne"
      },
      {
        title: "Educated",
        author: "Tara Westover",
        genre: "Memoir",
        published_year: 2018,
        price: 950,
        in_stock: true,
        pages: 352,
        publisher: "Random House"
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        genre: "Programming",
        published_year: 2008,
        price: 2200,
        in_stock: false,
        pages: 464,
        publisher: "Prentice Hall"
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        genre: "Programming",
        published_year: 1999,
        price: 2100,
        in_stock: true,
        pages: 352,
        publisher: "Addison-Wesley"
      },
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: "History",
        published_year: 2011,
        price: 1500,
        in_stock: true,
        pages: 498,
        publisher: "Harvill Secker"
      },
      {
        title: "Normal People",
        author: "Sally Rooney",
        genre: "Fiction",
        published_year: 2018,
        price: 900,
        in_stock: true,
        pages: 266,
        publisher: "Faber & Faber"
      },
      {
        title: "The Road",
        author: "Cormac McCarthy",
        genre: "Fiction",
        published_year: 2006,
        price: 850,
        in_stock: false,
        pages: 287,
        publisher: "Vintage"
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        genre: "Self-Help",
        published_year: 2016,
        price: 1100,
        in_stock: true,
        pages: 304,
        publisher: "Grand Central"
      },
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        genre: "Programming",
        published_year: 2018,
        price: 1800,
        in_stock: true,
        pages: 472,
        publisher: "No Starch Press"
      }
    ];

    const result = await books.insertMany(sampleBooks);
    console.log(`✅ Inserted ${result.insertedCount} books.`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
