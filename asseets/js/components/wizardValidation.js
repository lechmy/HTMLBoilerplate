$(document).on('change', '.js-wizard-answer-button', function () {
    $('.js-submit-wizard-answer').removeAttr('disabled');
});

$(document).on('change', '.js-wizard-input-field', function () {
    $('.js-submit-wizard-answer').removeAttr('disabled');
    $('.js-wizard-input-field').each(function (index, item) {
        if ($(item).val() == "") {
            $('.js-submit-wizard-answer').attr('disabled', 'disabled');
        }
    })
});

$(document).ready(function () {
    $('.js-wizard-answer-button').each(function (index, item) {
        if ($(item).is(':checked')) {
            $('.js-submit-wizard-answer').removeAttr('disabled');
            return false;
        }
    });
    $('.js-wizard-input-field').each(function (index, item) {
        if ($(this).val() != '') {
            $('.js-submit-wizard-answer').removeAttr('disabled');
            return false;
        }
    })
})
