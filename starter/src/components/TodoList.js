import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux'
import { getTodoAsync } from '../redux/todoSlice'

const TodoList = () => {

	const dispatch = useDispatch()
	
	//useselector to grab all data in todos state from store
	const todos = useSelector((state)=> state.todos)

	useEffect(() => {
		dispatch(getTodoAsync())
	}, [dispatch])


	return (
		<ul className='list-group'>
			{todos.map((todo) => (
				<TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
			))}
		</ul>
	);
};

export default TodoList;
