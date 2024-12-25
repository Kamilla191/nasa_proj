import axios from "axios";

interface UserCredential {
    username: string;
    password: string;
}

interface Dispatch {
    (action: { type: string; payload?: any }): void;
}

export const loginCall = async (userCredential: UserCredential, dispatch: Dispatch): Promise<void> => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}auth/login`, userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
};