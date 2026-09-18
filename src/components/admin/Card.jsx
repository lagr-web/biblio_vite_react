import React from 'react'

import { API_URL } from '../../config'

export const Card = (props) => {

     const imageSrc = {
        src: `${API_URL}/images/${props.data.image}`
    }


  return (

    <>

            <article className="grid-row-2 shadow-[0px_0px_5px_0px] rounded-lg bg-white">

                <section className="bg-[#557d85] text-white p-1 rounded-t-lg grid grid-cols-2">
                    <h2 className="p-1 font-bold w-96">{props.data.title}</h2>
                    <div className="flex justify-end items-center p-1">
                        <img
                            src="/assets/close.svg"
                            className="w-5 h-5 cursor-pointer"
                        />
                    </div>
                </section>
                <section className="grid grid-cols-2">
                    <div className='relative w-42 h-42 bg-gray-100 m-2'>

                


                         <img
                            {...imageSrc}
                            alt={props.data.title}
                            className="h-full w-full object-cover"
                            loading="lazy" // Giver lazy-loading ligesom Next.js komponenten
                        />


                    </div>
                    <div className="grid grid-row-6 mt-1 mr-2 mb-2 md:mb-2 lg:mb-2">
                        <h3 className="font-bold">forfatter</h3>
                        <p className="h-10">{props.data.author}</p>
                        <h3 className="font-bold">Genre</h3>
                        <p>{props.data.genre}</p>
                        <p className="mb-6"></p>
                        <div className="text-left">
                            <button
                                className="btn-read"

                            >Opdater</button>
                        </div>
                    </div>
                </section>
            </article>
        </>


  )
}
