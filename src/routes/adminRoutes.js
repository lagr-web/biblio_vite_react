// src/routes/adminRoute.js
import { getAllBookData, getAllGenreData } from "../data.js";
import { API_URL } from "../config.js";

// ✅ Loaderen bor nu her
export const adminLoader = async () => {
  const [books, genres] = await Promise.all([
    getAllBookData(),
    getAllGenreData()
  ]);
  return { books, genres };
};

// ✅ Actionen bor nu her
export const adminAction = async ({ request }) => {
  
  // 🟢 HVIS METODEN ER DELETE: Kører når der trykkes slet i ModalConfirmDeleteBox
  if (request.method === "DELETE") {

    const formData = await request.formData();
    const bookId = formData.get("id"); // Fanger det id, som din fetcher sendte med

    try {
      const res = await fetch(`${API_URL}/delete/${bookId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        return { error: "Kunne ikke slette bogen" };
      }

      console.log("Bogen blev slettet med succes fra databasen!");
      return { success: true }; // Giver besked tilbage til din fetcher i modalen
    } catch (error) {
      return { error: "Netværksfejl under sletning" };
    }
  }

  // 🔵 HVIS METODEN ER POST: Kører når formularen PostFormData indsendes (Din eksisterende kode)
  if (request.method === "POST") {
    
    const formData = await request.formData();
    try {
      const res = await fetch(`${API_URL}/addbook`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        return { error: "Kunne ikke oprette bogen på backenden" };
      }

      console.log("Bogen blev oprettet med succes!");
      return { success: true }; 
    } catch (error) {
      return { error: "Netværksfejl under oprettelse" };
    }
  }

};