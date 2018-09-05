(function () {
    var r = new Resumable({
        target: '/upload.php',
        chunkSize: 1 * 1024 * 1024,
        simultaneousUploads: 4,
        chunkRetryInterval: 5000,
        testChunks: false,
        throttleProgressCallbacks: 1
    });
    var results = $('#results'),
        draggable = $('#dragHere'),
        uploadFile = $('#uploadFiles'),
        browseButton = $('#browseButton'),
        nothingToUpload = $('[data-nothingToUpload]');


    // if resumable is not supported aka IE
    if (!r.support) location.href = 'http://browsehappy.com/';

    r.assignBrowse(browseButton);
    r.assignDrop(draggable);

    r.on('fileAdded', function (file, event) {
        var template =
            '<div data-uniqueid="' + file.uniqueIdentifier + '">' +
            '<div class="fileName">' + file.fileName + ' (' + file.file.type + ')' + '</div>' +
            '<div class="large-6 right deleteFile">X</div>' +
            '<div class="progress large-6">' +
            '<span class="meter" style="width:0%;"></span>' +
            '</div>' +
            '</div>';

        results.append(template);
    });

    uploadFile.on('click', function () {
        if (results.children().length > 0) {
            r.upload();
        } else {
            nothingToUpload.fadeIn();
            setTimeout(function () {
                nothingToUpload.fadeOut();
            }, 3000);
        }
    });

    $(document).on('click', '.deleteFile', function () {
        var self = $(this),
            parent = self.parent(),
            identifier = parent.data('uniqueid'),
            file = r.getFromUniqueIdentifier(identifier);

        r.removeFile(file);
        parent.remove();
    });

    r.on('fileProgress', function (file) {
        $('.alert-box').text('Uploading....');
        var progress = Math.floor(file.progress() * 100);
        $('[data-uniqueId=' + file.uniqueIdentifier + ']').find('.meter').css('width', progress + '%');
        $('[data-uniqueId=' + file.uniqueIdentifier + ']').find('.meter').html('&nbsp;' + progress + '%');
    });

    r.on('fileSuccess', function (file, message) {
        $('[data-uniqueId=' + file.uniqueIdentifier + ']').find('.progress').addClass('success');
    });


    r.on('uploadStart', function () {
        $('.alert-box').text('Uploading....');
    });

    r.on('complete', function () {
        $('.alert-box').text('Done');
    });

    r.on('fileError', function (file) {
        $('.alert-box').text('File upload error. Retry');
        setTimeout(function () {
            file.retry();
        }, 3000);
    });

    r.on('fileRetry', function (file) {
        $('.alert-box').text('...');
        setTimeout(function () {
            $('.alert-box').text('File upload error. retrying in 5 seconds...');
        }, 1000);
    });

})();
