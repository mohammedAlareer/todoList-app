import TodoList from "./components/TodoList"
import React from 'react';
import { TodosContext, TodosProvider } from "./Contexts/todosContext";
import { ToastContainer} from 'react-toastify';


function App() {
  return (
    <TodosProvider>
    <div id="App" dir='rtl' className="font-ruwudu">
      <TodoList/>
      <ToastContainer
        theme="colored"
        className={"text-xl"}
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl
        pauseOnFocusLoss
        pauseOnHover
      />
      </div>
      </TodosProvider>
      

  )
}

export default App
