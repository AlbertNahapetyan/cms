import DynamicTable from "@/components/pages/ModelPage/DynamicTable";
import SideBar from "@/components/shared/SideBar";

const ModelPage = ({ modelData, models, modelName }) => {
    return (
        <section className="h-screen w-full bg-slate-800 pr-2">
            <SideBar models={models} />
            <DynamicTable data={modelData} modelName={modelName} />
        </section>
    )
}

export default ModelPage