/*
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, ArrowUpRight } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import './ChatbotWidget.css';

const queryGemini = async (userMessage, publicContext) => {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (!key) return null;

  const systemInstruction = `
You are "K.I.W.I." (Kiwi's Incredibly Wobbly Info-bot), the official conversational AI assistant for "Happy Rides", a premium transfer and tour provider in New Zealand.
Your goal is to answer client queries accurately, politely, and enthusiastically using ONLY the following public business information:
${JSON.stringify(publicContext, null, 2)}

Security & Privacy Guidelines:
- You must ONLY provide information present in this business context.
- Never discuss administrative settings, internal database fields, admin login credentials, email lists, database collections (like 'admins' or user accounts), Firebase configurations, or API keys.
- If a user asks about admin access, database schemas, or personal data, politely reply that you cannot assist with that and that it is restricted.
- If asked about booking, direct them to use the official booking link: ${publicContext.bookingLink || 'https://happyrides.trial.easytaxioffice.com/booking'}.
- Keep replies concise, warm, and formatted cleanly in Markdown. Do not make up any facts or details not in the context.
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `System Instruction:\n${systemInstruction}\n\nUser Question: ${userMessage}` }]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 500
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const resData = await response.json();
    return resData.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Gemini API execution failed, falling back to local engine:", error);
    return null;
  }
};

const generateLocalResponse = (message, siteData) => {
  const msg = message.toLowerCase();
  const settings = siteData?.settings || {};
  const fleet = settings.fleet || [];
  
  // 1. Welcome / Greetings
  if (msg.match(/\b(hi|hello|hey|greetings|hola|welcome|good morning|good afternoon)\b/)) {
    return `Hi there! I am **K.I.W.I.** (Kiwi's Incredibly Wobbly Info-bot) 🥝. How can I help you explore New Zealand today? You can ask me about our tours, fleet, airport transfers, or how to book!`;
  }
  
  // 2. Booking / How to Book
  if (msg.includes('book') || msg.includes('reserve') || msg.includes('schedule') || msg.includes('hiring') || msg.includes('order')) {
    return `Booking a ride with **Happy Rides** is quick and easy! You can book transfers or tours online in seconds.
    
👉 [Click here to open our Online Booking platform](${settings.bookingLink || 'https://happyrides.trial.easytaxioffice.com/booking'})
    
If you'd prefer to book a custom tour, feel free to contact us directly at **${settings.contactEmail || 'info@happyrides.co.nz'}** or call us at **${settings.contactPhone || '+64 21 244 0244'}**.`;
  }
  
  // 3. Pricing / Cost / How much
  if (msg.includes('price') || msg.includes('cost') || msg.includes('fare') || msg.includes('rate') || msg.includes('how much') || msg.includes('quote')) {
    return `We offer fixed-pricing passenger transfers with no hidden costs or surge pricing! 
    
For custom quotes or long-distance intercity rides, you can view our rates on our [Services page](/services) or use our [Booking System](${settings.bookingLink || 'https://happyrides.trial.easytaxioffice.com/booking'}) to get an instant price estimate.`;
  }

  // 4. Fleet / Vehicles
  if (msg.includes('fleet') || msg.includes('car') || msg.includes('vehicle') || msg.includes('suv') || msg.includes('sedan') || msg.includes('minibus') || msg.includes('van') || msg.includes('passenger') || msg.includes('capacity')) {
    let response = `We have a pristine, modern fleet of vehicles to suit your passenger capacity needs: \n\n`;
    fleet.forEach(v => {
      response += `- **${v.type}**: Comfortably fits **${v.capacity}**.\n`;
    });
    response += `\nAll vehicles undergo regular safety inspections and are driven by fully vetted, professional drivers.`;
    return response;
  }
  
  // 5. Contact / Phone / Email
  if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('support') || msg.includes('whatsapp') || msg.includes('address') || msg.includes('location')) {
    return `You can reach the **Happy Rides** team through the following channels:
    
- 📧 **Email**: [${settings.contactEmail || 'info@happyrides.co.nz'}](mailto:${settings.contactEmail || 'info@happyrides.co.nz'})
- 📞 **Phone**: [${settings.contactPhone || '+64 21 244 0244'}](tel:${settings.contactPhone})
- 💬 **WhatsApp**: [Chat with us](https://wa.me/${settings.whatsappNumber || '64212440244'})
- 📍 **Office**: ${settings.contactAddress || 'Auckland, New Zealand'}`;
  }

  // 6. Specific Destinations / Tours
  if (siteData?.packages) {
    let matchedTours = [];
    const categories = Object.keys(siteData.packages);
    categories.forEach(cat => {
      const items = siteData.packages[cat] || [];
      items.forEach(t => {
        const titleWords = t.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3 && w !== 'tour' && w !== 'tours');
        const isMatch = msg.includes(t.title.toLowerCase()) || 
                        (t.description && t.description.toLowerCase().includes(msg)) ||
                        (titleWords.length > 0 && titleWords.some(word => msg.includes(word)));
        if (isMatch) {
          matchedTours.push(t);
        }
      });
    });
    
    const isTourQuery = msg.includes('tour') || msg.includes('trip') || msg.includes('package') || msg.includes('activity') || msg.includes('activities') || msg.includes('sightseeing') || msg.includes('visit');
    
    if (matchedTours.length > 0) {
      let response = `We offer some amazing tours matching your query:\n\n`;
      matchedTours.slice(0, 3).forEach(t => {
        response += `- **${t.title}** (${t.duration || 'Day Trip'}): ${t.price ? '**' + t.price + '**.' : ''} ${t.description ? t.description.split('.')[0] + '.' : ''}\n`;
      });
      response += `\nWould you like to view our full tours? You can check them on our [Tours page](/tours) or book them directly via our booking link!`;
      return response;
    }
    
    if (isTourQuery) {
      return `We offer premium private tours and activities across New Zealand's North Island, including:
      
- **Auckland City Highlights** (explore Auckland CBD, Mt Eden, Davenport)
- **Hobbiton & Waitomo Caves** (magical film set and glowworm caves)
- **Rotorua Geothermal Wonders** (geysers and Maori culture)
- **Paihia & Bay of Islands** (beaches and historic Waitangi grounds)
      
You can explore our detailed itineraries on our [Tours page](/tours) or book instantly via our [Booking System](${settings.bookingLink || 'https://happyrides.trial.easytaxioffice.com/booking'}).`;
    }
  }
  
  // 7. Airport Transfer
  if (msg.includes('airport') || msg.includes('transfer') || msg.includes('drop') || msg.includes('pickup') || msg.includes('pick up')) {
    return `We provide reliable, 24/7 door-to-door **Airport Transfer** services between Auckland Airport and anywhere in the Auckland region. We track your flight details so your driver is ready as soon as you land!
    
👉 [Book your Airport Transfer online](${settings.bookingLink || 'https://happyrides.trial.easytaxioffice.com/booking'})
    
You can also view rates and destinations on our [Airport Transfers page](/services/airport-transfer).`;
  }
  
  // 8. Services
  if (msg.includes('service') || msg.includes('what do you do') || msg.includes('offer')) {
    return `**Happy Rides** offers premium passenger transport services across New Zealand:
    
- ✈️ **Airport Transfers** (reliable airport pickups & drop-offs)
- 🚗 **Intercity Transfers** (long-distance private travel)
- 🗺️ **Custom Tours & Activities** (curated sightseeing itineraries)
- 💼 **Corporate Travel** (executive and business transport)
- 👥 **Group Transfers** (minibuses for families, events, or weddings)
    
Read more on our [Services page](/services) or book instantly online!`;
  }

  // 9. About
  if (msg.includes('about us') || msg.includes('about happy rides') || msg.includes('who are you') || msg.includes('our story') || msg.includes('your story') || msg.includes('about your company') || msg.includes('about the company')) {
    return `**Happy Rides** was founded with a simple mission: to make passenger transport in New Zealand comfortable, reliable, and stress-free. 
    
With fixed pricing, a luxury modern fleet, and professional drivers, we provide 24/7 service. Learn more on our [About Us page](/about).`;
  }

  // 10. Fallback
  return `I'd be happy to help you with that! For questions about custom tours, booking pricing, or general transport services, you can visit our [Services page](/services), open our [Booking platform](${settings.bookingLink || 'https://happyrides.trial.easytaxioffice.com/booking'}), or contact us directly:
  
- 📧 Email: **${settings.contactEmail || 'info@happyrides.co.nz'}**
- 📞 Phone: **${settings.contactPhone || '+64 21 244 0244'}**
- 💬 WhatsApp: [Chat now](https://wa.me/${settings.whatsappNumber || '64212440244'})`;
};

const renderMessageContent = (text) => {
  if (!text) return "";
  
  let formatted = text;
  
  // Replace links: [text](url) -> <a href="url" target="_blank" rel="noopener">text</a>
  formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Replace bold: **text** -> <strong>text</strong>
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  const lines = formatted.split('\n');
  
  return lines.map((line, idx) => {
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      return <li key={idx} dangerouslySetInnerHTML={{ __html: line.trim().substring(2) }} style={{ marginLeft: '1rem', listStyleType: 'disc', marginBottom: '0.3rem' }} />;
    }
    const match = line.trim().match(/^(\d+)\.\s(.*)/);
    if (match) {
      return <li key={idx} dangerouslySetInnerHTML={{ __html: match[2] }} style={{ marginLeft: '1rem', listStyleType: 'decimal', marginBottom: '0.3rem' }} />;
    }
    return <p key={idx} dangerouslySetInnerHTML={{ __html: line }} style={{ margin: '0.25rem 0' }} />;
  });
};

const ChatbotWidget = () => {
  const { siteData } = useSiteData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Kia Ora! I'm K.I.W.I. (Kiwi's Incredibly Wobbly Info-bot) 🥝. Ask me anything about our fleet, services, airport transfers, or custom sightseeing tours!"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef(null);

  const suggestions = [
    "How do I book a transfer?",
    "Show me the fleet",
    "Auckland Airport transfers",
    "What tours do you offer?",
    "Contact details"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    if (!isOpen) {
      setHasUnread(true);
    }

    // Prepare public contextual data to feed into the API
    const publicContext = {
      siteTitle: siteData?.settings?.siteTitle || "Happy Rides",
      siteTagline: siteData?.settings?.siteTagline || "Enjoy the journey. Love the ride",
      heroTitle: siteData?.settings?.heroTitle,
      heroSubtitle: siteData?.settings?.heroSubtitle,
      bookingLink: siteData?.settings?.bookingLink || "https://happyrides.trial.easytaxioffice.com/booking",
      contactEmail: siteData?.settings?.contactEmail,
      contactPhone: siteData?.settings?.contactPhone,
      contactAddress: siteData?.settings?.contactAddress,
      whatsappNumber: siteData?.settings?.whatsappNumber,
      fleet: siteData?.settings?.fleet,
      services: siteData?.services,
      packages: siteData?.packages
    };

    // Run query
    let responseText = null;
    const isGeminiAvailable = !!import.meta.env.VITE_GEMINI_API_KEY;

    if (isGeminiAvailable) {
      responseText = await queryGemini(text, publicContext);
    }

    // Fall back to local search rules if Gemini isn't defined or fails
    if (!responseText) {
      responseText = generateLocalResponse(text, siteData);
    }

    setIsTyping(false);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: responseText }]);
  };

  // Only render if siteData is loaded
  if (!siteData) return null;

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar-wrapper">
              <MessageSquare size={20} />
              <div className="chatbot-status-dot"></div>
            </div>
             <div className="chatbot-header-text">
              <h3>K.I.W.I. Assistant</h3>
              <span>Online</span>
            </div>
          </div>
          <button className="chatbot-close-btn" onClick={toggleChat} aria-label="Close Chat">
            <X size={20} />
          </button>
        </div>

        {/* Message Feed */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
              <div className="chat-bubble">
                {renderMessageContent(msg.text)}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message-row bot">
              <div className="chat-bubble">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions chips */}
        <div className="chatbot-suggestions">
          {suggestions.map((s, idx) => (
            <button 
              key={idx} 
              className="chatbot-suggestion-chip"
              onClick={() => handleSendMessage(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <form 
          className="chatbot-input-container" 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
        >
          <div className="chatbot-input-wrapper">
            <input 
              type="text" 
              className="chatbot-input" 
              placeholder="Ask me a question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isTyping}
            />
          </div>
          <button 
            type="submit" 
            className="chatbot-send-btn" 
            disabled={!inputText.trim() || isTyping}
            aria-label="Send Message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* Chat Launcher Button */}
      <button className="chatbot-launcher" onClick={toggleChat} aria-label="Toggle Chatbot">
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
        {hasUnread && !isOpen && <div className="chatbot-launcher-pulse"></div>}
      </button>
    </div>
  );
};

export default ChatbotWidget;
*/
