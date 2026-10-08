const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const headerTemplate = (navigation) => `
  <section class="section header">
    <div class="header__logo">
      <a href="#" class="logo__link">
        <img class="link__name" src="./assets/img/logo.svg" alt="GPT-3" />
      </a>
    </div>
    <div class="header__burger_menu" aria-label="Открыть меню" role="button" tabindex="0">
      <div class="burger_menu__line"></div>
      <div class="burger_menu__line"></div>
      <div class="burger_menu__line"></div>
    </div>
    <div class="header__right hidden">
      <aside class="header__menu">
        <div class="menu__close" aria-label="Закрыть меню" role="button" tabindex="0">
          <div class="menu__line"></div>
          <div class="menu__line"></div>
        </div>
        <ul class="menu">
          ${navigation.map((item) => `
            <li class="menu__item${item.active ? " active" : ""}">
              <a href="${escapeHtml(item.href)}" class="item__link">${escapeHtml(item.title)}</a>
            </li>
          `).join("")}
        </ul>
      </aside>
      <div class="cta_buttons">
        <a href="#"><button class="cta_buttons__singin btn">Войти</button></a>
        <a href="#"><button class="cta_buttons__singin btn primary-btn">Регистрация</button></a>
      </div>
    </div>
  </section>
`;

export const heroTemplate = ({ title, description, image }) => `
  <section class="section hero_section">
    <div class="hero_section__left">
      <h1 class="left__header">${title}</h1>
      <p class="left__description">${escapeHtml(description)}</p>
      <div class="left__cta_buttons">
        <input type="text" value="" placeholder="Введите Email" />
        <button class="cta_buttons__signin btn primary-btn">Начать</button>
      </div>
      <div class="left__social_approve"></div>
    </div>
    <div class="hero_section__right">
      <img src="${escapeHtml(image)}" alt="gpt3" />
    </div>
  </section>
`;

export const brandsTemplate = (brands) => `
  <section class="section brands_section">
    ${brands.map((brand) => `
      <img class="brands_section__img" src="${escapeHtml(brand.src)}" alt="${escapeHtml(brand.name)}" />
    `).join("")}
  </section>
`;

export const gptTemplate = ({ title, text, middleTitle }, capabilities) => `
  <section class="section what_is_chatgpt_section" id="gpt">
    <div class="what_is_chatgpt_section__top">
      <h3 class="top__header lined_header">${escapeHtml(title)}</h3>
      <p class="top__content">${escapeHtml(text)}</p>
    </div>
    <div class="what_is_chatgpt_section__middle">
      <h2 class="middle__header">${escapeHtml(middleTitle)}</h2>
      <a href="#blog" class="middle_cta">Исследовать библиотеку</a>
    </div>
    <div class="what_is_chatgpt_section__bottom">
      ${capabilities.map((item) => `
        <div class="bottom__container">
          <h3 class="container__header lined_header">${escapeHtml(item.title)}</h3>
          <p class="container__content">${escapeHtml(item.text)}</p>
        </div>
      `).join("")}
    </div>
  </section>
`;

export const futureTemplate = (future, features) => `
  <section class="section future_here" id="cases">
    <div class="future_here__left">
      <h2 class="left__header">${escapeHtml(future.title)}</h2>
      <a href="#" class="left__cta">Запросить ранний доступ</a>
    </div>
    <div class="future_here__right">
      ${features.map((item) => `
        <div class="right__container">
          <h3 class="container__header lined_header">${escapeHtml(item.title)}</h3>
          <p class="container__content">${escapeHtml(item.text)}</p>
        </div>
      `).join("")}
    </div>
  </section>
`;

export const vrTemplate = ({ image, subtitle, title, description }) => `
  <section class="vr_section">
    <div class="vr_Women">
      <img src="${escapeHtml(image)}" alt="VR" />
    </div>
    <div class="vr_text">
      <a href="#" class="right__sub_cta">${escapeHtml(subtitle)}</a>
      <h2 class="right__header">${escapeHtml(title)}</h2>
      <p class="right__description">${escapeHtml(description)}</p>
      <a href="#" class="right__cta">Запросить ранний доступ</a>
    </div>
  </section>
`;

export const bannerTemplate = () => `
  <section class="section banner">
    <div class="banner__text">
      <span class="text__sub">Запросите ранний доступ для начала</span>
      <h3 class="text__main">Зарегистрируйтесь сегодня и начните исследовать бескрайние возможности.</h3>
    </div>
    <div class="banner__button">
      <button class="black-but">Начать</button>
    </div>
  </section>
`;

export const blogTemplate = (posts) => {
  const [main, ...rest] = posts;
  return `
    <section class="blog_section" id="blog">
      <h2 class="blog_section__header">Многое Происходит,<br />Мы Ведем об Этом Блог. <span class="blog_section__count">(${posts.length})</span></h2>
      <div class="blog_section__container">
        ${main ? `
          <div class="blog_card main_card">
            <div class="blog_card__image1">
              <img src="${escapeHtml(main.image)}" alt="${escapeHtml(main.title)}" />
            </div>
            <div class="blog_card__content">
              <div class="content__top">
                <span class="content__date">${escapeHtml(main.date)}</span>
                <h3 class="content__title">${escapeHtml(main.title)}</h3>
              </div>
              <a href="#" class="content__link">Читать полную статью</a>
            </div>
          </div>
        ` : ""}
        <div class="blog_section__grid">
          ${rest.map((post) => `
            <div class="blog_card">
              <div class="blog_card__image">
                <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" />
              </div>
              <div class="blog_card__content">
                <div class="content__top">
                  <span class="content__date">${escapeHtml(post.date)}</span>
                  <h3 class="content__title">${escapeHtml(post.title)}</h3>
                </div>
                <a href="#" class="content__link">Читать полную статью</a>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
};

export const ctaTemplate = () => `
  <section class="section cta_future">
    <h1 class="cta_future__header">Хотите Шагнуть в Будущее Раньше Других?</h1>
    <a href="#"><button class="cta_future__btn">Запросить ранний доступ</button></a>
  </section>
`;

export const footerTemplate = (columns) => `
  <footer class="section footer">
    <div class="footer__container">
      <div class="footer__left">
        <img src="./assets/img/logo.svg" alt="GPT-3" class="footer__logo" />
        <p class="footer__address">
          ул. Профессора Поздеева 13, к.Г,<br />
          Пермь, Пермский край<br /><br />
          Все права защищены
        </p>
      </div>
      <div class="footer__links">
        ${columns.map((column) => `
          <div class="links_column">
            <h4>${escapeHtml(column.title)}</h4>
            ${column.links.map((link) => `<a href="#">${escapeHtml(link)}</a>`).join("")}
          </div>
        `).join("")}
      </div>
    </div>
  </footer>
  <p class="footer__copyright">© 2023 GPT-3. Все права защищены.</p>
`;
