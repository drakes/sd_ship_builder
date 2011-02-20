var OptionModel =
{
	initialize: function(initial_dimensions, options)
	{
		this.options =
		{
			//selectors and css
			id: null,
			option_class: 'option',
			delete_class: 'delete',
			dimension_class: 'option_dimension',
			note_class: 'note',
			note_container_class: 'note_container',
			cost_class: 'cost',
			slots_class: 'slots',

			//events
			deleted_event: 'option:deleted',
			changed_event: 'option:changed',
			selection_changed_event: 'selection:changed',
			ship_reset_event: 'ship:reset',

			//option template
			data: null,
			type_index: null
		};
		Object.extend(this.options, options);

		this.current_keys = [];
		this.selects = [];

		this.connect_event_handlers();
		this.initialize_controls(initial_dimensions);
	},

	initialize_controls: function(initial_dimensions)
	{
		initial_dimensions = initial_dimensions || [];
		var select_ids = this.create_controls(this.options.data);
		select_ids.each(function(id, index)
		{
			var select = new EasySelect({ id: id });
			this.selects[index] = select;
			var dimension_options = this.create_dimension_options(index);
			select.update_options(dimension_options);
			select.set_by_index(initial_dimensions[index] || 0);
		}, this);
	},

	create_dimension_options: function(index)
	{
		var set = $H(this.options.data.data);
		var i = 0;
		while (i < index)
		{
			var first_key = set.keys()[0];
			set = $H(set.get(first_key));
			i++;
		}
		var keys = set.keys();
		if (!this.options.data.dimensions[index].spread)
		{
			return keys;
		}
		return keys.collect(function(key)
		{
			return {
				key: key,
				value: '1-' + key
			};
		});
	},

	store_key: function(key, index)
	{
		this.current_keys[index] = key;
	},

	get_dimension_indices: function()
	{
		var indices = [];
		this.selects.each(function(select, index)
		{
			indices[index] = select.index_of();
		});
		return indices;
	},

	get_stats: function()
	{
		if (this.current_keys.length != this.options.data.dimensions.length)
		{
			return;
		}
		var set = $H(this.options.data.data);
		var i = 0;
		while (i < this.current_keys.length - 1)
		{
			set = $H(set.get(this.current_keys[i]));
			i++;
		}
		return set.get(this.current_keys[i]);
	}
};
