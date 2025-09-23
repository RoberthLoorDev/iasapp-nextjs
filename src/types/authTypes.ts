export type User = {
     id: string;
     name: string;
     email: string;
     firstName: string;
     lastName: string;
     isEmailVerified: boolean;
     accessToken: string;
};

export type LoginPayload = {
     user: User;
     accessToken: string;
};

export type AuthContextType = {
     user: User | null;
     token: string | null;
     login: (payload: LoginPayload) => void;
     logout: () => void;
};

export type LoginRequest = { email: string; password: string };
export type LoginResponse = {
     message: string;
     data: {
          id: string;
          name: string;
          email: string;
          firstName: string;
          lastName: string;
          isEmailVerified: boolean;
          accessToken: string;
     };
};
