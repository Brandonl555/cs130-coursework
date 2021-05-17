/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */

const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
            <li class="card">
                <div class="image" 
                    style="background-image:url('${image}')"
                    data-index="${idx}"></div>
            </li>`;
    });
};

initScreen();

//Part I, image event handler
const showImageEventHandler = (ev) => {
    const elem = ev.currentTarget;
    const dest = document.querySelector('.featured_image');
    dest.style.backgroundImage = elem.style.backgroundImage;
}

const imageElements = document.querySelectorAll('.image');

for (const elem of imageElements) {
    elem.onclick = showImageEventHandler;
}


//Part II, next and prev event handlers
let currImageIndex = 0;

const showImageGivenIndex = (ev) => {
    const elem = ev.currentTarget;
    currImageIndex = parseInt(elem.dataset.index);
    renderImageWithIndex(currImageIndex);
}
const showNextImage = (ev) => {
    //wrap around if get to end
    if (currImageIndex == imageElements.length - 1){
        currImageIndex = 0;
    }else{
        currImageIndex += 1;
    }
    
    renderImageWithIndex(currImageIndex);
}

const showPrevImage = (ev) => {
    //wrap around if get to beginning
    if (currImageIndex == 0) {
        currImageIndex = imageElements.length - 1;
    }else {
        currImageIndex -= 1;
    }

    renderImageWithIndex(currImageIndex);
}

const renderImageWithIndex = (index) => {
    currImage = imageElements[index]
    const dest = document.querySelector('.featured_image');
    dest.style.backgroundImage = currImage.style.backgroundImage;
}

const imageElements_ = document.querySelectorAll('.image');
for (const elem of imageElements_) {
    elem.onclick = showImageGivenIndex;
}

document.querySelector('.next').onclick = showNextImage;
document.querySelector('.prev').onclick = showPrevImage;
document.querySelector('.featured_image').onclick = showNextImage;