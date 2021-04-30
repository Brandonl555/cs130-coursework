const makeBigger = () => {
    var el = document.querySelector(".content");
    el.style.fontSize = "large";
    alert('make bigger!');
};

const makeSmaller = () => {
    var el = document.querySelector(".content");
    el.style.fontSize = "small";
    alert('make smaller!');
};


document.querySelector(".a1").onclick = makeBigger;
document.querySelector(".a2").onclick = makeSmaller;
