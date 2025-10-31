import { Outlet } from "react-router-dom"

export const NotAuthenticatedLayout = () => {
    return (
    <main className='min-h-screen my-16 mx-8'>
        <Outlet />
    </main>
    )
}