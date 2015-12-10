var myModule = (function () {
    
    var init = function () {
        _setUpListeners();
        // то, что должно произойти сразу!
    };
    
    var _setUpListeners = function () {
        $('#add-new-item').on('click', _showModal); // открыть модальное окно
        // прослушка событий...
    };
    
    var _showModal = function (ev) {
        console.log('Вызов модального окна');
        ev.preventDefault(); // отмена стандартного поведения
        $('#add-project-popup').bPopup({
            speed: 650,
            transition: 'slideDown'
        });
    };
    
    return {
        init: init
    };
    
})();

myModule.init();