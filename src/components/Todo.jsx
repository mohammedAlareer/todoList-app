import React from 'react';
import { TodosContext } from '../Contexts/todosContext';
import { useContext } from 'react';
import IconWrapper from './icons/IconWrapper';
import { Icons } from './icons/Icons';
import Modal from './icons/Modal';
import ModalEdit from './ModalEdit';
export default function Todo({todo,showDelete,showEdit}){
    const { toggleTodoComplete } = useContext(TodosContext);

    function handleDeleteClick(){
        showDelete(todo);
    }

    function handleEditClick(){
            showEdit(todo)
    }


    return(
        <div className=" mt-2 bg-blue-800  p-2 hover:py-5 rounded-md transition-all duration-300"> 
        <div className="grid grid-cols-12">
        <div className="grid text-white col-span-8  p-1 ">
            <h1
            className={`text-2xl   font-extrabold ${todo.isCompleted ? "line-through text-gray-400":""}`}>{todo.title}</h1>
            <h2 className="mt-1 ">{todo.description}</h2>
        </div>
        
        <div className="grid col-span-4  place-items-center" >
            <div className="flex justify-around items-center">

            {/* Confirm Task */}

            <button
            onClick={() => toggleTodoComplete(todo.id)}>
            <IconWrapper Icon={Icons.Confirm}  className={`border border-green-600 rounded-full
            mx-1 ${todo.isCompleted ? 'bg-green-700':'bg-amber-50'} ${todo.isCompleted ? 'text-white' :'text-green-500'}`}/>
            </button>

            {/* Confirm Task */}

            {/* Edit Task */}

            <button onClick={handleEditClick}>
            <IconWrapper Icon={Icons.Edit} className={`bg-white border border-blue-600 rounded-full
                text-blue-600 hover:text-blue-400 mx-1`} />
            </button>

            {/* Edit Task */}

            {/* Delete Task */}

            <button onClick={handleDeleteClick}>
            <IconWrapper Icon={Icons.Trash} className={`bg-white text-red-500 border border-red-600 rounded-full
            mx-1`}/>
            </button>

            

                {/* Delete Task */}

            </div>
            </div>
        </div>
        </div>
    );
}