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

require(['models/slide', 'views/slide'], function (SlideModel, SlideView) {
    var slide = new SlideModel({ title: 'My First Slide' });
    var slideView = new SlideView({ model: slide });
    slideView.render();
    console.log(slideView.el);
});
