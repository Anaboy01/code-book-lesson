import { Header, Footer } from './Components/index.js'
import { HomePage } from './Pages/index.js'

const App = () => {
  return (
    <div className='App dark:bg-dark'>
      <Header />
      <HomePage />
      <Footer />
    </div>
  )
}

export default App
