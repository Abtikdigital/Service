document.addEventListener("DOMContentLoaded", () => {
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

  // Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  // Logo Slider
  const logos = document.querySelector(".logos");
  if (logos) {
    logos.innerHTML += logos.innerHTML; // Duplicate logos for seamless scrolling
  }

  // Job Section
  const jobCards = document.querySelectorAll(".job-card");
  jobCards.forEach((card) => {
    const header = card.querySelector(".job-header");
    header.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });

  // Typing Effect
  const typingTexts = [
    "Define your path.",
    "Shape your future.",
    "Grow with Abtik Services.",
  ];
  let typingIndex = 0;
  let charIndex = 0;
  const typingElement = document.getElementById("typing-text");

  function typeText() {
    if (charIndex < typingTexts[typingIndex].length) {
      typingElement.textContent += typingTexts[typingIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 100);
    } else {
      setTimeout(() => {
        typingElement.textContent = "";
        charIndex = 0;
        typingIndex = (typingIndex + 1) % typingTexts.length;
        typeText();
      }, 2000);
    }
  }
  typeText();

  // Animated Counters
  const counters = document.querySelectorAll(".counter");
  const startCounting = () => {
    counters.forEach((counter) => {
      counter.textContent = "0";
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.textContent;
        const increment = target / 100;
        if (current < target) {
          counter.textContent = `${Math.ceil(current + increment)}`;
          setTimeout(updateCount, 20);
        } else {
          counter.textContent = target;
        }
      };
      updateCount();
    });
  };

  let counterStarted = false;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !counterStarted) {
        startCounting();
        counterStarted = true;
      }
    },
    { threshold: 0.5 }
  );
  observer.observe(document.getElementById("define-career"));

  // Contact Form Submission
  const contactForm = document.querySelector(".contact-form");
  const contactSubmitBtn = document.querySelector(".send-btn");
  if (contactForm && contactSubmitBtn) {
    contactSubmitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const name = contactForm.querySelector(
        "input[placeholder='Enter your name']"
      ).value;
      const phone = contactForm.querySelector(
        "input[placeholder='Enter your number']"
      ).value;
      const email = contactForm.querySelector(
        "input[placeholder='Enter your Email']"
      ).value;
      const message = contactForm.querySelector(
        "textarea[placeholder='Enter your message']"
      ).value;

      if (!name || !phone || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Please enter a valid name.");
        return;
      }
      if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert("Thank you for your message! We will get back to you soon.");
      contactForm.querySelector("input[placeholder='Enter your name']").value =
        "";
      contactForm.querySelector(
        "input[placeholder='Enter your number']"
      ).value = "";
      contactForm.querySelector("input[placeholder='Enter your Email']").value =
        "";
      contactForm.querySelector(
        "textarea[placeholder='Enter your message']"
      ).value = "";
    });
  }

  // Particle Animation for Hero Section
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    function createParticle() {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      particle.style.setProperty("--x", `${x}px`);
      particle.style.setProperty("--y", `${y}px`);
      particlesContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 15000);
    }
    setInterval(createParticle, 500);
  }

  // FAB and Chatbot
  const fabContainer = document.querySelector(".fab-container");
  const fabButton = document.querySelector(".fab-button");
  const fabChatbot = document.getElementById("fab-chatbot");
  const fabWhatsapp = document.getElementById("fab-whatsapp");
  const fabCall = document.getElementById("fab-call");
  const chatbot = document.querySelector(".fab-chatbot");
  const closeChatbot = document.querySelector(".close-chatbot");
  const sendBtn = document.querySelector(".chatbot-send-btn");
  const input = document.querySelector(".chatbot-text-input");
  const messages = document.querySelector(".chatbot-messages");
  const suggestionsContainer = document.querySelector(".chat-suggestions");

  if (fabButton && fabContainer) {
    fabButton.addEventListener("click", () => {
      fabContainer.classList.toggle("active");
    });
  }

  if (fabChatbot && chatbot) {
    fabChatbot.addEventListener("click", () => {
      chatbot.style.display = "flex";
      fabContainer.classList.remove("active");
      setTimeout(() => displaySuggestions(), 1000);
    });
  }

  if (closeChatbot && chatbot) {
    closeChatbot.addEventListener("click", () => {
      chatbot.style.display = "none";
    });
  }

  if (fabWhatsapp) {
    fabWhatsapp.addEventListener("click", () => {
      window.open("https://wa.me/918928138434", "_blank");
      fabContainer.classList.remove("active");
    });
  }

  if (fabCall) {
    fabCall.addEventListener("click", () => {
      window.location.href = "tel:+918928138434";
      fabContainer.classList.remove("active");
    });
  }

  const responses = {
    hi: "Hello! How can I assist you today?",
    hello: "Hi there! What's on your mind?",
    "job openings":
      "We have openings for Business Development Manager, Graphic Designer, Relationship Manager, and Business Development Executive. Check the 'Job Openings' section for details or ask me about a specific role!",
    "business development manager":
      "The Business Development Manager role involves managing clients, building strategies, and driving growth. It requires 3+ years of B2B sales experience. Interested? I can guide you on applying!",
    "graphic designer":
      "Our Graphic Designer position requires proficiency in Adobe Suite and a strong portfolio. You'll create visuals for digital campaigns. Want to know more about the application process?",
    "relationship manager":
      "As a Relationship Manager, you'll build client relationships and resolve queries. Excellent communication skills are a must. Curious about the role? Ask away!",
    "business development executive":
      "The Business Development Executive role is great for entry-level candidates. You'll help expand our client base with growth opportunities. Want details on how to apply?",
    "how to apply":
      "To apply, send your resume and portfolio (if applicable) to careers@abtik.com. Specify the role in the subject line. Need help with your application?",
    contact:
      "You can reach us via the contact form on this page, call +91 89281 38434, or WhatsApp us. Want to know our office hours?",
    "office hours":
      "We're available Monday to Saturday, 10 AM to 7 PM. How can I assist you further?",
    default:
      "I'm not sure about that. Could you clarify or ask about job openings, how to apply, or contact details?",
  };

  const suggestions = [
    "Job Openings",
    "How to Apply",
    "Contact",
    "Office Hours",
  ];

  function displaySuggestions() {
    suggestionsContainer.innerHTML = "";
    suggestions.forEach((suggestion) => {
      const suggestionBtn = document.createElement("div");
      suggestionBtn.classList.add("chat-suggestion");
      suggestionBtn.textContent = suggestion;
      suggestionBtn.addEventListener("click", () => {
        handleUserMessage(suggestion.toLowerCase());
      });
      suggestionsContainer.appendChild(suggestionBtn);
    });
  }

  function handleUserMessage(messageText) {
    if (!messageText.trim()) return;
    const userMessage = document.createElement("div");
    userMessage.classList.add("chatbot-message", "user-message");
    userMessage.innerHTML = `<p>${messageText}</p>`;
    messages.appendChild(userMessage);

    const responseText =
      responses[messageText.toLowerCase()] || responses["default"];
    setTimeout(() => {
      const botMessage = document.createElement("div");
      botMessage.classList.add("chatbot-message", "bot-message");
      botMessage.innerHTML = `<p>${responseText}</p>`;
      messages.appendChild(botMessage);
      messages.scrollTop = messages.scrollHeight;
      displaySuggestions();
    }, 500);

    messages.scrollTop = messages.scrollHeight;
  }

  if (sendBtn && input) {
    sendBtn.addEventListener("click", () => {
      const messageText = input.value;
      handleUserMessage(messageText);
      input.value = "";
    });

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const messageText = input.value;
        handleUserMessage(messageText);
        input.value = "";
      }
    });
  }
});
