let allReviews = [];
let currentIndex = 0;

function displayReviews() {
  const container = document.getElementById("reviews");
  container.innerHTML = "";

  const visible = allReviews.slice(currentIndex, currentIndex + 5);
  visible.forEach((review) => {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <p><strong>${review.author_name}</strong></p>
      <p>${review.text}</p>
      <p>⭐️ ${review.rating}</p>
      <small>ID: ${review.id}</small>
    `;
    container.appendChild(card);
  });

  currentIndex = (currentIndex + 5) % allReviews.length;
}

fetch("http://localhost:3000/api/reviews")
  .then((res) => res.json())
  .then((data) => {
    allReviews = data;
    displayReviews();
    setInterval(displayReviews, 6000); // Change every 6s
  })
  .catch((err) => {
    console.error("❌ Failed to load reviews:", err);
  });
