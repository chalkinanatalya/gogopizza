import { scrollController } from "./scrollController.js";

export const modalController = ({modal, btnOpen, btnClose, time = 300}) => {
    const buttonElems = document.querySelectorAll(btnOpen);
    const modalElem = document.querySelector(modal);

    if (!modalElem) {
        console.error(`Modal element with selector "${modal}" not found`);
        return;
    }

    modalElem.style.cssText = `
      display: flex;
      visibility: hidden;
      opacity: 0;
      transition: opacity ${time}ms ease-in-out;
    `;
  
    const closeModal = event => {
        const target = event.target;
    
        if (
            target === modalElem ||
            (btnClose && target.closest(btnClose)) ||
            event.code === 'Escape'
            ) {
            
            modalElem.style.opacity = 0;

            setTimeout(() => {
            modalElem.style.visibility = 'hidden';
            scrollController.enabledScroll();
            }, time);

            window.removeEventListener('keydown', closeModal);
        }
    }

    const openModal = () => {
        modalElem.style.visibility = 'visible';
        modalElem.style.opacity = 1;
        window.addEventListener('keydown', closeModal);
        scrollController.disabledScroll();
    };

    buttonElems.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
  
    modalElem.addEventListener('click', closeModal);
};


