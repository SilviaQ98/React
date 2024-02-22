import {OpenAI} from "langchain";
import {RetrievalQAChain} from "langchain/chains";
import {PDFLoader} from "langchain/document_loaders/fs/pdf";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {MemoryVectorStore} from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


export const process_doc = async (filename: string | undefined, question: string) => {
    const model = new OpenAI({modelName:'gpt-3.5-turbo'});
    const loader = new PDFLoader(`C:/Users/silvi/Downloads/PracticaReact-main/PracticaReact-main/backend/uploads/${filename}`, {
        splitPages: false
    })
    
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 100,
      });
      
    const doc = await loader.load()
    const docOutput = await splitter.splitDocuments(doc) //vectores de los pequeños documentos
    const vectorStore = await MemoryVectorStore.fromDocuments(docOutput, new OpenAIEmbeddings()) //recepta las particiones
    const vectorStoreRetriever = vectorStore.asRetriever()
    const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
    return await chain.call({
        query: question,
})
}