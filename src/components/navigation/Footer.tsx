import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
    <footer className="bg-primary/50 flex flex-row text-lg justify-between border-t-[1px] p-4 border-[black] w-full">
        <ul className="flex flex-col gap-4">
            <li>
                <h2 className="font-bold">Atencion al cliente</h2>
                <p>ayuda@gmail.com</p>
            </li>

            <Link
                to="/users/Login"
                className="text-black hover:text-blue-700 cursor-pointer"
            >
                Centro de ayuda
            </Link>
        </ul>

        <ul className="flex flex-col gap-4">
            <Link
                to="/users/Login"
                className="text-black hover:text-blue-700 cursor-pointer"
            >
                Términos de uso
            </Link>

            <Link
                to="/users/Login"
                className="text-black hover:text-blue-700 cursor-pointer"
            >
                Privacidad
            </Link>
        </ul>

        <ul className="flex flex-col">
            <Link
                to="/users/Login"
                className="text-black hover:text-blue-700 cursor-pointer"
            >
                Sobre nosotros
            </Link>
            <Link
                to="/users/Login"
                className="text-black hover:text-blue-700 cursor-pointer"
            >
                Preguntas frecuentes
            </Link>
        </ul>
    </footer>
);

export default Footer;
