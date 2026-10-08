// Универсальная функция получения данных из внешнего API.
export async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status}`);
  }
  return response.json();
}

// Для лабораторной используем публичный API DummyJSON.
// Ответ API приводится к структуре blogPosts, после чего обычный шаблон его отрисовывает.
export async function getBlogPostsFromApi(limit = 5) {
  const data = await getData(`https://dummyjson.com/posts?limit=${limit}`);

  const images = [
    "./assets/img/Rectangle 22 (5).png",
    "./assets/img/Rectangle 22.png",
    "./assets/img/Rectangle 22 (1).png",
    "./assets/img/Rectangle 22 (3).png",
    "./assets/img/Rectangle 22 (2).png",
  ];

  return data.posts.map((post, index) => ({
    date: `API · ${index + 1}`,
    title: post.title,
    image: images[index % images.length],
    main: index === 0,
  }));
}
