
import  React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";

export const Search = ({setSearchSection}) => {

    const navigate = useNavigate()

    const searchRef = useRef()

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchSection(false)
        navigate(`/products?q=${searchRef.current.value}`)
    }
  return (
    <div className='mx-auto max-w-7xl p-2 my-5'>

        <form onSubmit={handleSearch} className='flex items center'>
            <div className='relative w-full' >
                <span className='flex absolute inset-y-0 items-center pl-3 pointer-events-none'>
                <CiSearch />
                </span>

                <input ref={searchRef} name='search' id='simple search' type="text" className='border-gray-300 bg-gray-30 text-gray-900 text-sm rounded-lg focus:border-rose-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-500' placeholder='Search' autoComplete='off' required />

            </div>
            <button type='submit' className='py-2 px-3 ml-2 text-xm font-medium text-white bg-rose-600 
            rounded-lg border border-rose-600 hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-rose-500 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800'>
            <CiSearch />
            </button>
        </form>
      
    </div>
  )
}
