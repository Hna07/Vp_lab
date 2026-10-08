import {
  navigation,
  brands,
  capabilities,
  futureFeatures,
  blogPosts,
  footerColumns,
  pageContent,
} from "../../data/data.js";
import { getBlogPostsFromApi } from "../../api/api.js";
import {
  headerTemplate,
  heroTemplate,
  brandsTemplate,
  gptTemplate,
  futureTemplate,
  vrTemplate,
  bannerTemplate,
  blogTemplate,
  ctaTemplate,
  footerTemplate,
} from "../../templates/templates.js";

const render = (posts = blogPosts) => {
  const root = document.querySelector("#root");
  if (!root) return;

  root.innerHTML = [
    headerTemplate(navigation),
    heroTemplate(pageContent.hero),
    brandsTemplate(brands),
    gptTemplate(pageContent.whatIsGpt, capabilities),
    futureTemplate(pageContent.future, futureFeatures),
    vrTemplate(pageContent.vr),
    bannerTemplate(),
    blogTemplate(posts),
    ctaTemplate(),
    footerTemplate(footerColumns),
  ].join("");

  initBurgerMenu();
};

const initBurgerMenu = () => {
  const burgerNode = document.querySelector(".header__burger_menu");
  const headerMenuNode = document.querySelector(".header__right");
  const closeMenuNode = document.querySelector(".menu__close");
  const bodyNode = document.body;

  if (!burgerNode || !headerMenuNode || !closeMenuNode) return;

  const showMenu = () => headerMenuNode.classList.remove("hidden");
  const hideMenu = () => headerMenuNode.classList.add("hidden");
  const updateBurgerState = () => {
    const mobile = window.innerWidth <= 1024;
    burgerNode.classList.toggle("hidden", !mobile);
    closeMenuNode.classList.toggle("hidden", !mobile);

    if (!mobile) {
      showMenu();
      bodyNode.classList.remove("oh");
    } else {
      hideMenu();
    }
  };

  const toggleMenu = () => {
    const isHidden = headerMenuNode.classList.contains("hidden");
    if (isHidden) {
      showMenu();
      bodyNode.classList.add("oh");
    } else {
      hideMenu();
      bodyNode.classList.remove("oh");
    }
  };

  burgerNode.addEventListener("click", toggleMenu);
  closeMenuNode.addEventListener("click", () => {
    hideMenu();
    bodyNode.classList.remove("oh");
  });
  window.addEventListener("resize", updateBurgerState);
  updateBurgerState();
};

export default function homePage() {
  render();

  // ?api=1 — демонстрация получения той же структуры с внешнего API.
  const useApi = new URLSearchParams(window.location.search).get("api") === "1";
  if (useApi) {
    getBlogPostsFromApi()
      .then((posts) => render(posts))
      .catch((error) => {
        console.error("Не удалось получить данные API. Используются локальные данные.", error);
      });
  }

  // Эти методы специально вынесены наружу для демонстрации требования лабораторной:
  // меняем массив -> повторно вызываем шаблон -> количество элементов меняется автоматически.
  window.lab3 = {
    data: {
      navigation,
      brands,
      capabilities,
      futureFeatures,
      blogPosts,
    },
    render,
    addBlogPost(post) {
      blogPosts.push(post);
      render(blogPosts);
    },
    removeBlogPost(index = blogPosts.length - 1) {
      blogPosts.splice(index, 1);
      render(blogPosts);
    },
    async loadBlogFromApi() {
      const posts = await getBlogPostsFromApi();
      blogPosts.splice(0, blogPosts.length, ...posts);
      render(blogPosts);
      return posts;
    },
  };
}
