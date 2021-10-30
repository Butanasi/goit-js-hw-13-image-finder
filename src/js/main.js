import renderCard from "../templey/markup-card.hbs"
import PhotoApiService from "./apiService.js";
import {alert, error, notice, defaultModules} from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    ulEl: document.querySelector('.gallery'),
    formEl: document.querySelector('#search-form'),
    divEl: document.querySelector('.container'),
}

const photoApiService= new PhotoApiService();

refs.formEl.addEventListener('submit', onSearch)


function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
    photoApiService.query = e.currentTarget.elements.query.value
    if (photoApiService.query === '') {
        const myNotice = notice({
            title: 'Please enter name',
            delay: 2000,
        })
        return
    }
    photoApiService.resetPage()
    photoApiService.fetchPhoto().then(hits => {
        clearPage()
        if (hits.length === 0) {
            alert({
                type: 'error',
                title: 'ERROR',
                delay: 2000,
            })
        }
        renderCardMarkup(hits)
    })
        .finally(() => form.reset())
    
        
}
function renderCardMarkup(hits) {
    refs.ulEl.insertAdjacentHTML('beforeend', renderCard(hits))
}
    
// function onSearch(e) {
//     e.preventDefault();
    
//     apiService.query = e.currentTarget.elements.query.value;
    
//     if (apiService.query === '') {
//         const myNotice = notice({
//             title: 'Please enter a valid name'
//         })
//         return
//     } 
//     apiService.resetPage()
//     apiService.fetchPhoto()
//         .then(photo => {
//             clearPage()
//             renderGalleryCard(photo)
//             apiService.incrementPage()
//         })
// }
function clearPage() {
    refs.ulEl.innerHTML = '';
}


        

const onEntry = entries => {
    
    entries.forEach(entry => {
        if (entry.isIntersecting && photoApiService.query !== '') {
            photoApiService.fetchPhoto().then(renderCardMarkup)
        }
    });
}
const options = {
    rootMargin: '200px'
}


const observer = new IntersectionObserver(onEntry, options)

observer.observe(refs.divEl)


    







