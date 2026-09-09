const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API with key from environment variables
const apiKey = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
const genAI = new GoogleGenerativeAI(apiKey);

// Use gemini-1.5-pro or gemini-1.5-flash
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

/**
 * @route   POST /api/translate
 * @desc    Translates artisan voice description into English and target languages
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const { text, sourceLang = 'auto', targetLang = 'English' } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Text to translate is required.'
      });
    }

    // Construct prompt for AI translation and formatting
    const prompt = `You are an expert translator for Indian rural artisans on the Hasthakala e-commerce platform.
Translate the following text into clear, commercial-grade ${targetLang} suitable for an e-commerce product description.

Source Text: "${text}"

Provide the output strictly as a JSON object with the following keys:
{
  "translatedText": "The primary translation in ${targetLang}",
  "formattedDescription": "A refined, professional e-commerce product description based on the translation"
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON response safely
    let parsedData;
    try {
      // Remove any markdown code fence wrappers if present
      const cleanJson = responseText.replace(/```json|```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    } catch (parseError) {
      parsedData = {
        translatedText: responseText.trim(),
        formattedDescription: responseText.trim()
      };
    }

    return res.status(200).json({
      success: true,
      data: parsedData
    });

  } catch (error) {
    console.error('Translation Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to translate text. Please check your API configuration or network connection.'
    });
  }
});

module.exports = router;