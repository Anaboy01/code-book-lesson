import { Header } from './Components/Layout/Header.jsx'
import { Footer } from './Components/Layout/Footer.jsx'
import { Home } from './Pages/Home.jsx'

const App = () => {
  return (
    <div className="App dark:bg-dark min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="px-4 py-8">
        <Home />
      </main>
      <Footer />
    </div>
  )
}

export default App
