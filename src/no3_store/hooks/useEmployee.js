import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import{
    employeeAllgetApi,
    employeePostApi,
    employeePutApi,
    employeeDeleteApi
} from "../apis/employee.api"

export const useAllGetEmployee = () => {
    return useQuery({
        queryKey: ["employees"],
        queryFn: employeeAllgetApi
    })
}

export const usePostRegisterEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeePostApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["employees"],
                (oldData = []) => [
                    ...oldData, dataObj
                ]
            )
        }
    })
}

export const usePutUpdateEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeePutApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["employees"],
                (oldData = []) => oldData.map(item=>
                    item.id === dataObj.id ?
                    dataObj : item
                )
            );
            queryClient.setQueryData(
                ["employees", dataObj.id]
            );           
        }
    })
}

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeeDeleteApi,
        onSuccess: (id) => {
            queryClient.setQueryData(
                ["employees"],
                (oldData = []) => oldData.filter(item=>//얘는 필터임
                    item.id !== id ?//id하고 같지 않은것만
                    dataObj : item
                )
            );
            queryClient.setQueryData(
                ["employees", id],
            );           
        }
    })
}//return id 해줘야함, 어디서? api쪽에서 근데 delete만
//다음에 employee page로 가서 위에랑 그 밑에 뭐 주석처리함