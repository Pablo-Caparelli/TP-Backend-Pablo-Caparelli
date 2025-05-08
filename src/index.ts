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

interface IBook {
  title: string;
  author: string;
  publishedYear: number;
  gender: string;
  language: string;
  country: string;
  coverImage: string;
  available: boolean;
}

const bookSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    gender: { type: String, required: true },
    language: { type: String, required: true },
    country: { type: String, required: true },
    coverImage: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
  }
);

const Book = model("Book", bookSchema);

const addBook = async (newBook: IBook) => {
  try {
    const {
      title,
      author,
      publishedYear,
      gender,
      language,
      country,
      coverImage,
      available,
    } = newBook;
    if (
      !title ||
      !author ||
      !publishedYear ||
      !gender ||
      !language ||
      !country ||
      !coverImage ||
      !available
    ) {
      return { sucess: false, error: "Invalid data" };
    }
    const newBookToDb = new Book({
      title,
      author,
      publishedYear,
      gender,
      language,
      country,
      coverImage,
      available,
    });
    await newBookToDb.save();
    return {
      sucess: true,
      data: newBookToDb,
      message: "Book added successfully",
    };
  } catch (error: any) {
    return {
      sucess: false,
      error: error.message,
    };
  }
};

const getBooks = async () => {
  try {
    const Books = await Book.find();
    return {
      sucess: true,
      data: Books,
      message: "Books successfully recovered",
    };
  } catch (error: any) {
    return {
      sucess: false,
      error: error.message,
    };
  }
};

const main = async () => {
  connectMongoDb();

  // const savedBook = await addBook({
  //   title: "Jorge Luis Borges",
  //   author: "El Aleph",
  //   publishedYear: 1949,
  //   gender: "Cuentos",
  //   language: "Español",
  //   country: "Argentina",
  //   coverImage:
  //     "https://images.cdn1.buscalibre.com/fit-in/360x360/78/8f/788f1c87e9e3cbfd648353112dcbbbbf.jpg",
  //   available: true,
  // });

  const Books = await getBooks();

  console.log(Books);
};

main();

connectMongoDb();

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
