const defaultTheme = () => {
    var currHeader = document.querySelector("header");
    var el = document.querySelector(".content");
    el.style.cssText = document.querySelector(".content");
    currHeader.style.cssText = document.querySelector("header");
    alert('switch to default theme');
};

const oceanTheme = () => {
    var currHeader = document.querySelector("header");
    currHeader.style.background = "#434a6c";
    currHeader.style.fontFamily = "'Amatic SC', cursive";
    currHeader.style.fontSize = "1.8em";
    var el = document.querySelector(".content");
    el.style.background = "#99cccc";
    alert('switch to ocean theme');
};

const desertTheme = () => {
    var currHeader = document.querySelector("header");
    currHeader.style.background = "#A8651E";
    currHeader.style.fontFamily = "'Dokdo', cursive";
    var el = document.querySelector(".content");
    el.style.background = "#EFDEC2";
    alert('switch to desert theme');
};


document.querySelector("#default").onclick = defaultTheme;
document.querySelector("#ocean").onclick = oceanTheme;
document.querySelector("#desert").onclick = desertTheme;
