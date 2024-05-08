$(function () {
	$(".draggable").draggable();
	$(".droppable").droppable({
		drop: function (event, ui) {
			var dropped = ui.draggable;
			var droppedOn = $(this);
			$(dropped).detach().css({ top: 0, left: 0 }).appendTo(droppedOn);
		},
	});
});

//   $('.draggable').draggable({
//     snap: '.snap',
//     snapMode: 'inner',
//     snapTolerance: 50,
//     drag: function (event, ui) {
//         if ($(this).hasClass('snapped')) {
//             // var position = $('.snap').position();

//             // $(this).css({
//             //     top: position.top,
//             //     left: position.left
//             // });
//             // return false;
//         } else {
//             var draggable = $(this).data("uiDraggable");
//             $.each(draggable.snapElements, function (index, element) {
//                 if (element.snapping) {
//                     draggable._trigger("snapped", event, $.extend({}, ui, {
//                         snapElement: $(element.item)
//                     }));
//                 }
//             });
//         }
//     },
//     snapped: function (event, ui) {
//         $(this).addClass('snapped');
//     }
// });
