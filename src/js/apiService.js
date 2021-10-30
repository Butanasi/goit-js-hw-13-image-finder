import {alert, error, notice, defaultModules} from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';


const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '24073340-1ef2f625ad6fbbc63b84a3aaa'

export default class PhotoApiService{
    constructor() {
        this.searchQuery = '';
        this.numberPage = 1;
    }

    fetchPhoto() {
         const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.numberPage}&per_page=12&key=${API_KEY}`;
    return fetch(url)
        .then(response => response.json())
        .then(({hits}) => {
            this.incrementPage()
            
            return hits
    })
    }
    incrementPage() {
        this.numberPage += 1;
    }
    resetPage() {
        this.numberPage = 1
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}





