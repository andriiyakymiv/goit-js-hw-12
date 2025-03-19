import SimpleLightbox from 'simplelightbox';

export const createGalleryMarkup = function ({
  webformatURL: smallImg,
  largeImageURL: largeImg,
  tags: alt,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="gallery-item">
    <a class="gallery-link" href="${largeImg}">
      <img class="gallery-image" src="${smallImg}" alt="${alt}" />
    </a>
    <ul class = "description-list">
        <li class="description"><span>Likes</span> ${likes}</li>
        <li class="description"><span>Views</span> ${views}</li>
        <li class="description"><span>Comments</span> ${comments}</li>
        <li class="description"><span>Downloads</span> ${downloads}</li>
        </ul>
  </li>`;
};

export const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
});
