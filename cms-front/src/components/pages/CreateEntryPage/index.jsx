import EntryForm from "@/components/pages/CreateEntryPage/EntryForm";
import Button from "@/components/shared/Button";
import Link from "next/link";

const CreateEntryPage = ({ model }) => {
    return (
        <section className="h-screen bg-slate-800 text-gray-300">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Create entry for model {model.name}:</h1>
                <EntryForm fields={model.fields} modelName={model.name} />
                <Link href="/">
                    <Button className="block bg-teal-400 hover:bg-teal-500 mt-4">{"<-- Back Home"}</Button>
                </Link>
            </div>
        </section>
    )
}

export default CreateEntryPage