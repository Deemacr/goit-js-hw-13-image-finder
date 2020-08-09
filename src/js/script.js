import apiService from './apiService.js'
import refs from './refs.js'
import tmp from './templating.js'

let searchQuery = "";
let page = 1;


refs.searchForm.addEventListener('submit', (event) => {
	event.preventDefault();
	page = 1;
	refs.loadMore.style.visibility = "visible";
	searchQuery = event.currentTarget.elements['query'].value;
	if (!searchQuery) {
		refs.loadMore.style.visibility = "hidden";
		refs.galleryWrap.innerHTML = "";
		return;
	}
	return apiService.fetchPics(searchQuery, page)
		.then(pics => {
			if (pics.length < 12) {
				refs.loadMore.style.visibility = "hidden"
			};
			tmp.updateGallery(pics);
			page += 1
		});
});


refs.loadMore.addEventListener('click', (event) => {
	apiService.fetchPics(searchQuery, page)
		.then(pics => {
			if (pics.length < 12) {
				refs.loadMore.style.visibility = "hidden"
			};
			tmp.loadMorePics(pics);
			page += 1
		});
	window.scrollTo({
		top: document.body.scrollHeight,
		behavior: "smooth"
	});
});



