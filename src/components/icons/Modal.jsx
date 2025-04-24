import React from 'react'
import IconWrapper from './IconWrapper'
import { Icons } from './Icons'
export default function Modal({showDeleteModal,onClose,children}) {
  return (
    <div onClick={onClose}    
    className={`fixed inset-0 flex justify-center items-center
      ${showDeleteModal ?"visible bg-black/40" : "invisible"}`}
    >
      <div onClick={(e) => e.stopPropagation()}
      className={`relative shadow p-4 bg-white rounded-xl
        ${open ?"scale-100 opacity-100":"scale-125 opacity-0"} transition-all duration-300 ease-in-out`}>
        <button onClick={onClose}>
          <IconWrapper Icon={Icons.Close} size={6} className={`absolute top-2 right-2 text-gray-400 bg-white p-1
            hover:text-gray-700`}/>
        </button>
        {children}

      </div>

    </div>
  )
}
