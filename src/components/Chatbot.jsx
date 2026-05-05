import { useState, useRef, useEffect } from "react";

const keywordData = [
  { keyword: "hello", utterances: ["hi", "hey", "hello", "good morning", "good afternoon", "howdy", "greetings"], response: "Hello! Welcome to goTicket, your go-to app for booking event tickets. How can I help you today?" },
  { keyword: "book ticket", utterances: ["i want to book a ticket", "how do i get a ticket", "buy a ticket", "purchase ticket", "get ticket", "book a ticket"], response: "You can book a ticket by visiting our goTicket app, selecting your event and clicking Book Now." },
  { keyword: "ticket availability", utterances: ["are there tickets still available", "is the event sold out", "check availability", "seats available", "any tickets left"], response: "Tickets are available on the goTicket app, check the event page to see remaining slots." },
  { keyword: "reserve seat", utterances: ["i want to reserve my seat", "can i hold a seat for me", "reserve a place", "save a seat", "hold my seat"], response: "To reserve a seat, select your preferred seat on the event page and confirm your booking." },
  { keyword: "group booking", utterances: ["i want to buy tickets for a group", "how do i book multiple tickets", "bulk tickets", "team tickets", "tickets for many people"], response: "For group bookings, select the number of tickets you need on the event page before checkout." },
  { keyword: "vip ticket", utterances: ["i want a vip ticket", "how do i get vip access", "premium ticket", "vip pass", "vip access"], response: "VIP tickets can be selected during booking, look for the VIP option on the ticket type page." },
  { keyword: "early bird ticket", utterances: ["do you have early bird tickets", "how do i get a discounted ticket", "pre-sale ticket", "advance booking", "early discount"], response: "Early bird tickets are listed on the event page, book early to enjoy discounted prices." },
  { keyword: "last minute ticket", utterances: ["can i buy a ticket today", "are there same day tickets", "urgent ticket", "last minute", "buy ticket today"], response: "Same day tickets may still be available, check the event page on the goTicket app right now." },
  { keyword: "ticket sold out", utterances: ["are all tickets gone", "is the event full", "no tickets left", "all sold out", "event full"], response: "This event is currently sold out, you can join the waitlist to be notified if tickets become available." },
  { keyword: "waitlist", utterances: ["can i join the waitlist", "put me on the waiting list", "notify when available", "join queue", "waiting list"], response: "To join the waitlist, go to the event page and click Join Waitlist, we will notify you if a ticket opens up." },
  { keyword: "free ticket", utterances: ["is there a free ticket option", "how do i get a complimentary ticket", "no charge ticket", "free entry", "free access"], response: "Some events on goTicket offer free entry, check the event page to see if a free ticket option is available." },
  { keyword: "ticket price", utterances: ["how much does a ticket cost", "what is the price of a ticket", "ticket fee", "cost of ticket", "how much is a ticket"], response: "Ticket prices vary per event, visit the event page on goTicket to see the full pricing details." },
  { keyword: "pay online", utterances: ["can i pay online", "how do i pay with my card", "online payment", "pay digitally", "card payment"], response: "Yes you can pay online via the goTicket app using your debit or credit card at checkout." },
  { keyword: "mpesa payment", utterances: ["can i pay via mpesa", "do you accept mpesa", "lipa na mpesa", "mobile money", "pay with mpesa"], response: "Yes we accept Mpesa payments, simply select Mpesa at checkout and follow the prompts to complete payment." },
  { keyword: "discount code", utterances: ["i have a promo code", "where do i enter my discount code", "voucher code", "coupon code", "apply discount"], response: "To apply a promo code, enter it in the discount code field at checkout and click Apply." },
  { keyword: "payment failed", utterances: ["my payment didn't go through", "the transaction failed", "card declined", "payment error", "payment not working"], response: "Sorry to hear that, please try again or use a different payment method, contact support if the issue persists." },
  { keyword: "refund", utterances: ["i want my money back", "how do i request a refund", "get refund", "refund request", "money back"], response: "Refunds are processed based on our refund policy, go to My Tickets and select Request Refund to get started." },
  { keyword: "invoice", utterances: ["can i get a receipt", "i need an invoice for my payment", "billing receipt", "proof of payment", "payment receipt"], response: "A receipt is automatically sent to your email after payment, you can also find it under My Tickets in the app." },
  { keyword: "payment methods", utterances: ["what payment options do you accept", "how can i pay", "accepted payments", "ways to pay", "payment options"], response: "We accept Mpesa, debit cards, credit cards and online payments, choose your preferred method at checkout." },
  { keyword: "split payment", utterances: ["can i pay in installments", "is there a part payment option", "partial payment", "pay in parts", "split the cost"], response: "Currently we do not support split payments, the full ticket amount must be paid at once during checkout." },
  { keyword: "price breakdown", utterances: ["what does the ticket price include", "break down the cost for me", "fee structure", "what's included in price", "hidden fees"], response: "The ticket price includes access to the event, additional inclusions are listed on the event details page." },
  { keyword: "event details", utterances: ["tell me more about the event", "what is this event about", "event info", "event information", "describe the event"], response: "You can find full event details including description, lineup and schedule on the event page in the goTicket app." },
  { keyword: "event date", utterances: ["when is the event happening", "what date is the event", "event schedule", "event time", "when does the event start"], response: "The event date and time are listed on the event page, open the goTicket app and search for the event to confirm." },
  { keyword: "event location", utterances: ["where is the event taking place", "what is the venue address", "event venue", "where is the venue", "directions to event"], response: "The venue address is available on the event page, tap on the location to get directions via Google Maps." },
  { keyword: "event lineup", utterances: ["who is performing at the event", "which artists will be there", "event artists", "who is headlining", "performers"], response: "The full lineup is listed on the event page, visit goTicket and open the event to see all performers or speakers." },
  { keyword: "event programme", utterances: ["what is the event agenda", "what is the order of activities", "event timetable", "event itinerary", "event schedule"], response: "The event programme and agenda are available on the event page, check goTicket for the full schedule." },
  { keyword: "upcoming events", utterances: ["what events are coming up", "show me future events", "new events", "what is happening soon", "future events"], response: "You can browse upcoming events on the goTicket home page, new events are added regularly so check back often." },
  { keyword: "event category", utterances: ["what types of events do you have", "do you have music events", "event genres", "kinds of events", "browse categories"], response: "goTicket features a wide range of events including music, comedy, sports, conferences and more, browse by category." },
  { keyword: "family event", utterances: ["are there family friendly events", "can i bring my kids", "child friendly event", "events for children", "kids events"], response: "Yes we have family friendly events, filter by category on the goTicket app to find events suitable for all ages." },
  { keyword: "outdoor event", utterances: ["are there any outdoor events", "is this an open air event", "outside event", "open air", "outdoor venue"], response: "Yes we have outdoor events listed on goTicket, check the venue details on the event page for location type." },
  { keyword: "virtual event", utterances: ["can i watch the event online", "is there a livestream", "online event", "watch from home", "virtual attendance"], response: "Some events on goTicket are available virtually, look for the Online or Livestream tag on the event page." },
  { keyword: "create account", utterances: ["how do i sign up", "i want to create an account", "register account", "new account", "join goticket"], response: "To create an account, download the goTicket app, tap Sign Up and fill in your details to get started." },
  { keyword: "login", utterances: ["how do i log in", "i want to sign into my account", "access account", "sign in", "log into account"], response: "To log in, open the goTicket app, tap Sign In and enter your registered email and password." },
  { keyword: "forgot password", utterances: ["i forgot my password", "how do i reset my password", "change password", "password help", "locked out"], response: "To reset your password, tap Forgot Password on the login page and follow the instructions sent to your email." },
  { keyword: "update profile", utterances: ["i want to edit my profile", "how do i change my details", "change my info", "update my account", "edit profile"], response: "To update your profile, go to Settings in the app, tap Edit Profile and save your new details." },
  { keyword: "my tickets", utterances: ["where are my tickets", "how do i view my bookings", "see my bookings", "find my tickets", "view tickets"], response: "Your tickets are under the My Tickets section in the goTicket app, tap on any ticket to view its details." },
  { keyword: "delete account", utterances: ["i want to close my account", "how do i delete my account", "remove my account", "deactivate account", "leave goticket"], response: "To delete your account, go to Settings, scroll to Account and tap Delete Account, note this action is permanent." },
  { keyword: "account verification", utterances: ["how do i verify my account", "i need to confirm my email", "activate account", "verify email", "account not activated"], response: "Check your email for a verification link sent during registration, click the link to activate your account." },
  { keyword: "notification settings", utterances: ["how do i turn off notifications", "i want to get event reminders", "email alerts", "push notifications", "manage alerts"], response: "To manage notifications, go to Settings in the app and toggle your preferred alert and reminder options." },
  { keyword: "linked accounts", utterances: ["can i log in with facebook", "how do i connect my google account", "social login", "link social media", "connect facebook"], response: "To link a social account, go to Settings, tap Linked Accounts and choose the platform you want to connect." },
  { keyword: "order history", utterances: ["show me my past bookings", "where is my order history", "previous bookings", "past tickets", "booking history"], response: "Your booking history is available under Order History in the goTicket app, tap any order to view details." },
  { keyword: "cancel ticket", utterances: ["i want to cancel my ticket", "how do i cancel my booking", "cancel reservation", "undo booking", "cancel my order"], response: "To cancel a ticket, go to My Tickets, select the ticket and tap Cancel Booking, refund terms will be shown." },
  { keyword: "change date", utterances: ["can i move my ticket to another date", "i want to reschedule", "transfer date", "change ticket date", "reschedule ticket"], response: "To change your event date, go to My Tickets, select the ticket and tap Reschedule if the option is available." },
  { keyword: "transfer ticket", utterances: ["can i give my ticket to someone else", "how do i send my ticket to a friend", "gift ticket", "transfer booking", "send ticket"], response: "To transfer a ticket, go to My Tickets, select the ticket and tap Transfer, then enter the recipient's details." },
  { keyword: "exchange ticket", utterances: ["can i swap my ticket type", "i want to upgrade my ticket", "change ticket type", "swap ticket", "exchange for different ticket"], response: "To exchange your ticket, go to My Tickets, select the ticket and tap Exchange to choose a different ticket type." },
  { keyword: "event cancelled", utterances: ["is the event still on", "has the event been cancelled", "event called off", "is event postponed", "event status"], response: "Please check the event page on goTicket for the latest status, we will also notify you of any changes by email." },
  { keyword: "cancellation policy", utterances: ["what is your cancellation policy", "can i cancel and get a refund", "cancellation rules", "how does cancellation work", "cancel policy"], response: "You can cancel your ticket under My Tickets, refund eligibility depends on the event's cancellation policy." },
  { keyword: "name change on ticket", utterances: ["can i change the name on my ticket", "how do i update the attendee name", "edit name on ticket", "wrong name on ticket", "fix attendee name"], response: "To change the name on your ticket, go to My Tickets, select the ticket and tap Edit Attendee Name." },
  { keyword: "partial cancellation", utterances: ["i want to cancel just one ticket", "can i remove some of my bookings", "cancel some tickets", "cancel one ticket", "remove one booking"], response: "To cancel specific tickets, go to My Tickets, select your order and choose which tickets to cancel individually." },
  { keyword: "no-show policy", utterances: ["what happens if i don't show up", "i missed the event what now", "didn't attend", "absent from event", "no show"], response: "No-show tickets are generally non-refundable, please check the event's cancellation policy for full details." },
  { keyword: "rebook ticket", utterances: ["can i book again after cancelling", "how do i rebook my ticket", "buy again", "new booking after cancel", "rebook"], response: "To rebook, simply go to the event page on goTicket and complete a new booking after your cancellation." },
  { keyword: "contact support", utterances: ["i need help from an agent", "how do i contact customer service", "talk to support", "help desk", "reach support"], response: "You can reach our support team via the Help section in the app or email us at support@goticket.com." },
  { keyword: "ticket not received", utterances: ["i didn't get my ticket", "where is my ticket email", "missing ticket email", "ticket hasn't arrived", "no ticket received"], response: "Check your spam or junk folder first, if still missing go to My Tickets in the app to resend your ticket." },
  { keyword: "download ticket", utterances: ["how do i download my ticket", "can i get a pdf of my ticket", "print ticket", "save ticket", "get ticket file"], response: "To download your ticket, go to My Tickets, open the ticket and tap Download or Save as PDF." },
  { keyword: "qr code issue", utterances: ["my qr code is not working", "the scanner can't read my ticket", "barcode error", "scan problem", "qr not working"], response: "Make sure your screen brightness is high and the QR code is fully visible, if the issue persists contact support." },
  { keyword: "wrong ticket details", utterances: ["there is an error on my ticket", "my ticket has the wrong details", "incorrect booking", "error on ticket", "booking mistake"], response: "Please contact our support team with your booking reference and we will correct the ticket details for you." },
  { keyword: "app not working", utterances: ["the goticket app is crashing", "i can't open the app", "app error", "app keeps freezing", "technical issue"], response: "Try closing and reopening the app, if the problem continues please uninstall and reinstall the goTicket app." },
  { keyword: "report a problem", utterances: ["i want to report an issue", "how do i submit a complaint", "raise issue", "log a complaint", "submit complaint"], response: "To report a problem, go to Help in the app and tap Report an Issue, describe the problem and submit." },
  { keyword: "live chat", utterances: ["can i chat with someone now", "is there a live chat option", "instant support", "online support", "start a chat"], response: "Our live chat is available in the Help section of the goTicket app, tap Chat with Us to connect instantly." },
  { keyword: "faqs", utterances: ["where are the frequently asked questions", "do you have a help center", "common questions", "help articles", "faq"], response: "You can find our FAQs in the Help section of the goTicket app or visit our website for common questions." },
  { keyword: "feedback", utterances: ["i want to leave a review", "how do i rate the app", "rate the app", "share experience", "leave review"], response: "We appreciate your feedback, go to Settings and tap Leave a Review to rate and share your experience." },
];

const quickReplies = [
  "Book a ticket 🎟️",
  "Event details 📅",
  "Payment help 💳",
  "My tickets 🎫",
  "Contact support 🆘",
];

function getBotResponse(input) {
  const lower = input.toLowerCase().trim();
  for (const item of keywordData) {
    if (lower.includes(item.keyword)) return item.response;
    for (const utt of item.utterances) {
      if (lower.includes(utt)) return item.response;
    }
  }
  return "I'm not sure about that, but I'm here to help! Try asking about booking tickets, payment, event details, or contact our support team at support@goticket.com 🎟️";
}

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "Hello! Welcome to goTicket 🎟️ I'm your event assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text: userText, time }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response = getBotResponse(userText);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "bot", text: response, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 1000);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.window}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.avatar}>🎟️</div>
            <div>
              <div style={styles.botName}>goTicket Assistant</div>
              <div style={styles.botStatus}>
                <span style={styles.statusDot} />
                Online
              </div>
            </div>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Messages */}
        <div style={styles.messages}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ ...styles.msgRow, justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
              {msg.from === "bot" && <div style={styles.botAvatar}>🎟️</div>}
              <div style={{ maxWidth: "75%" }}>
                <div style={msg.from === "bot" ? styles.botBubble : styles.userBubble}>
                  {msg.text}
                </div>
                <div style={{ ...styles.msgTime, textAlign: msg.from === "user" ? "right" : "left" }}>{msg.time}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ ...styles.msgRow, justifyContent: "flex-start" }}>
              <div style={styles.botAvatar}>🎟️</div>
              <div style={styles.typingBubble}>
                <span style={styles.dot1} />
                <span style={styles.dot2} />
                <span style={styles.dot3} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Replies */}
        <div style={styles.quickReplies}>
          {quickReplies.map((qr) => (
            <button key={qr} style={styles.quickBtn} onClick={() => sendMessage(qr)}
              onMouseEnter={e => e.target.style.background = "#D4A017"}
              onMouseLeave={e => e.target.style.background = "transparent"}>
              {qr}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your message..."
          />
          <button style={styles.sendBtn} onClick={() => sendMessage()}
            onMouseEnter={e => e.target.style.background = "#D4A017"}
            onMouseLeave={e => e.target.style.background = "#F5C518"}>
            ➤
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", bottom: "90px", left: "24px", zIndex: 9999,
    animation: "fadeInUp 0.3s ease",
  },
  window: {
    width: "360px", height: "540px", background: "#0D0D0D",
    borderRadius: "16px", display: "flex", flexDirection: "column",
    boxShadow: "0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(245,197,24,0.3)",
    fontFamily: "'Segoe UI', sans-serif", overflow: "hidden",
  },
  header: {
    background: "linear-gradient(135deg, #1a1a1a, #0D0D0D)",
    borderBottom: "1px solid rgba(245,197,24,0.3)",
    padding: "14px 16px", display: "flex", alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "10px" },
  avatar: {
    width: "40px", height: "40px", borderRadius: "50%",
    background: "linear-gradient(135deg, #F5C518, #D4A017)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px", boxShadow: "0 0 12px rgba(245,197,24,0.4)",
  },
  botName: { color: "#F5C518", fontWeight: "700", fontSize: "15px", letterSpacing: "0.5px" },
  botStatus: { color: "#aaa", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" },
  statusDot: {
    width: "7px", height: "7px", borderRadius: "50%",
    background: "#4CAF50", display: "inline-block", boxShadow: "0 0 5px #4CAF50",
  },
  closeBtn: {
    background: "transparent", border: "none", color: "#aaa",
    fontSize: "16px", cursor: "pointer", padding: "4px 8px", borderRadius: "6px",
  },
  messages: {
    flex: 1, overflowY: "auto", padding: "16px 12px",
    display: "flex", flexDirection: "column", gap: "12px",
    background: "#0D0D0D",
    scrollbarWidth: "thin", scrollbarColor: "#333 transparent",
  },
  msgRow: { display: "flex", alignItems: "flex-end", gap: "8px" },
  botAvatar: {
    width: "28px", height: "28px", borderRadius: "50%",
    background: "linear-gradient(135deg, #F5C518, #D4A017)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "13px", flexShrink: 0,
  },
  botBubble: {
    background: "#1a1a1a", color: "#f0f0f0", borderRadius: "16px 16px 16px 4px",
    padding: "10px 14px", fontSize: "13px", lineHeight: "1.5",
    border: "1px solid rgba(245,197,24,0.15)",
  },
  userBubble: {
    background: "linear-gradient(135deg, #F5C518, #D4A017)",
    color: "#0D0D0D", borderRadius: "16px 16px 4px 16px",
    padding: "10px 14px", fontSize: "13px", lineHeight: "1.5",
    fontWeight: "500",
  },
  msgTime: { color: "#555", fontSize: "10px", marginTop: "3px", paddingLeft: "4px" },
  typingBubble: {
    background: "#1a1a1a", borderRadius: "16px 16px 16px 4px",
    padding: "12px 16px", display: "flex", gap: "5px", alignItems: "center",
    border: "1px solid rgba(245,197,24,0.15)",
  },
  dot1: { width: "7px", height: "7px", borderRadius: "50%", background: "#F5C518", display: "inline-block", animation: "bounce 1.2s infinite 0s" },
  dot2: { width: "7px", height: "7px", borderRadius: "50%", background: "#F5C518", display: "inline-block", animation: "bounce 1.2s infinite 0.2s" },
  dot3: { width: "7px", height: "7px", borderRadius: "50%", background: "#F5C518", display: "inline-block", animation: "bounce 1.2s infinite 0.4s" },
  quickReplies: {
    padding: "8px 12px", display: "flex", flexWrap: "wrap", gap: "6px",
    borderTop: "1px solid rgba(245,197,24,0.1)", background: "#0D0D0D",
  },
  quickBtn: {
    background: "transparent", border: "1px solid rgba(245,197,24,0.4)",
    color: "#F5C518", borderRadius: "20px", padding: "5px 10px",
    fontSize: "11px", cursor: "pointer", transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  inputRow: {
    display: "flex", gap: "8px", padding: "12px",
    borderTop: "1px solid rgba(245,197,24,0.2)", background: "#111",
  },
  input: {
    flex: 1, background: "#1a1a1a", border: "1px solid rgba(245,197,24,0.3)",
    borderRadius: "24px", padding: "10px 16px", color: "#f0f0f0",
    fontSize: "13px", outline: "none",
  },
  sendBtn: {
    width: "40px", height: "40px", borderRadius: "50%",
    background: "#F5C518", border: "none", color: "#0D0D0D",
    fontSize: "16px", cursor: "pointer", transition: "background 0.2s",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
};