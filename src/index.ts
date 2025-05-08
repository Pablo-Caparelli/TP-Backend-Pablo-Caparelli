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

const getBook = async (id: string) => {
  try {
    const foundBook = await Book.findById(id);
    if (!foundBook) {
      return {
        sucess: true,
        message: "Book not found",
      };
    }
    return {
      success: true,
      data: foundBook,
      message: "Book successfully recovered",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Error getting the book",
    };
  }
};

const updateBook = async (id: string, newData: Partial<IBook>) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!updateBook)
      return {
        sucess: false,
        message: "Book not found",
      };
    return {
      sucess: true,
      message: "Book successfully updated",
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

  // const Books = await getBooks();
  // console.log(Books);

  // const Book = await getBook("681ca52bab3560fb0a40d969");
  // console.log(Book);

  // const updatedBook = await updateBook("681bf7d9c2fb9df86f1ad0de", {
  //   available: false,
  // });
  // console.log(updatedBook);
};

main();

connectMongoDb();
