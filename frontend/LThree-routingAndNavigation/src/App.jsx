import { Header } from './Components/Layout/Header'
import { Footer } from './Components/Layout/Footer'
import { AllRoutes } from './Routes/AllRoutes'

export default function App() {
  return (
    <div className="App dark:bg-dark flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-grow px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <AllRoutes />
        </div>
      </main>
      <Footer />
    </div>
  )
}