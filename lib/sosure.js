/**
 * so-sure Javascript Client
 * @author so-sure Ltd [tech@so-sure.com]
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0.html|Apache 2.0}
 */
var SoSure = SoSure || {};
SoSure.widget = SoSure.widget || {};

/**
 * Initialize SoSure with your api key
 * @public
 * @constructor
 * @param {string} apiKey - Your api key
 * 
 */
SoSure.widget = function(apiKey) {
    this.apiKey = apiKey;
    this.rotation = null;
    this.size = 'MediumRectangle';
    this.cdnBaseUrl = 'https://cdn.so-sure.com/images/rebrand';
    this.cssUrl = './lib/sosure.css';
    this.id = Math.floor((Math.random() * 1000000) + 1);
    this.callback = 'sosure_cb_' + this.id;
    
    this.debugCss = false;
    this.debugJs = true;
    this.debugLoading = false;
    this.debug = false;
    
    if (this.debugCss) {
        this.cssBaseUrl = '';
    }

    this.future = false;
    this.displayElement = 'sosure-display';

    this.getMainDiv = function() {
        if (this.size === 'MediumRectangle') {
            return 'sosure-css-medium-rectangle';
        } else if (this.size === 'SlimRectangle') {
            return 'sosure-css-slim-rectangle';
        } else if (this.size === 'Leaderboard') {
            return 'sosure-css-leaderboard';
        } else if (this.size === 'WideSkyscraper') {
            return 'sosure-css-wide-skyscrapper';
        }
        
        return null;
    };

    this.getBgDiv = function() {
        if (this.size === 'MediumRectangle') {
            return 'sosure-css-bg-medium-rectangle';
        } else if (this.size === 'SlimRectangle') {
            return 'sosure-css-bg-slim-rectangle';
        } else if (this.size === 'Leaderboard') {
            return 'sosure-css-bg-leaderboard';
        } else if (this.size === 'WideSkyscraper') {
            return 'sosure-css-bg-wide-skyscrapper';
        }
        
        return null;
    };

    this.getLoadingDiv = function() {
        if (this.size === 'MediumRectangle') {
            return 'sosure-css-loading-medium-rectangle';
        } else if (this.size === 'SlimRectangle') {
            return 'sosure-css-loading-slim-rectangle';
        } else if (this.size === 'Leaderboard') {
            return 'sosure-css-loading-leaderboard';
        } else if (this.size === 'WideSkyscraper') {
            return 'sosure-css-loading-wide-skyscrapper';
        }
        
        return null;
    };

    this.getMaxNameSize = function() {
        if (this.size === 'MediumRectangle') {
            return 35;
        } else if (this.size === 'SlimRectangle') {
            return 30;
        } else if (this.size === 'Leaderboard') {
            return 45;
        } else if (this.size === 'WideSkyscraper') {
            return 20;
        }

        return 0;
    };
    
    this.getMaxDescSize = function() {
        if (this.size === 'MediumRectangle') {
            return 90;
        } else if (this.size === 'SlimRectangle') {
            return 90;
        } else if (this.size === 'Leaderboard') {
            return 90;
        } else if (this.size === 'WideSkyscraper') {
            return 150;
        }

        return 0;
    };

    this.areTermsSameLine = function() {
        if (this.size === 'WideSkyscraper') {
            return false;
        }

        return true;
    };

    this.getLogoDiv = function() {
        var url = 'https://wearesosure.com?utm_source=widget&utm_medium=' + this.size + '&utm_campaign=';
        var logoLink = this.createLink(url, '_blank');
        logoLink.appendChild(this.createImage(this.cdnBaseUrl + '/logo/so-sure_logo-blue.png'));
        //logoLink.appendChild(this.createSpan('SoSure'));
        var logoDiv = this.createDiv('sosure-css-logo');
        logoDiv.appendChild(logoLink);
        return logoDiv;
    };

    this.displayQuote = function() {
        /*
        var item = this.data[this.currentPosition];
        var url = item.discount_url;
        var linkButtonImage = '/GetTheDeal.png';
        if (item.discount_code) {
            url = item.discount_url + '&code=' + item.discount_code;
            linkButtonImage = '/GetTheVoucher.png';
        }
*/

        var rootDiv = this.createDiv('sosure-css');
        var mainDiv = this.createDiv(this.getMainDiv() + ' cleanslate');
        rootDiv.appendChild(mainDiv);
        mainDiv.appendChild(this.createDiv(this.getBgDiv()));
/*
        var image = this.createImage(item.merchant_image, item.merchant_name);
        var imageDiv = this.createDiv('sosure-css-image');
        imageDiv.appendChild(image);

        var imageWrapperDiv = this.createDiv('sosure-css-image-wrapper');
        imageWrapperDiv.appendChild(imageDiv);
        mainDiv.appendChild(imageWrapperDiv);

        var nameDiv = this.createDiv('sosure-css-name', null, item.merchant_name, this.getMaxDescSize());
        mainDiv.appendChild(nameDiv);

        var descrDiv = this.createDiv('sosure-css-descr');
        var descrWrapDiv = this.createDiv('sosure-css-descr-wrap', null, item.discount_title, this.getMaxDescSize());
        descrDiv.appendChild(descrWrapDiv);
        mainDiv.appendChild(descrDiv);

        var linkImage = this.createImage(this.cdnBaseUrl + linkButtonImage);
        var linkRef = this.createLink(url, '_blank');
        linkRef.appendChild(linkImage);
        var linkDiv = this.createDiv('sosure-css-deal-button');
        linkDiv.appendChild(linkRef);
        mainDiv.appendChild(linkDiv);

        var termsLink = null;
        if (typeof item.discount_restrictions !== 'undefined') {
            termsLink = document.createElement('a');
            termsLink.id = 'sosure-terms-button-' + this.id;
            if (this.areTermsSameLine()) {
                termsLink.innerHTML = 'T&C';
            } else {
                termsLink.innerHTML = 'Terms & Conditions';
            }
        }

        var ends = 'Ends ' + this.formatDate(item.discount_expiry);

        if (!this.areTermsSameLine()) {
            var endsDiv = this.createDiv('sosure-css-ends');
            endsDiv.appendChild(this.createSpan(ends));
            mainDiv.appendChild(endsDiv);
            if (termsLink) {
                var termsDiv = this.createDiv('sosure-css-terms');
                termsDiv.appendChild(termsLink);
                mainDiv.appendChild(termsDiv);
            }
        } else {
            var endsTermsDiv = this.createDiv('sosure-css-ends-terms');
            if (termsLink) {
                ends = ends + ' - ';
            }
            endsTermsDiv.appendChild(this.createSpan(ends));
            if (termsLink) {
                endsTermsDiv.appendChild(termsLink);
            }
            mainDiv.appendChild(endsTermsDiv);
        }
        mainDiv.appendChild(this.getLogoDiv());

        var prevDiv = this.createDiv('sosure-css-left-button', 'sosure-prev-button-' + this.id, '&nbsp;');
        var nextDiv = this.createDiv('sosure-css-right-button', 'sosure-next-button-' + this.id, '&nbsp;');
        mainDiv.appendChild(prevDiv);
        mainDiv.appendChild(nextDiv);
        */
        this.displayObj(rootDiv);
        /*
        var linkButton = '<a target="_blank" href="' + url + '"><img src="' + this.cdnBaseUrl + linkButtonImage + '" /></a>';
        var descr = '<div class="sosure-css-descr-wrap" title="' + item.discount_title + '">' + this.ellipsize(item.discount_title, this.getMaxDescSize()) + '</div>';
        var itemHtml = '<div class="sosure-css"><div class="' + this.getMainDiv() + ' cleanslate">' +
               '<div class="' + this.getBgDiv() + '"></div>' + 
               '<div class="sosure-css-image-wrapper"><div class="sosure-css-image">' + image + '</div></div>' +
               '<div class="sosure-css-name" title="' + item.merchant_name + '">' + this.ellipsize(item.merchant_name, this.getMaxNameSize()) + '</div>' +
               '<div class="sosure-css-descr">' + descr + '</div>' +
               '<div class="sosure-css-deal-button">' + linkButton + '</div>' +
               termsLine +
               this.getLogoDiv() +
               '<div id="sosure-prev-button-' + this.id + '" class="sosure-css-left-button">&nbsp;</div>' +
               '<div id="sosure-next-button-' + this.id + '" class="sosure-css-right-button">&nbsp;</div>' +
               '</div></div>';
        this.displayHtml(itemHtml);
        */
    };
    
    this.formatDate = function(date) {
        var actualDate = new Date(date);
        return actualDate.getDate() + '/' + (actualDate.getMonth() + 1) + '/' + actualDate.getFullYear().toString().substring(2,4);
    };

    this.importScript = function(url) {
        window[this.callback] = function(data) {
            this.data = data;
            this.displayCurrent();
        }.bind(this);
        var scriptId = 'sosure-import-script-' + this.id;
        if (!document.getElementById(scriptId))
        {
            var head  = document.getElementsByTagName('head')[0];
            var script  = document.createElement('script');
            script.id   = scriptId;
            script.type = 'text/javascript';
            script.src = url;
            head.appendChild(script);
        }
    };

    this.importCss = function() {
        var head  = document.getElementsByTagName('head')[0];
        var cssId = 'sosure-css-link';
        if (!document.getElementById(cssId))
        {
            var link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = this.cssUrl;
            link.media = 'all';
            head.appendChild(link);
        }        
    };

    this.ellipsize = function(name, maxLength) {
        if (name.length > maxLength) {
            return name.substring(0, maxLength - 3) + '...';
        }

        return name;
    };

    this.createImage = function(url, title) {
        var image = document.createElement('img');
        image.src = url;
        image.width=100;
        if (title) {
            image.title = title;
        }
        return image;
    };
    
    this.createLink = function(url, target) {
        var link = document.createElement('a');
        link.href = url;
        if (target) {
            link.target = target;
        }
        return link;
    };

    this.createSpan = function(text) {
        var span = document.createElement('span');
        span.innerHTML = text;
        return span;
    };

    this.createDiv = function(className, id, text, maxText) {
        var div = document.createElement('div');
        div.className = className;
        if (id) {
            div.id = id;
        }
        if (text && maxText) {
            div.title = text;
            div.innerHTML = this.ellipsize(text, maxText);
        } else if (text) {
            div.innerHTML = text;
        }
        return div;
    };
    
    this.displayTerms = function(id) {
        if (!document.getElementById(id)) {
            return;
        }

        this.stop();
        var item = this.data[this.currentPosition];

        //var image = '<img src="' + item.merchant_image + '" title="' + item.merchant_name + '" />';
        var rootDiv = this.createDiv('sosure-css');
        var mainDiv = this.createDiv(this.getMainDiv() + ' cleanslate');
        rootDiv.appendChild(mainDiv);
        mainDiv.appendChild(this.createDiv(this.getBgDiv()));

        var image = this.createImage(item.merchant_image, item.merchant_name);
        var imageDiv = this.createDiv('sosure-css-image');
        imageDiv.appendChild(image);

        var imageWrapperDiv = this.createDiv('sosure-css-image-wrapper');
        imageWrapperDiv.appendChild(imageDiv);
        mainDiv.appendChild(imageWrapperDiv);

        var termsDiv = this.createDiv('sosure-css-name', null, 'Terms');
        mainDiv.appendChild(termsDiv);

        var descrDiv = this.createDiv('sosure-css-descr', null, item.discount_restrictions, this.getMaxDescSize());
        mainDiv.appendChild(descrDiv);

        var closeDiv = this.createDiv('sosure-css-deal-button sosure-css-terms-close-button', 'sosure-terms-close-button-' + this.id);
        closeDiv.appendChild(this.createImage(this.cdnBaseUrl + '/goback.png'));
        mainDiv.appendChild(closeDiv);

        mainDiv.appendChild(this.getLogoDiv());

        this.displayObj(rootDiv);
        /*        
        var termsHtml = '<div class="sosure-css"><div class="' + this.getMainDiv() + ' cleanslate">' +
                '<div class="sosure-css-full-terms-close" id="sosure-close-button-' + this.id + '">X</div>' +
               '<div class="' + this.getBgDiv() + '"></div>' + 
               '<div class="sosure-css-image-wrapper"><div class="sosure-css-image">' + image + '</div></div>' +
               '<div class="sosure-css-name">Terms</div>' +
               '<div class="sosure-css-descr" title="' + item.discount_restrictions + '">' + this.ellipsize(item.discount_restrictions, this.getMaxDescSize()) + '</div>' +
               '<div class="sosure-css-deal-button sosure-css-terms-close-button" id="sosure-terms-close-button-' + this.id + '"><img src="' + this.cdnBaseUrl + '/goback.png" /></div>' +
               this.getLogoDiv() +
               '</div></div>';
        this.displayHtml(termsHtml);
        */
    };

    this.displayObj = function(obj) {
        if (document.getElementById(this.displayElement)) {
            var e = document.getElementById(this.displayElement);
            while (e.firstChild) {
                e.removeChild(e.firstChild);
            }
            e.appendChild(obj);
        }

        this.bindButtons();
    };

    this.displayHtml = function(value) {
        if (document.getElementById(this.displayElement)) {
            document.getElementById(this.displayElement).innerHTML = value;
        }

        this.bindButtons();
    };

    this.bindButtons = function() {
        if (document.getElementById('sosure-terms-button-' + this.id)) {
            document.getElementById('sosure-terms-button-' + this.id).onclick = function() {
                this.displayTerms('sosure-terms-button-' + this.id);
            }.bind(this);
        }
        
        if (document.getElementById('sosure-quote-button-' + this.id)) {
            document.getElementById('sosure-quote-button-' + this.id).onclick = function() {
                this.displayQuote();
            }.bind(this);
        }
        
        if (document.getElementById('sosure-close-button-' + this.id)) {
            document.getElementById('sosure-close-button-' + this.id).onclick = function() {
                this.displayCurrent();
            }.bind(this);
        }        

        if (document.getElementById('sosure-terms-close-button-' + this.id)) {
            document.getElementById('sosure-terms-close-button-' + this.id).onclick = function() {
                this.displayCurrent();
            }.bind(this);
        }
    };
    
    this.displayLoading = function() {
        var rootDiv = this.createDiv('sosure-css');
        var loadingDiv = this.createDiv(this.getLoadingDiv()+ ' cleanslate');
        var quoteButtonDiv = this.createDiv('sosure-css-quote-button', 'sosure-quote-button-' + this.id, 'Get a quote');
        loadingDiv.appendChild(this.getLogoDiv());
        loadingDiv.appendChild(quoteButtonDiv);
        rootDiv.appendChild(loadingDiv);
        this.displayObj(rootDiv);
        /*
        var html = '<div class="sosure-css"><div class="' + this.getLoadingDiv() + ' cleanslate">' +
                   this.getLogoDiv() +                
                   '</div></div>';
        this.displayHtml(html);
        */
    };
        
    this.load = function() {
        //var self = this;
        this.importCss();
        this.displayLoading();
        if (window.XMLHttpRequest) {
            /*
            var url = "https://api.so-sure.com/v1/quote/key" + "?order=" + this.order + '&future=' + this.future.toString();
            var xhttp = null;
            xhttp = new XMLHttpRequest();
            if ("withCredentials" in xhttp) {
               // Firefox 3.5 and Safari 4
                xhttp.open("GET", url, true);
                xhttp.setRequestHeader("Api-Key", this.apiKey);
                xhttp.onreadystatechange = function() {
                  if (xhttp.readyState === 4 && xhttp.status === 200) {
                    self.data = JSON.parse(xhttp.responseText);
                    self.displayCurrent();
                  }
                };
                if (!this.debugLoading) {
                    xhttp.send();
                }
            } else {
                url = "https://api.so-sure.com/v1/quote/key" + "?order=" + this.order + '&future=' + this.future.toString();
                this.importScript(url);
            }
            */
        } else {
            // Todo: iframe support?
        }
    };
};

SoSure.widget.prototype = {
    constructor: SoSure.widget,
    /**
     * Display the so-sure Widget
     * @public
     * @param {string} [size = MediumRectangle] - What size to display. Can be: "Leaderboard" [728x90], "MediumRectangle" [300x250], "SlimRectange" [250x300] or "WideSkyscraper" [160x600]
     * @param {Object.<string, number>=} [options={ displayElement: sosure-display }] Any additional options.
     */
    display: function(size, options) {
        if (size) {
            this.size = size;
        }
        if (!options) {
            options = {};
        }
        if (options.displayElement) {
            this.displayElement = options.displayElement;
        }
        
        this.load();
    }
};
