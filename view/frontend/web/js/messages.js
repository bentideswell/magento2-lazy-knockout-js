//
//
//
define([
    'jquery',
    'Magento_Customer/js/customer-data',
    'underscore',
    'escaper',
    'jquery/jquery-storageapi'
], function ($, customerData, _, escaper) {
    'use strict';

    return function (config, element) {
        // Helper functions
        function prepareMessageForHtml(message) {
            return escaper.escapeHtml(
                message,
                config.allowedTags ? config.allowedTags : ['div', 'span', 'b', 'strong', 'i', 'em', 'u', 'a']
            );
        }

        function renderMessage(message) {
            renderedMessages.push(
                messageTemplate({
                    type: message.type,
                    text: prepareMessageForHtml(message.text)
                })
            );
        }

        // Init variables
        var messageTemplate = _.template(document.getElementById('lazy-ko-message-template').innerHTML);
        var messageTarget = document.querySelector('div[data-placeholder="messages"]');
        var renderedMessages = [];
        var cookieMessages = _.unique($.cookieStorage.get('mage-messages'), 'text');
        var messages = customerData.get('messages').extend({
            disposableCustomerData: 'messages'
        });

        // Force to clean obsolete messages
        if (!_.isEmpty(messages().messages)) {
            customerData.set('messages', {});
        }

        $.mage.cookies.set('mage-messages', '', {
            samesite: 'strict',
            domain: ''
        });

        // Render messages
        _.forEach(cookieMessages, renderMessage);
        _.forEach(messages().messages, renderMessage);

        if (renderedMessages.length > 0) {
            messageTarget.innerHTML = renderedMessages.join('');
        } else {
            messageTarget.remove();
        }
    }
});
