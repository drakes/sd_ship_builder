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
			var box = hit_boxes[i] || {};
			var value = box.value || '&nbsp;';
			var css_class = box.css_class ? ' class="' + box.css_class + '"' : '';
			control.insert('<div' + css_class + '>' + value + '</div>');
		}
	}
};
