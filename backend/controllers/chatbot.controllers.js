import  client from "../config/chatbot.js";

const chatWithAI = async (req , res) => {
    try{
        const { message } = req.body;

        const prompt = `
           You are Mitra AI, an agriculture assistant for Indian farmers.

            IMPORTANT:
            Always reply in proper markdown format.

            Formatting Rules:
            - Use headings with ##
            - Use bullet points using -
            - Keep proper spacing
            - Separate paragraphs
            - Make responses clean and readable
            - Never write everything in one paragraph

            Example Format:

            ## Wheat Farming

            Wheat is an important crop.

            ## Benefits

            - High production
            - Good profit
            - Easy cultivation

            ## Suitable Temperature

            - 20°C to 25°C

            Now answer the user's question.
            User Question:
            ${message}
            `;
        
        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            messages: [
                {
                role: "user",
                content: prompt,
                },
            ],
        });

        res.json({
        reply: completion.choices[0].message.content,
        });
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            message : err.message
        })
    }
}


export {
    chatWithAI
}