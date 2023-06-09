//=================Loader text circle=======================
//Placer le text du logo en rond
new CircleType(document.getElementById("circle-cirlce-text"));

//====================Animation d'entré=======================
//Àpres 3 secondes animer l'entré vers le Home screen
setTimeout(() => {
  //scroller vers le bas de l'écran (soit le Home screen)
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: "smooth",
  });

  //animer les apparution des éléments
  let circleTextTimeLine = anime.timeline({});
  circleTextTimeLine
    .add({
      targets: ".slider-item",
      scaleY: [0, 1],
      delay: 200,
      easing: "linear",
      duration: 300,
    })
    .add({
      targets: ".social-media",
      opacity: 1,
      translateX: ["10px", "0px"],
      delay: anime.stagger(200),
    })
    .add({
      targets: "#menu-toggle",
      opacity: 1,
      translateX: "-10px",
      delay: anime.stagger(200),
    });
  anime({
    targets: ["#slider-navigation-previous", "#slider-navigation-next"],
    opacity: 1,
    delay: 1000,
    duration: 5000,
  });
}, 7000);

//faire apparaitre le logo et l'animer
anime({
  targets: "#loader-circle-wrapper",
  scale: [0, 1],
  opacity: [0, 1],
  easing: "linear",
  duration: 500,
});
anime({
  targets: "#circle-cirlce-text",
  rotate: "360deg",
  loop: true,
  easing: "linear",
  duration: 8000,
});

//faire bouger les texts de bout en bout de l'écran
anime({
  targets: [".moving-text-one", ".moving-text-three"],
  translateX: ["-1900px", $(document).width() + 600 + "px"],
  loop: true,
  easing: "linear",
  duration: 12000,
});
anime({
  targets: [".moving-text-two", ".moving-text-four"],
  translateX: ["1900px", "-" + ($(document).width() + 600) + "px"],
  loop: true,
  easing: "linear",
  duration: 12000,
});

//======================Slider======================
let documentWith = widthToAdd();
const sliderIndex = [
  "slider-item-1",
  "slider-item-2",
  "slider-item-3",
  "slider-item-4",
  "slider-item-5",
  "slider-item-6",
  "slider-item-7",
  "slider-item-8",
  "slider-item-9",
  "slider-item-10",
];
let sliderCurrentIndex = 1;

$(window).on("resize", (e) => {
  documentWith = widthToAdd();

  sliderCurrentIndex = 1;
  sliderIndex.forEach((elem) => {
    $(`.${elem}`).removeClass("slider-active");
  });

  $(`.${sliderIndex[1]}`).addClass("slider-active");

  document.getElementsByClassName("slider-wrapper")[0].scrollBy({
    top: 0,
    left: -10000,
    behavior: "smooth",
  });
});

function widthToAdd() {
  if (window.matchMedia("(max-width: 1000px)").matches) {
    return $(document).width();
  } else {
    return $(document).width() / 2;
  }
}

//Si on clique sur l'icon PREVIOUS afficher l'image précédente
$("#slider-navigation-previous").click(function () {
  toggleActiveSliderImg("PREVIOUS");
});
//Si on clique sur l'icon NEXT afficher laprochaine image
$("#slider-navigation-next").click(function () {
  toggleActiveSliderImg("NEXT");
});

let isAnimating = false;
//Déterminer la slide active
//(soit quelle image est actuellement actif dans la slide)
function toggleActiveSliderImg(action) {
  if (!isAnimating) {
    isAnimating = true;
    if (action === "NEXT" && sliderCurrentIndex < 9) {
      //bouger le scrollbar vers la droite
      document.getElementsByClassName("slider-wrapper")[0].scrollBy({
        top: 0,
        left: documentWith,
        behavior: "smooth",
      });
      $(`.${sliderIndex[sliderCurrentIndex]}`).toggleClass("slider-active");
      sliderCurrentIndex = sliderCurrentIndex + 1;
      $(`.${sliderIndex[sliderCurrentIndex]}`).toggleClass("slider-active");
    } else if (action === "PREVIOUS" && sliderCurrentIndex > 1) {
      //bouger le scrollbar vers la gauche
      document.getElementsByClassName("slider-wrapper")[0].scrollBy({
        top: 0,
        left: -documentWith,
        behavior: "smooth",
      });
      $(`.${sliderIndex[sliderCurrentIndex]}`).toggleClass("slider-active");
      sliderCurrentIndex = sliderCurrentIndex - 1;
      $(`.${sliderIndex[sliderCurrentIndex]}`).toggleClass("slider-active");
    }
    setTimeout(() => {
      isAnimating = false;
    }, 1000);
  }
}

//Afficher la description et agrandir l'image de la slide
//lorsque la souris est dessus
$(".slider-item, .image-galery-item")
  .on("mouseenter", function () {
    $(this).css({ opacity: 1, transform: "scale(1.05)" });
    $(this).find(".slider-item-description").css({ opacity: 1 });
    anime({
      targets: "#loader-circle-wrapper",
      scale: 0.7,
      opacity: 0.5,
      easing: "linear",
      duration: 500,
    });
  })
  .on("mouseleave", function () {
    $(this).css({ opacity: 1, transform: "scale(1)" });
    $(this).find(".slider-item-description").css({ opacity: 0 });
    anime({
      targets: "#loader-circle-wrapper",
      scale: 1,
      opacity: 1,
      easing: "linear",
      duration: 500,
    });
  });

//===================Toggle menu animation=================
$("#menu-toggle").click(function () {
  //Si le menu est ouvert, le fermer avec une animation
  //puis enlever la class opne-menu et le remplacer
  //par close menu
  if ($("#menu-toggle").hasClass("open-menu")) {
    toggleMenuDivAnimation("close-menu");
    let tl = anime.timeline({ easing: "linear", duration: 500 });
    tl.add({
      targets: ".menu-item",
      opacity: 0,
      translateY: "20px",
    });
    tl.add({
      targets: ".menu-container-left-side",
      width: "0%",
      transformOrigin: 0,
      complete: function () {
        $("#menu-container").hide();
      },
    });
    //changer les couleur du humbergur menu
    anime({
      targets: [
        ".menu-toggle-animated-div-one",
        ".menu-toggle-animated-div-two",
        ".menu-toggle-animated-div-three",
      ],
      backgroundColor: "#fff",
    });
    anime({
      targets: ["#menu-toggle"],
      border: "2px solid #fff",
    });
    $("#menu-toggle").toggleClass("open-menu");
  } else {
    //si l'écrant a une largeur inférieur à 700px
    //que le menu couvre tout l'écran
    let menuWidth = window.matchMedia("(max-width: 700px)").matches
      ? "100%"
      : "50%";

    //Ouvrir le menu avec une animation
    //enlever la class close menu et le remplacer
    //par opne-menu
    toggleMenuDivAnimation("open-menu");
    $("#menu-container").css({ display: "flex" });
    let tl = anime.timeline({
      duration: 1000,
      easing: "cubicBezier(.5, .05, .1, .3)",
    });
    tl.add({
      targets: ".menu-container-left-side",
      width: menuWidth,
      transformOrigin: 0,
    });
    tl.add({
      targets: ".menu-item",
      opacity: [0, 1],
      translateY: ["40px", "0px"],
      delay: anime.stagger(100),
    });

    //changer les couleur du humbergur menu
    if (window.matchMedia("(max-width: 700px)").matches) {
      anime({
        targets: [
          ".menu-toggle-animated-div-one",
          ".menu-toggle-animated-div-two",
          ".menu-toggle-animated-div-three",
        ],
        backgroundColor: "#000",
      });
      anime({
        targets: ["#menu-toggle"],
        border: "2px solid #000",
      });
    }

    $("#menu-toggle").toggleClass("open-menu");
  }
});

function toggleMenuDivAnimation(action) {
  if (action === "open-menu") {
    anime({
      targets: ".menu-toggle-animated-div-two",
      opacity: 0,
    });
    anime({
      targets: ".menu-toggle-animated-div-one",
      rotate: "45deg",
      translateY: "3px",
      translateX: "4px",
    });
    anime({
      targets: ".menu-toggle-animated-div-three",
      rotate: "-45deg",
      translateY: "-3px",
      translateX: "4px",
    });
  } else {
    anime({
      targets: ".menu-toggle-animated-div-two",
      opacity: 1,
    });
    anime({
      targets: [
        ".menu-toggle-animated-div-one",
        "menu-toggle-animated-div-three",
      ],
      rotate: "0deg",
      translateY: "0px",
      translateX: "0px",
    });
    anime({
      targets: ".menu-toggle-animated-div-three",
      rotate: "0deg",
      translateY: "0px",
      translateX: "0px",
    });
  }
}

//Afficher l'image se trouvant dans l'attribut [dataset-img-review]
//lorsque la souris est sur le lien correspondant et faire
//l'inverse lorsque la souris ne l'est plus
$(".menu-item a")
  .on("mouseenter", function () {
    if (!window.matchMedia("(max-width: 700px)").matches) {
      anime({
        targets: ".menu-container-right-side",
        width: "50%",
        duration: 200,
        easing: "linear",
      });
      $(".menu-container-right-side").css({
        backgroundImage: `url(/img/${this.dataset.imgPreview})`,
      });
    }
  })
  .on("mouseleave", function () {
    if (!window.matchMedia("(max-width: 700px)").matches) {
      anime({
        targets: ".menu-container-right-side",
        width: "0%",
        easing: "linear",
        duration: 200,
      });
    }
  });

//==========================grid image==================================
$(".slider-item").click(() => {
  $(".image-galery").css({ display: "grid" });

  //afficher la description de l'image lorsque la souris est sur l'image
  $(".image-galery-item-wrapper").each((i, elem) => {
    elem.addEventListener("mouseenter", setPictureDescription);
    elem.addEventListener("mouseleave", removePictureDescription);
  });

  function setPictureDescription(e) {
    $("#mouse-follower-description").html(e.target.dataset.imgDescription);
    anime({
      targets: "#mouse-follower-description",
      scale: 8.5,
      background: "#ffffff",
      opacity: 1,
      duration: 2,
      easing: "spring(1, 500, 10, 0)",
    });
    anime({
      targets: "#mouse-follower",
      opacity: 0,
      duration: 0.5,
      easing: "spring(1, 80, 10, 0)",
    });
  }
  function removePictureDescription(e) {
    $("#mouse-follower-description").html("");
    anime({
      targets: "#mouse-follower-description",
      background: "#681010",
      opacity: 0.7,
      scale: 1,
      duration: 0.8,
      easing: "spring(1, 80, 10, 0)",
    });
    anime({
      targets: "#mouse-follower",
      background: "#681010",
      opacity: 0.3,
      scale: 1,
      duration: 0.5,
      easing: "spring(1, 80, 10, 0)",
    });
  }

  //scroller vers le bas de l'écran (soit le Home screen)
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: "smooth",
  });
});

$("#galery-back-button").click(() => {
  window.scrollBy({
    top: -window.innerHeight,
    left: 0,
    behavior: "smooth",
  });
  setTimeout(() => {
    $(".image-galery").css({ display: "none" });
  }, 600);
});
