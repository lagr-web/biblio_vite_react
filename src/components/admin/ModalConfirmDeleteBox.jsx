import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

export const ModalConfirmDeleteBox = ({ show, data, onClose, fetcher }) => {
    
  const okRefElement = useRef();
  const [isShown, setIsShown] = useState(true); // Styrer visning af feedback

  // ✅ Hvis vores fetcher melder succes, viser vi feedback-beskeden og lukker modalen
  useEffect(() => {
    
    if (fetcher?.data?.success) {
      setIsShown(false); // Vis feedback ("Dine data er slettet")

const timer = setTimeout(() => {
      setIsShown(true); // Nulstil visningen af feedback til næste gang
      onClose();       // Luk modalen ordentligt
    }, 1500);

     return () => clearTimeout(timer);
      
 
    }
  }, [fetcher?.data, onClose]);

  if (!show) return null;

  const handleSubmit = (e) => {

    e.preventDefault();
    if (fetcher) {
      // ✅ Sender anmodningen direkte op til din adminAction i adminRoutes.js
      fetcher.submit(
        { id: data._id }, // Sender bogens id med som FormData
        { method: "DELETE" } // Matcher if (request.method === "DELETE") i din router
      );
    }
  };

  return (
    <>
      {data &&
        createPortal(
          <>
            {/* baggrund */}
            <div className="fixed z-30 w-full h-full top-0 bg-black opacity-80" onClick={onClose}></div> 
            
            <div className="grid-row-3 fixed z-40 w-96 p-3 mx-auto bg-white text-black top-20 left-1/2 transform -translate-x-1/2 rounded">
              <div className="w-full text-center mt-10">
                Vil du slette: <span className="font-bold">{data.title}</span>
              </div>
              <div className="h-20"></div>
              
              <div className="w-full flex justify-end justify-bottom">
                {/* Vi ændrer onClick til at køre vores nye handleSubmit */}
                <button type="button" onClick={handleSubmit} className="deleteButton">
                  Slet
                </button>
                <button type="button" className="cancelButton" onClick={onClose}>
                  Anullere
                </button>
              </div>

              <div ref={okRefElement} className={`feedback ${isShown ? "hidden" : "block"}`}>
                Dine data er slettet
              </div>
            </div>
          </>,
          document.body
        )
      }
    </>
  );
};
