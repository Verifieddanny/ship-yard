import AuthModal from "./auth/auth-modal";

interface NavbarProps {
    onOpenAuth: () => void;
}

function Navbar({ onOpenAuth }: NavbarProps) {
    return (
        <nav className='w-full sticky top-0 bg-background/80 backdrop-blur-3xl z-50 max-w-325 mx-auto md:px-8 md:py-4.5 px-4 py-3 flex items-center justify-between font-mono '>
            <p className='font-bold text-[1.125rem] text-white'>Shipyard</p>

            <div className='font-sans'>
                <button
                    onClick={onOpenAuth}
                    type='button'
                    className='text-[#A3A3A3] text-sm cursor-pointer hover:text-[#ffffff] transition-colors duration-200'
                >
                    Sign In
                </button>

                <button
                    onClick={onOpenAuth}
                    type='button'
                    className='text-[#001E2F] text-sm ml-4 bg-linear-to-br from-[#89CEFF] to-[#0EA5E9] px-4 py-2 rounded-sm font-semibold cursor-pointer hover:from-[#0EA5E9] hover:to-[#89CEFF] transition-colors duration-200'
                >
                    Sign up
                </button>
            </div>
        </nav>

    )
}

export default Navbar