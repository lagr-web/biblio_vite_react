// src/routes/adminRoute.js
import {
  getAllBookData,
  getAllGenreData,
  deleteBookData,
  createBookData,
} from "../data.js";

export const adminLoader = async () => {
  const [books, genres] = await Promise.all([
    getAllBookData(),
    getAllGenreData(),
  ]);
  return { books, genres };
};

export const adminAction = async ({ request }) => {
  
  const formData = await request.formData();

  //Håndter Slet (DELETE)
  if (request.method === "DELETE") {
    const bookId = formData.get("id");
    return await deleteBookData(bookId);
  }

  if (request.method === "POST") {
    return await createBookData(formData);
  }
};
