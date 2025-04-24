import React from 'react'
import { Icons } from './icons/Icons'
import IconWrapper from './icons/IconWrapper'

export default function ModalEdit({showEditModal,onClose,children}) {
  return (
    <div onClick={onClose}
    className={`fixed inset-0 flex justify-center items-center  transition-colors duration-300
    ease-in-out ${showEditModal?"visible bg-black/65" :"invisible"}`}>
        <div onClick={(e) => e.stopPropagation() } 
        className={`relative  bg-white shadow-2xl p-4 rounded-2xl transition-all duration-300 ease-in-out
            ${showEditModal ? 'scale-100 opacity-100' :'scale-125 opacity-0' }`}>
                <button onClick={onClose}>
                <IconWrapper Icon={Icons.Close} size={6} className={`absolute top-2 right-2 text-gray-400 bg-white p-1
                hover:text-gray-700`}/>
                </button>
                {children}

        </div>
    </div>
  )
}
