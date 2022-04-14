function debounce(func, wait = 10, immediate = true) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
 
const images = document.querySelectorAll('.slide-in');

function checkSlide(e) {
    images.forEach((image) => {

        const slideAt = (window.scrollY+window.innerHeight)-image.height/2
        const imgBtm = image.offsetTop + image.height;
        const halfShown = slideAt > image.offsetTop;
        const notScroll = window.scrollY < imgBtm;
        
        console.groupCollapsed(`${image.src}`)
        console.log("window scroll Y:     "+window.scrollY)
        console.log("window inner Height: "+window.innerHeight)
        console.log("slide at:            "+slideAt)
        console.log("image offset top:    "+image.offsetTop)
        console.log("image height:        "+image.height)
        console.log("image bottom:        "+imgBtm)
        console.groupEnd()

        if (halfShown && notScroll) {
            image.classList.add('active');
        } else {
            image.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide));
