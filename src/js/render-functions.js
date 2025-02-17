import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const galleryHTML = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class="gallery-item">
          <a href="${largeImageURL}" class="gallery-link">
            <img src="${webformatURL}" alt="${tags}" class="gallery-image">
          </a>
          <div class="image-info">
            <div class="info-item">
              <p class="info-title">Likes</p>
              <p class="info-value">${likes}</p>
            </div>
            <div class="info-item">
              <p class="info-title">Views</p>
              <p class="info-value">${views}</p>
            </div>
            <div class="info-item">
              <p class="info-title">Comments</p>
              <p class="info-value">${comments}</p>
            </div>
            <div class="info-item">
              <p class="info-title">Downloads</p>
              <p class="info-value">${downloads}</p>
            </div>
          </div>
        </div>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryHTML); 

 
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}