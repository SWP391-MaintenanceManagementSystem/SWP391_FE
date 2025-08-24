import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <h3>The page you are looking for does not exist.</h3>
            <Link to="/">Go to Home</Link>
        </div>
    )
}
