/* ==========================================
   SLEEP MATTERS WEBSITE
========================================== */

// Create animated stars

const stars = document.querySelector(".stars");

for (let i = 0; i < 180; i++) {

    const star = document.createElement("div");

    star.classList.add("star");

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    const size = Math.random() * 3 + 1;

    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.animationDuration =
        Math.random() * 4 + 2 + "s";

    star.style.animationDelay =
        Math.random() * 5 + "s";

    stars.appendChild(star);

}

/* ==========================================
   Scroll Fade Animation
========================================== */

const fadeItems = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

fadeItems.forEach(item => {

    observer.observe(item);

});

/* ==========================================
   Navbar Background
========================================== */

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        nav.style.background =
            "rgba(7,20,44,.95)";

        nav.style.padding =
            "16px 9%";

        nav.style.boxShadow =
            "0 15px 35px rgba(0,0,0,.35)";

    }

    else {

        nav.style.background =
            "rgba(7,20,44,.65)";

        nav.style.padding =
            "22px 9%";

        nav.style.boxShadow =
            "none";

    }

});

/* ==========================================
   Active Navigation
========================================== */

const sections =
document.querySelectorAll("section");

const links =
document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top =
        section.offsetTop - 140;

        if (scrollY >= top) {

            current = section.getAttribute("id");

        }

    });

    links.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ==========================================
   Smooth Button Click
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target =
        document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/* ==========================================
   Floating Moon
========================================== */

const moon =
document.querySelector(".moon");

let angle = 0;

function animateMoon(){

    angle += 0.01;

    moon.style.transform =

    `translateY(${Math.sin(angle) * 8}px)`;

    requestAnimationFrame(animateMoon);

}

animateMoon();

/* ==========================================
   Card Hover Tilt
========================================== */

const cards =
document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        const rotateX =
        (y - rect.height / 2) / 18;

        const rotateY =
        (rect.width / 2 - x) / 18;

        card.style.transform =

        `perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =

        "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";

    });

});

/* ==========================================
   Hero Image Float
========================================== */

const heroImage =
document.querySelector(".hero-image img");

window.addEventListener("mousemove", e => {

    const x =
    (window.innerWidth / 2 - e.clientX) / 60;

    const y =
    (window.innerHeight / 2 - e.clientY) / 60;

    heroImage.style.transform =

    `translate(${x}px, ${y}px)`;

});

/* ==========================================
   Scroll Progress Bar
========================================== */

const progress =
document.createElement("div");

progress.style.position = "fixed";
progress.style.top = "0";
progress.style.left = "0";
progress.style.height = "4px";
progress.style.width = "0";
progress.style.zIndex = "9999";
progress.style.background =
"linear-gradient(90deg,#5ac8ff,#7c5cff)";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const scroll =

    window.scrollY;

    const height =

    document.documentElement.scrollHeight -
    window.innerHeight;

    progress.style.width =
    (scroll / height) * 100 + "%";

});

/* ==========================================
   End
========================================== */
