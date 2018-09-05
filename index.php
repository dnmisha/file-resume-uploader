<?php
/**
 * Created by PhpStorm.
 * User: mihailvysocin
 * Date: 05.09.2018
 * Time: 13:11
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
<div class="row">
    <div class="large-12 columns">
        <p class="lead">Select files to upload</p>
        <button class="inverse small" id="browseButton">+ Add Files</button>
        <button class="danger small" id="uploadFiles">Start Upload</button>
        <div class="alert-box alert" data-nothingToUpload>Error Nothing To Upload, Please Add Some Files</div>
        <div id="dragHere" class="panel drop-zone">Drag &amp; Drop Here</div>
        <div id="results" class="panel"></div>Status:
        <div class="alert-box secondary"></div>
    </div>
</div>

<script src="/js/jquery-3.3.1.min.js"></script>
<script src="/js/resumable.js"></script>
<script src="/js/custom.js"></script>
</body>
</html>

