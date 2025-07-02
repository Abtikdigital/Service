// hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
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

// Testimonials Slider
const cards = document.querySelectorAll("#testimonial-carousel .card");
let current = 0;
let interval;

function updateCards() {
  cards.forEach((card, index) => {
    card.classList.remove("active", "behind-1", "behind-2");
    card.removeEventListener("mouseenter", pauseCarousel);
    card.removeEventListener("mouseleave", resumeCarousel);

    if (index === current) {
      card.classList.add("active");
      card.addEventListener("mouseenter", pauseCarousel);
      card.addEventListener("mouseleave", resumeCarousel);
    } else if (index === (current + 1) % cards.length) {
      card.classList.add("behind-1");
    } else if (index === (current + 2) % cards.length) {
      card.classList.add("behind-2");
    }
  });
}

function startCarousel() {
  interval = setInterval(() => {
    current = (current + 1) % cards.length;
    updateCards();
  }, 3500);
}

function pauseCarousel() {
  clearInterval(interval);
}

function resumeCarousel() {
  startCarousel();
}

updateCards();
startCarousel();

// Form Submission
document.querySelectorAll("form").forEach((form) => {
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
function animateOnScroll() {
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
}

document
  .querySelectorAll(".grid-item, .blog-card, .testimonial-box, .faq-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });
window.addEventListener("scroll", animateOnScroll);
animateOnScroll();

// FAB and Chatbot Functionality
const fabContainer = document.querySelector(".fab-container");
const fabButton = document.querySelector(".fab-button");
const fabChatbot = document.getElementById("fab-chatbot");
const fabWhatsapp = document.getElementById("fab-whatsapp");
const fabCall = document.getElementById("fab-call");

const chatbot = document.querySelector(".fab-chatbot");
const closeChatbot = document.querySelector(".close-chatbot");
const chatbotInput = document.querySelector(".chatbot-text-input");
const chatbotSendBtn = document.querySelector(".chatbot-send-btn");
const chatbotMessages = document.querySelector(".chatbot-messages");

fabButton?.addEventListener("click", function (e) {
  e.stopPropagation();
  fabContainer.classList.toggle("active");
});

fabChatbot?.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  fabContainer.classList.remove("active");
  chatbot.style.display = "flex";
  positionChatbot();
});

closeChatbot?.addEventListener("click", function (e) {
  e.stopPropagation();
  chatbot.style.display = "none";
});

fabWhatsapp?.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  window.open("https://wa.me/08928138434", "_blank");
});

fabCall?.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  window.location.href = "tel:+08928138434";
});

document.addEventListener("click", function (e) {
  if (!fabContainer.contains(e.target)) {
    fabContainer.classList.remove("active");
  }
  if (!chatbot.contains(e.target) && e.target !== fabChatbot) {
    chatbot.style.display = "none";
  }
});

// Chatbot logic
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
  const cleanMessage = userMessage.toLowerCase().trim().replace("?", "");
  return chatResponses[cleanMessage] || chatResponses.default;
}

function showSuggestions() {
  document.querySelectorAll(".chat-suggestion").forEach((el) => el.remove());
  const suggestionsContainer = document.createElement("div");
  suggestionsContainer.className = "chat-suggestions";

  chatSuggestions.forEach((text) => {
    const btn = document.createElement("button");
    btn.className = "chat-suggestion";
    btn.textContent = text;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      addMessage(text, "user");
      setTimeout(() => {
        addMessage(getBotResponse(text), "bot");
        showSuggestions();
      }, 800);
    });
    suggestionsContainer.appendChild(btn);
  });

  chatbotMessages.appendChild(suggestionsContainer);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("chatbot-message", `${sender}-message`);
  div.innerHTML = `<p>${text}</p>`;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

chatbotSendBtn?.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  sendMessage();
});

chatbotInput?.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

function positionChatbot() {
  const rect = fabButton.getBoundingClientRect();
  chatbot.style.bottom = `${rect.height + 30}px`;
  chatbot.style.zIndex = "1002";
}

window.addEventListener("resize", positionChatbot);
