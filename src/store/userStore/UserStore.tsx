import { create } from "zustand";
import type { UserData } from "../../types/userTypes";
import { toast } from 'react-toastify';

type UserStore = {  
  user: UserData | null;
  isLogin: boolean;
  isSignUp: boolean;
  error: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    firstName: string,
    email: string,
    password: string,
    address: { city: string; municipality: string; street: string }
  ) => Promise<void>;
  logout: () => void;
    updateProfile: (data: Partial<UserData>) => Promise<void>;
  checkUser: () => Promise<void>;
  resetError: () => void;
};

export const UseUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLogin: false,
  isSignUp: false,
  error: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

    login: async (email: string, password: string) => {
        set({ isLogin: true });
    try {
      const response = await fetch("http://localhost:5001/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: { token: string; data: UserData; error?: { message: string } } = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'Identifiants incorrects');
      }
      set({ token: data.token, user: data.data, isAuthenticated: true });
      localStorage.setItem("token", data.token);
      toast.success('Connexion réussie ! Bienvenue !');
    } catch (error) {
      const typeError = error as Error;
      set({ error: typeError.message });
      toast.error(typeError.message);
    } finally {
        set({ isSignUp: false });
    }
  },

  signup: async (
    name: string,
    firstName: string,
    email: string,
    password: string,
    address: { city: string; municipality: string; street: string }
  ) => {
      set({ isSignUp: true });
    try {
      const response = await fetch("http://localhost:5001/api/user/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, firstName, email,password, address }),
      });
      const data: { token: string; data: UserData; error?: { message: string } } = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'Une erreur est survenue');
      }
      set({ token: data.token, user: data.data, isAuthenticated: true });
      localStorage.setItem("token", data.token);
      toast.success('Inscription réussie ! Bienvenue !');
    } catch (error) {
      const typeError = error as Error;
      set({ error: typeError.message });
      toast.error(typeError.message);
    } finally {
        set({ isSignUp: false });
    }
  },

  logout: () => {
    set({ token: null, user: null, isAuthenticated: false });
    localStorage.removeItem("token");
  },

  updateProfile: async (data: Partial<UserData>) => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/${get().user?._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${get().token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const updatedUser = await response.json();
      set({ user: { ...get().user, ...updatedUser } });
    } catch (error) {
       const typeError = error as Error
      set({ error: typeError.message });
    }
  },

  checkUser: async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/check`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${get().token}`,
          "Content-Type": "application/json",
        }
      });
      const checkedUser = await response.json();
      if (checkedUser.data._id !== get().user?._id) {
        throw new Error("Erreur, vous n'êtes pas l'utilisateur");
      }
    } catch (error) {
       const typeError = error as Error
      set({ error: typeError.message });
    }
  },

  resetError: () => {
    set({error: null})
  }
}));
