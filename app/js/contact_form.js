// Модуль формы контактов
var myContactModal = (function () {

	// Инициализация формы контактов
	var init = function () {
		_setUpListeners();
	};

	// Прослушка событий
	var _setUpListeners = function () {
		$('#contact-form').on('submit', _sendContact); // отправка контактов
	};

	// Отправка контактов
	var _sendContact = function (ev) {

          ev.preventDefault();

          var form = $(this),
              url = $(this).attr('action'),
              validContactForm = (!validation.validateForm(form)) ? false : true; // Проверка на валидацию
              defObject = _ajaxForm(form, url);

          if (defObject) {
                // TODO: ..дальнейшие действия с ответом с сервера
          }
        };

    // TODO: отправка данных из формы контактов на сервер   
    var _ajaxForm = function (form, url, validContactForm) {

          if (!validContactForm) return false;  // Возвращает false, если не проходит валидацию
          var data = form.serialize(); // собираем данные из формы в объект data

          return $.ajax({ // Возвращает Deferred Object
            type: 'POST',
            url: url,
            dataType : 'JSON',
            data: data
          }).fail( function(ans) {
            console.log('Проблемы в PHP');
            form.find('.error-mes').text('').show();
          });
    };

    return {
    	init: init
    };

}) (); //самовызывающаяся функция

// Вызываем модуль если есть форма контактов на странице
if ('#contact-form') {
  myContactModal.init();
}

