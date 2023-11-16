import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

export const ViewMore = (props) => {
    const navigator = useNavigate()

    return (
        <div onClick={() => navigator(`/posts/${props.link}`)} style={{
            fontFamily: "'Gabarito', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            textAlign: "center", fontSize: "1rem", fontWeight: "400", gap: "0.5rem", margin: "1rem", userSelect: "none"
        }}>View More</div>
    )
}
ViewMore.propTypes = {
    link: PropTypes.string.isRequired
}