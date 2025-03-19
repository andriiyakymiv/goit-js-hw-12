import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPhotosByQuery = (query, currentPage) => {
  const searchParameters = {
    key: '49359014-7397220ae93b07f148b4c236e',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
  };

  return axios.get(``, { params: searchParameters });
};

// --------------------------------------------------

// export const fetchPhotosByQuery = query => {
//   const searchParameters = new URLSearchParams({
//     key: '49359014-7397220ae93b07f148b4c236e',
//     q: query,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   });

//   return fetch(`https://pixabay.com/api/?${searchParameters}`).then(
//     response => {
//       // Error checking
//       if (!response.ok) {
//         throw new Error(response.status);
//       }

//       return response.json();
//     }
//   );
// };
