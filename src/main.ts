// Тип для постів з JSONPlaceholder
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const POSTS_API_URL: string =
  "https://jsonplaceholder.typicode.com/posts?_limit=4";

// Пошук елементів у DOM
const openModalBtn: HTMLButtonElement | null =
  document.querySelector("#openModalBtn");
const closeModalBtn: HTMLButtonElement | null =
  document.querySelector("#closeModalBtn");
const modal: HTMLDivElement | null = document.querySelector("#modal");
const backToTopBtn: HTMLButtonElement | null =
  document.querySelector("#backToTopBtn");
const heroSection: HTMLElement | null =
  document.querySelector(".hero");
const postsContainer: HTMLDivElement | null =
  document.querySelector("#postsContainer");

// Флаг для відстеження стану модалки
let isModalOpen: boolean = false;

// ===== Функції для модального вікна =====
function openModal(): void {
  if (!modal) return;
  modal.classList.remove("hidden");
  isModalOpen = true;
}

function closeModal(): void {
  if (!modal) return;
  modal.classList.add("hidden");
  isModalOpen = false;
}

// Обробка кліків для відкриття/закриття
if (openModalBtn) {
  openModalBtn.addEventListener("click", (): void => {
    openModal();
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", (): void => {
    closeModal();
  });
}

// Закриття модалки по кліку по фону
if (modal) {
  modal.addEventListener("click", (event: MouseEvent): void => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.id === "modal") {
      closeModal();
    }
  });
}

// Закриття модалки по ESC
document.addEventListener("keydown", (event: KeyboardEvent): void => {
  if (event.key === "Escape" && isModalOpen) {
    closeModal();
  }
});

// ===== Скрол + кнопка "Нагору" + анімація hero =====
function handleScroll(): void {
  const scrollY: number = window.scrollY;

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

// Плавний скрол догори
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===== Завантаження постів з JSONPlaceholder =====
async function loadPosts(): Promise<void> {
  if (!postsContainer) return;

  try {
    const response: Response = await fetch(POSTS_API_URL);
    const posts: Post[] = await response.json();

    postsContainer.innerHTML = "";

    posts.forEach((post: Post, index: number): void => {
      const card: HTMLDivElement = document.createElement("div");
      card.className = "post-card";

      // невелика затримка для анімації
      card.style.animationDelay = `${index * 0.1}s`;

      const titleEl: HTMLHeadingElement = document.createElement("h3");
      titleEl.className = "post-title";
      titleEl.textContent = post.title;

      const bodyEl: HTMLParagraphElement = document.createElement("p");
      bodyEl.className = "post-body";
      bodyEl.textContent = post.body;

      card.appendChild(titleEl);
      card.appendChild(bodyEl);
      postsContainer.appendChild(card);
    });
  } catch (error: unknown) {
    console.error("Помилка завантаження постів:", error);
    postsContainer.innerHTML =
      "<p>Не вдалося завантажити пости. Спробуйте пізніше.</p>";
  }
}

// Старт: коли DOM готовий — завантажуємо пости
document.addEventListener("DOMContentLoaded", (): void => {
  loadPosts();
});
