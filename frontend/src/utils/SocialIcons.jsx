import React from 'react'


export const SocialIcons = ({Icons}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8 social-icons">

    <div className='text-teal-500 space-x-2'>
        {Icons.map(icon => (
            <span key={icon.name} className='p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 text-700 hover:text-gray-100 hover-bg-teal-500 '>
                <ion-icon name={icon.name}></ion-icon>
            </span>
        ))}
         </div>
         </div>
  )
}