let container = document.querySelector("#display");

const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        data.map((item) => {
            let div = document.createElement("div");
            div.classList.add('col-sm-12', 'col-lg-6', 'gx-5', 'gy-4');

            const card = document.createElement("div");
            card.classList.add('card');

            const cardBody = document.createElement("div");
            cardBody.classList.add('card-body');
            
            cardBody.innerHTML = `
            <h2 class='card-title display-6 lead'>${item.name}</h2>
            <p class="card-text fs-5 fw-light"><strong>Email</strong>: ${item.email}</p>
            <p class="card-text fs-5 fw-light"><strong>Phone</strong>: ${item.phone}</p>
            <p class="card-text fs-5 fw-light"><strong>Address</strong>: ${item.address.suite} ${item.address.street} ${item.address.city}</p>
            `
            card.appendChild(cardBody)
            div.appendChild(card)
            container.appendChild(div)
        })


    })
}

fetchUsers();

function myFunction() {
let input = document.getElementById('myInput');
let filter = input.value.toUpperCase();
let divs = container.getElementsByTagName('div');

    for (i = 0; i < divs.length; i++) {
        let allP = divs[i].getElementsByTagName("p")[0];
        let txtValue = allP.textContent || allP.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        divs[i].style.display = "";
        } else {
        divs[i].style.display = "none";
        }
    }
}

let myVar;

function loadFunction() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}