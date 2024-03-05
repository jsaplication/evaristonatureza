const menuBar = document.querySelector('.menu-bar')
const menuMobile = document.querySelector('.menu-mobile')
const menuClose = document.querySelector('.menu-close')

menuBar.addEventListener('click', () => {
  menuMobile.classList.add('active')
})

menuClose.addEventListener('click', () => {
  menuMobile.classList.remove('active')
})
