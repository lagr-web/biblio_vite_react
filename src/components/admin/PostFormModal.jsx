import React from "react";
import { createPortal } from "react-dom";
import { PostFormData } from "./PostFormData";


export const PostFormModal = ({ show, onClose }) => 
  {
  if (!show) return null;

  return (
    <>
      {createPortal(
        <>
          <div
            className="fixed z-30 w-full h-full top-0 bg-black opacity-80"
            onClick={onClose}
          ></div>
          <div className="fixed z-40 w-96 p-10 mx-auto bg-white text-black top-20 left-1/2  transform -translate-x-1/2 rounded-md">
            <div> <PostFormData onClose={onClose} /> </div>
          </div>
        </>,
        document.body,
      )}
    </>
  );
};
