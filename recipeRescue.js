//Prepare form data
var formData = new FormData();
//formData.append("file", fileToUpload);
formData.append("url", "https://cdn2.hubspot.net/hubfs/62289/images/Blog_images/recipes/RecipeBlog-GarlicMashedPotatoes.pdf"); // name of file // "URL-of-Image-or-PDF-file"
formData.append("language"   , "eng");
formData.append("apikey"  , myOCRkey);
formData.append("isOverlayRequired", True);

//Send OCR Parsing request asynchronously
jQuery.ajax({
url: "https://api.ocr.space/parse/image",
data: formData,
dataType: 'json',
cache: false,
contentType: false,
processData: false,
type: 'POST',

success: function (ocrParsedResult) {
//Get the parsed results, exit code and error message and details
var parsedResults = ocrParsedResult["ParsedResults"];
var ocrExitCode = ocrParsedResult["OCRExitCode"];
var isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
var errorMessage = ocrParsedResult["ErrorMessage"];
var errorDetails = ocrParsedResult["ErrorDetails"];
var processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];

//If we have got parsed results, then loop over the results to do something
if (parsedResults!= null) {
//Loop through the parsed results
$.each(parsedResults, function (index, value) {
var exitCode = value["FileParseExitCode"];
var parsedText = value["ParsedText"];
var errorMessage = value["ParsedTextFileName"];
var errorDetails = value["ErrorDetails"];

var textOverlay = value["TextOverlay"];
var pageText = '';
switch (+exitCode) {
case 1:
pageText = parsedText;
break;
case 0:
case -10:
case -20:
case -30:
case -99:
default:
pageText += "Error: " + errorMessage;
break;
}

let previewImage = document.getElementById("screen");
let previewImage = document.getElementById("screenWoverlay");
let previewImage = document.getElementById("pImage");
let previewImage = document.getElementById("scanner");
let previewImage = document.getElementById("scanResults");
/// trying to fix this //

$.each(textOverlay["Lines"], function (index, value) {


//LOOP THROUGH THE LINES AND GET WORDS TO DISPLAY ON TOP OF THE IMAGE AS OVERLAY

});

//YOUR CODE HERE

});
}
}
});