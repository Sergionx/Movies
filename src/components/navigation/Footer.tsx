import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-primary/50 flex flex-row text-lg justify-between border-t-[1px] p-4 border-[black] w-full">
    <ul className="flex flex-col gap-4">
      <li>
        <h2 className="font-bold">Atencion al cliente</h2>
        <p>ayuda@gmail.com</p>
      </li>

      <li>
        <h2 className="font-bold">Servicio</h2>
        <p>servicio@gmail.com</p>
      </li>
    </ul>

    <ul className="flex flex-col">
      <li>
        <h2 className="font-bold">Contactanos!</h2>
        <p>0424-128282882822</p>
      </li>
      <li>
        <h2 className="font-bold">Usuario de ig</h2>
        <p>ServicioPelis</p>
      </li>
    </ul>
  </footer>
);

export default Footer;
