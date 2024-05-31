import DynamicForm from "@/components/pages/EditEntryPage/DynamicForm";
import Button from "@/components/shared/Button";
import Link from "next/link";
import axios from "axios"
import { useState } from "react";
import { useRouter } from "next/router";

const EditEntryPage = ({ model, modelName }) => {
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (data) => {
        try {
            const authToken = localStorage.getItem("authToken")
            await axios.patch(`/api/models/${modelName}/update/${model.id}`, data, {
                headers: { Authorization: `Bearer ${authToken}`}
            })
            setError("")
            router.push(`/models/${modelName}`)
        } catch (e) {
            setError(e.response?.data?.error)
        }
    }

    return (
        <section className="h-screen bg-slate-800 text-gray-300">
            <div className="container mx-auto p-4">
                <DynamicForm data={model} onSubmit={handleSubmit} />
                {error ? (
                    <p className="flex justify-center mt-6 font-sans text-sm text-red-400 antialiased font-light leading-normal text-inherit">
                        {error}
                    </p>
                ) : null}
                <Link href="/">
                    <Button className="block bg-teal-400 hover:bg-teal-500 mt-4">{"<-- Back Home"}</Button>
                </Link>
            </div>
        </section>
    )
}

export default EditEntryPage