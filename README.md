# FishPig_LazyKnockoutJs
By default, Magento 2 bootstraps Knockout JS and this adds 50+ extra JS files to each request.

This module stops Knockout.js from being preloaded but still allows it to be loaded explicitly when required. 

The module also replaces the Messages system with it's own implementation.

This reduces the number of JS requests for any page by 50.

`composer require fishpig/magento2-lazy-knockout-js && bin/magento module:enable FishPig_KnockoutJs`
