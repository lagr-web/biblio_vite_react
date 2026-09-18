import { useState } from "react";
import { PostFormModal } from "../components/admin/PostFormModal";
import { useLoaderData } from "react-router-dom";
import { Card } from "../components/admin/Card";
export const Admin = () => {
  const [showModal, setShowModal] = useState(false);

  const data = useLoaderData();

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
          {data && data.map((item) => <Card key={item._id} data={item} />)}
        </div>
      </section>

      <PostFormModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
