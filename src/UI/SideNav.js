/* Open when someone clicks on the span element */

export function openNav() {
    document.getElementById("myNav").style.width = "20%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
export function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

export function toggleRightMenu() {
    UI.isRightMenuVisible = !UI.isRightMenuVisible
    UI.isRightMenuVisible ? openNav() : closeNav();
}

export function GetStepDelay() {
    return $('#stepDelay').val();
}


export function manageRules() {
    $('#define_automa').toggle();
}


export let UI = {
    isRightMenuVisible: false
}
// const gui = new dat.GUI();