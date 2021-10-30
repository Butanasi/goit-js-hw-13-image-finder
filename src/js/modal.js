const ulEl = document.querySelector('.js-gallery')
const openBth = document.querySelector('.js-lightbox')
const closeBth = document.querySelector('.lightbox__button')
const backDrop = document.querySelector('.lightbox__overlay')
const modalImage = document.querySelector('.lightbox__image')




ulEl.addEventListener('click', onOpenModal)
closeBth.addEventListener('click', onCloseModal)
backDrop.addEventListener('click', onCloseModalBackdrop)





function onOpenModal(evt) {
    evt.preventDefault()
    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    openBth.classList.add('is-open')
    window.addEventListener('keydown', onCloseModalEsc)

    modalImage.src = `${evt.target.dataset.source}`;
    modalImage.alt = `${evt.target.alt}`

}
function onCloseModal() {
    window.removeEventListener('keydown', onCloseModalEsc)
    openBth.classList.remove('is-open')
    modalImage.src = ''
    modalImage.alt = ''
}
function onCloseModalBackdrop(evt) {
    if (evt.currentTarget === evt.target) {
        onCloseModal();
    }

}
function onCloseModalEsc(evt) {
    if (evt.code === 'Escape') {
        onCloseModal();
    }
}