$(document).on('click', '.js-dropdown>ul a', function () {
    $(this).closest('.js-dropdown').find('.js-dropdown-value').text($(this).text());
});
