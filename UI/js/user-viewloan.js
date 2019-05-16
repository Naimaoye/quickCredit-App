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