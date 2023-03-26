import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Setup = () => {
    const [query, setQuery] = useState('')
    const [botResponse, setBotResponse] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post("/chatbot", {query})
        const message = response.data.message
        setBotResponse(message)
        setQuery('')
    }

  return (
    <section>
      <h1>FunGPT</h1>
      <div>{botResponse}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query here"
              />
              <button type='submit'>Ask</button>
      </form>
    </section>
  );
}

export default Setup
