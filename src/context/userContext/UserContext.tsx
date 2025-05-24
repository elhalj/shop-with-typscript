import { createContext } from "react";

export type UserContextType = {
  userToken: string | null;
  signUp: (data: UserData) => Promise<void>;
  signIn: (data: UserData) => Promise<void>;
  signOut: () => void;
  checkUser: (data: UserData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isSignup: boolean;
  isChecked: boolean;
};

export interface UserData {
  name: string;
  firstName: string;
  email: string;
  address: {
    city: string;
    municipality: string;
    street: string;
  };
}

export const UserContext = createContext<UserContextType>({} as UserContextType);
