import { getConfig } from "@/utils/getConfig";
import axios from "axios";

const handler = async (req, res) => {
    const apiHost = getConfig('server.apiHost')
    const bearer = req.headers.authorization
    const { mid, rid } = req.query

    try {
        const request = {
            method: 'PATCH',
            url: `${apiHost}/api/${mid}/${rid}`,
            headers: {
                'Authorization': bearer
            },
            data: req.body
        }

        const { data } = await axios(request)
        res.status(200).json(data)
    } catch (e) {
        console.error(`get entry ${mid}.${rid}`, e.response.data)
        res.status(400).json({ error: e.response?.data?.error || "Something went wrong..." })
    }
}

export default handler