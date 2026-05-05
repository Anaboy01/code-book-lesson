import { Header } from './Components/Layout/Header.jsx'
import { AllRoutes } from './Routes/AllRoutes.jsx'

const App = () => {
  return (
    <div className="App dark:bg-dark min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="px-4 py-8">
        <AllRoutes />
      </main>
    </div>
  )
}

export default App
