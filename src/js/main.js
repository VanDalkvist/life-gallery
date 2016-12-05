(function () {

    var slider;

    var originalOptions = {
        closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar']
    };

    loadJSON('/data/photos.json', _initialize, function (err) {
        console.error(err);
    });

    function _initialize(images) {
        var firstSlide = {
            type: 'html',
            html: "<div class='hello-slide'><h1>Привет, дорогая! Хочу немного пробежаться по нашей молодости :) Захотелось напомнить как мы познакомились, как развлекались и здорово проводили время!</h1></div>",
            url: 'https://static1.squarespace.com/static/528fc8ffe4b070ad8ee97493/t/558c019ae4b08aeb04726a36/1435238813669/Ladybug+Saying+Hello!'
        };

        var startingTravelsSlide = {
            type: 'html',
            html: "<div class='hello-slide'><h1>А интересно, помнишь ли ты наше первое совместное путешествие? ))</h1><img src='http://blog.getyourguide.com/wp-content/uploads/2014/09/Introduction-to-Traveling.jpg' alt=''/></div>",
            url: 'http://blog.getyourguide.com/wp-content/uploads/2014/09/Introduction-to-Traveling.jpg'
        };

        var importantTravelSlide = {
            type: 'html',
            html: "<div class='hello-slide'><h1>Это путешествие было очень значимым для нас... Переломный момент завершен, и никто нас больше не остановит :) <img src='https://s-media-cache-ak0.pinimg.com/236x/e8/2a/a6/e82aa6bec7ef63e1c440fcb69c2a8cbb.jpg' alt=''/></h1></div>",
            url: 'https://s-media-cache-ak0.pinimg.com/236x/e8/2a/a6/e82aa6bec7ef63e1c440fcb69c2a8cbb.jpg'
        };

        var weddingSlide = {
            type: 'html',
            html: "<div class='hello-slide'><h1>То самый день!</h1><img src='http://www.artfulaspreycartoons.co.uk/ResizeImage.aspx?img=%2FWebsites%2Fbillasprey%2FPhotoGallery%2F4571191%2FLoveisWedding6.png&w=480&58955' alt=''/></div>",
            url: "http://www.artfulaspreycartoons.co.uk/ResizeImage.aspx?img=%2FWebsites%2Fbillasprey%2FPhotoGallery%2F4571191%2FLoveisWedding6.png&w=480&58955"
        };

        var moreTravelsSlide = {
            type: 'html',
            html: "<div class='hello-slide'><h1>Нам нужно больше путешествий! Они приносят мириады разных эмоций :)</h1><img src='https://s-media-cache-ak0.pinimg.com/564x/88/f7/ac/88f7acad3668f6c14e0b84bc133fec13.jpg' alt=''/></div>",
            url: "https://s-media-cache-ak0.pinimg.com/564x/88/f7/ac/88f7acad3668f6c14e0b84bc133fec13.jpg"
        };

        var theMiracle = {
            type: 'html',
            html: "<div class='hello-slide'><h1>The Miracle</h1><img src='http://www.8womendream.com/wp-content/uploads/miracles.jpg' alt='' /></div>",
            url: "http://www.8womendream.com/wp-content/uploads/miracles.jpg"
        };

        var finalSlide = {
            type: 'html',
            html: "<div class='hello-slide'><h1>Наша жизнь продолжается вместе с нашей Катенькой! Будем растить, любить, баловать :) Я безумно люблю тебя и доченьку!<br/><br/><a onclick='lifeGallery.close()'>Нажми тут, чтобы увидеть всё :)</a></h1><img src='https://st.kp.yandex.net/images/article/sm_2664366_07_201510201040285441.jpg' alt=''/></div>",
            url: "https://st.kp.yandex.net/images/article/sm_2664366_07_201510201040285441.jpg"

        };

        var vm = {
            defaultOptions: {
                escKey: false,
                closeOnVerticalDrag: false,
                closeEl: true,
                tapToClose: false,
                clickToCloseNonZoomable: false,
                closeElClasses: [],
                loop: false
            },
            close: function () {
                slider.close();

                _resetCloseOptions(vm.defaultOptions);
            }
        };

        var imageSlides = images.map(function (image) {
            return {
                type: 'image',
                image: image
            };
        });

        imageSlides.splice(36, 0, startingTravelsSlide);
        imageSlides.splice(93, 0, importantTravelSlide);
        imageSlides.splice(109, 0, weddingSlide);
        imageSlides.splice(115, 0, moreTravelsSlide);
        imageSlides.splice(224, 0, theMiracle);

        vm.slides = [firstSlide];
        Array.prototype.push.apply(vm.slides, imageSlides);
        vm.slides.push(finalSlide);

        window.lifeGallery = {
            close: vm.close
        };

        ko.applyBindings(vm, document.getElementsByClassName('slider')[0]);

        // var sound = new Howl({
        //     src: ['./music/The Beach Boys - WIBN.mp3'],
        //     loop: true
        // });
        //
        // sound.play();

        var initPhotoSwipeFromDOM = function (gallerySelector) {

            var parseThumbnailElements = function (el) {
                var thumbElements = el.childNodes,
                    numNodes = thumbElements.length,
                    items = [],
                    el,
                    childElements,
                    thumbnailEl,
                    size,
                    item;

                for (var i = 0; i < numNodes; i++) {
                    el = thumbElements[i];

                    // include only element nodes
                    if (el.nodeType !== 1) {
                        continue;
                    }

                    childElements = el.children;

                    size = el.getAttribute('data-size').split('x');

                    if (el.getAttribute('data-type') === 'html') {
                        item = {
                            html: el.getAttribute('data-info')
                        };

                        item.el = el; // save link to element for getThumbBoundsFn

                        items.push(item);
                        continue;
                    }

                    // create slide object
                    item = {
                        src: el.getAttribute('href'),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10),
                        author: el.getAttribute('data-author')
                    };

                    item.el = el; // save link to element for getThumbBoundsFn

                    if (childElements.length > 0) {
                        item.msrc = childElements[0].getAttribute('src'); // thumbnail url
                        if (childElements.length > 1) {
                            item.title = childElements[1].innerHTML; // caption (contents of figure)
                        }
                    }

                    var mediumSrc = el.getAttribute('data-med');
                    if (mediumSrc) {
                        size = el.getAttribute('data-med-size').split('x');
                        // "medium-sized" image
                        item.m = {
                            src: mediumSrc,
                            w: parseInt(size[0], 10),
                            h: parseInt(size[1], 10)
                        };
                    }
                    // original image
                    item.o = {
                        src: item.src,
                        w: item.w,
                        h: item.h
                    };

                    items.push(item);
                }

                return items;
            };

            // find nearest parent element
            var closest = function closest(el, fn) {
                return el && ( fn(el) ? el : closest(el.parentNode, fn) );
            };

            var onThumbnailsClick = function (e) {
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;

                var eTarget = e.target || e.srcElement;

                var clickedListItem = closest(eTarget, function (el) {
                    return el.tagName === 'A';
                });

                if (!clickedListItem) {
                    return;
                }

                var clickedGallery = clickedListItem.parentNode;

                var childNodes = clickedListItem.parentNode.childNodes,
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index;

                for (var i = 0; i < numChildNodes; i++) {
                    if (childNodes[i].nodeType !== 1) {
                        continue;
                    }

                    if (childNodes[i] === clickedListItem) {
                        index = nodeIndex;
                        break;
                    }
                    nodeIndex++;
                }

                if (index >= 0) {
                    openPhotoSwipe(index, clickedGallery);
                }
                return false;
            };

            var photoswipeParseHash = function () {
                var hash = window.location.hash.substring(1),
                    params = {};

                if (hash.length < 5) { // pid=1
                    return params;
                }

                var vars = hash.split('&');
                for (var i = 0; i < vars.length; i++) {
                    if (!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split('=');
                    if (pair.length < 2) {
                        continue;
                    }
                    params[pair[0]] = pair[1];
                }

                if (params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }

                return params;
            };

            var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
                var pswpElement = document.querySelectorAll('.pswp')[0],
                    gallery,
                    options,
                    items;

                items = parseThumbnailElements(galleryElement);

                // define options (if needed)
                options = {

                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                    getThumbBoundsFn: function (index) {
                        // See Options->getThumbBoundsFn section of docs for more info
                        var thumbnail = items[index].el.children[0],
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();

                        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
                    },

                    addCaptionHTMLFn: function (item, captionEl, isFake) {
                        if (!item.title) {
                            captionEl.children[0].innerText = '';
                            return false;
                        }
                        captionEl.children[0].innerHTML = '<h3>' + item.title + '</h3>' + '<br/>';
                        return true;
                    },

                };

                if (fromURL) {
                    if (options.galleryPIDs) {
                        // parse real index when custom PIDs are used
                        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                        for (var j = 0; j < items.length; j++) {
                            if (items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }

                // exit if index not found
                if (isNaN(options.index)) {
                    return;
                }


                var radios = document.getElementsByName('gallery-style');
                for (var i = 0, length = radios.length; i < length; i++) {
                    if (radios[i].checked) {
                        if (radios[i].id == 'radio-all-controls') {

                        } else if (radios[i].id == 'radio-minimal-black') {
                            options.mainClass = 'pswp--minimal--dark';
                            options.barsSize = {top: 0, bottom: 0};
                            options.captionEl = false;
                            options.fullscreenEl = false;
                            options.shareEl = false;
                            options.bgOpacity = 0.85;
                            options.tapToClose = true;
                            options.tapToToggleControls = false;
                        }
                        break;
                    }
                }

                if (disableAnimation) {
                    options.showAnimationDuration = 0;
                }

                _extend(options, vm.defaultOptions);

                // Pass data to PhotoSwipe and initialize it
                gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

                // see: http://photoswipe.com/documentation/responsive-images.html
                var realViewportWidth,
                    useLargeImages = false,
                    firstResize = true,
                    imageSrcWillChange;

                gallery.listen('beforeResize', function () {

                    var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
                    dpiRatio = Math.min(dpiRatio, 2.5);
                    realViewportWidth = gallery.viewportSize.x * dpiRatio;


                    if (realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200) {
                        if (!useLargeImages) {
                            useLargeImages = true;
                            imageSrcWillChange = true;
                        }

                    } else {
                        if (useLargeImages) {
                            useLargeImages = false;
                            imageSrcWillChange = true;
                        }
                    }

                    if (imageSrcWillChange && !firstResize) {
                        gallery.invalidateCurrItems();
                    }

                    if (firstResize) {
                        firstResize = false;
                    }

                    imageSrcWillChange = false;

                });

                gallery.listen('gettingData', function (index, item) {
                    if (item.html) return;

                    if (useLargeImages) {
                        item.src = item.o.src;
                        item.w = item.o.w;
                        item.h = item.o.h;
                    } else {
                        item.src = item.m.src;
                        item.w = item.m.w;
                        item.h = item.m.h;
                    }
                });

                gallery.init();

                slider = gallery;
            };

            // select all gallery elements
            var galleryElements = document.querySelectorAll(gallerySelector);
            for (var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i + 1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

            // Parse URL and open gallery if it contains #&pid=3&gid=1
            var hashData = photoswipeParseHash();
            if (hashData.pid && hashData.gid) {
                openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
            }
        };

        initPhotoSwipeFromDOM('.demo-gallery');

        function _resetCloseOptions(options) {
            options.closeEl = true;
            options.escKey = false;
            options.closeOnVerticalDrag = false;
            options.tapToClose = false;
            options.clickToCloseNonZoomable = false;
            options.closeElClasses = originalOptions.closeElClasses;
            options.loop = true;
        }

        function _extend(obj, props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    obj[prop] = props[prop];
                }
            }
        }
    }

    function loadJSON(path, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, false);
        xhr.send();
    }

})();