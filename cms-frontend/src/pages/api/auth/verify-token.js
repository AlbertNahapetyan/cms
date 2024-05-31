import { getConfig } from "@/utils/getConfig";
import axios from "axios";

const handler = async (req, res) => {
    const apiHost = getConfig('server.apiHost')
    const { token } = req.body

    const request = {
        method: 'GET',
        url: `${apiHost}/auth/verify-token`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const { data } = await axios(request)
        res.status(200).json(data)
    } catch (e) {
        console.error('verify-token error', e.message)
        res.status(400).json({ error: e.message || 'Invalid Token' })
    }
}

export default handler