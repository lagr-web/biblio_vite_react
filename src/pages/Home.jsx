import React from 'react'
import { useLoaderData, Link } from 'react-router-dom';

import { FrontMenu } from '../components/FrontMenu';

const Home = () => {


  const genreData = useLoaderData(); 

  return (
     <div>

   <FrontMenu />


      <h1 className='bg-amber-50'>Le frontPage!</h1>
      <h2>Genrer:</h2>
      <ul>
        {genreData && genreData.map((genre) => (
          <li key={genre.id}>
            {/* Vi linker dynamisk til /about/ efterfulgt af genrens slug */}
            <Link to={`/genre/${genre.slug}`}>
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Home;