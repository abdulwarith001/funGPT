require('dotenv').config()

const OpenAi = require('openai')
const { Configuration, OpenAIApi } = OpenAi
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const bodyparser = require('body-parser')
const cors = require('cors')
app.use('/', express.static('./client/build'))
app.use(bodyparser.json())
app.use(cors())

const configuration = new Configuration({
  organization: "org-r4Kyvgl1ZnOlrxKuEGSMCYCv",
  apiKey: process.env.OpenAI_Key,
});
const openai = new OpenAIApi(configuration);

app.post('/chatbot', async (req, res) => {
    const { query } = req.body
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.
                    Human: Hello, who are you?
                    AI: I am an AI created by Abdulwarith. How can I help you today?
                    Human:${query}?
                    AI:`,
      max_tokens: 100,
      temperature: 0,
    });
    const botResponse = response.data.choices[0].text
   return res.json({message: `${botResponse}`})
})

app.listen(port, ()=> console.log(`Server is listening on port ${port}`))