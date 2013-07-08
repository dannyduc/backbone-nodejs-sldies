require.config({

    shim: {
        "backbone": {
            deps: ["../bower_components/underscore/underscore",
                   "jquery"],
            exports: "Backbone"
        }
    },

    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone'
    }
});

require(['backbone'], function (Backbone) {
    'use strict';
    console.log(Backbone);

});
