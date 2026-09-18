import React from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";
import { FrontMenu } from "../components/FrontMenu";

const Books = () => {
  const genreDetails = useLoaderData(); // Data fra din getGenreBySlug-funktion
  const { slug } = useParams(); // Giver dig selve strengen "science.fiction" fra URL'en

  console.log(genreDetails);

  return (
    <div>
    
    <FrontMenu />
    
      <h1>Om genren: {slug}</h1>

      <ul>
        {genreDetails &&
          genreDetails.map((bookgenre) => (
            <li key={bookgenre._id}>
              {/* Vi linker dynamisk til /about/ efterfulgt af genrens slug */}
              {bookgenre.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Books;
