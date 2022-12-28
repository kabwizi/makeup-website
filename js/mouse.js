//Customisé la souris
let mouseFollowers = $("#mouse-follower")[0];
let mouseFollowersDescription = $("#mouse-follower-description")[0];

$(document).on("mousemove", getMousePosition);
function getMousePosition(e) {
  anime({
    targets: mouseFollowers,
    left: e.clientX - 50,
    top: e.clientY - 50,
    duration: 400,
  });
  anime({
    targets: mouseFollowersDescription,
    left: e.clientX - 10,
    top: e.clientY - 10,
    easing: "linear",
    duration: 0,
  });
}

//Couler de la souris customisé selon les actions
$("a").mouseenter(function () {
  anime({
    targets: mouseFollowers,
    background: "#681010",
    opacity: 0.7,
    scale: 1.5,
    mixBlendMode: "multiply",
  });
});
$("a").mouseleave(function () {
  anime({
    targets: mouseFollowers,
    background: "#681010",
    opacity: 0.3,
    scale: 1,
    mixBlendMode: "hue",
  });
});

$(document).click(function () {
  anime({
    targets: mouseFollowersDescription,
    scale: 4,
    duration: 100,
    direction: "alternate",
    easing: "cubicBezier(0.420, 0.000, 1.000, 1.000)",
  });
});
