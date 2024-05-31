import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa"
import axios from "axios";
import cookies from "js-cookie";

const SideBar = ({ models }) => {
    const router = useRouter()

    const navigate = (path) => () => {
        router.push(path)
    }

    const handleSignOut = () => {
        localStorage.removeItem("authToken")
        cookies.remove("authToken")
        router.push("/auth/sign-in")
    }

    const deleteModel = (modelName) => async () => {
        try {
            const authToken = localStorage.getItem("authToken")

            await axios.post("/api/models/delete",  { modelName }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

            router.push("/")
        } catch (e) {
            console.error(`Error while deleting model ${modelName}`, e.message)
        }
    }

    const createEntry = (model) => (e) => {
        e.stopPropagation()
        router.push(`/models/${model.toLowerCase()}/create`)
    }

    return (
        <div className="bg-slate-950 h-screen w-1/5 fixed left-0 top-0">
            <div className="p-4 text-gray-300">
                <h2 className="text-lg font-bold mb-4">Models</h2>
                <ul>
                    {models.map(model => (
                        <li onClick={navigate(`/models/${model.toLowerCase()}`)} key={model} className="group flex justify-between items-center hover:bg-gray-800 rounded-lg p-2 cursor-pointer">
                            {model}

                            <div className="flex">
                                <FaEdit onClick={createEntry(model)} className="hidden group-hover:block ml-2"  />
                                <MdDelete onClick={deleteModel(model)} className="hidden group-hover:block ml-2" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-4">
                <button onClick={navigate("/create/model")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline">
                    Create Model
                </button>
            </div>

            <div className="p-4">
                <button
                    onClick={handleSignOut}
                    className="py-2 px-4 w-1/2 mt-16 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default SideBar