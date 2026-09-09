(function () {

    let assistantRecognition = null;
    let assistantListening = false;

    // ==========================================
    // LANGUAGE
    // ==========================================

    function getAssistantLanguage() {

        if (
            typeof selectedLang !== "undefined" &&
            selectedLang
        ) {
            return selectedLang;
        }

        return "en-IN";
    }


    // ==========================================
    // TRANSLATIONS
    // ==========================================

    const assistantText = {

        "en-IN": {
            title: "🎤 Hashtakala Voice Assistant",
            start: "Tap the microphone and speak",
            listening: "🎙️ Listening...",
            speak: "Speak now",
            products: "Opening Hashtakala products.",
            pottery: "Hashtakala has beautiful handmade pottery and clay crafts.",
            textiles: "Hashtakala features beautiful traditional handmade textiles.",
            jewellery: "You can discover beautiful handmade jewellery from Hashtakala artisans.",
            woodcraft: "Hashtakala offers traditional handmade wooden crafts.",
            seller: "Opening the artisan seller portal.",
            cart: "Opening your shopping cart.",
            help: "I can help you explore products, pottery, textiles, jewellery, woodcraft, your cart and the seller portal.",
            thanks: "You're welcome! Happy shopping with Hashtakala.",
            notUnderstand: "Sorry, I didn't understand. Please try again.",
            microphone: "Please allow microphone access in Chrome."
        },

        "hi-IN": {
            title: "🎤 हस्तकला वॉइस असिस्टेंट",
            start: "माइक्रोफ़ोन दबाएं और बोलें",
            listening: "🎙️ सुन रहा हूँ...",
            speak: "बोलें",
            products: "हस्तकला के उत्पाद खोल रहा हूँ।",
            pottery: "हस्तकला में सुंदर हस्तनिर्मित मिट्टी और बर्तन की कला उपलब्ध है।",
            textiles: "हस्तकला में सुंदर पारंपरिक हस्तनिर्मित कपड़े उपलब्ध हैं।",
            jewellery: "आप हस्तकला के कारीगरों की सुंदर हस्तनिर्मित ज्वेलरी देख सकते हैं।",
            woodcraft: "हस्तकला में पारंपरिक हस्तनिर्मित लकड़ी की कला उपलब्ध है।",
            seller: "कारीगर विक्रेता पोर्टल खोल रहा हूँ।",
            cart: "आपकी शॉपिंग कार्ट खोल रहा हूँ।",
            help: "मैं आपको उत्पाद, मिट्टी की कला, कपड़े, ज्वेलरी, लकड़ी की कला, कार्ट और विक्रेता पोर्टल में मदद कर सकता हूँ।",
            thanks: "आपका स्वागत है! हस्तकला के साथ खरीदारी का आनंद लें।",
            notUnderstand: "माफ़ कीजिए, मैं समझ नहीं पाया। कृपया दोबारा बोलें।",
            microphone: "कृपया Chrome में माइक्रोफ़ोन की अनुमति दें।"
        },

        "te-IN": {
            title: "🎤 హస్తకళ వాయిస్ అసిస్టెంట్",
            start: "మైక్రోఫోన్ నొక్కి మాట్లాడండి",
            listening: "🎙️ వింటున్నాను...",
            speak: "మాట్లాడండి",
            products: "హస్తకళ ఉత్పత్తులను తెరుస్తున్నాను.",
            pottery: "హస్తకళలో అందమైన చేతితో తయారు చేసిన మట్టి మరియు కుండల కళలు ఉన్నాయి.",
            textiles: "హస్తకళలో అందమైన సాంప్రదాయ చేతితో తయారు చేసిన వస్త్రాలు ఉన్నాయి.",
            jewellery: "హస్తకళ కళాకారుల అందమైన చేతితో తయారు చేసిన ఆభరణాలను చూడవచ్చు.",
            woodcraft: "హస్తకళలో సాంప్రదాయ చేతితో తయారు చేసిన చెక్క కళలు ఉన్నాయి.",
            seller: "కళాకారుల విక్రేత పోర్టల్‌ను తెరుస్తున్నాను.",
            cart: "మీ షాపింగ్ కార్ట్‌ను తెరుస్తున్నాను.",
            help: "ఉత్పత్తులు, మట్టి కళలు, వస్త్రాలు, ఆభరణాలు, చెక్క కళలు, కార్ట్ మరియు విక్రేత పోర్టల్‌లో నేను మీకు సహాయం చేయగలను.",
            thanks: "స్వాగతం! హస్తకళతో షాపింగ్‌ను ఆనందించండి.",
            notUnderstand: "క్షమించండి, నాకు అర్థం కాలేదు. దయచేసి మళ్లీ మాట్లాడండి.",
            microphone: "దయచేసి Chromeలో మైక్రోఫోన్ అనుమతిని ఇవ్వండి."
        },

        "ta-IN": {
            title: "🎤 ஹஸ்தகலா குரல் உதவியாளர்",
            start: "மைக்ரோஃபோனை அழுத்தி பேசுங்கள்",
            listening: "🎙️ கேட்கிறேன்...",
            speak: "பேசுங்கள்",
            products: "ஹஸ்தகலா தயாரிப்புகளைத் திறக்கிறேன்.",
            pottery: "அழகான கைவினை மண் பானைகள் இங்கே உள்ளன.",
            textiles: "அழகான பாரம்பரிய கைவினை துணிகள் இங்கே உள்ளன.",
            jewellery: "கைவினைஞர்களின் அழகான நகைகளை நீங்கள் பார்க்கலாம்.",
            woodcraft: "பாரம்பரிய கைவினை மரப்பொருட்கள் இங்கே உள்ளன.",
            seller: "கைவினைஞர் விற்பனையாளர் போர்ட்டலைத் திறக்கிறேன்.",
            cart: "உங்கள் ஷாப்பிங் கார்ட்டைத் திறக்கிறேன்.",
            help: "தயாரிப்புகள், மண் பானைகள், துணிகள், நகைகள், மரப்பொருட்கள், கார்ட் மற்றும் விற்பனையாளர் போர்ட்டலில் உதவ முடியும்.",
            thanks: "வரவேற்கிறோம்! ஹஸ்தகலாவுடன் மகிழ்ச்சியாக வாங்குங்கள்.",
            notUnderstand: "மன்னிக்கவும், எனக்கு புரியவில்லை. மீண்டும் பேசுங்கள்.",
            microphone: "Chrome-ல் மைக்ரோஃபோன் அனுமதியை வழங்கவும்."
        },

        "kn-IN": {
            title: "🎤 ಹಸ್ತಕಲಾ ಧ್ವನಿ ಸಹಾಯಕ",
            start: "ಮೈಕ್ರೋಫೋನ್ ಒತ್ತಿ ಮಾತನಾಡಿ",
            listening: "🎙️ ಕೇಳುತ್ತಿದ್ದೇನೆ...",
            speak: "ಮಾತನಾಡಿ",
            products: "ಹಸ್ತಕಲಾ ಉತ್ಪನ್ನಗಳನ್ನು ತೆರೆಯುತ್ತಿದ್ದೇನೆ.",
            pottery: "ಹಸ್ತಕಲಾದಲ್ಲಿ ಸುಂದರವಾದ ಕೈಯಿಂದ ತಯಾರಿಸಿದ ಮಣ್ಣಿನ ಕರಕುಶಲ ವಸ್ತುಗಳಿವೆ.",
            textiles: "ಹಸ್ತಕಲಾದಲ್ಲಿ ಸುಂದರವಾದ ಸಾಂಪ್ರದಾಯಿಕ ಕೈಯಿಂದ ತಯಾರಿಸಿದ ಬಟ್ಟೆಗಳಿವೆ.",
            jewellery: "ಕೈಯಿಂದ ತಯಾರಿಸಿದ ಸುಂದರ ಆಭರಣಗಳನ್ನು ನೀವು ನೋಡಬಹುದು.",
            woodcraft: "ಸಾಂಪ್ರದಾಯಿಕ ಕೈಯಿಂದ ತಯಾರಿಸಿದ ಮರದ ಕರಕುಶಲ ವಸ್ತುಗಳಿವೆ.",
            seller: "ಕರಕುಶಲ ಮಾರಾಟಗಾರರ ಪೋರ್ಟಲ್ ತೆರೆಯುತ್ತಿದ್ದೇನೆ.",
            cart: "ನಿಮ್ಮ ಶಾಪಿಂಗ್ ಕಾರ್ಟ್ ತೆರೆಯುತ್ತಿದ್ದೇನೆ.",
            help: "ಉತ್ಪನ್ನಗಳು, ಮಣ್ಣಿನ ಕರಕುಶಲ, ಬಟ್ಟೆಗಳು, ಆಭರಣಗಳು, ಮರದ ಕರಕುಶಲ, ಕಾರ್ಟ್ ಮತ್ತು ಮಾರಾಟಗಾರರ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನಾನು ಸಹಾಯ ಮಾಡಬಹುದು.",
            thanks: "ಸ್ವಾಗತ! ಹಸ್ತಕಲಾದೊಂದಿಗೆ ಶಾಪಿಂಗ್ ಆನಂದಿಸಿ.",
            notUnderstand: "ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಮಾತನಾಡಿ.",
            microphone: "ದಯವಿಟ್ಟು Chrome ನಲ್ಲಿ ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿ ನೀಡಿ."
        },

        "ml-IN": {
            title: "🎤 ഹസ്തകല വോയ്സ് അസിസ്റ്റന്റ്",
            start: "മൈക്രോഫോൺ അമർത്തി സംസാരിക്കുക",
            listening: "🎙️ കേൾക്കുന്നു...",
            speak: "സംസാരിക്കുക",
            products: "ഹസ്തകല ഉൽപ്പന്നങ്ങൾ തുറക്കുന്നു.",
            pottery: "മനോഹരമായ കൈകൊണ്ട് നിർമ്മിച്ച മൺപാത്രങ്ങൾ ഹസ്തകലയിൽ ലഭ്യമാണ്.",
            textiles: "മനോഹരമായ പരമ്പരാഗത കൈത്തറി വസ്ത്രങ്ങൾ ഹസ്തകലയിൽ ലഭ്യമാണ്.",
            jewellery: "കൈകൊണ്ട് നിർമ്മിച്ച മനോഹരമായ ആഭരണങ്ങൾ കാണാം.",
            woodcraft: "പരമ്പരാഗത കൈകൊണ്ട് നിർമ്മിച്ച മരപ്പണികൾ ലഭ്യമാണ്.",
            seller: "കരകൗശല വിൽപ്പനക്കാരുടെ പോർട്ടൽ തുറക്കുന്നു.",
            cart: "നിങ്ങളുടെ ഷോപ്പിംഗ് കാർട്ട് തുറക്കുന്നു.",
            help: "ഉൽപ്പന്നങ്ങൾ, മൺപാത്രങ്ങൾ, വസ്ത്രങ്ങൾ, ആഭരണങ്ങൾ, മരപ്പണികൾ, കാർട്ട്, വിൽപ്പനക്കാരുടെ പോർട്ടൽ എന്നിവയിൽ സഹായിക്കാം.",
            thanks: "സ്വാഗതം! ഹസ്തകലയിൽ സന്തോഷത്തോടെ ഷോപ്പിംഗ് ചെയ്യൂ.",
            notUnderstand: "ക്ഷമിക്കണം, എനിക്ക് മനസ്സിലായില്ല. വീണ്ടും സംസാരിക്കുക.",
            microphone: "Chrome-ൽ മൈക്രോഫോൺ അനുമതി നൽകുക."
        },

        "bn-IN": {
            title: "🎤 হস্তকলা ভয়েস অ্যাসিস্ট্যান্ট",
            start: "মাইক্রোফোন চাপুন এবং কথা বলুন",
            listening: "🎙️ শুনছি...",
            speak: "বলুন",
            products: "হস্তকলার পণ্য খুলছি।",
            pottery: "হস্তকলায় সুন্দর হাতে তৈরি মাটির কারুশিল্প রয়েছে।",
            textiles: "হস্তকলায় সুন্দর ঐতিহ্যবাহী হাতে তৈরি বস্ত্র রয়েছে।",
            jewellery: "আপনি সুন্দর হাতে তৈরি গয়না দেখতে পারেন।",
            woodcraft: "ঐতিহ্যবাহী হাতে তৈরি কাঠের কারুশিল্প রয়েছে।",
            seller: "কারিগর বিক্রেতা পোর্টাল খুলছি।",
            cart: "আপনার শপিং কার্ট খুলছি।",
            help: "আমি পণ্য, মাটির শিল্প, বস্ত্র, গয়না, কাঠের শিল্প, কার্ট এবং বিক্রেতা পোর্টালে সাহায্য করতে পারি।",
            thanks: "স্বাগতম! হস্তকলার সঙ্গে কেনাকাটা উপভোগ করুন।",
            notUnderstand: "দুঃখিত, আমি বুঝতে পারিনি। আবার বলুন।",
            microphone: "Chrome-এ মাইক্রোফোনের অনুমতি দিন।"
        },

        "mr-IN": {
            title: "🎤 हस्तकला व्हॉइस असिस्टंट",
            start: "मायक्रोफोन दाबा आणि बोला",
            listening: "🎙️ ऐकत आहे...",
            speak: "बोला",
            products: "हस्तकलाची उत्पादने उघडत आहे.",
            pottery: "हस्तकलामध्ये सुंदर हाताने बनवलेली मातीची कलाकुसर आहे.",
            textiles: "हस्तकलामध्ये सुंदर पारंपरिक हाताने बनवलेले कापड आहे.",
            jewellery: "तुम्ही सुंदर हाताने बनवलेले दागिने पाहू शकता.",
            woodcraft: "पारंपरिक हाताने बनवलेली लाकडी कलाकुसर उपलब्ध आहे.",
            seller: "कारागीर विक्रेता पोर्टल उघडत आहे.",
            cart: "तुमची शॉपिंग कार्ट उघडत आहे.",
            help: "मी उत्पादने, मातीची कला, कापड, दागिने, लाकडी कला, कार्ट आणि विक्रेता पोर्टलमध्ये मदत करू शकतो.",
            thanks: "स्वागत आहे! हस्तकलासोबत खरेदीचा आनंद घ्या.",
            notUnderstand: "माफ करा, मला समजले नाही. पुन्हा बोला.",
            microphone: "कृपया Chrome मध्ये मायक्रोफोनची परवानगी द्या."
        },

        "gu-IN": {
            title: "🎤 હસ્તકલા વૉઇસ આસિસ્ટન્ટ",
            start: "માઇક્રોફોન દબાવો અને બોલો",
            listening: "🎙️ સાંભળી રહ્યો છું...",
            speak: "બોલો",
            products: "હસ્તકલાના ઉત્પાદનો ખોલી રહ્યો છું.",
            pottery: "હસ્તકલામાં સુંદર હાથથી બનાવેલા માટીના શિલ્પો છે.",
            textiles: "હસ્તકલામાં સુંદર પરંપરાગત હાથથી બનાવેલા કાપડ છે.",
            jewellery: "તમે સુંદર હાથથી બનાવેલા દાગીના જોઈ શકો છો.",
            woodcraft: "પરંપરાગત હાથથી બનાવેલી લાકડાની કારીગરી ઉપલબ્ધ છે.",
            seller: "કારીગર વેચનાર પોર્ટલ ખોલી રહ્યો છું.",
            cart: "તમારી શોપિંગ કાર્ટ ખોલી રહ્યો છું.",
            help: "હું ઉત્પાદનો, માટીની કળા, કાપડ, દાગીના, લાકડાની કળા, કાર્ટ અને વેચનાર પોર્ટલમાં મદદ કરી શકું છું.",
            thanks: "આપનું સ્વાગત છે! હસ્તકલા સાથે ખરીદીનો આનંદ માણો.",
            notUnderstand: "માફ કરશો, મને સમજાયું નહીં. ફરીથી બોલો.",
            microphone: "કૃપા કરીને Chrome માં માઇક્રોફોનની પરવાનગી આપો."
        },

        "pa-IN": {
            title: "🎤 ਹਸਤਕਲਾ ਵੌਇਸ ਅਸਿਸਟੈਂਟ",
            start: "ਮਾਈਕ੍ਰੋਫੋਨ ਦਬਾਓ ਅਤੇ ਬੋਲੋ",
            listening: "🎙️ ਸੁਣ ਰਿਹਾ ਹਾਂ...",
            speak: "ਬੋਲੋ",
            products: "ਹਸਤਕਲਾ ਦੇ ਉਤਪਾਦ ਖੋਲ੍ਹ ਰਿਹਾ ਹਾਂ।",
            pottery: "ਹਸਤਕਲਾ ਵਿੱਚ ਸੁੰਦਰ ਹੱਥ ਨਾਲ ਬਣੀ ਮਿੱਟੀ ਦੀ ਕਲਾ ਉਪਲਬਧ ਹੈ।",
            textiles: "ਹਸਤਕਲਾ ਵਿੱਚ ਸੁੰਦਰ ਰਵਾਇਤੀ ਹੱਥ ਨਾਲ ਬਣੇ ਕੱਪੜੇ ਉਪਲਬਧ ਹਨ।",
            jewellery: "ਤੁਸੀਂ ਸੁੰਦਰ ਹੱਥ ਨਾਲ ਬਣੇ ਗਹਿਣੇ ਦੇਖ ਸਕਦੇ ਹੋ।",
            woodcraft: "ਰਵਾਇਤੀ ਹੱਥ ਨਾਲ ਬਣੀ ਲੱਕੜ ਦੀ ਕਲਾ ਉਪਲਬਧ ਹੈ।",
            seller: "ਕਾਰੀਗਰ ਵਿਕਰੇਤਾ ਪੋਰਟਲ ਖੋਲ੍ਹ ਰਿਹਾ ਹਾਂ।",
            cart: "ਤੁਹਾਡੀ ਸ਼ਾਪਿੰਗ ਕਾਰਟ ਖੋਲ੍ਹ ਰਿਹਾ ਹਾਂ।",
            help: "ਮੈਂ ਉਤਪਾਦਾਂ, ਮਿੱਟੀ ਦੀ ਕਲਾ, ਕੱਪੜਿਆਂ, ਗਹਿਣਿਆਂ, ਲੱਕੜ ਦੀ ਕਲਾ, ਕਾਰਟ ਅਤੇ ਵਿਕਰੇਤਾ ਪੋਰਟਲ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।",
            thanks: "ਜੀ ਆਇਆਂ ਨੂੰ! ਹਸਤਕਲਾ ਨਾਲ ਖਰੀਦਦਾਰੀ ਦਾ ਆਨੰਦ ਲਓ।",
            notUnderstand: "ਮਾਫ਼ ਕਰਨਾ, ਮੈਂ ਸਮਝ ਨਹੀਂ ਸਕਿਆ। ਦੁਬਾਰਾ ਬੋਲੋ।",
            microphone: "ਕਿਰਪਾ ਕਰਕੇ Chrome ਵਿੱਚ ਮਾਈਕ੍ਰੋਫੋਨ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ।"
        }

    };


    // ==========================================
    // GET LANGUAGE TEXT
    // ==========================================

    function getText() {

        const lang = getAssistantLanguage();

        return assistantText[lang] ||
               assistantText["en-IN"];
    }


    // ==========================================
    // OPEN ASSISTANT
    // ==========================================

    window.openVoiceAssistant = function () {

        const modal =
            document.getElementById(
                "voiceAssistantModal"
            );

        if (!modal) return;

        modal.classList.add("active");

        const t = getText();

        updateUI(
            t.title,
            t.start
        );
    };


    // ==========================================
    // CLOSE ASSISTANT
    // ==========================================

    window.closeVoiceAssistant = function () {

        stopAssistant();

        if ("speechSynthesis" in window) {
            speechSynthesis.cancel();
        }

        const modal =
            document.getElementById(
                "voiceAssistantModal"
            );

        if (modal) {
            modal.classList.remove("active");
        }
    };


    // ==========================================
    // START VOICE
    // ==========================================

    window.startVoiceAssistant = function () {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        const t = getText();

        if (!SpeechRecognition) {

            updateUI(
                "❌ Browser not supported",
                "Please use Google Chrome."
            );

            return;
        }

        if (assistantListening) {

            stopAssistant();
            return;
        }

        assistantRecognition =
            new SpeechRecognition();

        // IMPORTANT:
        // Use selected language
        assistantRecognition.lang =
            getAssistantLanguage();

        assistantRecognition.continuous = false;
        assistantRecognition.interimResults = false;

        assistantRecognition.onstart =
            function () {

                assistantListening = true;

                const button =
                    document.getElementById(
                        "voiceAssistantButton"
                    );

                if (button) {

                    button.classList.add(
                        "listening"
                    );

                    const span =
                        button.querySelector(
                            "span"
                        );

                    if (span) {
                        span.textContent =
                            t.listening;
                    }
                }

                updateUI(
                    t.listening,
                    t.speak
                );
            };


        assistantRecognition.onresult =
            function (event) {

                const transcript =
                    event.results[0][0]
                        .transcript
                        .trim();

                console.log(
                    "Language:",
                    getAssistantLanguage()
                );

                console.log(
                    "Assistant heard:",
                    transcript
                );

                updateUI(
                    "🤔",
                    transcript
                );

                processCommand(transcript);
            };


        assistantRecognition.onerror =
            function (event) {

                console.error(
                    "Voice error:",
                    event.error
                );

                assistantListening = false;

                resetAssistantButton();

                if (
                    event.error ===
                    "not-allowed"
                ) {

                    updateUI(
                        "🚫",
                        t.microphone
                    );

                } else if (
                    event.error ===
                    "no-speech"
                ) {

                    updateUI(
                        "🔇",
                        t.notUnderstand
                    );

                } else {

                    updateUI(
                        "❌",
                        "Voice error: " +
                        event.error
                    );
                }
            };


        assistantRecognition.onend =
            function () {

                assistantListening = false;

                resetAssistantButton();
            };


        try {

            assistantRecognition.start();

        } catch (error) {

            console.error(error);
        }
    };


    // ==========================================
    // STOP
    // ==========================================

    function stopAssistant() {

        if (
            assistantRecognition &&
            assistantListening
        ) {

            try {
                assistantRecognition.stop();
            } catch (error) {
                console.log(error);
            }
        }

        assistantListening = false;

        resetAssistantButton();
    }


    // ==========================================
    // RESET BUTTON
    // ==========================================

    function resetAssistantButton() {

        const button =
            document.getElementById(
                "voiceAssistantButton"
            );

        if (!button) return;

        button.classList.remove(
            "listening"
        );

        const span =
            button.querySelector(
                "span"
            );

        if (span) {

            span.textContent =
                getText().speak;
        }
    }


    // ==========================================
    // PROCESS COMMAND
    // ==========================================

    function processCommand(command) {

        const text =
            command.toLowerCase().trim();

        const lang =
            getAssistantLanguage();

        const t = getText();

        console.log(
            "Processing language:",
            lang
        );

        console.log(
            "Command:",
            text
        );


        // ======================================
        // ENGLISH
        // ======================================

        if (lang === "en-IN") {

            if (
                text.includes("product") ||
                text.includes("browse")
            ) {
                doAction(t.products, "products");
                return;
            }

            if (
                text.includes("pottery") ||
                text.includes("clay") ||
                text.includes("pot")
            ) {
                respond(t.pottery);
                return;
            }

            if (
                text.includes("textile") ||
                text.includes("fabric") ||
                text.includes("cloth")
            ) {
                respond(t.textiles);
                return;
            }

            if (
                text.includes("jewellery") ||
                text.includes("jewelry") ||
                text.includes("ornament")
            ) {
                respond(t.jewellery);
                return;
            }

            if (
                text.includes("woodcraft") ||
                text.includes("wood craft") ||
                text.includes("wooden")
            ) {
                respond(t.woodcraft);
                return;
            }

            if (
                text.includes("seller") ||
                text.includes("artisan") ||
                text.includes("sell")
            ) {
                doAction(t.seller, "seller");
                return;
            }

            if (
                text.includes("cart")
            ) {
                doAction(t.cart, "cart");
                return;
            }

            if (
                text.includes("help")
            ) {
                respond(t.help);
                return;
            }

            if (
                text.includes("thank")
            ) {
                respond(t.thanks);
                return;
            }
        }


        // ======================================
        // TELUGU
        // ======================================

        if (lang === "te-IN") {

            if (
                text.includes("ఉత్పత్త") ||
                text.includes("ప్రొడక్ట్") ||
                text.includes("వస్తువ")
            ) {
                doAction(t.products, "products");
                return;
            }

            if (
                text.includes("మట్టి") ||
                text.includes("కుండ") ||
                text.includes("కుండలు")
            ) {
                respond(t.pottery);
                return;
            }

            if (
                text.includes("వస్త్ర") ||
                text.includes("బట్ట") ||
                text.includes("చీర")
            ) {
                respond(t.textiles);
                return;
            }

            if (
                text.includes("ఆభరణ") ||
                text.includes("నగ") ||
                text.includes("జువెల")
            ) {
                respond(t.jewellery);
                return;
            }

            if (
                text.includes("చెక్క") ||
                text.includes("కలప")
            ) {
                respond(t.woodcraft);
                return;
            }

            if (
                text.includes("విక్రయ") ||
                text.includes("అమ్మ") ||
                text.includes("అమ్మాలి") ||
                text.includes("కళాకార")
            ) {
                doAction(t.seller, "seller");
                return;
            }

            if (
                text.includes("కార్ట్") ||
                text.includes("బండి")
            ) {
                doAction(t.cart, "cart");
                return;
            }

            if (
                text.includes("సహాయం") ||
                text.includes("హెల్ప్")
            ) {
                respond(t.help);
                return;
            }
        }


        // ======================================
        // HINDI
        // ======================================

        if (lang === "hi-IN") {

            if (
                text.includes("उत्पाद") ||
                text.includes("प्रोडक्ट") ||
                text.includes("सामान")
            ) {
                doAction(t.products, "products");
                return;
            }

            if (
                text.includes("मिट्टी") ||
                text.includes("बर्तन") ||
                text.includes("कुम्हार")
            ) {
                respond(t.pottery);
                return;
            }

            if (
                text.includes("कपड़ा") ||
                text.includes("कपड़े") ||
                text.includes("वस्त्र")
            ) {
                respond(t.textiles);
                return;
            }

            if (
                text.includes("गहना") ||
                text.includes("आभूषण")
            ) {
                respond(t.jewellery);
                return;
            }

            if (
                text.includes("लकड़ी") ||
                text.includes("लकड़ी")
            ) {
                respond(t.woodcraft);
                return;
            }

            if (
                text.includes("बेचना") ||
                text.includes("बेच") ||
                text.includes("कारीगर")
            ) {
                doAction(t.seller, "seller");
                return;
            }

            if (
                text.includes("कार्ट")
            ) {
                doAction(t.cart, "cart");
                return;
            }

            if (
                text.includes("मदद") ||
                text.includes("सहायता")
            ) {
                respond(t.help);
                return;
            }
        }


        // ======================================
        // GENERAL COMMANDS
        // ======================================

        // English words can still work
        // even if another language is selected.

        if (
            text.includes("product") ||
            text.includes("products")
        ) {
            doAction(t.products, "products");
            return;
        }

        if (
            text.includes("cart")
        ) {
            doAction(t.cart, "cart");
            return;
        }

        if (
            text.includes("seller") ||
            text.includes("sell")
        ) {
            doAction(t.seller, "seller");
            return;
        }


        // ======================================
        // UNKNOWN
        // ======================================

        respond(t.notUnderstand);
    }


    // ==========================================
    // ACTION
    // ==========================================

    function doAction(message, action) {

        updateUI(
            "✨ Hashtakala",
            message
        );

        speak(message);

        setTimeout(
            function () {

                if (action === "products") {

                    if (
                        typeof openRole ===
                        "function"
                    ) {
                        openRole("buyer");
                    }
                }

                if (action === "seller") {

                    if (
                        typeof openRole ===
                        "function"
                    ) {
                        openRole("seller");
                    }
                }

                if (action === "cart") {

                    if (
                        typeof openCartModal ===
                        "function"
                    ) {
                        openCartModal();
                    }
                }

            },
            700
        );
    }


    // ==========================================
    // NORMAL RESPONSE
    // ==========================================

    function respond(message) {

        updateUI(
            "✨ Hashtakala",
            message
        );

        speak(message);
    }


    // ==========================================
    // TEXT TO SPEECH
    // ==========================================

    function speak(text) {

        if (
            !("speechSynthesis" in window)
        ) {
            return;
        }

        speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(
                text
            );

        speech.lang =
            getAssistantLanguage();

        speech.rate = 0.9;
        speech.pitch = 1;
        speech.volume = 1;

        speechSynthesis.speak(
            speech
        );
    }


    // ==========================================
    // UPDATE UI
    // ==========================================

    function updateUI(
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


    // ==========================================
    // CREATE UI
    // ==========================================

    function createAssistantUI() {

        if (
            document.getElementById(
                "voiceAssistantModal"
            )
        ) {
            return;
        }


        // FLOATING BUTTON

        const floatingButton =
            document.createElement(
                "button"
            );

        floatingButton.id =
            "voiceAssistantFloatingButton";

        floatingButton.className =
            "voice-assistant-floating";

        floatingButton.title =
            "Hashtakala Voice Assistant";

        floatingButton.innerHTML =
            "🎤";

        floatingButton.onclick =
            window.openVoiceAssistant;

        document.body.appendChild(
            floatingButton
        );


        // MODAL

        const modal =
            document.createElement(
                "div"
            );

        modal.id =
            "voiceAssistantModal";

        modal.className =
            "voice-assistant-modal";


        modal.innerHTML = `

            <div class="voice-assistant-card">

                <button
                    class="voice-assistant-close"
                    id="voiceAssistantClose">
                    ×
                </button>

                <div class="voice-assistant-icon">
                    🎤
                </div>

                <h2 id="voiceAssistantTitle">
                    🎤 Hashtakala Voice Assistant
                </h2>

                <p id="voiceAssistantMessage">
                    Tap the microphone and speak
                </p>

                <button
                    id="voiceAssistantButton"
                    class="voice-assistant-button">

                    🎙️

                    <span>
                        Speak
                    </span>

                </button>

                <div class="voice-assistant-examples">

                    <strong>
                        Try saying:
                    </strong>

                    <span>Products</span>
                    <span>Pottery</span>
                    <span>Textiles</span>
                    <span>Jewellery</span>
                    <span>Cart</span>
                    <span>Seller</span>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        // CLOSE

        document
            .getElementById(
                "voiceAssistantClose"
            )
            .addEventListener(
                "click",
                window.closeVoiceAssistant
            );


        // SPEAK

        document
            .getElementById(
                "voiceAssistantButton"
            )
            .addEventListener(
                "click",
                window.startVoiceAssistant
            );


        // CLICK OUTSIDE

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    modal
                ) {

                    window.closeVoiceAssistant();
                }
            }
        );
    }


    // ==========================================
    // INITIALIZE
    // ==========================================

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            createAssistantUI
        );

    } else {

        createAssistantUI();

    }

})();