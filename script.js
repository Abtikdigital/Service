document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");
    setTimeout(() => {
      preloader.style.display = "none";
      mainContent.style.display = "block";
    }, 2000);
  });

  // Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Video Player
  const video = document.getElementById("myVideo");
  const overlay = document.getElementById("videoOverlay");
  const overlayButton = document.getElementById("overlayButton");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const muteBtn = document.getElementById("muteBtn");
  const volume = document.getElementById("volume");
  const progressBar = document.getElementById("progressBar");
  const progress = document.getElementById("progress");
  const fullScreenBtn = document.getElementById("fullScreenBtn");
  let hideOverlayTimeout;

  function togglePlayPause() {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = "⏸";
      overlayButton.textContent = "⏸";
      overlay.classList.add("hidden");
      hideOverlayTimeout = setTimeout(() => {
        overlay.style.opacity = "0";
      }, 3000);
    } else {
      video.pause();
      playPauseBtn.textContent = "▶";
      overlayButton.textContent = "▶";
      overlay.classList.remove("hidden");
      clearTimeout(hideOverlayTimeout);
    }
  }

  video.addEventListener("click", togglePlayPause);
  overlayButton.addEventListener("click", togglePlayPause);
  playPauseBtn.addEventListener("click", togglePlayPause);

  muteBtn.addEventListener("click", function () {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔇" : "🔊";
  });

  volume.addEventListener("input", function () {
    video.volume = volume.value;
    muteBtn.textContent = volume.value == 0 ? "🔇" : "🔊";
  });

  video.addEventListener("timeupdate", function () {
    const percentage = (video.currentTime / video.duration) * 100;
    progress.style.width = percentage + "%";
  });

  progressBar.addEventListener("click", function (e) {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  });

  fullScreenBtn.addEventListener("click", function () {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  });

  video.addEventListener("ended", function () {
    playPauseBtn.textContent = "▶";
    overlayButton.textContent = "▶";
    overlay.classList.remove("hidden");
    clearTimeout(hideOverlayTimeout);
  });

  // Stats Counter
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    counter.innerText = "0";
    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 200;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    updateCounter();
  });

  // Testimonial Carousel
  let currentIndex = 0;
  const cards = $(".carousel .card");
  const totalCards = cards.length;

  function updateCarousel() {
    cards.each(function (index) {
      $(this).removeClass("active behind-1 behind-2");
      if (index === currentIndex) {
        $(this).addClass("active");
      } else if (index === (currentIndex + 1) % totalCards) {
        $(this).addClass("behind-1");
      } else if (index === (currentIndex + 2) % totalCards) {
        $(this).addClass("behind-2");
      }
    });
  }

  setInterval(function () {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  }, 4000);

  updateCarousel();

  // Q&A Accordion
  const qnaHeaders = document.querySelectorAll(".qna-header");
  qnaHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const qnaCard = header.parentElement;
      qnaCard.classList.toggle("open");
    });
  });

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
    chatbot.style.right = "20px";
    chatbot.style.zIndex = "1002";
  }

  positionChatbot();
  window.addEventListener("resize", positionChatbot);

  function ensureSingleFabActions() {
    const fabActions = document.querySelector(".fab-actions");
    if (fabActions.children.length > 3) {
      while (fabActions.children.length > 3) {
        fabActions.removeChild(fabActions.lastChild);
      }
    }
  }

  ensureSingleFabActions();
});
