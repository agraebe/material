(function ( $ ) {
 
    $.fn.material = function() {
        // make sure its a list
        if($(this).is('ul')) {
            // apply list style
            $(this).addClass('list');

            // apply list item style
            $(this).children().each(function(i) {
                $(this).addClass('list-item');
                $(this).prepend('<div class="circle">');
            });

            // add onclick animation
            $('.list-item').bind('click', function(e) {
                // get new circle position
                var newTop = $(this).height()/2 + $('.circle').height()/2;
                var newLeft = event.pageX - $(this).offset().left - ($('.circle').width()/2) - 15;

                // set new position
                $(this).find(".circle").css( {top: newTop, left: newLeft } );

                // animate card background
                $(this).addClass('cardClicked');

                // let, midlle or right click?
                var xratio = newLeft/$(this).width();
                if(xratio > 0.6) {
                    $(this).find(".circle").addClass('circleClickedRight');
                } else if(xratio > 0.1) {
                    $(this).find(".circle").addClass('circleClickedMiddle');
                } else {
                    $(this).find(".circle").addClass('circleClickedLeft');
                }

                // remove all animation classes
                $('body').on(
                "transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd",
                function() {
                    $('.circle').removeClass('circleClickedRight');
                    $('.circle').removeClass('circleClickedMiddle');
                    $('.circle').removeClass('circleClickedLeft');
                    $('.list-item').removeClass('cardClicked');
                }
                );
            });
        }

        return this;
    };
 
}( jQuery ));