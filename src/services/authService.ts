import { api } from "@/lib/axios";
import { LoginRequest, LoginResponse } from "@/types/authTypes";

export async function login(payload: LoginRequest) {
     const { data } = await api.post<LoginResponse>("/auth/login", payload);
     return data.data;
}
