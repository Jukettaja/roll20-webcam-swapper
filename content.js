//content.js

console.log("Content script loaded.");

var _$ = jQuery;

var active = false;

var toggleActive = function(){   
    active = !active;
    console.log(active);
    return active;
}

//move initiative window next to floatingtoolbar
var initiativeWindow = function(){
    var top = ($("#floatingtoolbar").offset().top - 80);
    var style = {"top": top, left: "60px"};
    if(active==true){ 
        $("#initiativewindow").parent().css(style);
        
    }else{
        $("#initiativewindow").parent().css({"top": "20px", left: "60px"});
        
    }
}

//call initiative window function
$("#startrounds").click(function(){
     initiativeWindow();
});


var cameraFlip = function(){
    console.log("camera flip ");
    if($("#playerzone").length && $("#loading-overlay").is(":hidden") && active==false){
            console.log("up");
            //move webcam up (keep hotkeys down), webcam layer below pagetoolbar
            $("#playerzone").css({"top": "30px", "z-index": "10699"});
            //move toolbar down
            $("#floatingtoolbar").css("bottom", "90px").css("top","auto");
            //move colorpicker down
            $("#secondary-toolbar").css("bottom", "332px").css("top","auto"); 
    }
    else if($("#playerzone").length && $("#loading-overlay").is(":hidden") && active==true ){
            console.log("down");
            //reset webcam location
            $("#playerzone").css({"top": "auto", "z-index": "10699"});
            //reset toolbar location
            $("#floatingtoolbar").css("bottom", "auto").css("top","20px");
            //reset secondary toolbar location
            $("#secondary-toolbar").css("bottom", "auto").css("top","20px");       
    }
    
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //only if not active

    if( request.message === "clicked_browser_action") {
        console.log("click");
        cameraFlip();
        setTimeout(toggleActive(), 500);
        setTimeout(initiativeWindow(),50); 
    } 
}); 


