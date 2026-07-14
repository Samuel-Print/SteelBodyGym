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

    const solicitarRecuperacion = async (email) => {
        try {
            setLoading(true);
            const data = await authService.solicitarRecuperacion(email);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const verificarToken = async (token) => {
        try {
            setLoading(true);
            const data = await authService.verificarToken(token);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const resetearPassword = async (token, nueva_password) => {
        try {
            setLoading(true);
            const data = await authService.resetearPassword(token, nueva_password);
            return data;
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        solicitarRecuperacion,
        verificarToken,
        resetearPassword,
        loading,
    };

}