import { useEffect, useRef, useState } from 'react';

const CustomSelect = ({ options, onSelect, nameOption }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const selectRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option: any) => {
        setSelectedOption(option.label);
        setIsOpen(false);
        onSelect(option.value);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className="relative">
            <button
                onClick={toggleDropdown}
                className="min-w-48 w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 flex items-center justify-between focus:outline-none focus:border-blue-500"
            >
                {selectedOption || `Select ${nameOption}`}
                <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {options.map((option: any) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelectOption(option)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
