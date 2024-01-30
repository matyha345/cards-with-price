import './index.html';
import './styles/styles.scss'

import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', function () {

    AOS.init();

    const handleResize = () => {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const aosElements = document.querySelectorAll(".main__components-card");

        aosElements.forEach(card => {
            const originalAOS = card.getAttribute('data-original-aos');
            if (windowWidth <= 980) {
                card.setAttribute('data-aos', 'fade-up');
            } else {
                card.setAttribute('data-aos', originalAOS);
            }
        });
    }

    const aosElements = document.querySelectorAll(".main__components-card");
    aosElements.forEach(card => {
        const originalAOS = card.getAttribute('data-aos');
        card.setAttribute('data-original-aos', originalAOS);
    });

    window.addEventListener('resize', handleResize);
    window.addEventListener('unload', handleResize);




    const currencyElements = document.querySelectorAll(".main__card-сurrency");
    const numberElements = document.querySelectorAll(".main__card-number");
    const monthElements = document.querySelectorAll(".main__card-month")


    const originalDollarValues = Array.from(numberElements).
        map(element => parseFloat(element.textContent.trim()));

    function convertToEuro(currentNumber) {
        const newCurrency = "€";
        const newNumber = (currentNumber / 2).toFixed(0);

        return { newCurrency, newNumber };
    }

    function convertToRubles(currentNumber) {
        const newCurrency = "₽";
        const newNumber = (currentNumber * 96).toFixed(0);
        return { newCurrency, newNumber };
    }

    function updateCurrencyElements(newCurrency) {
        currencyElements.forEach((element) => {
            element.textContent = newCurrency;
        });
    }

    currencyElements.forEach((currencyElement) => {
        currencyElement.addEventListener("click", () => {
            const currentCurrency = currencyElement.textContent.trim();

            numberElements.forEach((numberElement, index) => {
                const currentNumber = parseFloat(numberElement.textContent.trim());
                let result;
                if (currentCurrency === "$") {
                    result = convertToEuro(currentNumber);
                } else if (currentCurrency === "€") {
                    result = convertToRubles(currentNumber);
                } else {
                    // Восстанавливаем оригинальные значения в долларах при конвертации в рубли
                    result = { newCurrency: "$", newNumber: originalDollarValues[index] };
                }
                updateCurrencyElements(result.newCurrency);
                numberElement.textContent = result.newNumber;

            });

        });
    });

    monthElements.forEach((monthElement) => {
        monthElement.addEventListener("click", () => {
            const currentMonth = monthElement.textContent.trim();

            for (let i = 0; i < numberElements.length; i++) {
                const currentNumber = parseFloat(numberElements[i].textContent.trim());

                let result;
                if (currentMonth === "/ Months") {
                    result = { newMonth: "/ Days", newNumber: (currentNumber / 30).toFixed(0) };
                } else if (currentMonth === "/ Days") {
                    result = { newMonth: "/ Months", newNumber: (currentNumber * 30).toFixed(0) };
                } else {
                    // result = { newTimeUnit: "/ Months", newNumber: originalDollarValues[i] }; AAAAAAAAAAAA
                }

                monthElements[i].textContent = result.newMonth;
                numberElements[i].textContent = result.newNumber;
                updateCurrencyElements(currencyElements[i].textContent.trim());

            }
        });
    });


    let isMenuOpen = false;

    const burgerMenu = document.querySelector(".burger__menu");
    const headerContent = document.querySelector(".header__content");
    const overlay = document.querySelector(".overlay");

    burgerMenu.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        isMenuOpen = !isMenuOpen;

        overlay.style.display = isMenuOpen ? "block" : "none";
        headerContent.classList.toggle("header__content-open", isMenuOpen);
    });

    document.addEventListener("click", function (event) {
        if (!headerContent.contains(event.target) && event.target !== burgerMenu) {
            isMenuOpen = false;
            overlay.style.display = "none";
            headerContent.classList.remove("header__content-open");
        }
    });

})