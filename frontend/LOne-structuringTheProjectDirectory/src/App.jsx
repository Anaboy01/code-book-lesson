import { Header } from './Components/Layout/Header'
import { Home } from './Pages/Home'

export default function App() {
  return (
    <div className="App dark:bg-dark min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="px-4 py-8">
        <Home />
      </main>
    </div>
  )
}