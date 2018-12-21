(function(){
    console.log("Let's start");
    $(document).on('click', '.js-btn-menu', function() {
        $(this).toggleClass('active');
        $(this).siblings('nav').toggleClass('active');
    });
})();