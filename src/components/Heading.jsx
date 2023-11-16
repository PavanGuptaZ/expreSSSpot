import PropTypes from 'prop-types';
import { AiOutlineDash } from 'react-icons/ai'

export const Heading = (prototype) => {
    let { dash, title, textSize } = prototype
    return (
        <div style={{
            fontFamily: "'Gabarito', sans-serif", display: "flex", alignItems: "center", justifyContent: "center",textTransform:"capitalize",
            textAlign: "center", fontSize: `${textSize || "2rem"}`, fontWeight: "600", gap: "0.5rem", margin: "1rem", userSelect: "none"
        }}>
            {dash && <AiOutlineDash />}
            {title}
            {dash && <AiOutlineDash />}
        </div>
    )
}
Heading.propTypes = {
    title: PropTypes.string.isRequired
}