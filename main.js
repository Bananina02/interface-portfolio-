document.addEventListener("DOMContentLoaded", function() {
    // Инициализация selectric
    if ($('form select').length) {
        $('form select').selectric();
    }

    // Обработчик для кнопки закрытия
    let btnClose = document.querySelector('.btn-close');
    if (btnClose) {
        btnClose.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.remove();
        });
    }

    // Изменение имени пользователя для мобильных устройств
    if (window.innerWidth < 766) {
        const accountName = document.querySelector('.user-name');
        if (accountName) {
            const fullName = accountName.textContent;
            const spaceIndex = fullName.indexOf(' ');

            if (spaceIndex !== -1) {
                const firstName = fullName.substring(0, spaceIndex);
                const lastName = fullName.substring(spaceIndex + 1);
                accountName.textContent = `${firstName.charAt(0)}. ${lastName}`;
            }
        }
    }

    // Обработчик клика для фильтров
    if ($('.filter-inside').length) {
        $('.filter-inside').click(function(event) {
            event.preventDefault();
            $(this).toggleClass('active');
            $(this).closest('.filter-item').find('.filter-inside-body').slideToggle();
        });
    }

    // Инициализация Scrollbar
    const tableContainer = document.querySelector('.table-container');
    const filterWrapper = document.querySelector('.filter-wrapper-inside');
    const checkboxItems = document.querySelector('.checkbox-items');

    if (Scrollbar) {
        if (tableContainer) Scrollbar.init(tableContainer);
        if (filterWrapper) Scrollbar.init(filterWrapper);
        if (checkboxItems) Scrollbar.init(checkboxItems);
    }

    // Инициализация Flatpickr
    const datePickerElement = document.getElementById("data-picker");
    if (datePickerElement && typeof flatpickr === 'function') {
        const datePicker = flatpickr(datePickerElement, {
            mode: "range",
            inline: true,
            dateFormat: "Y-m-d",
            locale: {
                firstDayOfWeek: 1,
                weekdays: {
                    shorthand: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    longhand: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
                },
                months: {
                    shorthand: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                    longhand: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
                }
            },
            onChange: function(selectedDates, dateStr) {
                const formattedDate = dateStr.replace(/ to /, " —\n ");
                console.log("Выбранные даты:", formattedDate);
                datePickerElement.value = formattedDate;
            }
        });

        datePickerElement.addEventListener("focus", function() {
            datePicker.open();
        });
    }
});