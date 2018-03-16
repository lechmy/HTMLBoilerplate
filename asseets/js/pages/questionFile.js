/* globals appSettings */
(function ($, undefined) {
    "use strict";

    Dropzone.autoDiscover = false;

    var questionFileDropzone = new Dropzone("#questionFileDropzone",
        {
            timeout: 60000,
            acceptedFiles: "image/bmp,image/x-windows-bmp,image/gif,image/jpeg,image/png"
        });

    function showProjectFiles(projectFile) {
        var mockFile = {
            name: projectFile.FileName,
            size: projectFile.ContentLength,
            dataURL: projectFile.FileUrl,
            questionFileId: projectFile.Id
        };
        questionFileDropzone.emit("addedfile", mockFile);
        questionFileDropzone.createThumbnailFromUrl(mockFile,
            questionFileDropzone.options.thumbnailWidth,
            questionFileDropzone.options.thumbnailHeight,
            questionFileDropzone.options.thumbnailMethod, true, function (thumbnail) {
                questionFileDropzone.emit('thumbnail', mockFile, thumbnail);
            }, 'Anonymous');
        questionFileDropzone.emit("complete", mockFile);
    }

    function removeProjectFile(file) {
        $.ajax({
            url: appSettings.urls.removeProjectFileUrl,
            method: 'POST',
            data: {
                fileId: file.questionFileId
            },
            error: onError,
            success: function(data) {
                if (data.Success) {
                    questionFileDropzone.removeFile(file);
                } else {
                    showError(data);
                }
            }
        });
    }

    questionFileDropzone.on("success",
        function (file, res) {
            if (res.Success && $.isArray(res.Data) && res.Data.length > 0 && res.Data[0].Success) {
                file.questionFileId = res.Data[0].FileId;
                //questionFileDropzone.createThumbnailFromUrl(file, res.Data[0].FileUrl);
            } else {
                if ($.isArray(res.Data) && res.Data.length > 0 && res.Data[0].Message)
                    questionFileDropzone.emit("error", file, res.Data[0].Message);
                else
                    questionFileDropzone.emit("error", file, "File uplad failed.");
            }
        });
    questionFileDropzone.on("complete", function(file) {
        var $removeFile = $('<button/>',
            {
                'type': 'button',
                'class': 'remove-file js-remove-file',
                'text': 'Remove file'
            }).appendTo(file.previewElement);

        $removeFile.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (file.questionFileId) {
                removeProjectFile(file);
            } else {
                questionFileDropzone.removeFile(file);
            }
        });
    });

    if (window.projectFiles)
        window.projectFiles.forEach(showProjectFiles);

}).call(window, jQuery);
