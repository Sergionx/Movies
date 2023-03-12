import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Footer from "../components/navigation/Footer";
import Header from "../components/navigation/LandingHeader";
import AuthProvider from "../contexts/AuthProvider";
import { useAuth } from "../hooks/useAuth";

function ProtectedLayout() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        console.log("dame un momento para cargar");
        return (
            <>
                <div>
                    <Header />
                    <div className="bg-gray-400 mt-[7rem] relative h-48 w-full p-[15rem]">
                        <Loading
                            svgClass="h-[20rem] w-[20rem]"
                            statusClass="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                        />
                    </div>
                    <Footer />
                </div>
            </>
        );
    }

    // // TODO - Crear componente para usuario no logueado
    // if (!user) {
    //     setTimeout(() => {
    //         console.log(
    //             "No estas logueado mi loco, seras redirigido en 5 segundos al login"
    //         );
    //         navigate("/users/login");
    //     }, 5000);
    //     return (
    //         <h1>
    //             No estas logueado mi loco, seras redirigido en 5 segundos al
    //             login
    //         </h1>
    //     );
    // }

    return (
        <>
            <div>
                <Header />
                <div className="bg-white mt-[7rem]">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default ProtectedLayout;
