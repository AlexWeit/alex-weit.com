// Модуль валидации
var validation = (function (){

	var init = function(){
		console.log('Инициализация модуля validation');
		_setUpListners();
	},

	validateForm = function (form) { // Проверяет, чтобы все поля формы были не пустыми. Если пустые - вызывает тултипы
	    console.log('Проверяем форму');

	    var inputs = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
	        valid = true;

	    $.each(inputs, function(index, val) {
	        var element = $(val),
	            val = element.val(),
	            pos = element.attr('qtip-position');

	        if(val.length === 0){
	            element.addClass('has-error');
	            _createQtip(element, pos);
	            valid = false;
	        }

	    }); // each

	    return valid;
    },

    // Прослушка событий
	_setUpListners = function () { 
	    $('#add-new-project, #contact-form').on('keydown', '.has-error', _removeError); // удаляем красную обводку у элементов форм
	    $('#add-new-project, #contact-form').on('reset', _clearForm); // при сбросе формы контактов удаляем также: тултипы, обводку, сообщение от сервера
	},

	// Убираем красную обводку у элементов формы
    _removeError = function() { 
	    console.log('Красная обводка у элементов форм удалена');

	    $(this).removeClass('has-error');
	},

	// Очистка формы контактов
	_clearForm = function(form) { 
	    console.log('Очищаем форму контактов');

	    var form = $(this);
	    form.find('.form-text').trigger('hideTooltip'); // удаляем тултипы
	    form.find('.has-error').removeClass('has-error'); // удаляем красную подсветку
	    //form.find('.error-mes, success-mes').text('').hide(); // очищаем и прячем сообщения с сервера
	},

	// Создаём тултипы
	_createQtip = function (element, position) { 
	    console.log('Создаем тултип');

	    // позиция тултипа
	    if (position === 'right') {
	        position = {
	        	my: 'left center',
	            at: 'right center'
	        }
	    } else {
	        position = {
	            my: 'right center',
	            at: 'left center',
	            adjust: {
	                method: 'shift none'
	            }
	        }
	    }

	    // инициализация тултипа
	    element.qtip({
	        content: {
	        	text: function() {
	            	return $(this).attr('qtip-content');
	        	}
	        },
	        show: {
	            event: 'show'
	        },
	        hide: {
	            event: 'keydown hideTooltip'
	        },
	        position: position,
	        style: {
	            classes: 'qtip-mystyle qtip-rounded',
	            tip: {
	            	height: 7,
	            	width: 10,
	            	border: 0
	            }
	        }
	      }).trigger('show');
    	};

	return {
		init: init,
		validateForm: validateForm
	};

})();

validation.init();
