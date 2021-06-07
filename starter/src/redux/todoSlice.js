import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//gets called by components
export const getTodoAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        //api call
        const response = await fetch('http://localhost:7000/todos')
        if(response) {
            const todos = await response.json()
            return { todos }
        }
    }    
)

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async(payload) => {
        const response = await fetch('http://localhost:7000/todos', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({title: payload.title})
        })
        if (response) {
            const todo = await response.json()
            return { todo }
        }
    }
)

export const toggleCompleteAsync = createAsyncThunk(
    'todos/completeTodoAsync',
    async(payload) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`, 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: payload.completed })
            }
        )
        if(response) {
            const todo = await response.json()
            return { id: todo.id, completed: todo.completed }
        }
    }
)

const todoSlice = createSlice({

    name: "todos",
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            }
            state.push(newTodo)
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            state[index].completed = action.payload.completed
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id)
        }
    },
    extraReducers: {
        [getTodoAsync.pending]: (state, action) => {
            console.log('fetching data...') 
        }, 
        [getTodoAsync.fulfilled]: (state, action) => {
            console.log('fetched data successfully') 
            return action.payload.todos
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo)
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            state[index].completed = action.payload.completed
        }
    }
})

export const { 
    addTodo,
    toggleComplete,
    deleteTodo,
 } = todoSlice.actions
export default todoSlice.reducer