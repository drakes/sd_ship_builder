var OptionModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: null,
			option_class: 'option',
			delete_class: 'delete',
			note_class: 'note',
			note_container_class: 'note_container',
			cost_class: 'cost',
			slots_class: 'slots',

			//events
			deleted_event: 'option:deleted',
			changed_event: 'option:changed',
			selection_changed_event: 'selection:changed',

			//option template
			data: null
		};
		Object.extend(this.options, options);

		this.current_keys = [];

		this.initialize_controls();
		this.connect_event_handlers();
	},

	initialize_controls: function()
	{
		var select_ids = this.create_controls(this.options.data);
		select_ids.each(function(id, index)
		{
			var select = new EasySelect({ id: id });
			var dimension_options = this.create_dimension_options(index);
			select.update_options(dimension_options);
			select.set(dimension_options[0]);
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

	get_stats: function()
	{
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
