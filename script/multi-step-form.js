let currentTab = 0; //current tap set to be the first tab
showTab(currentTab);

function showTab(n) {
    //this function will display the specified tab of the form ...
    let x = document.getElementsByClassName("multi-form-tab");
    x[n].style.display = "block";
}

function nextPrev(n) {
    //This functin will figure out which tab to display
    let x = document.getElementsByClassName("multi-form-tab");

    //Hide the current tab
    x[currentTab].style.display = "none";
    //Increase or decrease the current tab by 1
    currentTab = currentTab + n;

    //otherwise, display the correct tab
    showTab(currentTab);
}