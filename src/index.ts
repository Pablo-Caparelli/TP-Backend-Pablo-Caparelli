import { Schema, model, connect } from "mongoose";

process.loadEnvFile();

const URI_DB = process.env.URI_DB || "";

const connectMongoDb = async () => {
  try {
    await connect(URI_DB);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.log("Error al conectarse a MongoDB:");
  }
};

const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  gender: { type: String, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
});

const Book = model("Book", bookSchema);

const addBook = async () => {
  try {
  } catch (error) {}
};

const getBooks = async () => {
  try {
  } catch (error) {}
};

const getBook = async (id: string) => {
  try {
  } catch (error) {}
};

const updateBook = async (id: string) => {
  try {
  } catch (error) {}
};

const deleteBook = async (id: string) => {
  try {
  } catch (error) {}
};

connectMongoDb();
