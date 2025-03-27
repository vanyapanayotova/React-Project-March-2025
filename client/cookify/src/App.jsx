import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import UserProvider from './providers/UserProvider'
import { Routes, Route } from 'react-router'
import Home from './components/home/Home'


function App() {

  return (
    <>
      <UserProvider>
        <Header />

        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="/games" element={<GameCatalog />} />
                        <Route path="/games/:gameId/details" element={<GameDetails />} />
                        <Route element={<AuthGuard />}>
                            <Route path="/games/create" element={<GameCreate />} />
                            <Route path="/games/:gameId/edit" element={<GameEdit />} />
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                        <Route element={<GuestGuard />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route path="/admin" element={(
                            <Suspense fallback={<p>Loading...</p>}>
                                <Admin />
                            </Suspense>
                        )} /> */}
        </Routes>

        <Footer />
      </UserProvider>


    </>
  )
}

export default App
