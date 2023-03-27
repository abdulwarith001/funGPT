import React, { useState } from 'react'
import axios from 'axios'
import {IoSend} from  'react-icons/io5'
import "./index.css"

const Setup = () => {
    const [query, setQuery] = useState('')
  const [chats, setChats] = useState([])

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
     }
    }

  const saveChat = (ai, human) => {
      return setChats([...chats, {ai: ai, human: human}])
    }

  return (
    <section className="background-gradient w-screen md:bg-green-900">
      <div className="fixed top-0 left-0 right-0 bg-white">
        <h1 className="text-lg text-center font-bold pt-4 ">FunGPT</h1>
        <p className="text-sm text-center text-lightBlack mb-2">
          Feel free to ask me Anything you want...
        </p>
      </div>

      <div className="p-4 overflow-y-visible mt-10 mb-14">
        {chats.map((chat, index) => {
          const { human, ai } = chat;
          return (
            <div className="" key={index}>
              <div className="flex justify-end mr-2">
                <div className="p-2 bg-pink-500 mt-4 shadow-lg text-white text-sm rounded-xl w-fit max-w-xs">
                  {human}
                </div>
              </div>

              <div className="flex flex-row items-start gap-x-1">
                <img
                  src="https://thumbs.dreamstime.com/b/ai-robot-head-chat-bot-icon-isolated-white-background-ai-robot-head-chat-bot-icon-109860127.jpg"
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <div className="p-2 text-sm leading-6 text-lightBlack shadow-lg mb-2 rounded-lg w-fit max-w-xs">
                  {ai}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className=" fixed bottom-0 left-0 right-0 h-16 shadow  shadow-grey-900 bg-white">
        <form onSubmit={handleSubmit}>
          <input
            className="h-full bg-white outline-none border-none text-black p-6 w-5/6"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type message..."
          />
          <button
            type="submit"
            className="bg-pink-500 p-3 text-lg rounded-full "
          >
            <IoSend className="" />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Setup
