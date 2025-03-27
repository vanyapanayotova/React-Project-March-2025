import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function Banner() {
        const { isAuthenticated } = useAuth();
    return (
        <>
            <main>

                <section className="py-5 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">COOKIFY cooking recipes</h1>
                            <p className="lead text-muted">Wellcome to our cooking recipes website. Here you can find great recipes. You can register to create a profile and add recipes to our website.</p>
                            <p>

                                {isAuthenticated
                                    ? (
                                        <Link to="/add-recipe" className="btn btn-primary my-2">Add recipe</Link>
                                    )
                                    : (
                                <><Link to="/login" className="btn btn-primary my-2 me-1">Login</Link>
                                <Link to="/register" className="btn btn-secondary my-2">Register</Link></>
                                    )
                                }
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}