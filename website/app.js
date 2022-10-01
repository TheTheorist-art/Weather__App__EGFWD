/** 
 * Handling the typing animation in a little OOP snippet
*/ 
const title__animation = {
    index: 0, 
    typing__spead: 45,
    heading__text: 'Weather Journal...',
    type__writer: () => {
    if (title__animation.index < title__animation.heading__text.length) {
        document.getElementById("form__title").innerHTML += title__animation.heading__text.charAt(title__animation.index);
        title__animation.index++;
        setTimeout(title__animation.type__writer, title__animation.typing__spead);
}
    }
}
window.addEventListener('load', title__animation.type__writer);