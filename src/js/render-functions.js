import SimpleLightbox from 'simplelightbox';
export const createGalleryCardMarkup = ({
  webformatURL: linkSmallImg,
  largeImageURL: linkLargeImg,
  tags: descriptionImg,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
    <li class="gallery-items">
        <a class="gallery-link" href="${linkLargeImg}">
        <img class="gallery-images" src="${linkSmallImg}" alt="${descriptionImg}">
        <ul class="gallery-info">
          <li class="gallery-info-item">
            <p class="gallery-info-title">Likes</p>
            <p class="gallery-info-value">${likes}</p>
          </li>
          <li class="gallery-info-item">
            <p class="gallery-info-title">Views</p>
            <p class="gallery-info-value">${views}</p>
          </li>
          <li class="gallery-info-item">
            <p class="gallery-info-title">Comments</p>
            <p class="gallery-info-value">${comments}</p>
          </li>
          <li class="gallery-info-item">
            <p class="gallery-info-title">Downloads</p>
            <p class="gallery-info-value">${downloads}</p>
          </li>
        </ul>
      </li>
    `;
};

export const createLightBox = function () {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionsData: 'alt',
  });
  lightbox.refresh();
};
