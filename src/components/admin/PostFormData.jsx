import { useEffect, useRef } from "react";
import { Form, useNavigation, useActionData, useLoaderData } from "react-router-dom";

export const PostFormData = ({onClose}) => {

  const formRef = useRef(null);
  const navigation = useNavigation();
  const actionData = useActionData(); // Fanger `{ success: true, error: ... }` fra din action i main.jsx

  // ✅ Da vi bruger "Løsning B", henter vi både bøger og genrer i din admin-loader i main.jsx.
  // Vi pakker genrer ud direkte fra useLoaderData() uden at bekymre os om rute-id'er!
  const { genres } = useLoaderData(); 

  const isSubmitting = navigation.state === "submitting";

  // Nulstil formularen automatisk, når din action melder succes
  useEffect(() => {
    
    if (!isSubmitting && actionData?.success) {
      formRef.current?.reset();
      console.log("Bogen blev oprettet med succes på admin-siden!");

 if (onClose) {

         setTimeout(() => {
    
        onClose();
      
    }, 1000);
      } 

    }

  }, [isSubmitting, actionData, onClose]);

  return (
     /* ✅ 1. Fjernet action="/". Nu poster den til den rute, du står på (/admin)
        ✅ 2. Der skal INGEN onSubmit være her overhovedet. React Router klarer det hele selv. */
     <Form method="post" encType="multipart/form-data" ref={formRef}>

       {/* Vis fejlbesked hvis backenden fejlede i din main.jsx action */}
      {actionData?.error && (
        <div className="mb-4 text-red-500 font-bold">{actionData.error}</div>
      )}

      <div className="mb-4">
        <label className="text-[#3C6973]">Titel</label>
        <input name="title" required className="border p-1 w-full" />
      </div>

      <div className="mb-4">
        <label className="text-[#3C6973]">Forfatter</label>
        <input name="author" required className="border p-1 w-full" />
      </div>

      <div className="mb-4">
        <label className="text-[#3C6973]">Genre</label>
        <select name="genre" required className="border p-1 w-full">
          <option value="">Vælg en genre</option>
          {/* ✅ Skiftet fra genreOldData til genres fra vores loader */}
          {genres &&
            genres.map((genre) => (
              <option key={genre._id} value={genre.slug}>
                {genre.slug}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="text-[#3C6973]">Billede</label>
        <label className="flex items-center justify-center w-full px-4 py-2 bg-[#557d85] text-white rounded shadow-md cursor-pointer hover:bg-[#7AB3BF]">
          <span>Vælg en fil</span>
          <input type="file" name="image" accept="image/*" className="hidden" />
        </label>
      </div>

      <div className="mb-4">
        <label className="text-[#3C6973]">Beskrivelse</label>
        <textarea name="description" rows={4} className="border p-1 w-full"></textarea>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#557d85] hover:bg-[#7AB3BF] text-white font-bold py-2 px-4 w-full rounded disabled:opacity-50"
        >
          {isSubmitting ? "Sender..." : "Send"}
        </button>
      </div>
    </Form>
  );
};
