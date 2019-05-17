function openAdminManageTab(tabEvent, tabName) {
    var tabIndex, tabContent, adminTabLinks;
    tabContent = document.getElementsByClassName("manage-loans");

    for (tabIndex = 0; tabIndex < tabContent.length; tabIndex++) {
      tabContent[tabIndex].style.display = "none";
    }
    
    adminTabLinks = document.getElementsByClassName("admin-tab");

    for (tabIndex = 0; tabIndex < adminTabLinks.length; tabIndex++) {
      adminTabLinks[tabIndex].className = adminTabLinks[tabIndex].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    tabEvent.currentTarget.className += " active";
  }
function myFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("all-loans");
  filter = input.value.toUpperCase();
  table = document.getElementById("manage-loans");
  tr = table.getElementsByTagName("tabContent");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}


var openMenu=document.getElementById('openbtn');
var closeMenu=document.getElementById('closebtn');

openMenu.addEventListener('click',function(){
    document.getElementById('container').style.marginLeft='200px';
    document.getElementById('sidebar').style.width='200px';
    document.getElementById('openbtn').style.visibility='hidden';
})

closeMenu.addEventListener('click',function(){
    document.getElementById('container').style.marginLeft='0px';
    document.getElementById('sidebar').style.width='0px'; 
    document.getElementById('openbtn').style.visibility='visible';
});