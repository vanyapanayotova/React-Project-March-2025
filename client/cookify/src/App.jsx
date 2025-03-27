import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import UserProvider from './providers/UserProvider'
import { Routes, Route } from 'react-router'
import Home from './components/home/Home'
import Login from './components/user/login/Login'
import GuestGuard from './components/guards/GuestGuard'
import Register from './components/user/register/Register'
import AddRecipe from './components/recipe/add-recipe/AddRecipe'
import AuthGuard from './components/guards/AuthGuard'




function App() {

  return (
    <>
      <UserProvider>
        <Header />

        <Routes>
          <Route index element={<Home />} />
          <Route element={<GuestGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<AuthGuard />}>
            <Route path="/add-recipe" element={<AddRecipe />} />
            {/* <Route path="/games/:gameId/edit" element={<GameEdit />} />
                            <Route path="/logout" element={<Logout />} /> */}
          </Route>
          {/* <Route path="/games" element={<GameCatalog />} />
                        <Route path="/games/:gameId/details" element={<GameDetails />} />


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
