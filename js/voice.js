let isRecording = false;
let recognition = null;

function toggleVoiceRecording() {
  const output = document.getElementById('voiceTranscriptText');
  
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert('Voice transcription requires Google Chrome.');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!isRecording) {
    recognition = new SpeechRecognition();
    recognition.lang = selectedLang || 'en-IN';
    recognition.start();

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      output.value = transcript;
    };

    isRecording = true;
  } else {
    if (recognition) recognition.stop();
    isRecording = false;
  }
}
// ==========================================
// HASHTAKALA VOICE ASSISTANT
// ==========================================

let assistantRecognition = null;
let assistantListening = false;


// ------------------------------------------
// START VOICE ASSISTANT
// ------------------------------------------

function startVoiceAssistant() {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Voice Assistant requires Google Chrome."
    );
    return;
  }

  // Prevent multiple recordings
  if (assistantListening) {
    stopVoiceAssistant();
    return;
  }

  assistantRecognition =
    new SpeechRecognition();

  // Use selected language if available
  assistantRecognition.lang =
    typeof selectedLang !== "undefined"
      ? selectedLang
      : "en-IN";

  assistantRecognition.continuous = false;
  assistantRecognition.interimResults = false;

  assistantRecognition.onstart = function () {

    assistantListening = true;

    updateAssistantMessage(
      "🎙️ Listening...",
      "Speak now"
    );

    const button =
      document.getElementById(
        "voiceAssistantButton"
      );

    if (button) {
      button.classList.add("listening");
    }
  };


  assistantRecognition.onresult =
    function (event) {

      const transcript =
        event.results[0][0]
          .transcript
          .trim();

      console.log(
        "Voice Assistant:",
        transcript
      );

      updateAssistantMessage(
        "🤔 Processing...",
        transcript
      );

      processAssistantCommand(
        transcript
      );
    };


  assistantRecognition.onerror =
    function (event) {

      console.error(
        "Voice Assistant Error:",
        event.error
      );

      assistantListening = false;

      const button =
        document.getElementById(
          "voiceAssistantButton"
        );

      if (button) {
        button.classList.remove(
          "listening"
        );
      }

      if (event.error === "not-allowed") {

        updateAssistantMessage(
          "🚫 Microphone blocked",
          "Please allow microphone access in Chrome."
        );

      } else {

        updateAssistantMessage(
          "❌ Something went wrong",
          "Please try speaking again."
        );
      }
    };


  assistantRecognition.onend =
    function () {

      assistantListening = false;

      const button =
        document.getElementById(
          "voiceAssistantButton"
        );

      if (button) {
        button.classList.remove(
          "listening"
        );
      }
    };


  try {

    assistantRecognition.start();

  } catch (error) {

    console.log(
      "Assistant already started."
    );
  }
}


// ------------------------------------------
// STOP VOICE ASSISTANT
// ------------------------------------------

function stopVoiceAssistant() {

  if (
    assistantRecognition &&
    assistantListening
  ) {

    assistantRecognition.stop();

  }

  assistantListening = false;

  const button =
    document.getElementById(
      "voiceAssistantButton"
    );

  if (button) {
    button.classList.remove(
      "listening"
    );
  }
}


// ------------------------------------------
// PROCESS USER COMMAND
// ------------------------------------------

function processAssistantCommand(command) {

  const text =
    command.toLowerCase().trim();

  let response = "";


  // GREETING
  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey")
  ) {

    response =
      "Hello! Welcome to Hashtakala. How can I help you?";

  }


  // PRODUCTS
  else if (
    text.includes("products") ||
    text.includes("show products") ||
    text.includes("browse products")
  ) {

    response =
      "Sure! I can help you explore our handmade products.";

    speakAssistant(response);

    setTimeout(function () {

      const products =
        document.getElementById("products");

      if (products) {

        products.scrollIntoView({
          behavior: "smooth"
        });

      }

    }, 800);

    updateAssistantMessage(
      "🛍️ Products",
      response
    );

    return;
  }


  // POTTERY
  else if (
    text.includes("pottery") ||
    text.includes("pot") ||
    text.includes("clay")
  ) {

    response =
      "We have beautiful handmade pottery and clay products.";

  }


  // TEXTILES
  else if (
    text.includes("textile") ||
    text.includes("textiles") ||
    text.includes("cloth") ||
    text.includes("fabric")
  ) {

    response =
      "We have traditional handmade textiles and beautiful fabrics.";

  }


  // JEWELLERY
  else if (
    text.includes("jewellery") ||
    text.includes("jewelry") ||
    text.includes("ornaments")
  ) {

    response =
      "We have beautiful handmade jewellery created by artisans.";

  }


  // WOODCRAFT
  else if (
    text.includes("woodcraft") ||
    text.includes("wooden") ||
    text.includes("wood")
  ) {

    response =
      "We have traditional handmade wooden crafts.";

  }


  // SELLER
  else if (
    text.includes("seller") ||
    text.includes("sell") ||
    text.includes("sell products") ||
    text.includes("become a seller")
  ) {

    response =
      "Hashtakala allows artisans to showcase and sell their handmade products.";

  }


  // CART
  else if (
    text.includes("cart") ||
    text.includes("shopping cart")
  ) {

    response =
      "Your shopping cart feature is available on the Hashtakala website.";

  }


  // HELP
  else if (
    text.includes("help") ||
    text.includes("what can you do")
  ) {

    response =
      "I can help you explore products, find pottery, textiles, jewellery and woodcraft, and guide you through Hashtakala.";

  }


  // THANK YOU
  else if (
    text.includes("thank you") ||
    text.includes("thanks")
  ) {

    response =
      "You're welcome! Happy shopping with Hashtakala.";

  }


  // UNKNOWN
  else {

    response =
      "Sorry, I didn't understand. Try saying products, pottery, textiles, jewellery, seller, cart, or help.";
  }


  updateAssistantMessage(
    "✨ Hashtakala Assistant",
    response
  );

  speakAssistant(response);
}


// ------------------------------------------
// TEXT TO SPEECH
// ------------------------------------------

function speakAssistant(text) {

  if (
    !("speechSynthesis" in window)
  ) {

    return;
  }

  window.speechSynthesis.cancel();

  const speech =
    new SpeechSynthesisUtterance(text);

  speech.lang =
    typeof selectedLang !== "undefined"
      ? selectedLang
      : "en-IN";

  speech.rate = 0.95;
  speech.pitch = 1;
  speech.volume = 1;

  window.speechSynthesis.speak(
    speech
  );
}


// ------------------------------------------
// UPDATE ASSISTANT UI
// ------------------------------------------

function updateAssistantMessage(
  title,
  message
) {

  const titleElement =
    document.getElementById(
      "voiceAssistantTitle"
    );

  const messageElement =
    document.getElementById(
      "voiceAssistantMessage"
    );


  if (titleElement) {

    titleElement.textContent =
      title;

  }


  if (messageElement) {

    messageElement.textContent =
      message;

  }
}


// ------------------------------------------
// OPEN ASSISTANT
// ------------------------------------------

function openVoiceAssistant() {

  const modal =
    document.getElementById(
      "voiceAssistantModal"
    );

  if (modal) {

    modal.classList.add("active");

    updateAssistantMessage(
      "🎤 Hashtakala Voice Assistant",
      "Tap the microphone and speak"
    );

  }
}


// ------------------------------------------
// CLOSE ASSISTANT
// ------------------------------------------

function closeVoiceAssistant() {

  const modal =
    document.getElementById(
      "voiceAssistantModal"
    );

  if (modal) {

    modal.classList.remove("active");

  }

  stopVoiceAssistant();

  if (
    "speechSynthesis" in window
  ) {

    window.speechSynthesis.cancel();

  }
}