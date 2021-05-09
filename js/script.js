// Page Loader
window.addEventListener("load", () => {
  document.querySelector(".page-loader").classList.add("slide-out-right");
 
  setTimeout(() => {
    document.querySelector(".page-loader").style.display = "none";
  }, 5000);
})

// BG Animation Effect
function bgAnimation() {
  const rows = 7,
    cols = 10;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const div = document.createElement("div");
      div.className = `col-${j + 1}`;
      const parent = document
        .querySelector(".bg-animation-effect")
        .appendChild(div);
    }
  }
}
bgAnimation();

// Toggle Body Scrolling
function hideBodyScrolling() {
  document.body.classList.toggle("hide-scrolling");
}

// Navigation Toggle function
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNav);

function toggleNav() {
  navToggler.classList.toggle("active");
  document.querySelector(".nav").classList.toggle("open");
  overlayEffect();
  hideBodyScrolling();
}

// Hide and Show Section
document.addEventListener("click", (e) => {
  if(e.target.classList.contains("link-item") && (e.target.hash !== "")) {
    const hash = e.target.hash;

    if(e.target.classList.contains("nav-item")) {
      activeSection(hash);
      toggleNav();
    }

    else {
      hideBodyScrolling();
      overlayEffect();
      document.querySelector(".nav-toggler").classList.add("toggle-hide");

      setTimeout(() => {
        activeSection(hash);
        overlayEffect();
        hideBodyScrolling();
        document.querySelector(".nav-toggler").classList.remove("toggle-hide");
      }, 950)
    }
  }
});

function activeSection(sectionID) {
  document.querySelector("section.active").classList.remove("active");
  document.querySelector(sectionID).classList.add("active");
  window.scrollTo(0,0);
}

// Toggle Overlay Effect
function overlayEffect() {
  document.querySelector(".overlay-effect").classList.toggle("active");
}

// Filter Portfolio Items
const filterBtnsContainer = document.querySelector(".portfolio-filter");
let portfolioItems;
filterBtnsContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("portfolio-filter-btn") &&
    !e.target.classList.contains("active")
  ) {
    filterBtnsContainer.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    hideBodyScrolling();
    document.querySelector(".filter-status").classList.add("active");
    document.querySelector(
      ".filter-status p"
    ).innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;
    setTimeout(() => {
      filterItems(e.target);
    }, 400);

    setTimeout(() => {
      document.querySelector(".filter-status").classList.remove("active");
      hideBodyScrolling();
    }, 800);
  }
});

function filterItems(filterBtn) {
  const selectCategory = filterBtn.getAttribute("data-filter");
  const categoryList = document.querySelectorAll(".portfolio-item");
  categoryList.forEach((elem) => {
    const category = elem.getAttribute("data-category").split(",");
    if (category.indexOf(selectCategory) !== -1 || selectCategory === "all") {
      elem.classList.add("show");
    } else {
      elem.classList.remove("show");
    }
  });
  portfolioItems = document.querySelectorAll(".portfolio-item.show");
  // console.log(portfolioItems);
}
filterItems(document.querySelector(".portfolio-filter-btn.active"));

// Portfolio Item Details PopUp
let portfolioItemsIndex;
document.addEventListener("click", (e) => {
  if (e.target.closest(".portfolio-item")) {
    const currentItem = e.target.closest(".portfolio-item");
    portfolioItemsIndex = Array.from(portfolioItems).indexOf(currentItem);
    // console.log(portfolioItemsIndex);
    togglePopUp();
    portfolioItemDetails();
    updatePrevNextItems();
  }
});

function togglePopUp() {
  document.querySelector(".portfolio-popup-section").classList.toggle("open");
  hideBodyScrolling();
}

document.querySelector(".pp-close-btn").addEventListener("click", togglePopUp);

function portfolioItemDetails() {
  document.querySelector(".pp-thumbnail img").src = portfolioItems[
    portfolioItemsIndex
  ].querySelector("img").src;

  document.querySelector(".pp-header h3").innerHTML = portfolioItems[
    portfolioItemsIndex
  ].querySelector(".portfolio-item-title").innerHTML;

  document.querySelector(".pp-body").innerHTML = portfolioItems[
    portfolioItemsIndex
  ].querySelector(".portfolio-item-details").innerHTML;

  document.querySelector(".pp-counter").innerHTML = `${
    portfolioItemsIndex + 1
  } of ${portfolioItems.length} (<span>${
    document.querySelector(".portfolio-filter-btn.active").innerHTML
  }</span>)`;
}

function updatePrevNextItems() {
  if (portfolioItemsIndex !== 0) {
    document.querySelector(".pp-footer-left").classList.remove("hidden");

    document.querySelector(".pp-footer-left h3").innerHTML = portfolioItems[
      portfolioItemsIndex - 1
    ].querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-footer-left img").src = portfolioItems[
      portfolioItemsIndex - 1
    ].querySelector("img").src;
  } else {
    document.querySelector(".pp-footer-left").classList.add("hidden");
  }

  if (portfolioItemsIndex !== portfolioItems.length - 1) {
    document.querySelector(".pp-footer-right").classList.remove("hidden");

    document.querySelector(".pp-footer-right h3").innerHTML = portfolioItems[
      portfolioItemsIndex + 1
    ].querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-footer-right img").src = portfolioItems[
      portfolioItemsIndex + 1
    ].querySelector("img").src;
  } else {
    document.querySelector(".pp-footer-right").classList.add("hidden");
  }
}

document.querySelector(".btn-prev-btn").addEventListener("click", () => {
    changePortfolioItemDetails("prev");
});

document.querySelector(".btn-next-btn").addEventListener("click", () => {
    changePortfolioItemDetails("next");
});

function changePortfolioItemDetails(direction) {
    // console.log(direction);
    if(direction == "prev") {
        portfolioItemsIndex--;
    }
    else {
        portfolioItemsIndex++;
    }
    document.querySelector(".pp-overlay").classList.add(direction);

    setTimeout(() => {
        document.querySelector(".pp-inner").scrollTo(0,0);
        portfolioItemDetails();
        updatePrevNextItems()
    }, 400);
    setTimeout(() => {
        document.querySelector(".pp-overlay").classList.remove(direction);
    }, 1000);
}

// Toggle Contact Form

document.addEventListener("click",(e) => {
  if(e.target.classList.contains("toggle-contact-form-btn")) {
    document.querySelector(".contact-form").classList.toggle("open");
    hideBodyScrolling();
  }
});