var DamageTrackView =
{
	clear: function()
	{
		$(this.options.id).update();
	},

	render_hit_boxes: function(hit_boxes)
	{
		var content = '';
		for (var i = 0, l = hit_boxes.length; i < l; i++)
		{
			var box = hit_boxes[i] || {};
			var value = box.value || '&nbsp;';
			var css_class = this.options.hit_box_class + ' ' + (box.css_class || '');
			var title = String(i + 1);
			if (box.title)
			{
				title += ': ' + box.title;
				if (box.value)
				{
					if (Object.isNumber(box.value))
					{
						title += ' (' + box.value + ')';
					}
					else if (Object.isString(box.value) && /\d/.test(box.value))
					{
						title += ' (' + box.value.match(/\d+/)[0] + ')';
					}
				}
			}
			if (box.wrapper && box.inner_wrapper)
			{
				content += '<' + this.options.hit_box_tag + ' class="' + css_class + '" title="' + title + '"><' + box.wrapper + '><' + box.inner_wrapper + '>' + value + '</' + box.inner_wrapper + '></' + box.wrapper + '>' + '</' + this.options.hit_box_tag + '>';
			}
			else
			{
				content += '<' + this.options.hit_box_tag + ' class="' + css_class + '" title="' + title + '">' + value + '</' + this.options.hit_box_tag + '>';
			}
		}
		$(this.options.id).update(content);
	},

	update_damage: function(target_box)
	{
		target_box.toggleClassName(this.options.damaged_class);
		target_box.previousSiblings().invoke('addClassName', this.options.damaged_class);
		target_box.nextSiblings().invoke('removeClassName', this.options.damaged_class);
	}
};
