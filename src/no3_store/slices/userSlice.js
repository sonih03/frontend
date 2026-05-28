import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { userTotalGetApi } from "../apis/user.api";


export const fetchUserTotalGet = createAsyncThunk(
    "createAsyncThunk",
    async (_, thunkApi) => {
        try{
            return await userTotalGetApi()

        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

const initialUsers = [
    {id: 1, username: "john", password: "1111"},
    {id: 2, username: "peter", password: "1111"},
    {id: 3, username: "susan", password: "1111"},
    {id: 4, username: "qwe", password: "123"},
]

const initialState = {
    users: initialUsers,
    username: '',
    isLogin: false
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
            .addCase(fetchUserTotalGet.fulfilled, (state,action) => {
                state.users = action.payload
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
