import cors from "cors";
import multer from "multer";
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import express from "express";
import * as path from "path";
//import { process_doc } from "./lang_script";
import { process_doc } from "./lang_particiones";
import { OpenAI } from '@langchain/openai';

dotenv.config();
const app = express();
app.use(express.json());
const PORT = 9004;
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage,
    fileFilter(req, file, callback: multer.FileFilterCallback) {
        const fileExtension = path.extname(file.originalname);
        if (!fileExtension.includes('.pdf')) {
            callback(new Error('Only pdfs are allowed'));
        }
        callback(null, true);
    }
});

// Configuración de OpenAI LangChain.
const configuration = new OpenAI({
    openAIApiKey: "**********************************",
    temperature: 0.1,
});

// Crear una instancia de OpenAI con la configuración
const openai = new OpenAI(configuration);
const generatePrompt = (numberToConvert: number) => {
    return `Tu tienes un rol de convertidor binario y requiero que conviertas este número ${numberToConvert} a binario.`;
}

let names = [
    {
        id: uuidv4(),
        firstName: 'Silvia',
        lastName: 'Quillupangui'
    },
    {
        id: uuidv4(),
        firstName: 'Lea',
        lastName: 'Rolfes'
    }
]
app.get("/ping", (req, res) => {
    console.log("alguien ha dado ping!!")
    res.setHeader("Content-Type", "application/json")
    res.send("pong")
})


app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file || !req.body?.question) {
        return res.status(400).send()
    }
    const response = await process_doc(req.file?.filename, req.body.question)
    res.send(response)
})

app.get("/hola/:nombre/:apellido", (req, res) => {
    console.log("alguien ha dado pin!!")
    res.setHeader("Content-Type", "application/json")
    const nombre = req.params.nombre
    const apellido = req.params.apellido
    console.log("alguien ha ingresado su nombre")
    res.send({nombre, apellido})
})

app.get('/nombres', (req, res) => {

    res.setHeader('Content-Type', 'application/json')
    res.send(names)
})

app.post('/nombres', (req, res) => {
    const item = {...req.body, id: uuidv4()};
    names.push(item)
    res.send(item)
})


app.post('/openapi', async (req, res) => {
    try {
        const { prompt } = req.body;
        const completion = await openai.completionWithRetry({
            model: 'gpt-3.5-turbo-instruct',
            prompt: generatePrompt(prompt),

        });

    if (completion) {
    if (completion.usage) {
    if (completion.choices[0]) {
    res.send({
        result: completion.choices[0].text,
        token: completion.usage.total_tokens
    });
} else {
    res.status(500).send({error: 'No se pudo obtener la información de uso.'});
}}}

    } catch (error) {
        console.error('Error al generar la respuesta:', error);
        res.status(500).send('Error interno del servidor');
    }
})

/*Traducir idioma*/
const Promptrad = (TextToConvert: string, idioma: string) => {
    return `Tu tienes un rol de traductor y requiero que traduzcas al ${idioma} este texto: "${TextToConvert}"`;
}

app.post('/traductor', async (req, res) => {
    try {
        const { prompt, idioma } = req.body;
        const completion = await openai.completionWithRetry({
            model: 'gpt-3.5-turbo-instruct',
            prompt: Promptrad(prompt, idioma),

        });

    if (completion) {
    if (completion.usage) {
    if (completion.choices[0]) {
    res.send({
        result: completion.choices[0].text,
        token: completion.usage.total_tokens
    });
} else {
    res.status(500).send({error: 'No se pudo obtener la información de uso.'});
}}}

    } catch (error) {
        console.error('Error al generar la respuesta:', error);
        res.status(500).send('Error interno del servidor');
    }
})


app.delete('/nombres/:id', (req, res) => {
    names = names.filter(n => n.id !== req.params.id)
    res.status(204).end()
})

app.get('/nombres/:id', (req, res) => {
    const searchedName = names.find(n => n.id === req.params.id)
    if (!searchedName)
        res.status(400).end()
    res.send(searchedName)
})

app.put('/nombres/:id', (req, res) => {
    const index = names.findIndex(n => n.id === req.params.id)
    if (index === -1)
        res.status(404).end()
    names[index] = {...req.body, id: req.params.id}
    res.status(204).end()
})
app.listen(PORT, () => {
    console.log(`running application ${PORT}`)

})