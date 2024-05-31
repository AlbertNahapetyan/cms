import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";


const WithAuth = (Component) => {
    return (props) => {
        const router = useRouter();
        const [verified, setVerified] = useState(false);

        const verifyToken = async (authToken) => {
            if(!authToken) return

            try {
                const {data} = await axios.post("/api/auth/verify-token", {token: authToken});

                if (data?.isLoggedIn) {
                    setVerified(true);
                } else {
                    router.replace('/auth/sign-in');
                }
            } catch (e) {
                router.replace('/auth/sign-in');
            }
        }

        useEffect(() => {
            const authToken = localStorage.getItem("authToken");

            if(!authToken) {
                router.replace('/auth/sign-in');
            } else {
                verifyToken(authToken);
            }
        }, []);


        if(verified) return <Component {...props} />
        return null;
    }
}

export default WithAuth;