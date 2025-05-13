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

const addBook = async (newBookData: IBook) => {
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
    } = newBookData;

    const book = new Book({
      title,
      author,
      publishedYear,
      gender,
      language,
      country,
      coverImage,
      available,
    });
    await book.save();

    return {
      success: true,
      data: book,
      message: "Book created successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
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
    if (!updatedBook)
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
  //   title: "La Perla",
  //   author: "John Steinbeck",
  //   publishedYear: 1947,
  //   gender: "Novela",
  //   language: "Español",
  //   country: "Estados Unidos de América",
  //   coverImage:
  //     "https://images.cdn2.buscalibre.com/fit-in/360x360/71/5d/715db4e1128a6ce7e5fa7d501faf774f.jpg",
  //   available: true,
  // });

  // console.log(savedBook);

  // const Books = await getBooks();
  // console.log(Books);

  const Book = await getBook("681ca52bab3560fb0a40d969");
  console.log(Book);

  // const updatedBook = await updateBook("68224a3b9c7ba582129d9501", {
  //   available: false,
  // });
  // console.log(updatedBook);

  // const deletedBook = await deleteBook("682348c1adf27befdcc7af39");
  // console.log(deletedBook);
};

main();
