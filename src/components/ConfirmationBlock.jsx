import PropTypes from "prop-types"
import { useContext } from "react";
import { themeDetails } from "../Hooks/ContextProvider";
import { DarkMode, LiteMode } from "../theme/themeColors";
import { useKey } from "../Hooks/useKey";

export const ConfirmationBlock = (props) => {
    let { setShowConfirmation, yesFunction } = props
    let { theme } = useContext(themeDetails)
    let { body } = theme ? DarkMode : LiteMode;

    const handleNo = () => {
        setShowConfirmation(false)
    }
    const handleYes = () => {
        yesFunction()
        setShowConfirmation(false)
    }
    useKey("Escape", () => handleNo())
    return (
        <div className="confirmation-block">
            <div className="blackOut" onClick={() => setShowConfirmation(false)}></div>
            <div className="confirmation-content" style={{ backgroundColor: body }}>
                <p>Are you sure you want to delete?</p>
                <button onClick={handleYes} className="YesorNoBTN">Yes</button>
                <button onClick={handleNo} className="YesorNoBTN">No</button>
            </div>
        </div>
    )
}
ConfirmationBlock.propTypes = {
    setShowConfirmation: PropTypes.func.isRequired,
    yesFunction: PropTypes.func.isRequired
}