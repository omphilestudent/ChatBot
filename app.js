const body = document.querySelector('body');
const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');
const chatbotToggler = document.querySelector('.chatbot-toggler');
const closeBtn = document.querySelector('.chatbot header span');

let userMessage;

//the brain
const net = new brain.recurrent.LSTM();

net.train([
    { input: "How to check my balance", output: "Your current balance is R5,200." },
    { input: "How make a bulk payment", output: "Step one click on transact. " },
    { input: "make a payment", output: "Sure, who would you like to pay?" },
    { input: "how to make a payment", output: "You can pay someone via the Payments tab." },
    { input: "download statement", output: "You can download your statement under the Statements section." },
    { input: "add a beneficiary", output: "Please provide the beneficiary's name and account number." },
    { input: "how to send money", output: "Go to Payments and follow the instructions." },
    { input: "help", output: "You can ask me about your balance, payments, beneficiaries, or statements." },
    { input: "change pin", output: "You can change your PIN under Card Settings in the app." }
]);

// Generate chatbot response
const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");
    const response = net.run(userMessage.toLowerCase());

    messageElement.textContent = response || "Sorry, I didn't understand that. Please rephrase.";
    chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Create chat bubble
const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing"
        ? `<p>${message}</p>`
        : `<span class="material-icons-sharp">account_circle</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
};

// Handle send
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
        generateResponse(incomingChatLi);
    }, 600);
};

sendChatBtn.addEventListener('click', handleChat);

// Toggle chatbot open/close
chatbotToggler.addEventListener('click', () => {
    body.classList.toggle('show-chatbot');
});
closeBtn.addEventListener('click', () => {
    body.classList.remove('show-chatbot');
});
