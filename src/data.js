import { API_URL } from "./config.js";

export const getAllGenreData = async () => {
  const res = await fetch(`${API_URL}/genres`);
  if (!res.ok) throw new Error("fail to fetch genre");
  return res.json();
};

export const getGenreBySlug = async (slug) => {
  const res = await fetch(`${API_URL}/genre/${slug}`);
  if (!res.ok) throw new Error("failed to fetch slug");
  const data = await res.json();
  return data;
};

export const getAllBookData = async () => {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) throw new Error("Failed to fetch book data");
  return res.json();
};


export const createBookData = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/addbook`, {
      method: "POST",
      body: formData, // Sender automatisk som multipart/form-data
    });

    if (!res.ok) return { error: "Kunne ikke oprette bogen på backenden" };
    return { success: true };
  } catch (error) {
    return { error: "Netværksfejl under oprettelse" };
  }
};


export const deleteBookData = async (id) => {
  try {
    const res = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return { error: "Kunne ikke slette bogen på backenden" };
    return { success: true };
  } catch (error) {
    return { error: "Netværksfejl under sletning" };
  }
};


