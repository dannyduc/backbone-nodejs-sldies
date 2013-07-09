define(['backbone', 'helpers'], function (Backbone, Helpers) {
    var Slide = Backbone.View.extend({

        className: 'slide',

        render: function () {
            var contentType = this.getContentType();
            this['render' + Helpers.capitalize(contentType)]();
            return this;
        },

        getContentType: function () {
            if (this.model.get('image')) {
                return 'image';
            } else if (this.model.get('snippet')) {
                return 'snippet';
            } else if (this.model.get('quote')) {
                return 'quote';
            } else if (this.model.get('bullets')) {
                return 'bullets';
            } else {
                return 'heading';
            }
        },

        renderHeading: function() {
            this.$el.append(
                '<h1' + ' class="' + this.model.get('size') + '">'
                    + this.model.get('title')
                    + '</h1>'
            );
        },

        renderImage: function() {
            this.$el
                .addClass('image')
                .append('<img src="' + this.model.get('image') + '">');
        },

        renderSnippet: function() {
            var self = this;
            var snippet = this.model.get('snippet');

            this.$el.addClass('snippet');

            if (this.model.get('title')) {
                this.renderHeading();
            }

            if ($.isPlainObject(snippet)) {
                return _.each(snippet, function(snippetPath, heading) {
                    self.setSnippet(snippetPath, heading)
                });
            }

            self.setSnippet(snippet);
        },

        setSnippet: function(snippetPath, heading) {
            var self = this;
            $.get(snippetPath, function(snippet) {
                self.$el
//                    .append(heading)
                    .append('<pre class="prettyprint">' + _.escape(snippet) +'</pre>');

                prettyPrint();
            });
        },

        renderBullets: function() {
            var el = this.$el;

            el.addClass('bullets')

            if (this.model.get('title')) {
                el.append('<h1>' + this.model.get('title') + '</h1>');
            }

            el
                .append([
                    '<ul>',
                        '<li>' + this.model.get('bullets').join('</li><li>'),
                    '</ul>'
                ].join(''));
        },

        renderQuote: function() {
            this.$el
                .addClass('quote')
                .append([
                    '<figure>',
                    '<blockquote>',
                    this.model.get('quote'),
                    '</blockquote>',
                    '<figcaption>',
                    '<cite>',
                    this.model.get('cite'),
                    '</cite>',
                    '</figcaption>',
                    '</figure>'
                ].join(''));
        }
    });

    return Slide;
});