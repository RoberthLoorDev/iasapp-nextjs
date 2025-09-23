const ERROR_MESSAGES: Record<string, string> = {
     "Invalid credentials": "Correo o contraseña incorrectos",
     Unauthorized: "No tienes acceso, inicia sesión nuevamente",
};

export function mapApiError(message?: string): string {
     return ERROR_MESSAGES[message || ""] || "Ocurrió un error, inténtalo de nuevo";
}
