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

const news = [
  {
    title:
      "CM Pushkar Singh Dhami aims to create 1000 startups for the youth in the upcoming years",
    desc: " Uttarakhand Chief Minister Pushkar Singh Dhami participated in the Startup Samvad program under Mukhya Sevak Samvad at Mukhya Sevak Sadan Dehradun on Sunday. During this time, he interacted with people promoting startups from across the state and heard their valuable suggestions.",
    category: "startup",
  },
  {
    title: "MSME Loan Scheme 2025",
    desc: "Budget 2025 Updates:Revision of classification of MSMEs to include more businesses and companies under the purview of MSMEs.Micro-enterprises on the Udyam portal will get credit cards with a Rs. 5 lakh limit; 10 lakh cards will be issued in the first year.",

    category: "loan",
  },
  {
    title:
      "Old vs New Tax Regime: Which is Better New or Old Tax Regime for Salaried Employees?",
    desc: "The government introduced various incentives in the recent times to encourage the adoption of the new regime. These changes show that the government intends to have taxpayers transition to the new regime and eventually phase out the old one. Though the new regime is now the default tax regime, the old tax regime will continue to exist.",
    category: "tax",
  },
  {
    title:
      "Mudra loans power millions of small businesses, fuelling India's growth",
    desc: "For the country’s 57.7 million micro and small enterprises, the launch of the Pradhan Mantri Mudra Yojana (PMMY) a decade ago on April 8, 2015, was a watershed moment. Aimed at bridging prevailing credit gaps through collateral-free business loans, this initiative has been instrumental in empowering millions of first-time entrepreneurs and small business owners with formal credit access.",
    category: "loan",
  },
  {
    title: "Startup Lessons",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    category: "business",
  },
  {
    title: "Design Systems in 2025",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    category: "design",
  },
];

const blogs = [
  {
    title: "How to Design a Minimal UI",
    desc: "Minimalism in UI design is all about simplicity. Start by removing unnecessary elements and focusing on core functionality to create clean, user-friendly interfaces.",
    category: "design",
  },
  {
    title: "Getting Started with Node.js",
    desc: "Node.js is a runtime environment for executing JavaScript outside the browser. It's commonly used for backend development, offering scalability and performance for web applications.",
    category: "tech",
  },
  {
    title: "Tips to Improve Web Performance",
    desc: "Improving web performance starts with optimizing images, reducing JavaScript payloads, and using lazy loading techniques to enhance user experience and SEO rankings.",
    category: "tech",
  },
  {
    title: "Understanding Express Middleware",
    desc: "Middleware functions in Express are functions that have access to the request and response objects, enabling modular and reusable code for handling HTTP requests.",
    category: "tech",
  },
  {
    title: "Why Glassmorphism Works",
    desc: "Glassmorphism leverages background blur and transparency to create visually appealing and futuristic interfaces, enhancing user engagement with subtle depth effects.",
    category: "design",
  },
  {
    title: "Scaling Your Business in 2025",
    desc: "Scaling a business requires strategic planning, efficient resource allocation, and leveraging technology to meet growing demand while maintaining quality.",
    category: "business",
  },
  {
    title: "Effective Team Management",
    desc: "Effective team management involves clear communication, setting achievable goals, and fostering a collaborative environment to boost productivity and morale.",
    category: "business",
  },
];

let visibleNews = 3;
let visibleBlogs = 3;

const newsGrid = document.getElementById("newsGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const seeLessBtn = document.getElementById("seeLessBtn");
const blogGrid = document.getElementById("blog-container");
const blogLoadMoreBtn = document.getElementById("blogLoadMoreBtn");
const blogSeeLessBtn = document.getElementById("blogSeeLessBtn");
const filterButtons = document.querySelectorAll(
  ".blog-category-filters button"
);
const searchInput = document.getElementById("searchInput");
const blogSearchInput = document.getElementById("blogSearchInput");

function renderNews(filter = "all", search = "") {
  newsGrid.innerHTML = "";
  const filtered = news
    .filter((item) => filter === "all" || item.category === filter)
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  const visibleItems = filtered.slice(0, visibleNews);

  visibleItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <div class="news-title">${item.title}</div>
      <div class="news-desc">${item.desc}</div>
      <div class="read-more">Read More</div>
    `;
    card.querySelector(".read-more").addEventListener("click", () => {
      card.classList.toggle("expanded");
    });
    newsGrid.appendChild(card);
  });

  loadMoreBtn.style.display = filtered.length > visibleNews ? "block" : "none";
  seeLessBtn.style.display = visibleNews > 3 ? "block" : "none";
}

function renderBlogs(filter = "all", search = "") {
  blogGrid.innerHTML = "";
  const filtered = blogs
    .filter((item) => filter === "all" || item.category === filter)
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  const visibleItems = filtered.slice(0, visibleBlogs);

  visibleItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.innerHTML = `
      <div class="blog-title">${item.title}</div>
      <div class="blog-desc">${item.desc}</div>
      <div class="read-more">Read More</div>
    `;
    card.querySelector(".read-more").addEventListener("click", () => {
      card.classList.toggle("expanded");
    });
    blogGrid.appendChild(card);
  });

  blogLoadMoreBtn.style.display =
    filtered.length > visibleBlogs ? "block" : "none";
  blogSeeLessBtn.style.display = visibleBlogs > 3 ? "block" : "none";
}

// Filter Button Logic
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.textContent.toLowerCase();
    renderNews(filter, searchInput.value);
    renderBlogs(filter, blogSearchInput.value);
  });
});

// News Load More / See Less
loadMoreBtn.addEventListener("click", () => {
  visibleNews += 3;
  const activeFilter = document
    .querySelector(".blog-category-filters button.active")
    .textContent.toLowerCase();
  renderNews(activeFilter, searchInput.value);
});

seeLessBtn.addEventListener("click", () => {
  visibleNews = 3;
  const activeFilter = document
    .querySelector(".blog-category-filters button.active")
    .textContent.toLowerCase();
  renderNews(activeFilter, searchInput.value);
});

// Blog Load More / See Less
blogLoadMoreBtn.addEventListener("click", () => {
  visibleBlogs += 3;
  const activeFilter = document
    .querySelector(".blog-category-filters button.active")
    .textContent.toLowerCase();
  renderBlogs(activeFilter, blogSearchInput.value);
});

blogSeeLessBtn.addEventListener("click", () => {
  visibleBlogs = 3;
  const activeFilter = document
    .querySelector(".blog-category-filters button.active")
    .textContent.toLowerCase();
  renderBlogs(activeFilter, blogSearchInput.value);
});

// News Search Input
searchInput.addEventListener("input", () => {
  visibleNews = 3;
  const activeFilter = document
    .querySelector(".blog-category-filters button.active")
    .textContent.toLowerCase();
  renderNews(activeFilter, searchInput.value);
});

// Blog Search Input
blogSearchInput.addEventListener("input", () => {
  visibleBlogs = 3;
  const activeFilter = document
    .querySelector(".blog-category-filters button.active")
    .textContent.toLowerCase();
  renderBlogs(activeFilter, blogSearchInput.value);
});

// Initial Render
renderNews();
renderBlogs();

// Logo Slider
document.addEventListener("DOMContentLoaded", () => {
  const logos = document.querySelector(".logos");
  if (logos) {
    logos.innerHTML += logos.innerHTML; // Duplicate logos for infinite scroll
  }
});

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

// FAB and Chatbot
document.addEventListener("DOMContentLoaded", () => {
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

  // Toggle FAB menu
  fabButton.addEventListener("click", (e) => {
    e.stopPropagation();
    fabContainer.classList.toggle("active");
  });

  // Open chatbot
  fabChatbot.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    fabContainer.classList.remove("active");
    chatbot.style.display = "flex";
    positionChatbot();
  });

  // Close chatbot
  closeChatbot.addEventListener("click", (e) => {
    e.stopPropagation();
    chatbot.style.display = "none";
  });

  // WhatsApp action
  fabWhatsapp.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open("https://wa.me/08928138434", "_blank");
  });

  // Call action
  fabCall.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = "tel:+08928138434";
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
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
    const lowerMessage = userMessage.toLowerCase().trim().replace("?", "");
    for (const [key, response] of Object.entries(chatResponses)) {
      if (lowerMessage.includes(key)) {
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

  // Event listeners for chatbot
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

  // Position chatbot above FAB
  function positionChatbot() {
    const fabRect = fabButton.getBoundingClientRect();
    chatbot.style.bottom = `${fabRect.height + 30}px`;
    chatbot.style.zIndex = "1002";
  }

  // Initial positioning
  positionChatbot();
  window.addEventListener("resize", positionChatbot);
});
