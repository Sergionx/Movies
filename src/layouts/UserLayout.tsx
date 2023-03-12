import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthProvider from "../contexts/AuthProvider";
import { useAuth } from "../hooks/useAuth";
import LandingHeader from "../components/navigation/LandingHeader";

function UserLayout() {
    const { user, loading } = useAuth();

    // TODO - Crear componente para cargar
    // if (loading) {
    //   return (
    //     <>
    //       <AuthProvider>
    //         <h1>Loading</h1>
    //       </AuthProvider>
    //     </>
    //   );
    // }

    return (
        <>
            <div>
                <LandingHeader />
                <div className="bg-white mt-[7rem]">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default UserLayout;
