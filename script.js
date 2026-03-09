// Слайдер для оккультного магазина
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Создаем точечки (индикаторы)
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.index = i;
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.dataset.index));
        });
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.dot');
    
    // Функция для переключения слайда
    function goToSlide(index) {
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        
        slider.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        
        // Обновляем активную точечку
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Слушатели кнопок
    prevBtn.addEventListener('click', function() {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        goToSlide(currentIndex + 1);
    });
    
    // Клавиатура (стрелки влево/вправо)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
        }
    });
    
    // Автоматическая смена слайдов (опционально, можно убрать если не нужно)
    let autoSlide = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000); // Меняется каждые 5 секунд
    
    // Останавливаем автосмену при наведении мыши
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    // Возобновляем когда убрали мышь
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
    
    // Инициализация (первая точечка активна)
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
    
    // Кнопки "Призвать" показывают сообщение
    const buttons = document.querySelectorAll('.occult-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Находим название товара
            const slideContent = this.closest('.slide-content');
            if (slideContent) {
                const productName = slideContent.querySelector('h3').textContent;
                alert(`🔥 Товар "${productName}" призван из тени! 🔥`);
            } else {
                alert('🔥 Ритуал призыва начался! 🔥');
            }
        });
    });
    
    console.log('Лес ожил... Слайдер готов к ритуалу');
});