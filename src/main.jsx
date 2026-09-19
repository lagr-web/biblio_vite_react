// main.jsx

/*
Den model, som er bygget her, 
er en fuldstændig fuldblods React Router Data-Architecture (eller en Layered MVC-Model i frontend-regi).


[ UI / Visning ]          -->  [ Controller / Orkestrering ]  -->  [ API / Datalag ]
Pages & Components             Handlers (Loaders & Actions)        data.js
(Admin.jsx & PostFormData)     (adminHandlers.js)

de tre gyldne regler i modellen:

De 3 gyldne regler i modellen:

Komponenterne (Admin.jsx, PostFormData.jsx) må overhovedet ikke vide, hvad din backend hedder,
 eller hvilke endpoints der findes. 
 De kalder bare useLoaderData() for at få rå data serveret, eller bruger <Form> / useFetcher() 
 til at sende data væk.
 
 Handlers (adminHandlers.js, bookHandlers.js) fungerer som mellemmænd (controllers). 
 De tager imod anmodninger fra routeren, kalder de rigtige funktioner i dit datalag, 
 og returnerer resultatet ({ success: true } eller { error: ... }) tilbage til React Router.
 
 Datalaget (data.js) er den eneste fil i hele din applikation, 
 der rent faktisk kender til din API_URL og laver de rå fetch()-kald mod din Node.js/Express-backend.

*/

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./style.css";
import{router} from "./routes/router"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
