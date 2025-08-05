const body = document.querySelector("body");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.getElementById("send-btn");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".chatbot header .material-icons-sharp:last-child");

let userMessage = "";

// === Initialize brain.js model ===
const net = new brain.recurrent.LSTM();
net.train([
    { input: "how to check my balance", output: "Your current balance is R5,200." },
    { input: "make a bulk payment", output: "Step one: click on Transact." },
    { input: "make a payment", output: "Sure, who would you like to pay?" },
    { input: "how to make a payment", output: "You can pay someone via the Payments tab." },
    { input: "download statement", output: "You can download your statement under the Statements section." },
    { input: "add a beneficiary", output: "Please provide the beneficiary's name and account number." },
    { input: "how to send money", output: "Go to Payments and follow the instructions." },
    { input: "help", output: "You can ask me about your balance, payments, beneficiaries, or statements." },
    { input: "change pin", output: "You can change your PIN under Card Settings in the app." }
]);

// === Create chat bubble ===
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = className === "outgoing"
        ? `<p>${message}</p>`
        : `<span class="material-icons-sharp">account_circle</span><p>${message}</p>`;
    return chatLi;
};

// === Fetch from local LLM server ===
const fetchFromLLM = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");
    fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
    })
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.response;
        })
        .catch(() => {
            messageElement.textContent = "Oops! LLM is not reachable.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

// === Main chat handler ===
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // User message
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = "";
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        // Try brain.js response
        const ruleResponse = net.run(userMessage.toLowerCase());

        if (ruleResponse && ruleResponse.trim() !== "") {
            incomingChatLi.querySelector("p").textContent = ruleResponse;
        } else {
            // Use LLM fallback
            fetchFromLLM(incomingChatLi);
        }
    }, 600);
};

// === Event Listeners ===
sendChatBtn.addEventListener("click", handleChat);
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});
chatbotToggler.addEventListener("click", () => {
    body.classList.toggle("show-chatbot");
});
closeBtn.addEventListener("click", () => {
    body.classList.remove("show-chatbot");
});
