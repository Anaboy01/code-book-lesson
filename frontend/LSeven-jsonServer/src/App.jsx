import { Header, Footer } from './Components/index.js'
import { AllRoutes } from './Routes/AllRoutes'

const App = () => {
  return (
    <div className='App dark:bg-dark'>
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  )
}

export default App
