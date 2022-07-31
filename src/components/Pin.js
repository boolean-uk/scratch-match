import { useState } from "react"
import { Link } from "react-router-dom"

export default function Pin({ country }) {
    const { id, name, year, x, y } = country
    const [isHovering, setIsHovering] = useState("")

    const handleMouseEnter = (elementId) => setIsHovering(elementId)
    const handleMouseLeave = () => setIsHovering("")

    return (
        <li
            style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                backgroundColor: "blue",
                height: "0.5rem",
                width: "0.5rem",
                borderRadius: "50%",
                cursor: "pointer",
            }}
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={() => handleMouseLeave(id)}
            >
            {
                isHovering === id &&
                <p className="hover-block">
                    <Link
                        className="pin-link"
                        to={`/country/${id}`}
                        state={country}
                    >
                        {name}, {year}
                    </Link>
                </p>
            }
        </li>
    )
}