// book input notification function
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector("#alert-notification");
  const form = document.querySelector("#form");
  container.insertBefore(div, form);

  // Vanish in 3 seconds
  setTimeout(() => document.querySelector(".alert").remove(), 800);
}

// Clear input field
function clearFields() {
  document.querySelector('#title').value = '';
  document.querySelector('#body').value = '';
  document.querySelector('#userID').value = '';
}

// Book Display
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const userId = document.querySelector("#userID").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: body,
      userId: userId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then((response) => response.json())
  .then(function (json) {
    console.log(json);

    const results = document.querySelector("#result");

    // const book = json.value;
    const jsonBook = `${json.title} by ${json.body}. ISBN: ${json.userId}`;

    // creates section tag with class of book
    const jsonBookEl = document.createElement("div");
    jsonBookEl.classList.add("book", "mb-3");

    // creates div tag with class of content
    const jsonBookContentEl = document.createElement("div");
    jsonBookContentEl.classList.add("content", "form-group");

    // add content class to book class
    jsonBookEl.appendChild(jsonBookContentEl);

    // creates an input tag
    const jsonBookInputEl = document.createElement("input");
    jsonBookInputEl.type = "text";
    jsonBookInputEl.classList.add("text", "form-control", "bg-dark", "mb-1");
    jsonBookInputEl.value = jsonBook;
    jsonBookInputEl.setAttribute("readonly", "readonly");

    // appends the input tag into the form-group div and gives output
    jsonBookContentEl.appendChild(jsonBookInputEl);

    // creates a div with the class of actions
    const jsonBookActionsEl = document.createElement("div");
    jsonBookActionsEl.classList.add("actions");

    // creates the edit button
    const jsonBookEditEl = document.createElement("a");
    jsonBookEditEl.classList.add(
      "btn",
      "btn-success",
      "btn-block",
      "edit",
      "btn-sm"
    );
    jsonBookEditEl.innerHTML = "Edit";
    jsonBookEditEl.type = "submit";

    // creates the delete button
    const jsonBookDeleteEl = document.createElement("a");
    jsonBookDeleteEl.classList.add(
      "btn",
      "btn-danger",
      "btn-block",
      "delete",
      "btn-sm",
      "mx-1"
    );
    jsonBookDeleteEl.innerHTML = "Delete";

    // appends both the delete and the edit button to action class
    jsonBookActionsEl.appendChild(jsonBookEditEl);
    jsonBookActionsEl.appendChild(jsonBookDeleteEl);

    jsonBookContentEl.appendChild(jsonBookActionsEl);

    // add book class to list element
    if (title === "" || body === "" || userId === "") {
      showAlert("Please fill in all fields", "danger");
    } else {
      results.appendChild(jsonBookEl);
      showAlert("Book Added", "success");
      clearFields();
    }

    json.value = "";

    // book input edit logic
    jsonBookEditEl.addEventListener("click", () => {
      if (jsonBookEditEl.innerText.toLowerCase() === "edit") {
        jsonBookInputEl.removeAttribute("readonly");
        jsonBookInputEl.focus();
        jsonBookEditEl.innerText = "Save";
      } else {
        jsonBookInputEl.setAttribute("readonly", "readonly");
        jsonBookEditEl.innerText = "Edit";
        showAlert("Saved Successfully", "success");
      }
    });

    jsonBookDeleteEl.addEventListener("click", () => {
      results.removeChild(jsonBookEl);
      showAlert("Book Removed", "success");
    });
  });
});