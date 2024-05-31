import { getConfig } from "@/utils/getConfig";
import axios from "axios";

const handler = async (req, res) => {
    const apiHost = getConfig('server.apiHost')
    const { email, password } = req.body
    try {
        const { data } = await axios.post(`${apiHost}/auth/sign-up`, { email, password })
        res.status(200).json(data)
    } catch (e) {
        console.error('sign-up error', e.response.data)
        res.status(400).json({ error: e.response?.data?.error || "Something went wrong..." })
    }
}

export default handler