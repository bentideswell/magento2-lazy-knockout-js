//
//
//
define([], function () {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function deleteCookie(name) {
        document.cookie = name + '=;path=/;';
    }

    return function (config, element) {
        try {
            var cookie = getCookie('mage-messages');

            if (!cookie) {
                return false;
            }

            var messages = JSON.parse(decodeURIComponent(getCookie('mage-messages')));
            var wrapper = document.querySelector('div[data-placeholder="messages"]');
            var template = document.getElementById('lazy-ko-message-template');

            if (messages.length > 0) {
                for (var i in messages) {
                    var text = messages[i]['text'], type = messages[i]['type'];
                    var html = template.innerHTML.replaceAll('<%= type %>', type).replaceAll('<%= text %>', text);
                    wrapper.innerHTML += html;
                }

                deleteCookie('mage-messages');
            }
        } catch (e) {
            window.alert(e);
        }
    }
});
