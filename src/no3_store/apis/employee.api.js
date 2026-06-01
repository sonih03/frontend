import axios from "axios";



export const employeeAllGetApi = async () => {
    try{
        const response = await axios.get("http://localhost:3001/employees")
        return response.data
    }
    catch(error){
        return error
    }
}

export const employeePostApi = async (dataObj) => {
    try{
        const response = await axios.post("http://localhost:3001/employees",dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}