import apiService from './apiService.js'
import refs from './refs.js'
import tmp from './templating.js'

let searchQuery = "";
let page = 1;

// РАБОТАЕТ !ТОЛЬКО! НА НАЖАТИЕ Enter

refs.searchForm.addEventListener('keypress', (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		page = 1;
		refs.loadMore.style.visibility = "visible";
		searchQuery = event.currentTarget.elements['query'].value;
		if (!searchQuery) {
			refs.loadMore.style.visibility = "hidden";
			refs.galleryWrap.innerHTML = "";
			return;
		}
		return apiService.fetchPics(searchQuery, page).then(pics => { tmp.updateGallery(pics); page += 1 });
	}
});

// return apiService.fetchPics(searchQuery, page).then(tmp.updateGallery);

refs.loadMore.addEventListener('click', (event) => {
	apiService.fetchPics(searchQuery, page).then(tmp.loadMorePics).then(page += 1);
	window.scrollTo(0, document.body.scrollHeight, { behaviour: 'smooth' });
});



