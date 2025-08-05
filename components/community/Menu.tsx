import React from 'react'

interface MenuPropsType {
    isChatToggle : boolean;
    setIsChatToggle : (panel : boolean) => void;
}

const Menu : React.FC<MenuPropsType> = ({isChatToggle, setIsChatToggle}) => {
  return (
    <div className='h-full w-72 max-[800px]:w-full bg-black/40'>
      <button onClick={() => {setIsChatToggle(true)}}>Toogle</button>
    </div>
  )
}

export default Menu
