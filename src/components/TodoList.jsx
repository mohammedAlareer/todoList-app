import React, {useState,useContext, useMemo} from 'react';
import Todo from "./Todo";
import { TodosContext } from '../Contexts/todosContext';
import Modal from './icons/Modal';
import ModalEdit from './ModalEdit';
import { toast } from 'react-toastify';


export default function TodoList(){
    const {todos,addTodo,deleteTodo,updateTodo} = useContext(TodosContext);
    const [titleInput,setTitleInput] = useState("");
    const [displayedTodosType,setDisplayedTodosType] = useState("all");
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [showEditModal,setShowEditModal] = useState(false);
    const [updatedTodo,setUpdatedTodo] = useState({title:"",description:""});
    const [modalTodo,setModalTodo] = useState(null);
    const [modalEditTodo,setModalEditTodo] = useState(null);


    //Handlers

    function handleAddClick(){
    addTodo(titleInput);
    setTitleInput("");
    toast.success("تمت إضافة المهمة بنجاح");
}

    const completedTodos =useMemo(() => {
        return todos.filter((t) => {
            return t.isCompleted
        });
    },[todos])
    const notCompletedTodos=useMemo(() => {
        return todos.filter((t) => {
            return !t.isCompleted
        });
    },[todos])
    let todosToBeRendered = todos;
    
    if(displayedTodosType === "completed"){
        todosToBeRendered = completedTodos
    }else if (displayedTodosType === "notCompleted"){
        todosToBeRendered = notCompletedTodos;
    }

        //Handlers

        function openDeleteModal(todo){
            setModalTodo(todo)
            setShowDeleteModal(true);
        }

        function handleDeleteModalClose(){
            setShowDeleteModal(false);
        }

        function handleDeleteConfirm() {
            deleteTodo(modalTodo.id);
            setShowDeleteModal(false);
            toast.error("تم حذف المهمة");
        }

        function handleEditModalClose(){
            setShowEditModal(false);
        }

        function openEditModal(todo){
            setShowEditModal(true);
            setModalEditTodo(todo)
            setUpdatedTodo({ title: todo.title, description: todo.description });
        }

        function handleUpdatedTodo() {
            updateTodo({id: modalEditTodo.id,...updatedTodo});
            setShowEditModal(false);
            toast.info("تم تعديل المهمة");
        }

          //handlers
        

    const todosJsx=todosToBeRendered.map((t) => {
        return  <Todo todo={t} key={t.id} showDelete={openDeleteModal} showEdit={openEditModal} />
    });


    return(
    
        <>
        {/*Modal Delete */}

            <Modal showDeleteModal={showDeleteModal} onClose={handleDeleteModalClose}>
                            <div className='text-center w-56'>
                                <div className='w-48'>
                                <p className="text-lg text-red-500">
                            هل أنت متأكد من أنك تريد حذف هذه <span className='text-2xl text-red-600'>المهمة؟</span>
                                </p>
                                <div className='flex gap-4 mt-2 justify-center'>
                                    <button onClick={handleDeleteModalClose} 
                                    className={`btn btn-light rounded-2xl p-2 w-full cursor-pointer`}>إغلاق</button>
                                    <button onClick={handleDeleteConfirm} className={`btn btn-danger rounded-2xl p-2 w-full cursor-pointer`}>حذف المهمة</button>
                                </div>
                                </div>
                            </div>
                        </Modal>


            {/*Modal Edit */}

                <ModalEdit showEditModal={showEditModal} onClose={handleEditModalClose}>
                    <div className='w-96'>
                    <label className='text-2xl' >العنوان</label>
                    <input value={updatedTodo.title} onChange={(e) => {
                        setUpdatedTodo({...updatedTodo,title:e.target.value})
                    }}
                    className='w-full h-10 border border-gray-400 my-2 rounded'/>
                    <label className='text-2xl'>التفاصيل</label>
                    <input value={updatedTodo.description} onChange={(e) => {
                        setUpdatedTodo({...updatedTodo,description:e.target.value})
                    }}
                    className='w-full h-10 border border-gray-400 my-2 rounded'/>
                    </div>
                <div className='flex gap-2 flex-row-reverse mt-2'>
                    <button onClick={() => {
                        handleUpdatedTodo();
                    }}
                    className='btn btn-confirm rounded-2xl p-2 w-16  cursor-pointer'>تأكيد</button>
                    <button onClick={handleEditModalClose} 
                    className='btn btn-light rounded-2xl p-2 w-16 cursor-pointer'>إغلاق</button>
                </div>
            </ModalEdit>

        <div className="flex justify-center items-center h-screen bg-slate-700">
        <div className="bg-white w-[450px] rounded-2xl px-5 py-3 max-h-[80vh] overflow-y-auto">
            <h5 className="text-center text-3xl">مهامي</h5>
            <hr className="border-black "></hr>

            <div dir="rtl" className="flex text-right justify-center">
                <button onClick={() => {setDisplayedTodosType("all")}}
                className={`rounded-sm p-1 m-1  ${displayedTodosType ==="all" ? "bg-blue-400 text-red-500 ring-2 ring-blue-600"
        : "bg-blue-600 hover:bg-blue-400"}`}>الكل</button>
        

                <button onClick={() => {setDisplayedTodosType("completed")}} 
                className={`rounded-sm p-1 m-1  ${displayedTodosType ==="completed" ? "bg-blue-400 text-red-500 ring-2 ring-blue-600"
        : "bg-blue-600 hover:bg-blue-400"}`}>منجز</button>

                <button onClick={() => {setDisplayedTodosType("notCompleted")}}
                className={`rounded-sm p-1 m-1 ${displayedTodosType ==="notCompleted" ? "bg-blue-400 ring-2 text-red-500 ring-blue-600"
        : "bg-blue-600 hover:bg-blue-400"}`}>غير منجز</button>
            </div>

            {todosJsx}

            <div className='grid grid-cols-12 mt-3'>
                <div className='grid col-span-8 text-red-500 text-lg'>
                <label className="text-red-500 text-lg mb-1 block">اضافة مهمة</label>
                <input placeholder="قم بإضافة مهمة" value={titleInput} className='border border-gray-500 rounded-4xl ml-8 h-10 text-gray-900 focus:ring-2 focus:ring-blue-500
                outline-none p-2 transition-all duration-300 ease-in-out focus:border-none ' onChange={(e) => {
                    setTitleInput(e.target.value)
                }}/>
                </div>
                <div className='grid col-span-4 justify-center items-center'>
                <button onClick={handleAddClick} disabled={titleInput.length === 0} className=" text-white font-bold p-4 mr-12 text-2xl w-24 mt-6  rounded-xl h-14 bg-amber-600 cursor-pointer
                 hover:bg-amber-400 transition-all duration-300 ease-in-out  disabled:bg-gray-400 disabled:cursor-not-allowed ">إضافة</button>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}