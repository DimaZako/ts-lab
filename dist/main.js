// JS, згенерований з TypeScript вручну

const POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=4";

const openModalBtn = document.querySelector("#openModalBtn");
const closeModalBtn = document.querySelector("#closeModalBtn");
const modal = document.querySelector("#modal");
const backToTopBtn = document.querySelector("#backToTopBtn");
const heroSection = document.querySelector(".hero");
const postsContainer = document.querySelector("#postsContainer");

let isModalOpen = false;

function openModal() {
  if (!modal) return;
  modal.classList.remove("hidden");
  isModalOpen = true;
}

function closeModal() {
  if (!modal) return;
  modal.classList.add("hidden");
  isModalOpen = false;
}

if (openModalBtn) {
  openModalBtn.addEventListener("click", () => {
    openModal();
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    closeModal();
  });
}

if (modal) {
  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target.id === "modal") {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isModalOpen) {
    closeModal();
  }
});

function handleScroll() {
  const scrollY = window.scrollY;

  if (backToTopBtn) {
    if (scrollY > 250) {
      backToTopBtn.classList.remove("hidden");
    } else {
      backToTopBtn.classList.add("hidden");
    }
  }

  if (heroSection) {
    if (scrollY > 80) {
      heroSection.classList.add("scrolled");
    } else {
      heroSection.classList.remove("scrolled");
    }
  }
}

window.addEventListener("scroll", handleScroll);

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

async function loadPosts() {
  if (!postsContainer) return;

  try {
    const response = await fetch(POSTS_API_URL);
    const posts = await response.json();

    postsContainer.innerHTML = "";

    posts.forEach((post, index) => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.style.animationDelay = `${index * 0.1}s`;

      const titleEl = document.createElement("h3");
      titleEl.className = "post-title";
      titleEl.textContent = post.title;

      const bodyEl = document.createElement("p");
      bodyEl.className = "post-body";
      bodyEl.textContent = post.body;

      card.appendChild(titleEl);
      card.appendChild(bodyEl);
      postsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Помилка завантаження постів:", error);
    postsContainer.innerHTML =
      "<p>Не вдалося завантажити пости. Спробуйте пізніше.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
});
