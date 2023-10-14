/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react"
import PropTypes from 'prop-types';
import { useLocalStorageForTheme } from './index'
export const userDetails = React.createContext()
export const themeDetails = React.createContext()

export const ContextProvider = (prototype) => {
    const [theme, setTheme] = useLocalStorageForTheme("DarkMode", false)
    let [user, setUser] = useState(false)
    return (
        <userDetails.Provider value={{ user, setUser }}>
            <themeDetails.Provider value={{ theme, setTheme }}>
                {prototype.children}
            </themeDetails.Provider>
        </userDetails.Provider>
    )
}
ContextProvider.prototype = {
    typeBlock: PropTypes.node.isRequired
}