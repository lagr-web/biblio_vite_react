// src/App.jsx
import { Outlet } from 'react-router-dom';

export default function App() {
  return <Outlet />; // Renderer blot det layout eller den side, der matcher URL'en
}
