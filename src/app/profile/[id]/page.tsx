export default function UserProfilePage({params}: any) {
    return (
        <main className="flex bg-[#f9f9f9] flex-col justify-center items-center min-h-screen py-2 gap-10">
            <h1 className={"text-4xl font-bold"}>Profile</h1>

            <section className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">{params.id}</h2>
                        <p className="text-gray-500">
                            <span className="font-bold">Email:</span>
                            <span> johndoe@gmail.com</span>
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold">Username:</span>
                            <span> john_doe</span>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}