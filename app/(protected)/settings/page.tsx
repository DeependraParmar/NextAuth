import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
    const session = await auth();

    return (
        <>
            <div className="m-4">
                {JSON.stringify(session)}
            </div>
            <div>
                <form action={async () => {
                    "use server";
                    await signOut({
                        redirect: true,
                        redirectTo: '/auth/login'
                    });
                }}>
                    <button type="submit">Logout</button>
                </form>
            </div>
        </>
    )
}

export default SettingsPage
