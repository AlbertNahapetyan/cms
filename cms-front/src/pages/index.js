import HomePage from "@/components/pages/HomePage";
import WithAuth from "@/components/HOC/withAuth";
import axios from "axios";
import { parseCookies } from "nookies";

const Home = (props) => <HomePage {...props} />

export const getServerSideProps = async (ctx) => {
    let models = [];
    const { authToken } = parseCookies(ctx)

    try {
        const { data } = await axios.get("http://localhost:3000/api/models", {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })

        models = data?.models
    } catch (e) {
        console.error("Error in getting models", e.message)
    }

    return {
        props: { models }
    }
}

export default WithAuth(Home)