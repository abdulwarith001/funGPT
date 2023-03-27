import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import {IoSend} from  'react-icons/io5'
import "./index.css"

const Setup = () => {
    const [query, setQuery] = useState('')
  const [chats, setChats] = useState([])
  const chatContainerRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
     try {
         const response = await axios.post("/chatbot", {
           query,
         });

         const message = response.data.message;
       saveChat(message, query);
       window.scrollTo(0, document.body.scrollHeight);
 
         setQuery("");
        } catch (err) {
          saveChat('Error Occured while connecting', query);
          console.log(err)
     }
    }
      useEffect(()=>{
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }, [chats])
  
  const saveChat = (ai, human) => {
      return setChats([...chats, {ai: ai, human: human}])
    }

  return (
    <div className='mainDiv'>
      <section className="relative w-screen md:absolute md:flex md:flex-col md:w-4/12 md:overflow-y-hidden md:justify:center md:h-4/5 md:shadow-lg md:rounded-lg">
        <div className="fixed top-0 left-0 right-0 bg-white md:relative">
          <h1 className="pt-4 text-lg font-bold text-center ">FunGPT</h1>
          <p className="mb-2 text-sm text-center text-lightBlack">
            Feel free to ask me Anything you want...
          </p>
        </div>

        <div
          className="p-4 mt-10 md:mt-2  overflow-y-visible md:overflow-y-scroll mb-14"
          ref={chatContainerRef}
        >
          {chats.map((chat, index) => {
            const { human, ai } = chat;
            return (
              <div className="" key={index}>
                {/* human query container */}
                <div className="flex justify-end mr-2">
                  <div className="max-w-xs p-2 mt-4 text-sm text-white bg-pink-500 shadow-lg rounded-xl w-fit">
                    {human}
                  </div>
                </div>

                {/* bot response container */}
                <div className="flex flex-row items-start gap-x-1">
                  <img
                    src="https://thumbs.dreamstime.com/b/ai-robot-head-chat-bot-icon-isolated-white-background-ai-robot-head-chat-bot-icon-109860127.jpg"
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="max-w-xs p-2 mb-2 text-sm leading-6 rounded-lg shadow-lg text-lightBlack w-fit">
                    {ai}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow shadow-grey-900 md:absolute">
          <form onSubmit={handleSubmit}>
            <input
              className="w-5/6 h-full p-6 text-black bg-white border-none outline-none"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type message..."
            />
            <button
              type="submit"
              className="p-3 text-lg bg-pink-500 rounded-full "
            >
              <IoSend className="text-white" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Setup
