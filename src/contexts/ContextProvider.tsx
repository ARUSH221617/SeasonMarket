import React, { useContext } from "react";
import { createContext, useState } from "react";

const StateContext = createContext({
    panelInfo: null,
    user: {},
    token: localStorage.getItem("ACCESS_TOKEN"),
    setToken: (token) => {},
    setUser: (user) => {}
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);