// HOME PAGE CONTROLLER
app.controller('HomeController', function($scope) {
    
	$scope.pageClass = "page-home";

	$scope.slides = [
		{image: '../images/contacts.jpg', description: 'Image 00'},
		{image: '../images/bookmark.jpg', description: 'Image 00'},
		{image: '../images/todo.jpg', description: 'Image 00'}
	];

	$scope.currentIndex = 0;

	$scope.setCurrentSlideIndex = function (index){
		$scope.currentIndex = index;
	};

	$scope.isCurrentSlideIndex = function(index){
		return $scope.currentIndex === index;
	};

	$scope.prevSlide = function(){
		$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex: 0;
	};

	$scope.nextSlide = function(){
		$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
	};
	
});

	app.animation('.slide-animation', function () {
        return {
            addClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    TweenMax.set(element, { left: element.parent().width() });
                    TweenMax.to(element, 0.5, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });