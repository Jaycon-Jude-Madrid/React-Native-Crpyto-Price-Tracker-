import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw Error(
            "useAuthContext must be used inside an useAuthContextProvider"
        );
    }
    return context;
};