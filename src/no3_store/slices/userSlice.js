import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { userTotalGetApi } from "../apis/user.api";


export const userTotalGetSlice = createAsyncThunk(
    "userTotalGetSlice",
    async (_, thunkApi) => {
        try{
            return await userTotalGetApi()

        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

const initialState = {
    users: [],
    username: '',
    isLogin: false,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.username = action.payload
            state.isLogin = true
        },
        register: (state,action) =>{
            state.users = [
                ...state.users,
                {
                    id: action.payload.id,
                    username: action.payload.user.username,
                    password: action.payload.user.password
                }
            ]
        },
        logout: (state)=>{
            state.isLogin = false,
            state.username= ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userTotalGetSlice.pending, (state) => {
                state.loading = true
                state.error = null
            }) 
            .addCase(userTotalGetSlice.fulfilled, (state,action) => {
                state.users = action.payload
                state.loading = false
            }) 
            .addCase(userTotalGetSlice.rejected, (state,action) => {
                state.loading = false
                state.error = action.payload
            }) 
    }
})


// const UserProvider = ({children}) => {
//     const [state,dispatch] = useReducer(reducer,initalState);
//     return(
//         <UserContext.Provider value={{state,dispatch}}>
//             {children}
//         </UserContext.Provider>
//     )
// }


// export default UserProvider

export const {login, register, logout} = userSlice.actions;
export default userSlice.reducer;
