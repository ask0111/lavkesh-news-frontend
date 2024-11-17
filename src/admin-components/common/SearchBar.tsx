import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    placeholder: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({placeholder, onChange, onClick}) => {
    return (
        <div className="relative sm:w-96 mx-auto text-gray-600 p-2">
            <input
                className="border-2 p-2 w-full border-gray-300 bg-white h-10 pl-4 pr-8  rounded-full text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder={placeholder}
                onChange={onChange}
            />
                        {/* <FaSearch className=" text-gray-400 mr-2 " /> */}

            <button onClick={onClick} type="submit" className="absolute right-[5px] top-[7px] mt-3 mr-4 transform hover:scale-150 hover:text-blue-600 transition duration-300">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;
