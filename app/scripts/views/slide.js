define(['backbone'], function (Backbone) {
    var Slide = Backbone.View.extend({

        className: 'slide',

        render: function () {

            if (this.model.get('image')) {
                this.renderImage();
            } else if (this.model.get('snippet')) {
                this.renderSnippet();
            } else if (this.model.get('quote')) {
                this.renderQuote();
            } else if (this.model.get('bullets')) {
                this.renderBullets();
            } else {
                this.renderHeading();
            }

            return this;
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