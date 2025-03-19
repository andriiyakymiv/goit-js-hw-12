import { createGalleryCardMarkup, createLightBox } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import iconError from './img/icon/icon-error.svg';

const refs = {
  searchForm: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
};

// Function to show loader
const showLoader = () => {
  refs.backdrop.classList.remove('is-hidden');
};

// Function to hide loader
const hideLoader = () => {
  refs.backdrop.classList.add('is-hidden');
};

// Retrieving data from the server to create a gallery

const onSearchFormSubmit = event => {
  event.preventDefault();

  const query = event.currentTarget.elements.search_text.value.trim();

  if (query === '') {
    alert('Enter text in the search field');
    return;
  }

  showLoader();

  fetchPhotosByQuery(query)
    .then(({ hits }) => {
      // We add a message that there is no such value
      if (hits.length === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          messageSize: '16px',
          messageColor: '#ffffff',
          timeout: 3000,
          pauseOnHover: true,
          backgroundColor: '#EF4040',
          iconUrl: iconError,
          layout: 2,
        });

        refs.searchForm.reset(); //clear form
        refs.gallery.innerHTML = ''; //cleaning the gallery
        return;
      }

      const galleryCardsTemplate = hits
        .map(img => createGalleryCardMarkup(img))
        .join('');
      refs.gallery.innerHTML = galleryCardsTemplate;
      createLightBox();
      refs.searchForm.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      hideLoader();
    });
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
