/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "20%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

function toggleRightMenu() {
    UI.isRightMenuVisible = !UI.isRightMenuVisible
    UI.isRightMenuVisible ? openNav() : closeNav();
}

function GetStepDelay() {
    return $('#stepDelay').val();
}


function manageRules() {
    $('#define_automa').toggle();
}


// let UI = {
//     isRightMenuVisible: false
// }
// const gui = new dat.GUI();