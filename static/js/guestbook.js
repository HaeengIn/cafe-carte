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
  event.preventDefault;

  const data = {
    author: authorInput.value,
    content: contentInput.value,
    password: passwordInput.value,
  };

  if (mode === "create") {
    // POST /guestbook
  }

  if (mode === "edit") {
    // POST /guestbook/edit/{id}
  }
});
