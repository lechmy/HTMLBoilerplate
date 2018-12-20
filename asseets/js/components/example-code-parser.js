(function(){
    $('code').each(function (index, item) {
       var code = $(item).html();
       code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
       $(item).html(code);
    });
})();