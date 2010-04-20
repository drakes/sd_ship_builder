var DamageTrackView =
{
	clear: function()
	{
		$(this.options.id).update();
	},

	render_hit_boxes: function(hit_boxes)
	{
		var control = $(this.options.id);
		for (var i = 0, l = hit_boxes.length; i < l; i++)
		{
			var symbol = hit_boxes[i] || '&nbsp;';
			control.insert('<div>' + symbol + '</div>');
		}
	}
};
