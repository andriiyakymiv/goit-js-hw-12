import { createGalleryCardMarkup, createLightBox } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import iconError from './img/icon/icon-error.svg';

const refs = {
  searchForm: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
  loadMoreBtn: document.querySelector('.js-load-more-btn'),
};

let page = 1;
let query = '';

// Function to show loader
const showLoader = () => {
  refs.backdrop.classList.remove('is-hidden');
};

// Function to hide loader
const hideLoader = () => {
  refs.backdrop.classList.add('is-hidden');
};

// Retrieving data from the server to create a gallery

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    query = event.currentTarget.elements.search_text.value.trim();

    if (query === '') {
      alert('Enter text in the search field');
      return;
    }

    page = 1;

    const { data } = await fetchPhotosByQuery(query, page);

    console.log(data);

    if (data.hits.length === 0) {
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

      refs.loadMoreBtn.classList.add('is-hidden'); // приховуємо кнопку

      return;
    }

    const galleryCardsTemplate = data.hits
      .map(img => createGalleryCardMarkup(img))
      .join('');

    refs.gallery.innerHTML = galleryCardsTemplate;

    const totalPages = Math.ceil(data.totalHits / 15);
    console.log(totalPages);

    if (totalPages > 1) {
      refs.loadMoreBtn.classList.remove('is-hidden');
      refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
      return;
    }

    refs.loadMoreBtn.classList.add('is-hidden');

    createLightBox();

    refs.searchForm.reset();

    // showLoader();
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    page++;

    const { data } = await fetchPhotosByQuery(query, page);

    const galleryCardsTemplate = data.hits
      .map(img => createGalleryCardMarkup(img))
      .join('');
    refs.gallery.insertAdjacentHTML('beforeend', galleryCardsTemplate);

    const totalPages = Math.ceil(data.totalHits / 15);

    if (totalPages === page) {
      refs.loadMoreBtn.classList.add('is-hidden');
      refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
    }
  } catch (err) {
    console.log(err);
  }
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);

// ---------------------------

// import { createGalleryCardMarkup, createLightBox } from './js/render-functions';
// import { fetchPhotosByQuery } from './js/pixabay-api';
// import iziToast from 'izitoast';
// import iconError from './img/icon/icon-error.svg';

// const refs = {
//   searchForm: document.querySelector('.form'),
//   gallery: document.querySelector('.gallery'),
//   backdrop: document.querySelector('.backdrop'),
// };

// // Function to show loader
// const showLoader = () => {
//   refs.backdrop.classList.remove('is-hidden');
// };

// // Function to hide loader
// const hideLoader = () => {
//   refs.backdrop.classList.add('is-hidden');
// };

// // Retrieving data from the server to create a gallery

// const onSearchFormSubmit = event => {
//   event.preventDefault();
//   const query = event.currentTarget.elements.search_text.value.trim();
//   if (query === '') {
//     alert('Enter text in the search field');
//     return;
//   }
//   showLoader();
//   fetchPhotosByQuery(query)
//     .then(({ hits }) => {
//       // We add a message that there is no such value
//       if (hits.length === 0) {
//         iziToast.error({
//           position: 'topRight',
//           message:
//             'Sorry, there are no images matching your search query. Please, try again!',
//           messageSize: '16px',
//           messageColor: '#ffffff',
//           timeout: 3000,
//           pauseOnHover: true,
//           backgroundColor: '#EF4040',
//           iconUrl: iconError,
//           layout: 2,
//         });

//         refs.searchForm.reset(); //clear form
//         refs.gallery.innerHTML = ''; //cleaning the gallery
//         return;
//       }

//       const galleryCardsTemplate = hits
//         .map(img => createGalleryCardMarkup(img))
//         .join('');
//       refs.gallery.innerHTML = galleryCardsTemplate;
//       createLightBox();
//       refs.searchForm.reset();
//     })
//     .catch(err => {
//       console.log(err);
//     })
//     .finally(() => {
//       hideLoader();
//     });
// };

// refs.searchForm.addEventListener('submit', onSearchFormSubmit);
