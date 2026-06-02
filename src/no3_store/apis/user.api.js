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
        console.log("user",user)
        const response = await axios.get(
            `http://localhost:3001/user?username=${userObj.username}`
        )
        console.log("users",response.data)
        const users = response.data
        if(!users || users.length === 0){
            throw new Error("존재하지 않는 사용자입니다.")
        }
        const user = users[0]
        if(user.password !== userObj.password){
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }
        return users[0]

    }catch(error){
        return error

    }
}

export const userRegisterApi = async (userObj)=>{
    try{
        const response = await axios.get(`http://localhost:3001/user?username = ${userObj.username}`)
        const users = response.data
        if(users.length>0){
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