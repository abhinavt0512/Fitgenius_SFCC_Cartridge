
$(document).ready(function(){
   window.addEventListener("load", afterLoaded,false);
   window.addEventListener("load", selectSize,false);
   window.addEventListener("resize", resizeFn);
  });
  
function afterLoaded(){
    $('.Recycle').click();
    $('div.sizerighttext').find('div.Header').click();
    resizeFn();
}

function resizeFn(){
    var element =document.getElementsByClassName("desktopContainer");
    var width = window.outerWidth;
    if (width<600) {
        for (let i = 0; i < element.length; i++) {  
            element[i].setAttribute("style", "display: none;");
        }
    } else {
        for (let i = 0; i < element.length; i++) {
            element[i].setAttribute("style", "display: flex;");  
       }
    }
}
$('body').on('click', '.first-page-closeBtn, .stepCloseBtn, .video-page-closeBtn', (event) => {
    $('body').css('display','none');
    history.back();
});


$('#aetrex_foot_profile_container').on('DOMSubtreeModified', function(){
    console.log('changed');
    var footwearSize = $('#aetrex_foot_profile_container').find('span.size').html();
    console.log(footwearSize);
  });