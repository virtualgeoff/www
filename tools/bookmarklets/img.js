(function getImages() {
    var images = document.images;
    alert(images.length + ' images');

	// iterate through images
	for (var i=0; i<images.length; i++) {
		// log each image source
		console.log(i + ': ' + images[i].src);	

		// rotate each image by 180°
		images[i].style.transform = 'rotate(180deg)'; // upside down
		//images[i].style.transform = 'rotateY(180deg)'; // mirror
	}
}());
