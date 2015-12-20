//Модуль добавления проекта
var myAddProjectModal = (function () {
    
    var _bpopup;

    // инициализация проекта
    var init = function () {
        _setUpListeners();
        // то, что должно произойти сразу!
    };

    // Для fileupload: получаем название файла из пути
    var _getNameFromPath = function (path) {
        return path.replace(/\\/g, '/').replace(/.*\//, '');
    };   

    // Прослушка событий
    var _setUpListeners = function () {
        $('#add-new-item').on('click', _showModal); // открыть модальное окно
        $('#fileupload').on('change', _changeFileUpload); // вывод пути к картинке
        $('#add-new-project').on('submit', _addProject); // добавление нового проекта
        $('#b-close-addform').on('click', _clearAddForm); // очистить форму при закрытии окна по кнопке
        $('body').on('click', '.b-modal', function() {   // очистить форму при закрытии окна по области вне Popup
            _clearAddForm();  
            _bpopup.close();
        });
    };
    
    // Вызов модального окна - bpopup
    var _showModal = function (ev) {
        console.log('Вызов модального окна');
        ev.preventDefault(); // отмена стандартного поведения

        _bpopup = $('#add-project-popup').bPopup({
            speed: 650,
            transition: 'slideDown',
            modalClose: false
        });
    };

    // fileupload
    var _changeFileUpload = function () {
        console.log('Вывод имени загруженного файла');
        var input = $(this), // инпут type="file"
                        name = _getNameFromPath(input.val()); // имя загруженного файла
        $('#filename')
                .val(name) // изменить имя загруженного файла
                .trigger('hideTooltip')
                .removeClass('has-error');
    };
    
    // Добавление нового проекта
    var _addProject = function (ev){

          ev.preventDefault();

          var form = $(this),
              url = $(this).attr('action'),
              validAddForm = (!validation.validateForm(form)) ? false : true; // Проверка на валидацию
              defObject = _ajaxForm(form, url, validAddForm);

          if (defObject) {
                // TODO: ..дальнейшие действия с ответом с сервера
          }
        };

    // TODO: отправка данных из формы добавления проектов на сервер 
    var _ajaxForm = function (form, url, validAddForm) {

          if (!validAddForm) return false;  // Возвращает false, если не проходит валидацию
          var data = form.serialize(); // собираем данные из формы в объект data

          return $.ajax({ // Возвращает Deferred Object
            type: 'POST',
            url: url,
            dataType : 'JSON',
            data: data
          }).fail( function(ans) {
            console.log('Проблемы в PHP');
            form.find('.error-mes').text('На сервере произошла ошибка').show();
          });
    };

    // Очистить форму bpopup (при закрытии)
    var _clearAddForm = function () {
        
        console.log('Убираем тултипы');
        $('.add-input').trigger('hideTooltip');  // удаляем тултипы
        $('.add-textarea').trigger('hideTooltip');  // удаляем тултипы

        console.log('Убираем красную подсветку и сообщения');
        $('.has-error').removeClass('has-error'); // удаляем красную подсветку
        $('.error-mes, success-mes').text('').hide(); // очищаем и прячем сообщения с сервера

        console.log('Сбрасываем введенные данные');
        $('.add-input').val('');  // сброс введенных данных
        $('.add-textarea').val(''); // сброс введенных данных
    }; 

    return {
        init: init
    };
    
})(); // самовызывающаяся функция

// Вызываем модуль если есть добавление проекта на странице
if ('#add-new-item') {
    myAddProjectModal.init();
}
