const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateGeminiPostsPost = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    // ✅ COMPATIBILITY MODEL — works for ALL keys
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return res.status(200).json({
      success: true,
      text,
    });
  } catch (error) {
    console.error("Gemini AI error:", error);

    return res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
};

const generatePostWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/HuggingFaceH4/zephyr-7b-beta",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
          },
        }),
      },
    );
    console.log(response, "HF response");
    return;
    const data = await response.json();
    console.log(data);
    const text = data?.[0]?.generated_text?.replace(prompt, "") || "";

    return res.status(200).json({
      success: true,
      text: text.trim(),
    });
  } catch (error) {
    console.error("HF AI error:", error);

    return res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
};

const generatePostWithGroq = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // ✅ UPDATED
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();
    console.log("Groq RAW response:", data);
    if (!response.ok) {
      console.log("Groq RAW error:", data);
      return res.status(response.status).json(data);
    }

    const text = data?.choices?.[0]?.message?.content;

    return res.status(200).json({
      success: true,
      text,
    });
  } catch (error) {
    console.error("Groq AI error:", error);
    return res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
};

module.exports = { generatePostWithGroq };

module.exports = {
  generateGeminiPostsPost,
  generatePostWithAI,
  generatePostWithGroq,
};
