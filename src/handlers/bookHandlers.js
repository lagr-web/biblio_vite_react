// src/handlers/bookHandlers.js
import { getAllGenreData, getGenreBySlug } from "../data.js";

// Loader til forsiden (Home)
export const homeLoader = async () => {
  return await getAllGenreData();
};

// Loader til genrer/bøger siden (Books)
export const booksLoader = async ({ params }) => {
  return await getGenreBySlug(params.slug);
};
