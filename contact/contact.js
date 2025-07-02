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

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 0, lng: 0 },
    styles: [
      { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [{ color: "#4b6878" }],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#2e3b4e" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#283d6a" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#304a7d" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });

  const service = new google.maps.places.PlacesService(map);
  service.getDetails(
    {
      placeId: "ChIJOa-iTTLu-CERg7ZUIQCfSvA",
      fields: ["geometry", "name", "formatted_address"],
    },
    (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        map.setCenter(place.geometry.location);
        const customIcon = {
          url: "/assets/map-marker.png",
          scaledSize: new google.maps.Size(48, 48),
        };
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          icon: customIcon,
          title: place.name,
        });
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        const infoWindow = new google.maps.InfoWindow({
          content: `
                                <div style="padding: 8px; max-width: 220px;">
                                    <strong>${place.name}</strong><br>
                                    ${place.formatted_address}<br>
                                    <a href="${directionsUrl}" target="_blank" style="display:inline-block; margin-top:6px; color:#00c2ff; text-decoration:underline;">
                                        📍 Get Directions
                                    </a>
                                </div>
                            `,
        });
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }
    }
  );
}

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

const addContact = async (formData) => {
  try {
    let res = await axios.post(
      `http://localhost:5000/contact/addContactDetails`,
      formData
    );
    return res;
  } catch (error) {
    console.error("Error adding contact:", error);
  }
};

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      number: document.getElementById("number").value,
      message: document.getElementById("message").value,
    };
    let res = await addContact(formData);
    console.log(res);
    this.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
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

  fabButton.addEventListener("click", function (e) {
    e.stopPropagation();
    fabContainer.classList.toggle("active");
  });

  fabChatbot.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    fabContainer.classList.remove("active");
    chatbot.style.display = "flex";
    positionChatbot();
  });

  closeChatbot.addEventListener("click", function (e) {
    e.stopPropagation();
    chatbot.style.display = "none";
  });

  fabWhatsapp.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    window.open("https://wa.me/08928138434", "_blank");
  });

  fabCall.addEventListener("click", function (e) {
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
    document.querySelectorAll(".chat-suggestion").forEach((el) => el.remove());
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

  function positionChatbot() {
    const fabRect = fabButton.getBoundingClientRect();
    chatbot.style.bottom = `${fabRect.height + 30}px`;
    chatbot.style.zIndex = "1002";
  }

  positionChatbot();
  window.addEventListener("resize", positionChatbot);
});
