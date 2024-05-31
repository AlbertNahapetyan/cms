import EditEntryPage from "@/components/pages/EditEntryPage";
import axios from "axios";
import { parseCookies } from "nookies";
import WithAuth from "@/components/HOC/withAuth";

const EditEntry = (props) => <EditEntryPage {...props} />

export const getServerSideProps = async (ctx) => {
    const { mid, rid } = ctx.params
    const { authToken } = parseCookies(ctx)
    let model = {}

    try {
        const { data } = await axios.get(`http://localhost:3000/api/models/${mid}/${rid}`,
            { headers: { Authorization: `Bearer ${authToken}`  }
        })

        model = data
    } catch (e) {
        console.error(`Error while getting entry ${mid}.${rid}`, e.message)
    }

    return {
        props: { model, modelName: mid }
    }
}

export default WithAuth(EditEntry)

