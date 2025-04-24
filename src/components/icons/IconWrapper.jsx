import React from 'react'

export default function IconWrapper({Icon,size=8,className=""}) {
    const sizes = {
        6: "w-6 h-6",
        8: "w-8 h-8",
        10: "w-10 h-10",
    }
  return (
    <Icon className={`${sizes[size]} ${className}`}/>
  )
}
