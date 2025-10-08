
const fetchButton = document.getElementById("fetchButton");
const postList = document.getElementById("postList");
const errorDiv = document.getElementById("error");

const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

fetchButton.addEventListener("click", async () => {
  postList.innerHTML = "";
  errorDiv.textContent = "Loading...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    errorDiv.textContent = "";

    posts.slice(0, 5).forEach(post => {
      const title = document.createElement("h3");
      title.textContent = post.title;

      const body = document.createElement("p");
      body.textContent = post.body;

      postList.appendChild(title);
      postList.appendChild(body);
    });
  } catch (error) {
    errorDiv.textContent = "Error fetching posts: " + error.message;
  }
});

postForm.addEventListener("submit", async event => {
  event.preventDefault();
  formError.textContent = "";
  formSuccess.textContent = "Submitting...";

  const newPost = {
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
    userId: 1
  };

  if (!newPost.title || !newPost.body) {
    formError.textContent = "Title and body are required.";
    formSuccess.textContent = "";
    return;
  }

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    });

    const data = await response.json();
    formSuccess.textContent = `Post created! ID: ${data.id}`;
    titleInput.value = "";
    bodyInput.value = "";
  } catch (error) {
    formError.textContent = "Error submitting post: " + error.message;
    formSuccess.textContent = "";
  }
});
