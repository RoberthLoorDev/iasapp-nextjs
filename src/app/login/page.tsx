"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { mapApiError } from "@/utils/errorMapper";
import { toast } from "sonner";

export default function LoginPage() {
     const { login } = useAuth();
     const [email, setEmail] = useState("roberthgmer@gmail.com");
     const [password, setPassword] = useState("123456");
     const [isLoading, setIsLoading] = useState(false);
     const [showPassword, setShowPassword] = useState(false);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);
          try {
               await login(email, password);
               window.location.href = "/resumen";
          } catch (err: any) {
               console.error("Error al iniciar sesión:", err);
               toast.error(mapApiError(err.response?.data?.message));
          } finally {
               setIsLoading(false);
          }
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center p-4">
               <div className="w-full max-w-md">
                    {/* Logo/Header */}
                    <div className="text-center mb-8 -mt-5">
                         <h1 className="text-3xl font-bold text-[#05462F] mb-2">Bienvenido</h1>
                         <p className="text-[#BDC4C2] text-sm">Ingresa tus credenciales para acceder al sistema</p>
                    </div>

                    {/* Login Card */}
                    <div className="rounded-xl shadow-lg  p-8">
                         <form onSubmit={handleSubmit} className="space-y-6">
                              <div>
                                   <label htmlFor="email" className="block text-sm font-medium text-[#05462F]">
                                        Correo electrónico
                                   </label>
                                   {/* Mostrar error encima del input */}
                                   <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ejemplo@correo.com"
                                        className="bg-white w-full px-4 py-3 border-2 border-[#EFEFEF] rounded-lg focus:border-[#33A680] focus:ring-2 focus:ring-[#33A680]/20 transition-colors duration-200 text-[#05462F] placeholder-[#BDC4C2]"
                                        required
                                   />
                              </div>

                              <div>
                                   <label htmlFor="password" className="block text-sm font-medium text-[#05462F]">
                                        Contraseña
                                   </label>
                                   <div className="relative">
                                        <input
                                             id="password"
                                             type={showPassword ? "text" : "password"}
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)}
                                             placeholder="••••••••"
                                             className="bg-white w-full px-4 py-3 border-2 border-[#EFEFEF] rounded-lg 
                 focus:border-[#33A680] focus:ring-2 focus:ring-[#33A680]/20 
                 transition-colors duration-200 text-[#05462F] 
                 placeholder-[#BDC4C2] pr-10"
                                             required
                                        />
                                        {/* Botón toggle */}
                                        <button
                                             type="button"
                                             onClick={() => setShowPassword((prev) => !prev)}
                                             className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#05462F] transition-colors"
                                        >
                                             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                   </div>
                              </div>

                              <button
                                   type="submit"
                                   disabled={isLoading}
                                   className="w-full bg-[#05462F] hover:bg-[#04452E] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                              >
                                   {isLoading ? (
                                        <>
                                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                             Iniciando sesión...
                                        </>
                                   ) : (
                                        "Iniciar sesión"
                                   )}
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     );
}
