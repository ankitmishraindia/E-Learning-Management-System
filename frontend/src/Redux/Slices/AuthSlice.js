import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    role:localStorage.getItem('role') || "",
    data:localStorage.getItem('data') || {}
};

export const createAccount= createAsyncThunk("/auth/signup", async(data)=>{
    try {
         const res=axiosInstance.post("user/register",data);
         toast.promise(res, {
            loading:"Wait! creating your account",
            success:(data)=>{
                return data?.data?.message;
            },
            error: "Failed to create account"
         })
         return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

//function for login
export const login= createAsyncThunk("/auth/login", async(data)=>{
    try {
         if(data){
            const res=axiosInstance.post("user/login",data);
         toast.promise(res, {
            loading:"Wait! Authentication is processing",
            success:(data)=>{
                return data?.data?.message;
            },
            error: "Failed to login."
         })
         return (await res).data;
         }
         else{
            console.log("please provide data")
         }
         
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

//function for logout
export const logout= createAsyncThunk("/auth/logout", async(data)=>{
    try {
         
            const res=axiosInstance.get("user/logout",data);
         toast.promise(res, {
            loading:"Wait! processing..",
            success:(data)=>{
                return data?.data?.message;
            },
            error: "Failed to logout."
         })
         return (await res).data;
         
         
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
            builder.addCase(login.fulfilled, (state,action)=>{
                if(action?.payload){
                localStorage.setItem("data",JSON.stringify(action?.payload?.user))
                localStorage.setItem("isLoggedIn",true)
                localStorage.setItem("role",action?.payload?.user?.role)
                  state.isLoggedIn=true;
                  state.data=action?.payload?.user;
                  state.role=action?.payload?.user?.role;
                }
            });
            builder.addCase(logout.fulfilled, (state,action)=>{
               if(action?.payload){
                localStorage.clear()
                  state.isLoggedIn=false;
                  state.data={}
               }
            });
    }
});

// export const {}=authSlice.actions;
export default authSlice.reducer;