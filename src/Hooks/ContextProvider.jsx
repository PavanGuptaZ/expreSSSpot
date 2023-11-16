/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useLocalStorageForTheme } from './index';
export const userDetails = React.createContext()
export const themeDetails = React.createContext()
import { useQuery } from '@tanstack/react-query'

export const ContextProvider = (prototype) => {
    const [theme, setTheme] = useLocalStorageForTheme("DarkMode", false)
    let [user, setUser] = useState(null)

    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        refetchInterval: 50 * 60 * 1000,
        staleTime: Infinity
    })


    async function getUser() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }
        try {
            const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + '/auth/refresh', requestOptions)
            if (!responce.ok) {
                console.log('Server returned an error:', responce.status, responce.statusText);
            }

            const data = await responce.json();

            if (data.status === "ok") {
                setUser(data.user)
                return data.user
            }

            return null
        } catch (error) {
            return null
        }

    }
    return (
        <userDetails.Provider value={{ user, setUser, userLoading: userQuery.isLoading, fetching: userQuery.isFetching }}>
            <themeDetails.Provider value={{ theme, setTheme }}>
                {prototype.children}
            </themeDetails.Provider>
        </userDetails.Provider>
    )
}
ContextProvider.prototype = {
    typeBlock: PropTypes.node.isRequired
}