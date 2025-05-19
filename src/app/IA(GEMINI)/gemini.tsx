const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
];

const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 50,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
};
// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}

async function run() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings, generationConfig });

    const prompt = "What's different between these pictures?";

    const imageParts = [
        fileToGenerativePart("image1.png", "image/png"),
        fileToGenerativePart("image2.jpeg", "image/jpeg"),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();