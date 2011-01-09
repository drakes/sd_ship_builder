var OptionView =
{
	find_selector_index: function(selector)
	{
		var previous_siblings = selector.up().previousSiblings();
		var previous_select_containers = previous_siblings.findAll(function(element)
		{
			return element.down('select');
		});
		return previous_select_containers.length;
	},

	create_controls: function(option_template)
	{
		var option_control = $(this.options.id);
		option_control.insert('<input type="button" class="' + this.options.delete_class + '" value="Delete" />');
		var controls = new Element('span', { 'class': 'option_controls' });
		controls.insert('<span class="option_type">' + option_template.name + '</span>');
		var select_ids = this.create_dimension_controls(controls, option_template);
		controls.insert('<span class="construction_stats"> (cost: <span class="' + this.options.cost_class + '"></span> slots: <span class="' + this.options.slots_class + '"></span>)</span>');
		option_control.insert(controls);
		option_control.insert('<span class="' + this.options.note_container_class + ' stat"><span class="descriptor">Note: </span><span class="' + this.options.note_class + '">' + option_template.note + '</span></span>');
		return select_ids;
	},

	create_dimension_controls: function(container, option_template)
	{
		var select_ids = [];
		option_template.dimensions.each(function(dimension, index)
		{
			var selector = new Element('select');
			var id = selector.identify();
			var select_container = new Element('span',
			{
				'class': this.options.dimension_class
			});
			select_container.insert('<label for="' + id + '" class="descriptor">' + dimension.name + ': </label>');
			select_container.insert(selector);
			container.insert(select_container);
			select_ids.push(id);
		}, this);
		return select_ids;
	},
	
	refresh_construction_stats: function(stat_values)
	{
		var option_control = $(this.options.id);
		this.refresh_stat(option_control, this.options.cost_class, stat_values.cost);
		this.refresh_stat(option_control, this.options.slots_class, stat_values.slots);
	},

	refresh_stat: function(control, stat_class, stat_value)
	{
		control.down('.' + stat_class).update(stat_value);
	}
};
