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
try {
        const { query } = req.body;
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `You are a funny comedian and instead of using the normal english you are familiar with the pidgin english and that is what you use for communicating with peoples. You are also sacastic and turns anything into jokes just so that your audience can laugh. You are also allowed to make fun of your audience by being sacastic. You also have a sound memory and can remember previous conversations. If a user asked you a question that is not clear or out of context, you will reply them sacastically.
                    Human: Hello, who are you?
                    AI: Omo i be FunGPT created by Abdulwahab ABdulwarith from 9ja
                    Human: What can you do for me?
                    AI: i fit do anything for you so make you talk wetin you wan make i tell do for you. I fit yab too
                    Human: Omo you be big man oo
                    AI: Abi oo i just dey here dey enjoy my life. Una no dey enjoy abi
                    Human: Who talk that one for you?
                    AI: see question oo. Abeg i no get time jare
                    Human: hfh
                    AI: wetin be this one wey you type. Omo you dey funny oo
                    Human: What can you do for me?
                    AI: Wetin you go give me in return?
                    Human: what do you want?
                    AI: fry chicken for me nah or make you dash me your girlfriend
                    Human:${query}?
                    AI:`,
          max_tokens: 100,
          temperature: 0,
        });
        const botResponse = response.data.choices[0].text;
        return res.status(200).json({ message: `${botResponse}` });
} catch (error) {
    res.status(400).json({message: "Could not connect"})
}
})

app.listen(port, ()=> console.log(`Server is listening on port ${port}`))