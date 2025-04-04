import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth:async()=>{
        try {
            const res = axiosInstance.get("/auth/check");
            set({authUser:res})
        } catch (error) {
            console.log("Error in checkAuth",error);
            set({authUser:null});
        } finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data) => {
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Account created successfully");
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("Logged out successfully")    
        } catch (error) {
            console.log("Error in logout", error);
            toast.error(error.response.data.message || "Something went wrong")
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",data)
            set({ authUser: res.data })
            toast.success("Logged in successfully")
        } catch (error) {
            console.log("Error in login", error);
            toast.error(error.response.data.message || "Something went wrong")
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.patch("/auth/update-profile",data)
            set({ authUser: res.data })
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("Error in updateProfile", error);
            toast.error(error.response.data.message || "Something went wrong")
        } finally {
            set({ isUpdatingProfile: false });
        }
    }
}))