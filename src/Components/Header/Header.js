import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-white h-screen justified-flex flex-col mt-20 mb-20">
            <h1 className="lg:text-9xl md-text-7xl sm:text-5xl text-3xl font-black mb-14">
                Be a Blog Legend Today
            </h1>
            <Link
                to="/"
                className="py-6 px-10 text-3xl bg-blue-300 rounded-full hover:bg-blue-500 animatedButton animate-bounce ml-5"
            >
                Start Now
                {/* HeroIcon Arrow Right */}
                <svg
                    className="w6h6 ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
            </Link>
        </div>
    );
};

export default Header;
