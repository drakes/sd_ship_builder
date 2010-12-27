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
			var css_class = this.options.hit_box_class + ' ' + (box.css_class || '');
			control.insert('<' + this.options.hit_box_tag + ' class="' + css_class + '">' + value + '</' + this.options.hit_box_tag + '>');
		}
	},

	update_damage: function(target_box)
	{
		target_box.toggleClassName(this.options.damaged_class);
		target_box.previousSiblings().invoke('addClassName', this.options.damaged_class);
		target_box.nextSiblings().invoke('removeClassName', this.options.damaged_class);
	}
};
