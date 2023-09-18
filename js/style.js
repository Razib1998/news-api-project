const handleCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();
  const allNewsCategory = data.data.news_category;
  const tabContainer = document.getElementById("tab-container");
  console.log(allNewsCategory);
  const allCategory = allNewsCategory.slice(0, 4);
  allCategory.forEach((category) => {
    console.log(category);

    // Now create a div to display the news category
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick = "handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
    `;
    tabContainer.appendChild(div);
  });
};

const handleLoadNews = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await res.json();
  const newsCard = data.data;
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  newsCard?.forEach((news) => {
    console.log(news);
    const div = document.createElement("div");
    div.innerHTML = `
         <div class="card w-96 h-full bg-base-100 shadow-xl">
          <figure>
            <img
              src="${news.image_url}"
            />
          </figure>
          <div class="card-body">
          <div class = "flex flex-row">
            <h2 class="card-title">${news?.title.slice(0, 40)}</h2>
            <button class="btn btn-primary">${news.rating.badge}</button>
            </div>
            <p>${news.details.slice(0, 80)}</p>
            <p><span>Total Views:</span> ${news.total_view? news.total_view : "No views"}</p>
            <div class = "flex flex-row justify-between">
            <div class = " w-14 rounded-full">
            <img src = "${news.author.img}"/>
            </div>
            <div>
            <h6>${news.author.name}</h6>
            <small>${news.author.published_date}</small>
            </div>
            <button class="btn btn-active btn-neutral">Details</button>
            <div>
            </div>
            </div>
            <div class="card-actions justify-end">
              
            </div>
          </div>
        </div>`;
    cardContainer.appendChild(div);
  });
};

handleCategory();
handleLoadNews("01");
