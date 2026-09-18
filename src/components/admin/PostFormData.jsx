import React from "react";
import { API_URL } from "../../config";

export const PostFormData = () => {


  const onSubmit = async (e) => {

    e.preventDefault(); 

     const formData = new FormData(e.target);
    
    // 3. Lav det om til et almindeligt JavaScript-objekt
    const bookData = Object.fromEntries(formData.entries());
    
    console.log("Klar til at sende til databasen:", bookData);
    
 try {
    const res = await fetch(`${API_URL}/addbook`, {
      method: "POST", // Angiv metoden
      headers: {
        "Content-Type": "application/json" // VIGTIGT: Fortæl backenden, at det er JSON
      },
      body: JSON.stringify(bookData) // VIGTIGT: Lav objektet om til en JSON-streng
    });

    if (res.ok) {
      console.log("Bogen blev oprettet med succes!");
      // Her kan du nulstille formularen, hvis du vil:
      e.target.reset();
    } else {
      console.error("Backenden returnerede en fejl:", res.status);
    }
  } catch (error) {
    console.error("Netværksfejl under oprettelse af bog:", error);
  }



    console.log("send flere penge...");
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
        <select>
          <option value="">Vælg en genre</option>

          <option value="hups">allo</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="text-[#3C6973]">billede</label>

        <label className="flex items-center justify-center w-full px-4 py-2 bg-[#557d85] text-white rounded shadow-md cursor-pointer hover:bg-[#7AB3BF]">
          <span>Vælg en fil</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
          />
        </label>

      
      </div>

      <div className="mb-4">
        <label className="text-[#3C6973]">Beskrivelse</label>
        <textarea name="description" rows={4}></textarea>
    
      </div>


      <div className="flex justify-end">
        <button
          type="submit"
          className=" bg-[#557d85] hover:bg-[#7AB3BF] text-white font-bold

py-2
px-4
w-full
rounded"
        >
          Send
        </button>
      </div>
    </form>
  );
};
