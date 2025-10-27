const hamburger = document.getElementById('hamburger');
const menuItems = document.querySelectorAll('.menu-item');
function opp(open,item) {
    open ? item.classList.replace('opacity-0', 'opacity-100') : item.classList.replace('opacity-100', 'opacity-0');
}
let open = false;

hamburger.addEventListener('click', () => {
    open = !open;
    hamburger.classList.remove('animate-pulse');

  menuItems.forEach((item, index) => {
    setTimeout(() => {opp(open,item);}, index * 100);
  });
});
