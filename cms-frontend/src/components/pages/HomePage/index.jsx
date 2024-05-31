import SideBar from "@/components/shared/SideBar";

const HomePage = ({ models }) => {
    return (
        <section className="bg-gray-300">
            <SideBar models={models} />
            <section className="ml-table-margin w-4/5">
                <div className="flex flex-col min-h-screen bg-gray-300">
                    <main className="flex-1 container mx-auto py-8">
                        <section className="text-center">
                            <h1 className="text-3xl font-bold text-slate-950 mb-4">Welcome to Your CMS</h1>
                            <p className="text-gray-800 leading-loose">Manage your content seamlessly with Your CMS. Create, edit, and publish content with ease.</p>
                            <div className="mt-8">
                                <p className="text-gray-800 font-semibold mb-2">Get started by...</p>
                                <ul className="list-disc list-inside text-left">
                                    <li className="text-gray-800 flex items-center mb-2">
                                        <span className="rounded-full bg-gray-800 h-2 w-2 mr-2"></span>
                                        Creating models
                                    </li>
                                    <li className="text-gray-800 flex items-center mb-2">
                                        <span className="rounded-full bg-gray-800 h-2 w-2 mr-2"></span>
                                        Adding fields to your models
                                    </li>
                                    <li className="text-gray-800 flex items-center mb-2">
                                        <span className="rounded-full bg-gray-800 h-2 w-2 mr-2"></span>
                                        Defining relationships between your models
                                    </li>
                                    <li className="text-gray-800 flex items-center">
                                        <span className="rounded-full bg-gray-800 h-2 w-2 mr-2"></span>
                                        Managing user roles and permissions
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </main>
                </div>
            </section>
                <footer className="bg-slate-950 text-white py-4 w-full flex justify-center">
                    <div className="container text-center">
                        <p>&copy; {new Date().getFullYear()} Your CMS</p>
                    </div>
                </footer>
        </section>
    )
}

export default HomePage