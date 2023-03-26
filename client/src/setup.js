import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Setup = () => {
    const [query, setQuery] = useState('')
    const [botResponse, setBotResponse] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetch('/chatbot', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query})
        }).then((res) => res.json()).then((data) => setBotResponse(data.message))
        setQuery('')
    }

    // useEffect(handleSubmit(), [])

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
