import axios from "axios";



export const userAllGetApi = async ()=>{
    try{
        const response = await axios.get("http://localhost:3001/user")
        return response.data
        

    }catch(error){
        return error

    }
}

export const userLoginApi = async (userObj)=>{
    try{
        
        const response = await axios.get(
            `http://localhost:3001/user?username=${userObj.username}`
        )
        
        const users = response.data
        if(!users.length){
            throw new Error("존재하지 않는 사용자입니다.");
        }
        const foundUser = users[0];

        if(foundUser.password !== userObj.password){
            throw new Error("비밀번호가 일치하지 않습니다.");
        }

        return foundUser;

        }catch(error){
            throw new Error(error.message);

    }
};

export const userRegisterApi = async (userObj)=>{
    try{
        const response = await axios.get(`http://localhost:3001/user?username=${userObj.username}`)
        const users = response.data
        if(users.length){
            return Error("이미 존재하는 사용자입니다.")
        }

        return await axios.post(`http://localhost:3001/user`,userObj)
        
    }catch(error){
        return error
    }
}

// export const userPutApi = async (dataObj)=>{
//     try{
//         const response = await axios.post(`http://localhost:3001/user/${dataObj.id}`, dataObj)
//         return response.data

//     }catch(error){
//         return error

//     }
// }

export const userPostApi = async (dataObj)=>{
    try{
        const response = await axios.post("http://localhost:3001/user", dataObj)
        return response.data

    }catch(error){
        return error

    }
}


// export const userDeleteApi = async ()=>{
//     try{
//         const response = await axios.delete("http://localhost:3001/user2")
//         return response.data

//     }catch(error){
//         return error

//     }
// }

// export const useLogout = () => {
//     const queryClient = useQueryClient();
//     return () => {
//         localStorage.removeItem("currentUser");
//         queryClient.setQueryData(["user"], null);
//     }
// }