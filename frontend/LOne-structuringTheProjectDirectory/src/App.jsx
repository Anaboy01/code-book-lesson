import React from 'react'

const App = () => {
  return (
    <div className='App dark:bg-dark'>
      <div className="bg-white dark:bg-gray-900">
        <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-7xl px-4 md:px-6 py-3">
          <span className="text-2xl font-semibold dark:text-white">CodeBook</span>
        </div>
      </div>
      
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <h1 className="text-4xl font-bold dark:text-white">Welcome to CodeBook</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          A marketplace for computer science eBooks and programming courses.
        </p>
      </main>

      <footer className="border-t border-slate-200 dark:border-t-0 bg-white dark:bg-gray-900 mt-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 text-center dark:text-gray-300">
          <p>&copy; 2024 CodeBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
