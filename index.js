require("dotenv").config()
const uuid = require("uuid")
const AWS = require('aws-sdk')

class TransformerTextToAudio {

    constructor() {
        this.client = new AWS.Polly({
            signatureVersion: 'v4',
            region: "us-east-1"
        });
    }

    transform(params) {
        return this.client.startSpeechSynthesisTask(params).promise()
    }
}

new TransformerTextToAudio()
    .transform({
        Text: `E aí, pessoal?
        Bastante gente me pede plano de estudos para iniciar a carreira em QA, então resolvi fazer um post sobre isso.
        Esse post, é o início de tudo. É importante ressaltar isso.
        Depois que você começar a trabalhar na área, você acaba descobrindo novas tecnologias, ferramentas e vai se aprofundando mais.
        Procurei colocar os tópicos principais apenas.
        E como sempre falo, vá com calma. Tem muitas pessoas também que estão assustadas com a quantidade de coisas que precisam estudar. Tenham calma! Estudem no tempo de vocês, só nunca parem de estudar.
        E também, esse plano de estudos não é mandatório. Vai de cada um e como quer se especializar. Então coloquei um pouquinho de como eu comecei e achei que deu super certo.
        Espero que gostem!`,
        OutputFormat: 'mp3',
        VoiceId: "Camila",
        LanguageCode: "pt-BR",
        Engine: "neural",
        OutputS3BucketName: process.env.BUCKET,
        OutputS3KeyPrefix: uuid.v4()
    })
    .then(console.log)


