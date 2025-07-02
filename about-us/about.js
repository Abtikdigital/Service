document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });

    document.querySelectorAll("nav ul li a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
      });
    });
  }

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

  // Logo Slider
  const logos = document.querySelector(".logos");
  if (logos) {
    logos.innerHTML += logos.innerHTML; // Duplicate logos for seamless scrolling
  }

  // Form Submission (Email Subscribe)
  const emailForms = document.querySelectorAll(".email-subscribe form");
  emailForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput.value && emailInput.value.includes("@")) {
        Swal.fire({
          title: "Thank You!",
          text: `Subscribed with ${emailInput.value}!`,
          icon: "success",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 3000,
        });
        emailInput.value = "";
      } else {
        Swal.fire({
          title: "Invalid Email",
          text: "Please enter a valid email address",
          icon: "error",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('input[type="text"]').value;
      const number = contactForm.querySelector(
        'input[type="text"]:nth-child(2)'
      ).value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const message = contactForm.querySelector("textarea").value;

      if (name && number && email && message) {
        Swal.fire({
          title: "Message Sent!",
          text: "We will get back to you soon",
          icon: "success",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 3000,
        });
        contactForm.reset();
      } else {
        Swal.fire({
          title: "Incomplete Form",
          text: "Please fill all fields",
          icon: "error",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }

  // FAB and Chatbot
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

  fabButton.addEventListener("click", (e) => {
    e.stopPropagation();
    fabContainer.classList.toggle("active");
  });

  fabChatbot.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    fabContainer.classList.remove("active");
    chatbot.style.display = "flex";
    positionChatbot();
    if (chatbotMessages.children.length === 1) {
      showSuggestions();
    }
  });

  closeChatbot.addEventListener("click", (e) => {
    e.stopPropagation();
    chatbot.style.display = "none";
  });

  fabWhatsapp.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open("https://wa.me/8928138434", "_blank");
  });

  fabCall.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = "tel:+918928138434";
  });

  document.addEventListener("click", (e) => {
    if (!fabContainer.contains(e.target)) {
      fabContainer.classList.remove("active");
    }
    if (!chatbot.contains(e.target) && e.target !== fabChatbot) {
      chatbot.style.display = "none";
    }
  });

  const chatResponses = {
    "what services do you offer":
      "We offer professional consultation, business registration, funding services, certifications, trademarks, and GST compliance services.",
    "how can i contact support":
      "You can reach our support team at support@abtik.com or call us at +91 89281 38434.",
    "what are your working hours":
      "Our office hours are Monday to Saturday, 10:00 AM to 7:00 PM (IST).",
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
    const lowerMessage = userMessage.toLowerCase().trim();
    const cleanMessage = lowerMessage.replace("?", "");
    for (const [key, response] of Object.entries(chatResponses)) {
      if (cleanMessage.includes(key)) {
        return response;
      }
    }
    return chatResponses.default;
  }

  function showSuggestions() {
    document.querySelectorAll(".chat-suggestions").forEach((el) => el.remove());
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.className = "chat-suggestions";
    chatSuggestions.forEach((suggestion) => {
      const suggestionBtn = document.createElement("button");
      suggestionBtn.className = "chat-suggestion";
      suggestionBtn.textContent = suggestion;
      suggestionBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addMessage(suggestion, "user");
        setTimeout(() => {
          const response = getBotResponse(suggestion);
          addMessage(response, "bot");
          showSuggestions();
        }, 800);
      });
      suggestionsContainer.appendChild(suggestionBtn);
    });
    chatbotMessages.appendChild(suggestionsContainer);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chatbot-message", `${sender}-message`);
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  chatbotSendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    sendMessage();
  });

  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  function positionChatbot() {
    const fabRect = fabButton.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const chatbotHeight = chatbot.offsetHeight;
    const bottomSpace = windowHeight - fabRect.bottom;
    if (bottomSpace < chatbotHeight + 30) {
      chatbot.style.bottom = `${windowHeight - fabRect.top + 10}px`;
    } else {
      chatbot.style.bottom = `${fabRect.height + 30}px`;
    }
    chatbot.style.right = "1.5rem";

    chatbot.style.zIndex = "1002";
  }

  positionChatbot();
  window.addEventListener("resize", positionChatbot);

  // Animate on Scroll
  const elements = document.querySelectorAll(
    ".card, .why-card, .member-card, .stat-box"
  );
  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  const animateOnScroll = () => {
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
});

// Create isometric grid
const isoGrid = document.getElementById("isoGrid");
const rows = 10;
const cols = 10;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const cell = document.createElement("div");
    cell.className = "grid-cell";
    cell.style.gridRow = `${i + 1}`;
    cell.style.gridColumn = `${j + 1}`;

    const content = document.createElement("div");
    content.className = "cell-content";

    // Add animation to random cells
    if (Math.random() < 0.2) {
      content.classList.add("pulse");
      content.style.animationDelay = `${Math.random() * 5}s`;
    }

    cell.appendChild(content);
    isoGrid.appendChild(cell);
  }
}

// Add wave effect on mousemove
const gridWrapper = document.querySelector(".gridWrapper");
const gridContainer = document.querySelector(".grid-container");

gridWrapper.addEventListener("mousemove", function (e) {
  const rect = this.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const offsetX = ((mouseX - centerX) / centerX) * 10;
  const offsetY = ((mouseY - centerY) / centerY) * 10;

  gridContainer.style.transform = `rotateX(${60 + offsetY / 2}deg) rotateZ(${
    45 + offsetX / 2
  }deg)`;

  // Create cell pulse effect near mouse
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    const cellRect = cell.getBoundingClientRect();
    const cellX = cellRect.left + cellRect.width / 2 - rect.left;
    const cellY = cellRect.top + cellRect.height / 2 - rect.top;

    const distance = Math.sqrt(
      Math.pow(mouseX - cellX, 2) + Math.pow(mouseY - cellY, 2)
    );

    if (
      distance < 80 &&
      !cell.querySelector(".cell-content").classList.contains("pulse")
    ) {
      cell.querySelector(".cell-content").style.background =
        "rgba(52, 152, 219, 0.5)";
    } else if (
      !cell.querySelector(".cell-content").classList.contains("pulse")
    ) {
      cell.querySelector(".cell-content").style.background =
        "rgba(41, 128, 185, 0.2)";
    }
  });
});

gridWrapper.addEventListener("mouseleave", function () {
  gridContainer.style.transform = "rotateX(60deg) rotateZ(45deg)";

  // Reset cell colors
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    if (!cell.querySelector(".cell-content").classList.contains("pulse")) {
      cell.querySelector(".cell-content").style.background =
        "rgba(41, 128, 185, 0.2)";
    }
  });
});

// Add dynamic pulsing effect
function addRandomPulse() {
  const cells = document.querySelectorAll(".grid-cell");
  const randomCell = cells[Math.floor(Math.random() * cells.length)];
  const content = randomCell.querySelector(".cell-content");

  if (!content.classList.contains("pulse")) {
    content.classList.add("pulse");
    content.style.animationDelay = "0s";
    setTimeout(() => {
      content.classList.remove("pulse");
      content.style.animationDelay = `${Math.random() * 5}s`;
    }, 2000); // Remove pulse after 2 seconds
  }
}

// Run random pulse every 3 seconds
setInterval(addRandomPulse, 3000);
