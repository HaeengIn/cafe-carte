const dialog = document.getElementById("guestbook-dialog");
const writeButton = document.getElementById("write-guestbook");
const cancelButton = document.getElementById("cancel-dialog");
const authorInput = document.getElementById("author");
const contentInput = document.getElementById("content");
const passwordInput = document.getElementById("password");
const h2 = document.getElementById("dialog-title");
const form = document.getElementById("guestbook-form");

let mode = "create";
let editId = null;

writeButton.addEventListener("click", () => {
  mode = "create";
  editId = null;

  authorInput.readOnly = false;
  authorInput.value = "";
  contentInput.value = "";
  passwordInput.value = "";

  h2.innerText = "새 방명록 작성";

  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  dialog.close();
});

document.querySelectorAll(".edit-guestbook").forEach((button) => {
  button.addEventListener("click", () => {
    mode = "edit";
    editId = button.dataset.id;

    authorInput.readOnly = true;
    authorInput.value = button.dataset.author;
    contentInput.value = button.dataset.content;
    passwordInput.value = "";

    h2.innerText = "방명록 편집";

    dialog.showModal();
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let response;

  if (mode === "create") {
    const data = {
      author: authorInput.value,
      content: contentInput.value,
      password: passwordInput.value,
    };

    response = await fetch("/guestbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  if (mode === "edit") {
    const data = {
      content: contentInput.value,
      password: passwordInput.value,
    };

    response = await fetch(`/guestbook/edit/${editId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  if (response.ok) {
    dialog.close();
    location.reload();
  } else {
    const error = await response.json();
    alert(error.detail);
  }
});
