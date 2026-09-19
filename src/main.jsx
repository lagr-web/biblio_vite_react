// main.jsx

/*
Den model, som er bygget her, 
er en React Router Data-Architecture (eller en Layered (MVC-Model(Model-View-Controller)) i frontend-regi).

-------------------------------------------------------------------------------------------------------------
[ UI / Visning ]          -->  [ Controller / Orkestrering ]  -->  [ API / Datalag ]
Pages & Components             Handlers (Loaders & Actions)        data.js
(Admin.jsx & PostFormData)     (adminHandlers.js)
---------------------------------------------------------------------------------------------------------

de tre gyldne regler i modellen:
Komponenterne (Admin.jsx, PostFormData.jsx) må overhovedet ikke vide, hvad din backend hedder,
 eller hvilke endpoints der findes. 
 De kalder bare useLoaderData() for at få rå data serveret, eller bruger <Form> / useFetcher() 
 til at sende data væk.
 
 Handlers (adminHandlers.js, bookHandlers.js) fungerer som mellemmænd (controllers). 
 De tager imod anmodninger fra routeren, kalder de rigtige funktioner i dit datalag, 
 og returnerer resultatet ({ success: true } eller { error: ... }) tilbage til React Router.
 
 Datalaget (data.js) er den eneste fil i hele din applikation, 
 der rent faktisk kender til din API_URL og laver de rå fetch()-kald mod din Node.js/Express-backend.
--------------------------------------------------------------------------------------------------------
Forklaring på MVC:
 1. View (Visningen) – KomponenterneDefinition:
Alt det, som brugeren kan se og interagere med i browseren. 
Dette lag håndterer udelukkende design, layout og HTML/JSX.
I applikationen: Admin.jsx, Card.jsx, PostFormData.jsx samt CSS-styling.

Ansvarsområde: At modtage færdigbehandlet data og præsentere det visuelt på skærmen, 
samt at opfange brugerhandlinger (f.eks. klik på en "Slet"-knap).
------------------------------------------------------------------------------------------------------
 2. Controller (Styringen) – Handlers
 Definition: Applikationens logiske bindeled eller mellemmand. 
 Dette lag modtager input fra Viewet, træffer beslutning om den næste handling, 
 rekvirerer de nødvendige data fra Modellen og sender resultatet tilbage til visningen.
 I applikationen: adminHandlers.js (indeholdende adminLoader og adminAction).

 Ansvarsområde: At orkestrere dataflowet. 
 Det sikrer, at en DELETE-anmodning sender besked til datalaget om at slette, 
 hvorefter React Router instrueres i at opdatere visningen automatisk.
-------------------------------------------------------------------------------------------------------
 3. Model (Data og forretningslogik) – Datalag & Backend
 
 Definition: Selve rådataene, databasestrukturen og reglerne for datamanipulation. 
 Dette lag opererer uafhængigt af brugergrænsefladen og indeholder ingen HTML eller JSX.
 
I applikationen: data.js samt Node.js/Express-backenden og MongoDB-databasen.
 
Ansvarsområde: At administrere datakilderne og eksekvere de rå fetch-kald mod specifikke
API-endpoints som ${API_URL}/addbook eller /delete/:id.
------------------------------------------------------------------------------------------------------

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
