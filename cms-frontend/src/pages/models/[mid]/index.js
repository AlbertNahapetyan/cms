import ModelPage from "@/components/pages/ModelPage";
import { parseCookies } from "nookies";
import axios from "axios";
import WithAuth from "@/components/HOC/withAuth";

const Model = (props) => <ModelPage {...props} />

export const getServerSideProps = async (ctx) => {
    const { mid } = ctx.params
    const { authToken } = parseCookies(ctx)
    let modelData = [];
    let models = [];

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

    try {
        const { data } = await axios.get(`http://localhost:3000/api/models/${mid}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })

        modelData = data
    } catch (e) {
        console.error(`Error in getting data for model ${mid}`, e.message)
    }

    return {
        props: { modelData, models, modelName: mid }
    }
}

export default WithAuth(Model)