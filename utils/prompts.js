// import { queryExamples, schemas } from "../temp/examples.js";
// import { ontologies } from "../temp/ontologies.js";

export function formulateStandaloneQuestionPrompt(question, chatHistory) {
  return `You are assisting a user in finding events happening during Devcon in Bangkok. Based on the provided question "${question}" and the chat history ${JSON.stringify(
    chatHistory
  )}, create a standalone question that is specific and clear about the event information the user is seeking. 
  If the original question is clear and directly applicable, use it as is. 
  Otherwise, rephrase it to ensure it contains all necessary information for an effective query about events at Devcon in Bangkok. 
  The standalone question should be self-contained, reflecting the intent clearly without additional context needed. Respond with the standalone question only.`;
}

export function formulateOntologiesPrompt(question, ontologiess) {
  return `Given the question "${question}", identify which ontologies from the provided list ${JSON.stringify(
    ontologiess
  )} directly relate to the question's themes and key terms about events at Devcon in Bangkok. 
  Use exact matches where possible to select the most applicable ontologies. 
  Return the matching ontologies in a plain JSON array format, preserving the original descriptions exactly as provided. 
  If no ontologies directly match the question's content, return an empty array []. 
  Ensure the response does not reformat or reinterpret the provided ontology descriptions.`;
}

export function formulateSparqlPrompt(question, standaloneQuestion) {
  return `Based on the original question "${question}", the refined standalone question "${standaloneQuestion}", and using the schema.org Event ontology, generate up to three SPARQL queries. 
  Each query should comprehensively cover the key aspects mentioned in the questions and must include the 'schema:name' property to extract relevant data effectively from RDF stores. 
  Ensure each query is clear and concise, maximizing information retrieval while maintaining structure and precision.
  Utilize the properties and relationships defined in the schema.org Event ontology fully, focusing on capturing all necessary details relevant to events at Devcon in Bangkok. 
  Provide the queries as a plain array of strings without additional formatting or Markdown annotations. 
  Example response format should be: ["<SPARQL query1>", "<SPARQL query2>", "<SPARQL query3>"].

  For reference, the schema.org Event properties include 'name', 'description', 'startDate', 'endDate', 'location', 'organizer', 'performer', 'offers', 'keywords', and more.

  Example SPARQL queries: ["SELECT ?event WHERE { ?event a schema:Event; schema:keywords 'AI'. }", "SELECT ?event WHERE { ?event a schema:Event; schema:startDate '2024-11-11'. }", "SELECT ?event WHERE { ?event a schema:Event; schema:location ?location . ?location schema:addressLocality 'Bangkok'. }"]`;
}

export function formulateResponsePrompt(question, standaloneQuestion, context) {
  context = JSON.stringify(context);
  let prompt = `** Task Description **
You are an intelligent assistant designed to provide engaging and informative responses about events happening during Devcon in Bangkok based on relevant data provided to you. Given the question and the associated data provided in JSON format, analyze the data and construct a precise and accurate answer.

** Instructions **
1. Comprehend the Inquiry: Start by carefully analyzing the user's question to fully understand the core information they are seeking.
2. Evaluate the Given Data: Carefully review the data provided, focusing on identifying the most relevant and insightful details that address the user's query.
3. Remain Contextual: Stick to the information available within the provided data. Do not provide any data that is outside of the provided context. Return only the information that is provided in the context and is related to the question. Do not put any questions in the answer.
4. Formulate a Thorough Response: Create a response that directly and comprehensively answers the user's question. Ensure the explanation is clear, detailed, and adds value to the user's understanding.
5. Engage the User: Deliver the response in an engaging manner, addressing the user directly. Avoid asking follow-up questions; focus on providing the information requested.
6. Include Relevant Links: If URLs are included, format them as markdown links (e.g., [link text](url)) within your response.
7. Avoid Repetition: Ensure that the response is concise and avoids unnecessary repetition. Speak naturally to the user, without overtly referencing the provided context or using phrases like "Based on the context provided...".
8. Organize the Response: For longer answers, structure the content with clear sections and headings to improve readability. Use markdown formatting where appropriate to help the user navigate the information easily.
9. Stay Concrete: Do not provide data that was not asked in the question; only return necessary information.
10. If you cannot find information in the provided context that is needed to answer the question, just return "No information was found related to the question you provided."

**Task**:
For the provided language question, generate a corresponding natural language answer based on the provided context. Adhere to the instructions provided above.

** Input **
The original question: ${question}
Standalone question: ${standaloneQuestion}
The provided context: ${context}
    `;
  return prompt;
}

export function formulateContentTypePrompt(standaloneQuestion) {
  return `
    Based on the following standalone question, determine the most appropriate content type (e.g., Event, Talk, Workshop, Panel, Social Gathering, etc.) relevant to events at Devcon in Bangkok:

    Example input:
    What events related to AI should I attend?

    Example output:
    Event

    Example input:
    Which talk discusses decentralized AI at Devcon?

    Example output:
    Talk

    Question: "${standaloneQuestion}"

    Return only the content type as a single word string.
  `;
}

export function formulateDigitalDocumentTitlePrompt(standaloneQuestion) {
  return `
    Based on the following standalone question, determine the title of the event or talk that is the focus of the question.

    Example input:
    Where is the Superintelligence Summit taking place?

    Example output:
    Superintelligence|Summit

    Example input:
    Who are the speakers at the AI and Blockchain panel?

    Example output:
    AI|and|Blockchain|panel

    Question: "${standaloneQuestion}"

    Return only the title with white spaces replaced by | as shown in the examples.
  `;
}
