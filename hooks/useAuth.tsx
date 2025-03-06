import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useRouter } from "next/router";

export function useAuth(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (token){
            const declaredToken = jwtDecode<JwtPayload>(token);
            const currentTIme = Date.now() / 1000;
            if (declaredToken.exp && declaredToken.exp < currentTIme){
                console.log("token expired");
                localStorage.removeItem("token");
                router.push("/");
            } else {
                setIsAuthenticated (true);
            }
        } else {
            router.push("/");
        }
    }, [router]);

    return isAuthenticated;
}