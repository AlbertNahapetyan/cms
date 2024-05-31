import { getConfig } from "@/utils/getConfig";
import axios from "axios";

const handler = async (req, res) => {
    const apiHost = getConfig('server.apiHost')
    const bearer = req.headers.authorization
    const { modelName } = req.body

    try {
        const request = {
            method: 'DELETE',
            url: `${apiHost}/models`,
            headers: {
                'Authorization': bearer
            },
            data: { modelName }
        }

        const { data } = await axios(request)
        res.status(200).json(data)
    } catch (e) {
        console.error('delete model error', e.response.data)
        res.status(400).json({ error: e.response?.data?.error || "Something went wrong..." })
    }
}

export default handler