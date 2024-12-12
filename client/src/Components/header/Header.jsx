import "./header.css"
import {Link} from "react-router-dom"


export default function Header() {
    return(
        <>
            <header>
                <div className="head_container">
                    <Link to="/">
                        <span>Home</span> <br/>
                    </Link>
                    <Link to="/fir">
                        <span>APOD</span> <br />
                    </Link>
                    <Link to="/sec">
                        <span>NeoWs</span> <br/>
                    </Link>
                    <Link to="/phearth">
                        <span>Earth</span> <br/>
                    </Link>
                    <Link to="/register">
                        <span>Register</span> <br/>
                    </Link>
                    <Link to="/login">
                        <span>Login</span> <br />
                    </Link>
                    <Link to="/profile">
                        <span>Profile</span>
                    </Link>
                </div>
            </header>
        </>
    )
}