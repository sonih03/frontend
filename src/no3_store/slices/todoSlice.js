import { createSlice } from "@reduxjs/toolkit";


const initialObj = {id: "", subject: "", checked: false}
const initialState = {
  // 화면에 렌더링될 실제 할 일들의 목록이 담긴 객체 배열입니다.
  todoList: [
    {id: 1, subject: "HTML 공부", checked: true},
    {id: 2, subject: "CSS 공부", checked: true},
    {id: 3, subject: "React 공부", checked: true},
    {id: 4, subject: "Python 공부", checked: true},
  ],
  // 새 할 일을 타이핑해서 추가할 때 사용할 임시 입력값 저장소 객체입니다.
  todoObj : initialObj
};

const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        remove: (state, action) => {
            state.todoList = state.todoList.filter(todo =>
                (todo.id !== action.payload)
            )
        },
        update: (state,action) => {
            state.todoList = state.todoList.map(todo =>
                (todo.id === action.payload.id ? 
                    {...todo, subject : action.payload.value}
                    : todo
                )
            )
        },
        toggle: (state,action) => {
            state.todoList = state.todoList.map(todo =>(
                todo.id ===action.payload ?
                    {...todo, checked: !todo.checked}
                    : todo
            ))
        },
        change: (state,action) => {
            state.todoObj = {
                ...state.todoObj,
                [action.payload.name] : action.payload.value
            }
        },
        register: (state) => {
            state.todoList = [
                ...state.todoList,
                {
                    ...state.todoObj,
                    id: state.todoList.length>0?
                        Math.max(...state.todoList.map(todo=>todo.id))+1
                        :1
                }
            ]
            state.todoObj = initialObj
        }

    },
})


export const {remove, update, register, toggle, change} = todoSlice.actions;
export default todoSlice.reducer;
