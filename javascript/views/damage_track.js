var DamageTrackView =
{
	clear: function()
	{
		$(this.options.id).update();
	},

	add_hit_boxes: function(boxes)
	{
		var control = $(this.options.id);
		boxes.length.times(function()
		{
			control.insert('<div></div>');
		});
	}
};
