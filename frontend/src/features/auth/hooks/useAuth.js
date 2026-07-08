import { useState } from "react";
import authService from "../api/auth.service";

export default function useAuth() {

    const [loading, setLoading] = useState(false);

    const login = async (credentials) => {

        try {

            setLoading(true);

            const data = await authService.login(credentials);

            return data;

        } finally {

            setLoading(false);

        }

    };

    return {

        login,
        loading,

    };

}