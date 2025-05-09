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
      return { success: false, error: "Invalid data" };
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
      success: true,
      data: newBookToDb,
      message: "Book added successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

const getBooks = async () => {
  try {
    const Books = await Book.find();
    return {
      success: true,
      data: Books,
      message: "Books successfully recovered",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

const getBook = async (id: string) => {
  try {
    const foundBook = await Book.findById(id);
    if (!foundBook) {
      return {
        success: true,
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
        success: false,
        message: "Book not found",
      };
    return {
      success: true,
      data: updatedBook,
      message: "Book successfully updated",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const deleteBook = async (id: string) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return {
        success: false,
        message: "Book not found",
      };
    }
    return {
      success: true,
      data: deletedBook,
      message: "Book successfully deleted",
    };
  } catch (error: any) {
    console.error("Error deleting book:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

const main = async () => {
  await connectMongoDb();

  // const savedBook = await addBook({
  //   title: "Adán Buenosayres",
  //   author: "Leopoldo Marechal",
  //   publishedYear: 1948,
  //   gender: "Novela",
  //   language: "Español",
  //   country: "Argentina",
  //   coverImage:
  //     "https://images.cdn1.buscalibre.com/fit-in/360x360/30/25/302506f0f60e204cc5a36dbff6f51322.jpg",
  //   available: true,
  // });

  // console.log(savedBook);

  // const Books = await getBooks();
  // console.log(Books);

  // const Book = await getBook("681d3d1baa98ecbe987dc068");
  // console.log(Book);

  // const updatedBook = await updateBook("681dff09fc0b558e26de76a9", {
  //   available: false,
  // });
  // console.log(updatedBook);

  const deletedBook = await deleteBook("681e02ed86682e22a95dedab");
  console.log(deletedBook);
};

main();
