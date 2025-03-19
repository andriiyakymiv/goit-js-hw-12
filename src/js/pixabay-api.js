import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getPhotoFromServer = async function (dataName, currentPage) {
  const { data } = await axios.get('', {
    params: {
      key: '49359014-7397220ae93b07f148b4c236e',
      q: dataName,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: currentPage,
    },
  });
  return data;
};
