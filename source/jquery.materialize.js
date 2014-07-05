(function ( $ ) {
 
    $.fn.materialize = function( options ) {
        // Establish our default settings
        var settings = $.extend({
            circleColor         : '#dadada',
            backgroundColor     : '#fbfbfb',
            circleRadius        :  100,
            cornerAwareness     :  true,
            animationTime       :  800
        }, options);

        // make sure its a list
        if($(this).is('ul')) {
            // apply list style
            $(this).addClass('list');

            // apply list item style
            $(this).children().each(function(i) {
                $(this).addClass('list-item');
                $(this).prepend('<div class="circle">');
                $('.circle').css({
                    display: 'block',
                    position: 'relative',
                    opacity: '0',
                    top: '0',
                    left: '0'
                });
            });

            // generate css properties
            $('.circle').css({
                width: settings.circleRadius*2,
                height: settings.circleRadius*2,
                borderRadius: settings.circleRadius,
                marginTop: - settings.circleRadius*2
            });
            $('.list-item').css({transition : 'background '+(settings.animationTime*0.6)+'ms ease-in-out'});
            $('.circle').css('backgroundColor', settings.circleColor);
            // generate keyframe animation
            $.keyframe.define([{
                name: 'materialLeft',
                '0%': {'opacity': '1', 'transform': 'scale(1)'},
                '25%': {'transform': 'scale(2) translateX(10px)'},
                '75%': {'opacity': '0.5', 'transform': 'scale(2.5) translateX(20px)'},
                '100%': {'opacity': '0', 'transform': 'scale(2.5) translateX(20px)'}
            },{
                name: 'materialMiddle',
                '0%': {'opacity': '1', 'transform': 'scale(1)'},
                '25%': {'transform': 'scale(2)'},
                '75%': {'opacity': '0.5', 'transform': 'scale(2.5)'},
                '100%': {'opacity': '0', 'transform': 'scale(2.5)'}
            },{
                name: 'materialRight',
                '0%': {'opacity': '1', 'transform': 'scale(1)'},
                '25%': {'transform': 'scale(2) translateX(-10px)'},
                '75%': {'opacity': '0.5', 'transform': 'scale(2.5) translateX(-20px)'},
                '100%': {'opacity': '0', 'transform': 'scale(2.5) translateX(-20px)'}
            }]);

            // add onclick animation
            $('.list-item').bind('click', function(e) {
                // get new circle position
                var newTop = ($(this).height()/2) + settings.circleRadius;
                // replace to remove px from css string
                var newLeft = event.pageX - $(this).offset().left - settings.circleRadius - $('.list-item').css('padding-left').replace(/[^-\d\.]/g, '');

                // set new position
                $(this).find(".circle").css( {top: newTop, left: newLeft } );

                // animate card background
                $(this).css('backgroundColor', settings.backgroundColor);

                if(!settings.cornerAwareness) {
                    // play middle click animation always
                    $(this).find(".circle").playKeyframe({
                        name: 'materialMiddle',
                        duration: settings.animationTime,
                        timingFunction: 'ease-out'
                    });
                } else {
                    // let, midlle or right click?
                    var xratio = ((event.pageX - $(this).offset().left)/$(this).width());
                    if(xratio > 0.6) {
                        $(this).find(".circle").playKeyframe({
                            name: 'materialRight',
                            duration: settings.animationTime,
                            timingFunction: 'ease-out'
                        });
                    } else if(xratio > 0.3) {
                        $(this).find(".circle").playKeyframe({
                            name: 'materialMiddle',
                            duration: settings.animationTime,
                            timingFunction: 'ease-out'
                        });
                    } else {
                        $(this).find(".circle").playKeyframe({
                            name: 'materialLeft',
                            duration: settings.animationTime,
                            timingFunction: 'ease-out'
                        });
                    }
                }

                // remove all animation classes by the end of the animation
                $('body').on(
                "transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd",
                function() {
                    $('.list-item').css('backgroundColor', '#fff');
                    $(this).find(".circle").resetKeyframe();
                }
                );
            });

            return this;
        } else {
            // Wrong element given ...
            console.log('Hmm.. I need an UL element for styling purposes!');
            return null;
        }
    };
 
}( jQuery ));