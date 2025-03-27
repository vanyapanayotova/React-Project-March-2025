import { Link } from "react-router";
import "./footer.module.css";

export default function Footer() {
   return (
       <>
       <footer className="text-muted py-3 mt-5">
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2">
        <div className="col">
          <p className="mb-1">COOKIFY cooking recipes © 2024</p>
        </div>
        <div className="col text-sm-end">
          <p><Link to="https://github.com/vanyapanayotova" target="_blank" className="text-decoration-none">Website by Vanya Panayotova</Link></p>
        </div>
      </div>
    </div>
  </footer>
       </>
   );
}