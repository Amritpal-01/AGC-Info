"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FilterIcon, SearchIcon, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';



const courses: string[] = [
    "BCA",
    "CSE",
    "Co. Eng",
    "Civil Eng",
    "Mech. Eng",
    "BBA",
]

const enrollYear: string[] = [
    "2024",
    "2025"
]

const semesters: number[] = [
    1,
    2
]

// Custom Dropdown Component
interface CustomDropdownProps<T> {
    label: string;
    options: T[];
    selectedValue: T | null;
    onSelect: (value: T | null) => void;
    placeholder: string;
}

const CustomDropdown = <T extends string | number>({
    label,
    options,
    selectedValue,
    onSelect,
    placeholder
}: CustomDropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (value: T | null) => {
        onSelect(value === selectedValue ? null : value); // Toggle selection
        setIsOpen(false);
    };

    return (
        <div className='w-48 mb-6 mx-2' ref={dropdownRef}>
            <h2 className='font-semibold text-xl text-gray-700 mb-3'>{label}</h2>
            <div className='relative'>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        flex items-center justify-between w-full px-5 py-2 rounded-full text-base font-medium transition-all duration-200 ease-in-out
                        ${selectedValue
                            ? 'bg-blue-600 text-white border border-blue-700 shadow-md'
                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:border-gray-400'
                        }
                    `}
                >
                    <span>{selectedValue !== null ? selectedValue : placeholder}</span>
                    <svg className={`fill-current h-4 w-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl shadow-lg mt-2 overflow-hidden"
                        >
                            {/* Option to clear selection */}
                            <li
                                onClick={() => handleOptionClick(null)}
                                className={`
                                    px-5 py-2 text-base font-medium cursor-pointer hover:bg-gray-100 transition-colors duration-200
                                    ${selectedValue === null ? 'bg-gray-100 text-gray-700' : 'text-gray-700'}
                                `}
                            >
                                {placeholder}
                            </li>
                            {options.map((option, i) => (
                                <li
                                    key={i}
                                    onClick={() => handleOptionClick(option)}
                                    className={`
                                        px-5 py-2 text-base font-medium cursor-pointer hover:bg-blue-100 transition-colors duration-200
                                        ${selectedValue === option
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-800'
                                        }
                                    `}
                                >
                                    {option}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    // State to hold the currently selected filter values
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
    const [showFiltes, setShowFilters] = useState<boolean>(true);

    // State to hold the combined filter object
    const [filterObject, setFilterObject] = useState<{
        course: string | null;
        year: string | null;
        semester: number | null;
    }>({
        course: null,
        year: null,
        semester: null,
    });

    // Effect to update the filterObject whenever any selection changes
    useEffect(() => {
        setFilterObject({
            course: selectedCourse,
            year: selectedYear,
            semester: selectedSemester,
        });
        console.log(filterObject)
        // You can log the filterObject here to see its current state
    }, [selectedCourse, selectedYear, selectedSemester]);

    // Handler for course button clicks
    const handleCourseClick = (course: string) => {
        setSelectedCourse(prevCourse => (prevCourse === course ? null : course));
    };

    // Handlers to remove individual filters
    const handleRemoveCourse = () => setSelectedCourse(null);
    const handleRemoveYear = () => setSelectedYear(null);
    const handleRemoveSemester = () => setSelectedSemester(null);

    return (
        <div className='overflow-y-scroll'>
            <Navbar />
            <div className='px-4 sm:px-6 md:px-10 py-5 w-full flex flex-col md:flex-row gap-3'>
                {/* Filter button with motion animation */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setShowFilters(!showFiltes) }}
                    className={`${showFiltes ? "text-red-700 hover:bg-red-200 bg-red-100 border border-red-300" : "text-green-700 hover:bg-green-200 bg-green-100 border border-green-300"} px-4 py-2 w-full md:w-fit h-10 rounded-xl flex items-center justify-center md:justify-around gap-2 text-lg font-medium shadow-sm transition-colors duration-200`}
                >
                    <FilterIcon size={20} /> <span className='text-lg'>{showFiltes ? "Hide Filters" : "Show Filters"}</span>
                </motion.button>

                <div className={`flex flex-wrap flex-1 px-0 md:px-4 gap-y-6 md:gap-y-0 md:gap-x-10 mt-4 md:mt-0  ${!showFiltes && "max-h-0 overflow-hidden"}`}>
                    {/* Filter Section: Course */}
                    <div className='w-full md:w-auto mb-6'>
                        <h2 className='font-semibold text-xl text-gray-700 mb-3'>Course</h2>
                        <div className='flex flex-wrap gap-3'>
                            {courses.map((course: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => handleCourseClick(course)}
                                    className={`
                                        px-5 py-2 rounded-full text-base font-medium transition-all duration-200 ease-in-out
                                        ${selectedCourse === course
                                            ? 'bg-blue-600 text-white border border-blue-700 shadow-md'
                                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:border-gray-400'
                                        }
                                    `}
                                >
                                    {course}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filter Section: Year (Custom Dropdown) */}
                    <CustomDropdown
                        label="Year"
                        options={enrollYear}
                        selectedValue={selectedYear}
                        onSelect={setSelectedYear}
                        placeholder="Select Year"
                    />

                    {/* Filter Section: Semester (Custom Dropdown) */}
                    <CustomDropdown
                        label="Semester"
                        options={semesters}
                        selectedValue={selectedSemester}
                        onSelect={setSelectedSemester}
                        placeholder="Select Semester"
                    />
                </div>
            </div>
            <div className='w-full flex pb-5 border-b border-black/20'>

                <div className='flex gap-3 relative items-center min-w-10 min-h-10 px-2 w-full'>
                    <div className='absolute px-2'>
                        <SearchIcon />
                    </div>
                    <input type='search' className=' bg-white border border-black/10 shadow-lg shadow-gray-200 w-full max-w-xl pl-10 pr-2 py-2 rounded-xl' placeholder='Browse Collections' />
                </div>

            </div>

            {/* Display Selected Filters with Remove Option */}
            <div className="p-4 sm:px-6 md:px-10 mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Applied Filters:</h3>
                <div className="flex flex-wrap gap-3">
                    {selectedCourse && (
                        <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-base font-medium border border-blue-300">
                            Course: {selectedCourse}
                            <button onClick={handleRemoveCourse} className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none">
                                <XCircle size={18} />
                            </button>
                        </div>
                    )}
                    {selectedYear && (
                        <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-base font-medium border border-blue-300">
                            Year: {selectedYear}
                            <button onClick={handleRemoveYear} className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none">
                                <XCircle size={18} />
                            </button>
                        </div>
                    )}
                    {selectedSemester && (
                        <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-base font-medium border border-blue-300">
                            Semester: {selectedSemester}
                            <button onClick={handleRemoveSemester} className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none">
                                <XCircle size={18} />
                            </button>
                        </div>
                    )}
                    {!selectedCourse && !selectedYear && !selectedSemester && (
                        <p className="text-gray-500">No filters applied.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App;
