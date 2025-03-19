import iziToast from 'izitoast';
import { getPhotoFromServer } from './js/pixabay-api';
import { createGalleryMarkup, lightbox } from './js/render-functions';
import errorIcon from './img/icon/icon-error.svg';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.js-load-more-btn'),
};

const showLoader = () => {
  refs.loader.classList.remove('is-hidden');
};

const hideLoader = () => {
  refs.loader.classList.add('is-hidden');
};

//show button
const loadBtnShow = () => refs.loadMoreBtn.classList.remove('is-hidden');

//hiden button
const loadBtnHide = () => refs.loadMoreBtn.classList.add('is-hidden');

//data from server

hideLoader();

let page = 1;
let dataName = '';
let totalPages = 0;

const onSearchFormSubmit = async function (event) {
  event.preventDefault();

  dataName = event.currentTarget.elements['search-text'].value.trim();

  if (dataName === '') {
    alert('Please enter a valid data');
    loadBtnHide();
    return;
  }

  page = 1;
  loadBtnHide();

  refs.gallery.innerHTML = '';

  showLoader();

  try {
    const { hits, totalHits } = await getPhotoFromServer(dataName, page);

    if (hits.length === 0) {
      iziToast.error({
        messageColor: '#ffffff',
        close: false,
        iconUrl: errorIcon,
        backgroundColor: '#ef4040',
        position: 'topRight',
        message: `Sorry, there are no images matching ${dataName}, your search query. Please try again!`,
        timeout: 3000,
      });

      loadBtnHide();
      refs.form.reset();
      refs.gallery.innerHTML = '';
      return;
    }

    // creating a gallery

    const galleryTemplate = hits.map(img => createGalleryMarkup(img)).join('');
    refs.gallery.innerHTML = galleryTemplate;

    lightbox.refresh();

    totalPages = Math.ceil(totalHits / 15);
    if (totalPages > 1) {
      loadBtnShow();
      refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
    }
  } catch (error) {
    iziToast.error({
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      message: 'Oops! Something went wrong. Please try again later.',
      timeout: 3000,
    });
  } finally {
    hideLoader();
    refs.form.reset();
  }
};

const onLoadMoreBtn = async function () {
  try {
    page++;

    if (page >= totalPages) {
      loadBtnHide();

      refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtn);

      iziToast.info({
        message: `We're sorry, but you've reached the end of search results`,
      });
    }

    const { hits } = await getPhotoFromServer(dataName, page);
    const galleryTemplate = hits.map(img => createGalleryMarkup(img)).join('');

    refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate);

    setTimeout(() => {
      const lastItem = refs.gallery.lastElementChild;
      const itemHeight = lastItem.getBoundingClientRect().height;

      window.scrollBy({
        top: itemHeight * 2,
        behavior: 'smooth',
      });

      lightbox.refresh();
    }, 0);

    showLoader();
  } catch (error) {
    iziToast.error({
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      message: 'Oops! Something went wrong. Please try again later.',
      timeout: 10000,
    });
  } finally {
    hideLoader();
  }
};
refs.form.addEventListener('submit', onSearchFormSubmit);

// ---------------------------------------------------------
// import { createGalleryCardMarkup, createLightBox } from './js/render-functions';
// import { fetchPhotosByQuery } from './js/pixabay-api';
// import iziToast from 'izitoast';
// import iconError from './img/icon/icon-error.svg';

// const refs = {
//   searchForm: document.querySelector('.form'),
//   gallery: document.querySelector('.gallery'),
//   loader: document.querySelector('.loader'),
//   loadMoreBtn: document.querySelector('.js-load-more-btn'),
// };

// let page = 1;
// let query = '';

// // Function to show loader
// const showLoader = () => {
//   refs.loader.classList.remove('is-hidden');
// };

// // Function to hide loader
// const hideLoader = () => {
//   refs.loader.classList.add('is-hidden');
// };

// // Retrieving data from the server to create a gallery

// const onSearchFormSubmit = async event => {
//   showLoader();

//   try {
//     event.preventDefault();

//     query = event.currentTarget.elements.search_text.value.trim();

//     if (query === '') {
//       alert('Enter text in the search field');
//       return;
//     }

//     page = 1;

//     const { data } = await fetchPhotosByQuery(query, page);

//     if (data.hits.length === 0) {
//       iziToast.error({
//         position: 'topRight',
//         message:
//           'Sorry, there are no images matching your search query. Please, try again!',
//         messageSize: '16px',
//         messageColor: '#ffffff',
//         timeout: 3000,
//         pauseOnHover: true,
//         backgroundColor: '#EF4040',
//         iconUrl: iconError,
//         layout: 2,
//       });

//       refs.searchForm.reset(); //clear form

//       refs.gallery.innerHTML = ''; //cleaning the gallery

//       refs.loadMoreBtn.classList.add('is-hidden'); // приховуємо кнопку

//       return;
//     }

//     const galleryCardsTemplate = data.hits
//       .map(img => createGalleryCardMarkup(img))
//       .join('');

//     refs.gallery.innerHTML = galleryCardsTemplate;

//     const totalPages = Math.ceil(data.totalHits / 15);

//     if (totalPages > 1) {
//       refs.loadMoreBtn.classList.remove('is-hidden');
//       refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
//       return;
//     }

//     refs.loadMoreBtn.classList.add('is-hidden');

//     createLightBox();

//     refs.searchForm.reset();

//     // showLoader();
//   } catch (err) {
//     console.log(err);
//   } finally {
//     hideLoader();
//   }
// };

// const onLoadMoreBtnClick = async event => {
//   try {
//     page++;

//     const { data } = await fetchPhotosByQuery(query, page);

//     const galleryCardsTemplate = data.hits
//       .map(img => createGalleryCardMarkup(img))
//       .join('');
//     refs.gallery.insertAdjacentHTML('beforeend', galleryCardsTemplate);

//     setTimeout(() => {
//       const firstElement = refs.gallery.firstElementChild;
//       const itemHeight = firstElement.getBoundingClientRect().height;

//       window.scrollBy({
//         top: itemHeight * 2,
//         behavior: 'smooth',
//       });
//       // lightbox
//     }, 0);

//     const totalPages = Math.ceil(data.totalHits / 15);

//     if (totalPages === page) {
//       refs.loadMoreBtn.classList.add('is-hidden');
//       refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
//       iziToast.info({
//         message: `We're sorry, but you've reached the end of search results`,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// refs.searchForm.addEventListener('submit', onSearchFormSubmit);

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
