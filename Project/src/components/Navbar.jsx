
const Navbar = () => {
    return (
        <nav className="z-20 fixed top-0 w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center md:justify-center justify-end mx-auto border-b-gray-300 border-b px-8 py-4 md:border-0">
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-300 rounded-full md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:px-9 md:py-2">
                        <li>
                            <a href='/' className="block transition hover:transition py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-50 md:dark:hover:text-red-500">Inicio</a>
                        </li>
                        <li>
                            <a href='https://github.com/9tiuu/Statistic-project' className="block transition hover:transition py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-50 md:dark:hover:text-red-500">GitHub</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
};

export default Navbar;