import React from 'react'
import { Link } from 'react-router-dom'

export const FrontMenu = () => {
  return (
    <nav className="bg-black text-white p-1 grid grid-cols-2">
        <Link to="/">Forside</Link>
      </nav>
  )
}
