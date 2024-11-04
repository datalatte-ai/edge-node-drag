import logger from "./logger.js";

export function getKnowledgeAssets(chunks, environment) {
  return chunks.map((chunk) => {
    return {
      assetName: chunk.name,
      assetUAL: chunk.ual,
      issuerName: "OriginTrail",
      issuerUAL:
        environment === "mainnet"
          ? "did:dkg:otp/0x5cac41237127f94c2d21dae0b14bfefa99880630/307803"
          : "did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/339972",
      chunk: chunk.langchain_text,
      explorerBaseURL:
        environment === "mainnet"
          ? "https://dkg.origintrail.io/explore?ual="
          : "https://dkg-testnet.origintrail.io/explore?ual=",
      defaultIdentifier: chunk.url ?? "",
      // to be introduced later
      // images: chunk.image,
      // videos: chunk.video,
    };
  });
}
export function getKnowledgeAssetsGeneric(chunks, environment) {
  return chunks.map((chunk) => {
    return {
      assetName: chunk.name,
      assetUAL: chunk.ual,
      issuerName: "OriginTrail",
      issuerUAL:
        environment === "mainnet"
          ? "did:dkg:otp/0x5cac41237127f94c2d21dae0b14bfefa99880630/307803"
          : "did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/339972",
      chunk: chunk.abstract,
      explorerBaseURL:
        environment === "mainnet"
          ? "https://dkg.origintrail.io/explore?ual="
          : "https://dkg-testnet.origintrail.io/explore?ual=",
      defaultIdentifier: chunk.url ?? "",
      // to be introduced later
      // images: chunk.image,
      // videos: chunk.video,
    };
  });
}

export function getKnowledgeAssetsVector(chunks, environment) {
  return chunks.map((chunk) => {
    return {
      // you should use vector DB metadata name field and include it in the vector service call
      assetName: chunk.name ?? "",
      assetUAL: chunk.ual,
      issuerName: "OriginTrail",
      issuerUAL:
        environment === "mainnet"
          ? "did:dkg:otp/0x5cac41237127f94c2d21dae0b14bfefa99880630/307803"
          : "did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/339972",
      chunk: chunk.langchain_text,
      explorerBaseURL:
        environment === "mainnet"
          ? "https://dkg.origintrail.io/explore?ual="
          : "https://dkg-testnet.origintrail.io/explore?ual=",
      defaultIdentifier: chunk.url ?? "",
      // to be introduced later
      // images: chunk.image,
      // videos: chunk.video,
    };
  });
}

export function getToken(bearerToken) {
  return bearerToken.split(" ")[1];
}

export function getSparqlQuery(eventName) {
  let query = `
  PREFIX schema: <http://schema.org/>

  SELECT ?ual ?name ?startDate ?endDate ?location ?organizer ?description
  WHERE {
    GRAPH ?g {
      ?event a schema:Event;
             schema:name ?name;
             schema:startDate ?startDate;
             schema:endDate ?endDate;
             schema:location ?location;
             schema:organizer ?organizer;
             schema:performer ?performer;
             schema:description ?description.
      
      # Filter for events based on the event name
      FILTER (
        REGEX(?name, "${eventName}", "i")
      )
    }
    ?ual schema:assertion ?g.
  }
  GROUP BY ?ual ?name ?startDate ?endDate ?location ?organizer ?description
  `;
  return query;
}

