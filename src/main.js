import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

const form = document.querySelector('#search-form');
const loader = document.querySelector('#loader');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('#load-more');

let currentPage = 1; 
let currentQuery = ''; 
let totalHits = 0;


loadMoreButton.style.display = 'none';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.target.elements.query.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!', position: 'topRight' });
    return;
  }


  currentPage = 1;
  currentQuery = query;
  gallery.innerHTML = '';
  loadMoreButton.style.display = 'none'; 
  await loadImages(query, currentPage);
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1; 
  await loadImages(currentQuery, currentPage);
});

async function loadImages(query, page) {
  loader.style.display = 'block'; 

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits; 

    if (data.hits.length === 0) {
      if (page === 1) {
        iziToast.warning({ title: 'No Results', message: 'Sorry, no images found. Try again!', position: 'topRight' });
      } else {
        iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results.", position: 'topRight' });
        loadMoreButton.style.display = 'none'; 
      }
    } else {
      renderGallery(data.hits);


      if (page * 40 < totalHits) {
        loadMoreButton.style.display = 'block';
      } else {
        loadMoreButton.style.display = 'none';
        iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results.", position: 'topRight' });
      }


      if (page > 1) {
        const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
      }
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images. Try again later.', position: 'topRight' });
  } finally {
    loader.style.display = 'none'; 
  }
}