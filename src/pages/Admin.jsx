import { useState } from "react";
import { PostFormModal } from "../components/admin/PostFormModal";
import { useLoaderData, useFetcher } from "react-router-dom"; // Importer useFetcher her
import { Card } from "../components/admin/Card";
import { ModalConfirmDeleteBox } from "../components/admin/ModalConfirmDeleteBox"; // Importer slettemodalen her

export const Admin = () => {
  const [showModal, setShowModal] = useState(false);

  // STATS TIL SLETTEFLOW:
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeDeleteData, setActiveDeleteData] = useState(null);

  const { books } = useLoaderData();
  const fetcher = useFetcher(); // 👈 Lad admin-siden have fetcheren nu

  return (
    <>
      <nav className="bg-black text-white p-1 grid grid-cols-2">
        <div>Admin</div>
        <div
          className="flex justify-end items-center p-1 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          Opret en ny bog
        </div>
      </nav>

      <section className="z-0 container mx-auto my-10">
        <div className="grid grid-cols-1 mx-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 md:mx-2 lg:mx-40">
          {books &&
            books.map((item) => (
              <Card
                key={item._id}
                data={item}
                // Send en funktion med ned, som åbner slettemodalen med dette korts data
                onDeleteClick={(bookData) => {
                  setActiveDeleteData(bookData);
                  setShowDeleteModal(true);
                }}
              />
            ))}
        </div>
      </section>

      {/* Oprettelses-modal */}
      <PostFormModal show={showModal} onClose={() => setShowModal(false)} />

      {/* ✅ Slette-modalen ligger nu stabilt her på Admin-niveau og overlever sletningen! */}
      <ModalConfirmDeleteBox
        show={showDeleteModal}
        data={activeDeleteData}
        fetcher={fetcher}
        onClose={() => {
          setShowDeleteModal(false);
          setActiveDeleteData(null);
        }}
      />
    </>
  );
};
