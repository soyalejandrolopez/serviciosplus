(function ($) {
    "use strict";

    var html = $('html');
    // WOW Animation
    function wowAnimation() {
        var wowAnimation = new WOW({
            mobile: false,
            live: false
        });
        wowAnimation.init();
    }

    $(document).ready(function() {
        
        // Parallax
        function parallaxItem() {
            var $items = $('.parallax-item');
            if ($items.length) {
                $items.each(function () {
                    var $currentItem = $(this),
                        $y = Math.floor(Math.random() * (-100 - (-25)) + (-25));
                    $currentItem.attr(
                        'data-parallax',
                        '{"y": ' + $y + ', "smoothness": ' + '30' + '}'
                    );
                });
            }

            initParallax();
        }

        function initParallax() {
            var parallaxInstances = $('[data-parallax]');

            if (parallaxInstances.length && !html.hasClass('touchevents') && typeof ParallaxScroll === 'object') {
                ParallaxScroll.init();
            }
        }

        // Venobox Active
        new VenoBox({
            selector: '.dl-video-popup, .dl-img-popup, .dl-lightbox',
            bgcolor: 'transparent',
            numeration: true,
            infinigall: true,
            spinner: 'plane',
        });

        wowAnimation();
        parallaxItem();

        // Progress Features List
        gsap.registerPlugin(ScrollTrigger);
        const featureItems = gsap.utils.toArray(".el-feature-items .el-feature-item");
        featureItems.forEach((item, index) => {
            gsap.to(item.querySelector('.el-feature-line-progress'), {
                height: 100 + '%',
                ease: 'sine.out',
                duration: 4,
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom-=50',
                    end: 'bottom bottom-=50',
                    scrub: 0.3
                }
            });
            gsap.to(item.querySelector('.el-feature-count'), {
                backgroundColor: 'var(--softgen-primary-color, #4b83ff)',
                boxShadow: '0px 0px 0px 5px var(--softgen-feature-circle-bd)',
                color: 'var(--softgen-feature-count-color)',
                ease: "sine.out",
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom-=50',
                    end: 'bottom bottom-=50',
                    scrub: 0.3
                }
            });
        });

        if(softgen_smooth_scroll.status){
            const lenis = new Lenis();
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time)=>{
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }

    });

    $(window).on('elementor/frontend/init', function () {
        
        // Advanced Background
        elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function ($scope) {
            if ($scope.hasClass('animated-dots-yes')) {
                $scope.prepend('<div class="animated-dots"><span class="dot lf-left-right"></span><span class="lf-up-down"></span><span class="lf-up-down"></span><span class="lf-rotate-center"></span><span class="lf-left-right"></span><span class="lf-rotate-center"></span></div>');
            }
            if ($scope.hasClass('animated-bg-yes')) {
                $scope.prepend('<div class="animated-bg"><span></span></div>');
            }
            if ($scope.hasClass('adv-bg-yes')) {
                $scope.prepend('<div class="adv-bg"></div>');
                if( $scope.hasClass('adv-ov-bg-yes') ) {
                    $scope.find('.adv-bg').append('<div class="adv-overlay-bg"></div>');
                }
            }

            if ($scope.hasClass('sg-parallax-img-1-yes')) {
                $scope.prepend('<div class="sg-parallax-img sg-parallax-img-1 parallax-item"></div>');
            }

            if ($scope.hasClass('sg-parallax-img-2-yes')) {
                $scope.prepend('<div class="sg-parallax-img sg-parallax-img-2 parallax-item"></div>');
            }
            
            wowAnimation();
            
        });

    } );

})(jQuery);