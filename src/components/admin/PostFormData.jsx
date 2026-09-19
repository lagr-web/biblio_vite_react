import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { getAllGenreData } from "../../data";

export const PostFormData = () => {
  const [genreData, setGenreData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const genre = await getAllGenreData();
        setGenreData(genre);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // KIG HER: Vi tjekker hvad der rent faktisk er inde i FormData nu
    console.log(
      "Klar til at sende til databasen:",
      Object.fromEntries(formData.entries()),
    );

    try {
      const res = await fetch(`${API_URL}/addbook`, {
        method: "POST",
        // Content-Type skal IKKE være her, når vi sender FormData!
        body: formData, // <--- DETTE ER VIGTIGT! Send selve formData, ikke JSON.stringify
      });

      if (res.ok) {
        
        console.log("Bogen blev oprettet med succes!");
        e.target.reset();
        window.location.reload();

      } else {
        console.error("Backenden returnerede en fejl:", res.status);
      }
    } catch (error) {
      console.error("Netværksfejl under oprettelse af bog:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="text-[#3C6973]">Titel</label>
        <input name="title" />
      </div>

      <div className="mb-4">
        <label className="text-[#3C6973]">Forfatter</label>
        <input name="author" />
      </div>

      <div className="mb-4">
        <label className="text-[#3C6973]">Genre</label>

        <select name="genre">
          <option value="">Vælg en genre</option>
          {genreData &&
            genreData.map((genre) => (
              <option key={genre._id} value={genre.slug}>
                {genre.slug}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="text-[#3C6973]">billede</label>
        <label className="flex items-center justify-center w-full px-4 py-2 bg-[#557d85] text-white rounded shadow-md cursor-pointer hover:bg-[#7AB3BF]">
          <span>Vælg en fil</span>
          <input type="file" name="image" accept="image/*" className="hidden" />
        </label>
      </div>

      <div className="mb-4">
        <label className="text-[#3C6973]">Beskrivelse</label>
        <textarea name="description" rows={4}></textarea>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#557d85] hover:bg-[#7AB3BF] text-white font-bold py-2 px-4 w-full rounded"
        >
          Send
        </button>
      </div>
    </form>
  );
};
