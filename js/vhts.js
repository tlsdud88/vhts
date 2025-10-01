$(function(){
  checkboxControl(),
  popupControl("[data-popup]",".closeBtn");
  filterControl();
  indexScroll("body.main header");
  customScroll(".customContainer > form > div > div:last-of-type")
  videoPlay();
  imgHover();
  onlyNumber();
  qtyControl();
  pickupTab();
  customControl();
  accordionMenu("#snbPopup li b,#filterPopup > ol > li h3,footer > div:nth-child(4) > div:nth-child(1) > div h3,.listContainer h2");
});

function checkboxControl(){
  $("#deleteAcc").click(function(){
    $("#accDel").prop('disabled', true);
  });

  $("#deleteAcc").click(function() {
    $("#accDel").prop("disabled", false);
  });
}

function popupControl(btn,popup){
  $(btn).not("#filterBtn").click(function(){
    var popupId=$(this).attr("data-popup");
    $("#"+popupId).addClass("active");
  });

  $(popup+',[value="Cancel"]').click(function(){
    $(this).closest('[id$="Popup"],[id$="Panel"]').removeClass("active");
  });
}

function filterControl(){
  $("#filterBtn").on("click", function(){
    var $filterbtn=$(this);
    var filterpopupId=$filterbtn.data("popup");
    var $filterpopup=$("#"+filterpopupId);

    $filterpopup.toggleClass("active");
    $filterbtn.toggleClass("click");
  });
}

function indexScroll(target){
  $(window).scroll(function(){
    if($(window).scrollTop()>10){
      $(target).addClass("scrolled");
    }else{
      $(target).removeClass("scrolled");
    }
  });
}

function customScroll(target){
  $(window).scroll(function(){
    if($(window).scrollTop()>125){
      $(target).addClass("scrolled");
    }else{
      $(target).removeClass("scrolled");
    }
  });
}

function videoPlay(){
  var videoBox = $(".videoBox video").get(0);
  var btnPlay = $(".videoBox .pauseBtn");

  btnPlay.click(function(){
    if(videoBox.paused){
      videoBox.play();
      $(this).removeClass("playBtn").addClass("pauseBtn");
    }else{
      videoBox.pause();
      $(this).removeClass("pauseBtn").addClass("playBtn");
    }
  });
}

function imgHover(){
  $(".listContainer > ul li:not(.soldOut)").hover(
    function(){
      var $img = $(this).find("a > img");
      var src = $img.attr("src");
      $img.attr("src", src.replace(".png", "_hover.png"));
    },
    function(){
      var $img = $(this).find("a > img");
      var src = $img.attr("src");
      $img.attr("src", src.replace("_hover.png", ".png"));
    }
  );
}

function onlyNumber(){
  $("#cardCvv,#cardNumber,#userPNumber,#discountCode").on("keyup", function(){
    var value = $(this).val().replace(/[^0-9]/g,"");
    $(this).val(value);
  });
}

function qtyControl(){
  $(".plus").click(function(){
    var input=$("#mobileQty");
    var current=parseInt(input.val());
    var max=parseInt(input.attr("max"));
   
    if(current<max){
      input.val(current+1);
    }
  });

  $(".minus").click(function(){
    var input=$("#mobileQty");
    var current=parseInt(input.val());
    var min=parseInt(input.attr("min"));

    if(current>min){
      input.val(current-1);
    }
  });
}

function pickupTab(){
  $(".pickupMenu li").click(function(){
    var activeTab=$(this).attr("data-name");
    $(".pickupMenu li").removeClass("activ");
    $(this).addClass("activ");

    $(".pickupTab").removeClass("activ");
    $("#"+activeTab).addClass("activ");
  });
}

function customControl(){
  var $strong=$(".customContainer strong.customPosition");
  var $font=$(".customContainer [id^='style']");
  var $color=$(".customContainer [id^='color']")
  var $inputText=$(".customContainer fieldset > input");

  $inputText.on("input",function(){
    var textVal=$(this).val(); 
    $strong.text(textVal);
  });

  $font.on("change", function(){
    var $fieldset=$(this).closest("fieldset");
    var textVal=$fieldset.children("input[type='text']").val();
    $strong.text(textVal);

    var fontStyle = $(this).data("font");
    $strong.removeClass(function(_, className){
      return(className.match(/\bfont[A-Za-z]*/g)||[]).join(" ");
    });
    $strong.addClass(fontStyle);
  });

  $color.on("change", function(){
    var colorStyle=$(this).data("color");
    $strong.css("color",colorStyle);
  });
}

function accordionMenu(target){
  $(target).click(function(){
    $(this).next().slideToggle();
    $(this).toggleClass("active");
  });
}