import CreateEntryPage from "@/components/pages/CreateEntryPage";
import axios from "axios"
import { parseCookies } from "nookies";
import WithAuth from "@/components/HOC/withAuth";

const CreateEntry = (props) => <CreateEntryPage {...props} />

export const getServerSideProps = async (ctx) => {
    let model = {};
    const { authToken } = parseCookies(ctx)
    const { mid } = ctx.params

    try {
        const { data } = await axios.get(`http://localhost:3000/api/models/${mid}/structure`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })


        model = data.model
    } catch (e) {
        console.error("Error in getting models", e.message)
    }

    return {
        props: { model }
    }
}


export default WithAuth(CreateEntry)