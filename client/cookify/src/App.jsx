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
import RecipeList from './components/recipe/recipe-list/RecipeList'
import Logout from './components/user/logout/Logout'
import CurrentRecipe from './components/recipe/current-recipe/CurrentRecipe'
import MyRecipe from './components/recipe/my-recipes/MyRecipes'
import EditRecipe from './components/recipe/edit-recipe/EditRecipe'
import Profile from './components/user/profile/Profile'
import { ToastContainer } from 'react-toastify'
import Error404 from './components/404/error404'




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
            <Route path="/logout" element={<Logout />} />
            <Route path="/recipes/:recipeId/edit" element={<EditRecipe />} />
            <Route path="/my-recipes" element={<MyRecipe />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:recipeId" element={<CurrentRecipe />} />
          <Route path="*" element={<Error404 />} />
          {/*
            <Route path="/admin" element={(
                <Suspense fallback={<p>Loading...</p>}>
                    <Admin />
                </Suspense>
            )} /> */}
        </Routes>

        <ToastContainer />

        <Footer />
      </UserProvider>


    </>
  )
}

export default App
