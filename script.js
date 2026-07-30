// ==============================
// Online Ticket Booking System
// Author: Nani
// ==============================

// ------------------------------
// Application State
// ------------------------------
let loggedIn = false;
let selectedSeats = [];
let selectedShow = null;

// ------------------------------
// Movies Data
// ------------------------------
const movies = [
    { id: 101, name: "Kantara", img: "https://stat5.bollywoodhungama.in/wp-content/uploads/2022/10/Kantara-1.jpg" },
    { id: 102, name: "2018", img: "https://assets.gadgets360cdn.com/pricee/assets/product/202305/2018_1683114686.jpg" },
    { id: 103, name: "Devara", img: "https://assets.gadgets360cdn.com/pricee/assets/product/202306/Devara_1687223267.jpg" },
    { id: 104, name: "Pushpa-2", img: "https://tse1.mm.bing.net/th/id/OIP.7HpA4z123Po4r9AaRFlOJwHaLe?pid=Api&P=0&h=220" },
    { id: 105, name: "Akhanda", img: "https://stat4.bollywoodhungama.in/wp-content/uploads/2023/01/Akhanda.jpg" },
    { id: 106, name: "Game Changer", img: "https://images.indianexpress.com/2025/01/game-changer-release-1600.jpg" },
    { id: 107, name: "HIT-3", img: "https://m.media-amazon.com/images/M/MV5BOGJlMTM2OWUtYTQwNy00YmM3LTlkOTctMDBjY2ExN2JjY2UzXkEyXkFqcGc@._V1_.jpg" },
    { id: 108, name: "Major", img: "https://assets.gadgets360cdn.com/pricee/assets/product/202205/Major-Poster_1651742450.jpg" },
    { id: 109, name: "KGF 2", img: "https://wallpapercave.com/wp/wp8319452.jpg" },
    { id: 110, name: "OG", img: "https://m.media-amazon.com/images/M/MV5BOTg2NDNhZTYtNTYxMS00ZjM5LWIyZWEtMjk2MGI2NmMxZmI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { id: 111, name: "Waltair Veerayya", img: "https://m.media-amazon.com/images/M/MV5BYTQ0OTA5OTEtZWFkNy00Y2Q4LWI1NGEtNDA5OGE0Y2JjZjQxXkEyXkFqcGdeQXVyMTE5NTEyNTg5._V1_.jpg" },
    { id: 112, name: "Adipurush", img: "https://fr.web.img2.acsta.net/pictures/23/04/25/13/26/0959427.jpg" },
    { id: 113, name: "Tilu-2", img: "http://businessoftollywood.com/wp-content/uploads/2021/08/DJ-Tillu-Logo-630.jpg" },
    { id: 114, name: "Arjun Reddy", img: "https://wallpapercave.com/wp/wp4477498.jpg" },
    { id: 115, name: "arm", img: "https://tse4.mm.bing.net/th/id/OIP.nE6VWEhUEzFZ44C3KK87FgHaNK?pid=Api&P=0&h=220" }
];

// ------------------------------
// Music Data
// ------------------------------
const music = [
    {
        id: 201,
        name: "Arijit Singh Live",
        img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500"
    },
    {
        id: 202,
        name: "A.R. Rahman Concert",
        img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500"
    },
    {
        id: 203,
        name: "Anirudh Live",
        img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500"
    }
];

// ------------------------------
// IPL Data
// ------------------------------
const ipl = [
    {
        id: 301,
        name: "CSK vs RCB",
        img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500"
    },
    {
        id: 302,
        name: "MI vs SRH",
        img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500"
    },
    {
        id: 303,
        name: "KKR vs DC",
        img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500"
    }
];

// ==============================
// Category Functions
// ==============================

function showCategory(category) {

    document.getElementById("movies").style.display = "none";
    document.getElementById("music").style.display = "none";
    document.getElementById("ipl").style.display = "none";

    document.getElementById(category).style.display = "block";
}

// ==============================
// Login & Signup
// ==============================

function toggleForms() {

    document.getElementById("loginForm").classList.toggle("active");
    document.getElementById("signupForm").classList.toggle("active");

}

function signup() {

    const username = document.getElementById("signupUser").value.trim();
    const password = document.getElementById("signupPass").value;
    const confirmPassword = document.getElementById("confirmPass").value;

    if (username === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Signup Successful! Please Login.");

    document.getElementById("signupUser").value = "";
    document.getElementById("signupPass").value = "";
    document.getElementById("confirmPass").value = "";

    toggleForms();

}

function login() {

    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value;

    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (username === savedUsername && password === savedPassword) {

        loggedIn = true;

        alert("Login Successful!");

        document.getElementById("loginForm").classList.remove("active");
        document.getElementById("mainContent").style.display = "block";

        showCategory("movies");

    } else {

        alert("Invalid Username or Password");

    }

}
// ==============================
// Load Movies
// ==============================

function loadMovies() {

    const moviesGrid = document.getElementById("moviesGrid");

    moviesGrid.innerHTML = "";

    movies.forEach(movie => {

        moviesGrid.innerHTML += `
            <div class="card">

                <img src="${movie.img}" alt="${movie.name}">

                <div class="info">
                    ${movie.name}
                </div>

                <button onclick="selectShow('${movie.name}')">
                    Book Now
                </button>

            </div>
        `;

    });

}

// ==============================
// Load Music
// ==============================

function loadMusic() {

    const musicGrid = document.getElementById("musicGrid");

    musicGrid.innerHTML = "";

    music.forEach(song => {

        musicGrid.innerHTML += `
            <div class="card">

                <img src="${song.img}" alt="${song.name}">

                <div class="info">
                    ${song.name}
                </div>

                <button onclick="selectShow('${song.name}')">
                    Book Now
                </button>

            </div>
        `;

    });

}

// ==============================
// Load IPL
// ==============================

function loadIPL() {

    const iplGrid = document.getElementById("iplGrid");

    iplGrid.innerHTML = "";

    ipl.forEach(game => {

        iplGrid.innerHTML += `
            <div class="card">

                <img src="${game.img}" alt="${game.name}">

                <div class="info">
                    ${game.name}
                </div>

                <button onclick="selectShow('${game.name}')">
                    Book Now
                </button>

            </div>
        `;

    });

}

// ==============================
// Select Show
// ==============================

function selectShow(showName) {

    selectedShow = showName;

    document.getElementById("mainContent").style.display = "none";

    document.getElementById("seatPage").style.display = "block";

    loadSeats();

}

// ==============================
// Load Seats
// ==============================

function loadSeats() {

    const seatGrid = document.getElementById("seatGrid");

    seatGrid.innerHTML = "";

    selectedSeats = [];

    for (let i = 1; i <= 36; i++) {

        seatGrid.innerHTML += `
            <div class="seat"
                onclick="toggleSeat(this,'S${i}')">

                S${i}

            </div>
        `;

    }

}

// ==============================
// Select / Unselect Seat
// ==============================

function toggleSeat(element, seatNumber) {

    if (element.classList.contains("selected")) {

        element.classList.remove("selected");

        selectedSeats = selectedSeats.filter(
            seat => seat !== seatNumber
        );

    } else {

        element.classList.add("selected");

        selectedSeats.push(seatNumber);

    }

    console.log(selectedSeats);

}
// ==============================
// Go To Payment
// ==============================

function goToPayment() {

    if (selectedSeats.length === 0) {

        alert("Please select at least one seat.");
        return;

    }

    document.getElementById("seatPage").style.display = "none";
    document.getElementById("paymentPage").style.display = "block";

}

// ==============================
// Finish Booking
// ==============================

function finishBooking() {

    const paymentMethod = document.getElementById("paymentMethod").value;
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const cardName = document.getElementById("cardName").value.trim();
    const cardExpiry = document.getElementById("cardExpiry").value;
    const cardCvv = document.getElementById("cardCvv").value.trim();
    const paymentPass = document.getElementById("paymentPass").value;

    if (
        cardNumber === "" ||
        cardName === "" ||
        cardExpiry === "" ||
        cardCvv === "" ||
        paymentPass === ""
    ) {

        alert("Please fill all payment details.");
        return;

    }

    alert(
        "Booking Successful!\n\n" +
        "Show : " + selectedShow +
        "\nSeats : " + selectedSeats.join(", ") +
        "\nPayment : " + paymentMethod
    );

    // Clear payment fields
    document.getElementById("cardNumber").value = "";
    document.getElementById("cardName").value = "";
    document.getElementById("cardExpiry").value = "";
    document.getElementById("cardCvv").value = "";
    document.getElementById("paymentPass").value = "";

    selectedSeats = [];

    document.getElementById("paymentPage").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    showCategory("movies");

}

// ==============================
// Cancel Booking
// ==============================

function cancelBooking() {

    selectedSeats = [];

    document.getElementById("seatPage").style.display = "none";
    document.getElementById("paymentPage").style.display = "none";

    document.getElementById("mainContent").style.display = "block";

    showCategory("movies");

}

// ==============================
// Logout
// ==============================

function logout() {

    loggedIn = false;

    document.getElementById("mainContent").style.display = "none";
    document.getElementById("seatPage").style.display = "none";
    document.getElementById("paymentPage").style.display = "none";

    document.getElementById("loginForm").classList.add("active");
    document.getElementById("signupForm").classList.remove("active");

    document.getElementById("loginUser").value = "";
    document.getElementById("loginPass").value = "";

    alert("Logged Out Successfully.");

}

// ==============================
// Application Starts Here
// ==============================

window.onload = function () {

    // Load all cards
    loadMovies();
    loadMusic();
    loadIPL();

    // Show Login Form
    document.getElementById("loginForm").classList.add("active");
    document.getElementById("signupForm").classList.remove("active");

    // Hide Other Pages
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("seatPage").style.display = "none";
    document.getElementById("paymentPage").style.display = "none";

};