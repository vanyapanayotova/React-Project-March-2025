import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function Header() {
    const { isAuthenticated } = useAuth();
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4" >
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3" to="/">COOKIFY</Link>
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse ms-4" id="navbarCollapse">

                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/recipes">Recipes</Link>
                            </li>

                            {isAuthenticated
                                ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/add-recipe">Add Recipe</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/recipes/my">My recipes</Link>
                                        </li>
                                    </>
                                )
                                : (<></>)
                            }
                        </ul>

                        <ul className="navbar-nav justify-content-end mb-2 mb-md-0">
                            {isAuthenticated ?
                                (<>
                                    <li className="nav-item text-end">
                                        <Link className="nav-link text-end" to="/profile">Profile</Link>
                                    </li>
                                    <li className="nav-item text-end">
                                        <Link className="nav-link text-end" href="#">Logout</Link>
                                    </li>
                                </>)
                                : (<>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>)
                            }
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    );
}