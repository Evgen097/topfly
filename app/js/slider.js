/* контент и меню////////////////////////////////////////////////////////////////////*/
var scroll_to = '';
$("body").on("click", ".element",
    function go_to_slowly (event) {
        event.preventDefault();
        change_width_close (event);
        scroll_to = $(this).attr('class').split(' ')[1];
        $('html, body').delay(500).animate({scrollTop: $('.' + scroll_to + '').filter(".selector_for_all_links").offset().top}, 2000);
    });
$("body").on("click", ".trigger_open",
    function change_width_open (event) {
        $(".trigger_open").removeClass("trigger_active");
        $(".trigger_close").addClass("trigger_active");
        $(".trigger").css('right', '200px');
        $(".content").css('left', '-200px');
        $(".content").css('margin', '0 200px 0 0');
        $(".menu").css('right', '0px');
    });
$("body").on("click", ".trigger_close",
    function do_close (event) {
    change_width_close (event);
    });
function change_width_close (event) {
    $(".trigger_close").removeClass("trigger_active");
    $(".trigger_open").addClass("trigger_active");
    $(".trigger").css('right', '0px');
    $(".content").css('left', '0px');
    $(".content").css('margin', '0 0px 0 0');
    $(".menu").css('right', '-200px');}


/* контент и меню////////////////////////////////////////////////////////////////////*/
/* portfolio slider////////////////////////////////////////////////////////////////////*/
var foto_arr = ['img/slider/1', 'img/slider/2', 'img/slider/3', 'img/slider/4', 'img/slider/5', 'img/slider/6', 'img/slider/7', 'img/slider/8', 'img/slider/9', 'img/slider/10', 'img/slider/11'];
var foto_arr_1 = ['img/1/1', 'img/1/2', 'img/1/3', 'img/1/4'];
var foto_arr_2 = ['img/2/1', 'img/2/2', 'img/2/3'];
var foto_arr_3 = ['img/3/1', 'img/3/2', 'img/3/3'];
var foto_arr_4 = ['img/4/1', 'img/4/2', 'img/4/3'];
var foto_arr_5 = ['img/5/1', 'img/5/2', 'img/5/3', 'img/5/4'];

var foto_number = 0;
$("documetnt").ready(function() {
    $('.sceleton').css("height", document.documentElement.clientHeight + 'px' );
    $(".content").css('left', '-1px');
    $(".content").css('left', '0px');
    $(".slider_backround").css('background-image', 'url(' + foto_arr_number[foto_number] + '.jpg)');
    moving_picture();
    moving_textes();
});
var foto_arr_number = '';
$("body").on("click", ".portfolio_foto_text_link",
    function change_class (event) {
        event.preventDefault();
        if(document.documentElement.clientWidth>800){
            $(".portfolio").css("height", document.documentElement.clientHeight + 'px' );
        }
        $('html, body').delay(500).animate({scrollTop: $(".portfolio").offset().top}, 1000);
        $(".slider").removeClass("active");
        foto_arr_number = ($(this).attr('class').split(' ')[1]);
        foto_arr_number = window[foto_arr_number];
        change_foto_slader();
        $(".slider").addClass("active");
    });
$(document).mouseup(function (e) {
    var container = $(".slider");
    if (container.has(e.target).length === 0){
        $(".slider").removeClass("active");
        $(".portfolio").css('height', 100+'%');
    }
});
function change_foto_slader() {
    if (foto_number >= foto_arr_number.length){foto_number = 0};
    $( ".slider_backround" ).fadeOut( 200 );
    $(".slider_backround").css('background-image', 'url(' + foto_arr_number[foto_number] + '.jpg)');
    $( ".slider_backround" ).fadeIn( 500 );
}
$("body").on("click", ".slider_left",
    function change_class (event) {
        event.preventDefault();
        foto_number -= 1;
        if (foto_number < 0){foto_number = foto_arr_number.length-1;};
        change_foto_slader();
    });
$("body").on("click", ".slider_right",
    function change_class (event) {
        event.preventDefault();
        foto_number += 1;
        if (foto_number > foto_arr.length-1){foto_number = 0;}
        change_foto_slader();
    });
$("body").on("click", ".slider_close",
    function change_class (event) {
        event.preventDefault();
        $(".slider").removeClass("active");
        $(".portfolio").css('height', 100+'%');
    });
/* portfolio slider////////////////////////////////////////////////////////////////////*/
/*self moving slider///////////////////////////////////////////////////*/
var interval_moving_pictures = 10000;
var current_text_image = 0;
var image_size = 300;
var image_left = 0-image_size*2;
var numbers_of_pictures = $('.slider_moving_foto').length;
function moving_picture() {
    image_left += image_size;
    var current_text_image = image_left;
    $(".slider_moving_foto").each(function(){
        $(this).css("left", current_text_image + "px" );
        // как делать анимацию через jqwery $(this).animate({left: "+="+i,}, 2000);
        $(this).show();
        if(current_text_image>(numbers_of_pictures-3)*image_size){current_text_image=0-image_size*2; $(this).hide();}
        current_text_image += image_size;
    })
    if(image_left>(numbers_of_pictures-3)*image_size){image_left=0-image_size*2;};
}
setInterval(moving_picture, interval_moving_pictures);
/*self moving slider///////////////////////////////////////////////////*/
/*типа крутые фразы слайдер///////////////////////////////////////////////////*/
var time_to_move_text = 8000;
var current_text_size = 0;
var text_size = document.documentElement.clientWidth;
var current_width = document.documentElement.clientWidth;
var text_left = 0-text_size*2;
var numbers_of_textes = $('.slider_moving_text').length;
var text_current_number = numbers_of_textes;
$('.slider_text').css("width", current_width-20 + 'px');
$('.slider_moving_text').css("width", text_size + 'px');


window.onresize = function () {
    current_width = document.documentElement.clientWidth;
    //$('.sceleton').css("height", document.documentElement.clientHeight + 'px' );
    //height = document.documentElement.clientHeight;
    console.log(current_width);
    if (current_width < 800){
        text_size = current_width;
        $('.slider_text').css("width", current_width-20 + 'px' );
        $('.slider_moving_text').css("width", text_size + 'px' );
    }
}

$(".slider_moving_text").each(function(){
    $('.slider_moving_small_box').append("<div class='moving_box_white'></div>");
});

function moving_small_box() {
    if( text_current_number < 1 ){text_current_number=numbers_of_textes};
    $('.moving_box_white').css("background-color", "white");
    $('.slider_moving_small_box > *:nth-child(' + text_current_number + ')').css("background-color", "red");
    text_current_number-=1;
};

function moving_textes() {
    text_left += text_size;
    var current_text_size = text_left;
    $(".slider_moving_text").each(function(){

        $(this).css("left", current_text_size + "px" );
        // как делать анимацию через jqwery $(this).animate({left: "+="+i,}, 2000);
        $(this).show();
        if(current_text_size>(numbers_of_textes-3)*text_size){current_text_size=0-text_size*2; $(this).hide();}
        current_text_size += text_size;
    })
    if(text_left>(numbers_of_textes-3)*text_size){text_left=0-text_size*2;};
}
var refreshIntervaltext = setInterval(moving_textes, time_to_move_text);
var refreshIntervalbox = setInterval(moving_small_box, time_to_move_text);
$( ".wrapper_slider_text" ).mouseover(function() {
    clearInterval(refreshIntervaltext);
    clearInterval(refreshIntervalbox);
});
$( ".wrapper_slider_text" ).mouseleave(function() {
    refreshIntervaltext = setInterval(moving_textes, time_to_move_text);
    refreshIntervalbox = setInterval(moving_small_box, time_to_move_text);
});

/*типа крутые фразы слайдер///////////////////////////////////////////////////*/
/*///////////////////////////////////////////////////*/

















