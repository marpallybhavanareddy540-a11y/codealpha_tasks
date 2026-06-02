/* =====================================
   LOADER
===================================== */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 1200);
});

/* =====================================
   DARK MODE + LOCAL STORAGE
===================================== */

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';
    }
});

/* =====================================
   FILTER IMAGES
===================================== */

const filterButtons =
document.querySelectorAll(".filter-btn");

const cards =
document.querySelectorAll(".card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
        button.getAttribute("data-filter");

        cards.forEach(card => {

            if (
                filter === "all" ||
                card.classList.contains(filter)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";
            }
        });
    });
});

/* =====================================
   SEARCH IMAGES
===================================== */

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const value =
    searchInput.value.toLowerCase();

    cards.forEach(card => {

        const title =
        card.querySelector("h3")
        .textContent
        .toLowerCase();

        if (title.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
});

/* =====================================
   LIGHTBOX
===================================== */

const galleryImages =
document.querySelectorAll(".card img");

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightboxImg");

const closeBtn =
document.getElementById("close");

const nextBtn =
document.getElementById("next");

const prevBtn =
document.getElementById("prev");

let currentIndex = 0;

galleryImages.forEach((img, index) => {

    img.addEventListener("click", () => {

        currentIndex = index;

        showImage();

        lightbox.style.display = "flex";
    });
});

function showImage() {

    lightboxImg.src =
    galleryImages[currentIndex].src;
}

closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";
});

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (
        currentIndex >= galleryImages.length
    ) {
        currentIndex = 0;
    }

    showImage();
});

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
        galleryImages.length - 1;
    }

    showImage();
});

/* =====================================
   KEYBOARD CONTROLS
===================================== */

document.addEventListener("keydown", e => {

    if (
        lightbox.style.display === "flex"
    ) {

        if (e.key === "ArrowRight") {

            nextBtn.click();
        }

        if (e.key === "ArrowLeft") {

            prevBtn.click();
        }

        if (e.key === "Escape") {

            lightbox.style.display = "none";
        }
    }
});

/* =====================================
   FAVORITES SYSTEM
===================================== */

const favoriteButtons =
document.querySelectorAll(".favorite");

const favoriteCount =
document.getElementById("favoriteCount");

let favorites =
JSON.parse(
    localStorage.getItem("favorites")
) || [];

updateFavoriteUI();

favoriteButtons.forEach((button, index) => {

    if (favorites.includes(index)) {

        button.classList.add("active");

        button.innerHTML =
            '<i class="fa-solid fa-heart"></i>';
    }

    button.addEventListener("click",
    (e) => {

        e.stopPropagation();

        if (
            favorites.includes(index)
        ) {

            favorites =
            favorites.filter(
                item => item !== index
            );

            button.classList.remove("active");

            button.innerHTML =
                '<i class="fa-regular fa-heart"></i>';

        } else {

            favorites.push(index);

            button.classList.add("active");

            button.innerHTML =
                '<i class="fa-solid fa-heart"></i>';
        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        updateFavoriteUI();
    });
});

function updateFavoriteUI() {

    favoriteCount.textContent =
    favorites.length;
}

/* =====================================
   DOWNLOAD IMAGE
===================================== */

const downloadButtons =
document.querySelectorAll(".download");

downloadButtons.forEach((button, index) => {

    button.addEventListener("click",
    (e) => {

        e.stopPropagation();

        const image =
        galleryImages[index].src;

        const link =
        document.createElement("a");

        link.href = image;

        link.download =
        `gallery-image-${index + 1}.jpg`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    });
});

/* =====================================
   AUTO SLIDESHOW
===================================== */

const slideshowBtn =
document.getElementById("slideshowBtn");

let slideshowRunning = false;

let slideshowInterval;

slideshowBtn.addEventListener("click",
() => {

    if (!slideshowRunning) {

        slideshowRunning = true;

        slideshowBtn.textContent =
        "Stop Slideshow";

        currentIndex = 0;

        showImage();

        lightbox.style.display = "flex";

        slideshowInterval =
        setInterval(() => {

            currentIndex++;

            if (
                currentIndex >=
                galleryImages.length
            ) {

                currentIndex = 0;
            }

            showImage();

        }, 2500);

    } else {

        slideshowRunning = false;

        slideshowBtn.textContent =
        "Start Slideshow";

        clearInterval(
            slideshowInterval
        );

        lightbox.style.display =
        "none";
    }
});

/* =====================================
   BACK TO TOP BUTTON
===================================== */

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll",
() => {

    if (
        document.documentElement
        .scrollTop > 300
    ) {

        topBtn.style.display =
        "block";

    } else {

        topBtn.style.display =
        "none";
    }
});

topBtn.addEventListener("click",
() => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"
    });
});

/* =====================================
   IMAGE COUNTER
===================================== */

const totalImages =
document.getElementById("totalImages");

totalImages.textContent =
galleryImages.length;

/* =====================================
   CLOSE LIGHTBOX ON OUTSIDE CLICK
===================================== */

lightbox.addEventListener("click",
(e) => {

    if (e.target === lightbox) {

        lightbox.style.display =
        "none";
    }
});

/* =====================================
   CARD ANIMATION ON SCROLL
===================================== */

const observer =
new IntersectionObserver(
(entries) => {

    entries.forEach(entry => {

        if (
            entry.isIntersecting
        ) {

            entry.target.style.opacity = 1;

            entry.target.style.transform =
            "translateY(0)";
        }
    });
},
{
    threshold: 0.1
}
);

cards.forEach(card => {

    card.style.opacity = 0;

    card.style.transform =
    "translateY(40px)";

    card.style.transition =
    "0.6s ease";

    observer.observe(card);
});

/* =====================================
   CONSOLE MESSAGE
===================================== */

console.log(
"%cTravel Photography Gallery Loaded Successfully!",
"color:#6c63ff;font-size:16px;font-weight:bold;"
);