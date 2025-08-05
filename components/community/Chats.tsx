import React from 'react'

interface ChatsPropsType {
    isChatToggle : boolean;
    setIsChatToggle : (panel : boolean) => void;
}

const Chats : React.FC<ChatsPropsType> = ({isChatToggle, setIsChatToggle}) => {
  return (
    <div className={`flex-1 bg-purple-400 max-[800px]:absolute max-[800px]:w-dvw max-[800px]:h-dvh z-20 top-0 transition-all duration-300 ${isChatToggle?"left-0":"left-full"}`}>
      <button onClick={() => {setIsChatToggle(false)}}>Toogle</button>
    </div>
  )
}

export default Chats
