define(['backbone', 'views/slide'], function (Backbone, SlideView) {
    var SlidesView = Backbone.View.extend({

        el: $('.slides'),

        initialize: function () {
            this.currentSlideIndex = 1;
            this.numSlides = this.collection.length;
            this.transitionSpeed = 400;
            this.renderAll();

            App.Vent.on('init', this.hideAllButFirst, this);
            App.Vent.on('changeSlide', this.changeSlide, this);
        },

        hideAllButFirst: function() {
            this.$el.children(':nth-child(n+2)').hide();
        },

        changeSlide: function(opts) {
            var self = this;
            var slides = this.$el.children();
            var newSlide;

            this.setCurrentSlideIndex(opts);
            newSlide = this.getNextSlide(slides);
            this.animateToNewSlide(slides, newSlide, opts.direction);

            App.router.navigate('/slides/' + this.currentSlideIndex);
        },

        getNextSlide: function(slides) {
            return slides.eq(this.currentSlideIndex - 1);
        },

        animateToNewSlide: function(slides, newSlide, direction) {

            slides.filter(':visible')
                .css('position', 'absolute') // TEMPORARY
                .animate({
                    top: direction === 'next' ? '100%' : '-100%',
                    opacity: 'hide'
                }, this.transitionSpeed, function() {
                    // slide is gone from view
                    $(this).css('top', 0);

                    // bring new slide into view
                    newSlide
                        .css('position', 'absolute') // TEMPORARY
                        .css('top', direction === 'next' ? '-100%' : '100%')
                        .animate({
                            top: 0,
                            opacity: 'show'
                        }, self.transitionSpeed)
                });
        },

        setCurrentSlideIndex: function(opts) {

            // if we're requesting a special slide
            // then set current index
            if (opts.slideIndex) {
                return this.currentSlideIndex = ~~opts.slideIndex
            }

            this.currentSlideIndex += opts.direction === 'next' ? 1 : -1;
            if (this.currentSlideIndex > this.numSlides) {
                this.currentSlideIndex = 1;
            }

            if (this.currentSlideIndex <= 0) {
                this.currentSlideIndex = this.numSlides;
            }

//            debugger;
        },

        renderAll: function () {
            this.$el.empty();
            this.collection.each(this.render, this);
        },

        render: function (slide) {
            var slideView = new SlideView({ model: slide });
            this.$el.append(slideView.render().el);
        }
    });

    return SlidesView;
});