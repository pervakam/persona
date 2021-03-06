// меню в адаптиве
const pageHeader = document.querySelector('.page-header__nav-list');
const headerToggle = document.querySelector('.page-header__menu-button');

headerToggle.addEventListener('click', () => {
  if (pageHeader.classList.contains('page-header__nav-list--hide')) {
    pageHeader.classList.remove('page-header__nav-list--hide');
  } else {
    pageHeader.classList.add('page-header__nav-list--hide');
  }
});

// слайдер в портфолио
const portfolioSwiper = new Swiper(".portfolio__swiper-container", {
  slidesPerView: 'auto',
  spaceBetween: 10,
  loop: true,
  slidesPerGroupAuto: true,

  wrapperClass: "portfolio__list",

  slideClass: "portfolio__item",

  navigation: {
    nextEl: ".portfolio__list-next",
    prevEl: ".portfolio__list-prev",
  },
})

// селект типа специалиста
const servicesMasterBlocks = document.querySelectorAll('.services__master-change')

servicesMasterBlocks.forEach((block, index) => {
  const currentMasterItem = block.querySelector('.services__current-master')
  const currentMasterType = block.querySelector('.services__current-master-type')
  const servicesMasterList = block.querySelector('.services__master-list')
  const servicesMasterBlockWrapper = block.querySelector('.services__master-change-wrapper')

  currentMasterItem.addEventListener('click', (evt) => {
    block.classList.toggle('services__master-change--border')
    servicesMasterList.classList.toggle('services__master-list--hide')
    currentMasterItem.classList.toggle('services__current-master--rotate')
    servicesMasterBlockWrapper.classList.toggle('services__master-change-wrapper--full')

    const servicesMasterTypes = document.querySelectorAll('.services__master-type')
    servicesMasterTypes.forEach((type) => {
      type.addEventListener('click', (evt) => {
        currentMasterType.textContent = type.textContent
        block.classList.remove('services__master-change--border')
        servicesMasterList.classList.add('services__master-list--hide')
        currentMasterItem.classList.remove('services__current-master--rotate')
        servicesMasterBlockWrapper.classList.remove('services__master-change-wrapper--full')
      })
    })
  })
})

// кнопка со скидкой
const servicesOffer = document.querySelector('.services__offer')
const servicesOfferButton = servicesOffer.querySelector('.services__offer-button')
const servicesBookButton = servicesOffer.querySelector('.services__book-button')

servicesOfferButton.addEventListener('click', () => {
    servicesOfferButton.classList.add('services__offer-button--hide')
    servicesBookButton.classList.remove('services__book-button--hide')

    const serviceItemPrices = document.querySelectorAll('.services__service-item-price')

    serviceItemPrices.forEach((price) => {
      const currentPrice = price.querySelector('.services__service-current-price')
      const offerPrice = price.querySelector('.services__service-item-offer-price')

      currentPrice.classList.add('services__service-current-price--old')
      offerPrice.classList.remove('services__service-item-offer-price--hide')

      offerPrice.textContent = currentPrice.textContent * 0.8
    })
  }
)

// плавный скролл к якорю
document.querySelectorAll('.page-header__nav-item').forEach((link) => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelectorAll('.js-section').forEach((section, i) => {
      if (link.dataset.id === section.getAttribute('id')) {
        window.scrollTo({
          behavior: 'smooth',
          top: section.offsetTop,
        });
      }
    })
  })
})

// прокрутка услуг в главном блоке
const aboutServicesBlocks = document.querySelectorAll('.about__description-services')
let i = 0

aboutServicesBlocks[i].classList.add('about__description-services--show')
setInterval(() => {
    i++
    const aboutServicesBlock = document.querySelector('.about__description-services--' + i)
    const aboutServicesPrevBlock = document.querySelector('.about__description-services--' + (i - 1))

    if (i >= 0 && i < aboutServicesBlocks.length) {
      aboutServicesBlock.classList.add('about__description-services--show')
      aboutServicesPrevBlock.classList.remove('about__description-services--show')
    } else {
      aboutServicesPrevBlock.classList.remove('about__description-services--show')
      aboutServicesBlocks[0].classList.add('about__description-services--show')
      i = 0
    }
//
  },
  2000)


