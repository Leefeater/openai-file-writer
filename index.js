const API_KEY = ""
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
const path = require('path');

const sendRequestToOpenAI = async (message, filePath) => {
    
    const configuration = new Configuration({
      apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      temperature: 0.5,
      max_tokens:2000
    }).then(async (response) => {
    const dir = path.dirname(filePath);
    console.log(response.data.choices)
    
    if (!fs.existsSync(dir)) {
      await fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(filePath, response.data.choices[0].text, (err) => {
      if (err) throw err;
      console.log(`The file has been saved at ${filePath}`);
    });
  });
};

sendRequestToOpenAI("write a react component that mimics a digital clock", 'components/DigitalClock.js')