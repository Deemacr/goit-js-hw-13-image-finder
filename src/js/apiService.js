import tmp from './templating.js'

const apiKey = "17772438-7f33dcea2d7ef3f7199f29e71";
const baseUrl = "https://pixabay.com/api/";
export default {
	fetchPics(searchQuery, page) {
		const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${apiKey}`;
		return fetch(url)
			.then(res => res.json())
			.then(pics => pics.hits)
			.catch(`Error`);
	}
}