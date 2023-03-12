import React, { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import psicoLogin from "../../assets/images/psicoLogin.png";
import googleIcon from "../../assets/icons/google.svg";
import githubIcon from "../../assets/icons/github.svg";
import { useAuth } from "../../hooks/useAuth";
//import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
//import Swal from "sweetalert2";

export const LogIn = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const userCredential = await login(email, password);

      if (userCredential) {
        setTimeout(() => {
          // TODO - Avisar que sera redirigido
          console.log("me voy");
          navigate("/movies");
        }, 2000);
      } else {
        toast.error("No se pudo inciar sesión");
      }
    } catch (error: any) {
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

        case "auth/user-not-found":
          toast.error("No se encontro un usuario con este correo");
          break;
        
        case "auth/wrong-password":
          toast.error("Contraseña incorrecta");
          break;
        
        case "auth/account-exists-with-different-credential":
          toast.error("Ya existe una cuenta con este correo");
          break;
        
        default:
          toast.error("Error al crear la cuenta");
          console.log(error);
          break;
      }
    }
  }
  const handleGoogleSignIn = async () => {
    await loginWithGoogle();
    navigate("/movies");
  };
  const handleGithubSignIn = async () => {
    await loginWithGithub();
    navigate("/movies");
  };
  return (
    <>
      <div className="bg-gray-300/40 px-14 py-7">
        <div
          className="backdrop-blur-lg bg-secondary drop-shadow-lg
                    flex flex-row p-6 rounded-2xl justify-center"
        >
          <main className="flex flex-col  justify-center lg:w-[50%]">
            <p className="text-center mb-12 text-white ">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/users/register"
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Registrate
              </Link>
            </p>
            <h1 className="text-2xl font-bold text-center text-white">
              INICIA SESIÓN
            </h1>

            <form
              className="my-10 flex flex-col justify-center gap-5 w-64 self-center"
              onSubmit={handleSubmit}
            >
              <input
                className="rounded-lg p-4 border-2 border-primary"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="rounded-lg p-4 border-2 border-primary"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <p className="text-white">Olvidaste tu contraseña?</p>

              <button
                type="submit"
                className="w-full py-3  font-bold rounded-lg shadow-lg
                bg-primary hover:bg-terciary2 hover:scale-95 active:scale-90
                hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100 text-white"
              >
                INICIAR SESIÓN
              </button>
            </form>

            <footer className="mb-5">
              <p className="text-center text-white">O inicia sesión con</p>
              <div className="flex justify-center gap-5 mt-5">
                <button
                  className="bg-white hover:bg-gray-100 active:ring-1 ring-black font-bold py-2 px-4 rounded-full 
                drop-shadow-md hover:drop-shadow-lg"
                  onClick={handleGithubSignIn}
                >
                  <img src={githubIcon} />
                </button>
                <button
                  className="bg-white hover:bg-gray-100 active:ring-1 ring-black font-bold py-2 px-4 rounded-full 
              drop-shadow-md hover:drop-shadow-lg"
                  onClick={handleGoogleSignIn}
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

export default LogIn;
