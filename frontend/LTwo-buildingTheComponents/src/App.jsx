import { Header } from './Components/Layout/Header'
import { Footer } from './Components/Layout/Footer'
import { Home } from './Pages/Home'

export default function App() {
  return (
    <div className="App dark:bg-dark flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-grow px-4 py-8">
        <Home />
      </main>
      <Footer />
    </div>
  )
}