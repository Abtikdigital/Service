// Hamburger menu toggle
document.querySelector(".hamburger").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector("nav").classList.toggle("active");
});

// Preloader
const preloader = document.getElementById("preloader");
const mainContent = document.getElementById("main-content");

if (preloader && mainContent) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.transition = "opacity 1s ease";
      preloader.style.opacity = "0";

      // Wait another 1 second for the fade-out animation to finish
      setTimeout(() => {
        preloader.style.display = "none";
        mainContent.style.display = "block";
      }, 1000); // match fade-out duration
    }, 2000); // 2-second initial delay
  });
}

// Form Submission
const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    if (emailInput) {
      alert(`Thank you for subscribing with ${emailInput.value}!`);
      emailInput.value = "";
    }
  });
});

// Contact Form Submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  });
}

// Animate elements when they come into view
const animateOnScroll = function () {
  const elements = document.querySelectorAll(
    ".grid-item, .blog-card, .testimonial-box, .faq-item"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Set initial state for animation
document
  .querySelectorAll(".grid-item, .blog-card, .testimonial-box, .faq-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

window.addEventListener("scroll", animateOnScroll);
animateOnScroll(); // Run once on page load

document.addEventListener("DOMContentLoaded", function () {
  // FAB Elements
  const fabContainer = document.querySelector(".fab-container");
  const fabButton = document.querySelector(".fab-button");
  const fabChatbot = document.getElementById("fab-chatbot");
  const fabWhatsapp = document.getElementById("fab-whatsapp");
  const fabCall = document.getElementById("fab-call");

  // Chatbot Elements
  const chatbot = document.querySelector(".fab-chatbot");
  const closeChatbot = document.querySelector(".close-chatbot");
  const chatbotInput = document.querySelector(".chatbot-text-input");
  const chatbotSendBtn = document.querySelector(".chatbot-send-btn");
  const chatbotMessages = document.querySelector(".chatbot-messages");

  // Toggle FAB menu
  fabButton.addEventListener("click", function (e) {
    e.stopPropagation();
    fabContainer.classList.toggle("active");
  });

  // Open chatbot - Fixed this event listener
  fabChatbot.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    fabContainer.classList.remove("active");
    chatbot.style.display = "flex";
    positionChatbot();
  });

  // Close chatbot
  closeChatbot.addEventListener("click", function (e) {
    e.stopPropagation();
    chatbot.style.display = "none";
  });

  // WhatsApp action - This is working correctly
  fabWhatsapp.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    window.open("https://wa.me/08928138434", "_blank");
  });

  // Call action - Fixed this event listener
  fabCall.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = "tel:+08928138434";
  });

  // Close when clicking outside
  document.addEventListener("click", function (e) {
    if (!fabContainer.contains(e.target)) {
      fabContainer.classList.remove("active");
    }
    if (!chatbot.contains(e.target) && e.target !== fabChatbot) {
      chatbot.style.display = "none";
    }
  });

  // Chatbot functionality
  const chatResponses = {
    "what services do you offer":
      "We offer professional consultation, business registration, funding services, certifications, trademarks, and GST compliance services.",
    "how can i contact support":
      "You can reach our support team at support@abtik.com or call us at +1 (555) 123-4567.",
    "what are your working hours":
      "Our office hours are Monday to Friday, 9:00 AM to 5:00 PM (GMT).",
    "do you provide funding assistance":
      "Yes! We help startups and businesses secure funding through various programs and investors.",
    default:
      "I'm sorry, I didn't understand that. Could you please rephrase your question?",
  };
  const chatSuggestions = [
    "What services do you offer?",
    "How can I contact support?",
    "What are your working hours?",
    "Do you provide funding assistance?",
  ];

  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    chatbotInput.value = "";

    setTimeout(() => {
      const response = getBotResponse(message);
      addMessage(response, "bot");
      showSuggestions();
    }, 800);
  }

  function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(chatResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    return chatResponses.default;
  }

  function showSuggestions() {
    // Clear previous suggestions
    document.querySelectorAll(".chat-suggestion").forEach((el) => el.remove());

    // Add new suggestions
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.className = "chat-suggestions";

    chatSuggestions.forEach((suggestion) => {
      const suggestionBtn = document.createElement("button");
      suggestionBtn.className = "chat-suggestion";
      suggestionBtn.textContent = suggestion;
      suggestionBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        // Add the suggestion as a user message immediately
        addMessage(suggestion, "user");

        // Process and show bot response
        setTimeout(() => {
          const response = getBotResponse(suggestion);
          addMessage(response, "bot");
          showSuggestions(); // Show new suggestions after response
        }, 800);
      });
      suggestionsContainer.appendChild(suggestionBtn);
    });

    chatbotMessages.appendChild(suggestionsContainer);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Also update your getBotResponse function to be more robust:
  function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase().trim();

    // Remove question mark if present for better matching
    const cleanMessage = lowerMessage.replace("?", "");

    // Check for matching responses
    for (const [key, response] of Object.entries(chatResponses)) {
      if (cleanMessage.includes(key)) {
        return response;
      }
    }

    return chatResponses.default;
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chatbot-message", `${sender}-message`);
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Event listeners for chatbot
  chatbotSendBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    sendMessage();
  });

  chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // Position chatbot above FAB
  function positionChatbot() {
    const fabRect = fabButton.getBoundingClientRect();
    chatbot.style.bottom = `${fabRect.height + 30}px`;
    chatbot.style.zIndex = "1002"; // Ensure it's above other elements
  }

  // Initial positioning
  positionChatbot();
  window.addEventListener("resize", positionChatbot);
});
