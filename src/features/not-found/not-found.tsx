import { ROUTES } from "@/router/models"
import { Link } from "react-router-dom"

export const NotFound = () => {
    return <section className="h-screen flex flex-col gap-2 justify-center items-center">
        <h1 className="text-8xl font-black text-amber-500">404</h1>
        <h2 className="mb-8 font-semibold text-lg">Not Found</h2>
        <p>It appears that the address you are trying to access does not exist.</p>
        <Link to={ROUTES.PRODUCTS} className='bg-gray-200 mt-8 flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-900 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95'>Go back to main page</Link>
    </section>
}