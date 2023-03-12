import React, { useState, useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import registerImg from "../../assets/images/Register.jpg";
import { createUser } from "../../firebase/api";

import { toast } from "react-toastify";

import googleIcon from "../../assets/icons/google.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import { Client } from "../../interfaces/Client";
import { useAuth } from "../../hooks/useAuth";

export const Register = (prop: any) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarcontraseña, setconfirmarcontraseña] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length <= 7) {
      toast.warning("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (
      email === "" ||
      password === "" ||
      nombre === "" ||
      confirmarcontraseña === ""
    ) {
      toast.warning("No puedes dejar espacios en blanco", {
        position: "top-right",
      });
      return;
    }

    if (password !== confirmarcontraseña) {
      toast.warning("Las contraseñas no coinciden");
      return;
    }

    try {
      const user: Client | null = {
        email: email,
        name: nombre,
      };
      const userCredential = await register(user, password);
      
      if(userCredential){
        toast.success("Cuenta creada con exito");
        setTimeout(() => {
          navigate("/users/login");
        }, 2000);

      } else {
        toast.error("No se pudo crear la cuenta");
      }

      console.log(userCredential);
    } catch (error: any) {
      console.log(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("El correo ya esta en uso");
          break;

        case "auth/invalid-email":
          toast.error("El correo no es valido");
          break;

        case "auth/weak-password":
          toast.error("La contraseña es muy débil");
          break;

        case "auth/operation-not-allowed":
          toast.error("No se puede crear una cuenta con este correo");
          break;

        default:
          toast.error("Error al crear la cuenta");
          console.log(error);
          break;
      }
    }
  }

  return (
    <>
      <div className="bg-gray-300/40 px-14 py-7">
        <div
          className="backdrop-blur-lg bg-white  drop-shadow-lg
            flex flex-row p-6 rounded-2xl justify-center"
        >
          <div className="w-[50%] lg:flex hidden justify-center">
            <img
              src={registerImg}
              className="h-[45rem] w-[30rem]  rounded-lg"
            />
          </div>
          <main className="flex flex-col  justify-center lg:basis-1/2">
            <p className="text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/users/Login"
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Inicia sesión
              </Link>
            </p>
            <h1 className="text-2xl font-bold text-center">
              Películas y series ilimitadas y mucho más
            </h1>
            <h2 className="text-center text-xl font-medium">
              Registrate ingresando los siguientes datos
            </h2>
            <form className="self-center" onSubmit={handleSubmit}>
              <section className="my-10 flex flex-col sm:flex-row justify-center gap-5 w-64 self-center ">
                <div className="flex flex-col gap-5">
                  <input
                    className="rounded-lg p-4 border-2 border-primary-strong outline-none"
                    placeholder="Ingrese su nombre y apellido"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  ></input>

                  <input
                    className="rounded-lg p-4 border-2 border-primary-strong outline-none"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>

                <div className="flex flex-col gap-5">
                  <input
                    className="rounded-lg p-4 border-2 border-primary-strong outline-none"
                    placeholder="Contraseña"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>

                  <input
                    className="rounded-lg p-4 border-2 border-primary-strong"
                    placeholder="Confirmar contraseña"
                    value={confirmarcontraseña}
                    type="password"
                    onChange={(e) => setconfirmarcontraseña(e.target.value)}
                  ></input>
                </div>
              </section>

              {/* TODO - Cambiar bg-green */}
              <button
                type="submit"
                className="w-full py-3 text-black font-bold rounded-lg shadow-lg
                bg-primary-light hover:bg-primary-normal hover:scale-95 active:scale-90
                  hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
              >
                REGISTRARSE
              </button>
            </form>

            <footer className="mb-5">
              <p className="text-center">O inicia sesión con</p>
              <div className="flex justify-center gap-5 mt-5">
                <button
                  className="bg-white hover:bg-gray-100 active:ring-1 ring-black font-bold py-2 px-4 rounded-full 
                drop-shadow-md hover:drop-shadow-lg"
                >
                  <img src={facebookIcon} />
                </button>
                <button
                  className="bg-white hover:bg-gray-100 active:ring-1 ring-black font-bold py-2 px-4 rounded-full 
                drop-shadow-md hover:drop-shadow-lg"
                >
                  <img src={googleIcon} />
                </button>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
};

export default Register;
