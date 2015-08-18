<?php
$upLoadOk = 1;
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$filename = $_REQUEST["name"];
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
if ($_FILES["file"]["size"] > 500000) {
    echo "Error: Sorry, your file is too large.";
    $upLoadOk = 0;
}
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
   && $imageFileType != "gif" ) {
    echo "Error: Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $upLoadOk = 0;
}
if ( 0 < $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    $upLoadOk = 0;
}
if($upLoadOk == 1) {
    move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $filename . "." .$imageFileType);
    echo('Success:uploads/' . $filename . "." . $imageFileType);
}
?>