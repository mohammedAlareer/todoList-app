import {useEffect,createContext,useRef,useReducer } from "react";
import React from "react";
import todosReducer from "../reducers/todosReducer";
import { v4 as uuidv4 } from "uuid";

export const TodosContext = createContext();

export function TodosProvider({ children }) {
    const [todos, todosDispatch] = useReducer(todosReducer,[]);
    const isFirstLoad = useRef(true);

        useEffect(() => {
          try{
          const saveTodos = JSON.parse(localStorage.getItem("todos"));
          todosDispatch({type:"load",payload:saveTodos})
        }catch{
          todosDispatch({type:"load",payload:[]})
        }
        },[])

        useEffect(() => {
          if(isFirstLoad.current){
            isFirstLoad.current =false;
            return ;
          }
          localStorage.setItem("todos",JSON.stringify(todos))
          }, [todos]);
      
      const addTodo = (title) => {
        const newTodo = {
          id:uuidv4(),
          title,
          description:"",
          isCompleted:false
        }
        todosDispatch({type:"added",payload:newTodo});  
      };
    
      const deleteTodo = (id) => {
        todosDispatch({type:"deleted",payload:{id}})
      };
    
      const updateTodo = (updated) => {
        todosDispatch({type:"updated" ,payload:updated});
      };
    
      const toggleTodoComplete = (id) => {
        todosDispatch({type:"toggle",payload:{id}});
      };

    return (
      <TodosContext.Provider value={{ todos,addTodo,deleteTodo,updateTodo,toggleTodoComplete }}>
        {children}
      </TodosContext.Provider>
    );
  }