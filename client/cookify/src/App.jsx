import './App.css'
import Header from './components/header/Header'
import UserProvider from './providers/UserProvider'


function App() {

  return (
    <>
    <UserProvider>
      <Header />
    </UserProvider>
    </>
  )
}

export default App
