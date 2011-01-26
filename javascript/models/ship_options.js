var ShipOptionsModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: 'ship_options',
			selector_id: 'add_option',
			option_tag: 'div',
			option_class: 'ship_option',
			delete_class: 'delete',

			//events
			template_changed_event: 'template:changed',
			option_deleted_event: 'option:deleted',
			selection_changed_event: 'selection:changed',
			options_restored_event: 'options:restored',

			//presentation text
			add_option_hint: 'Add an option',

			//option templates
			data: null
		};
		Object.extend(this.options, options);

		this.keys_by_id = $H();
		this.option_templates = $H(this.options.data);

		this.initialize_option_select();
		this.connect_event_handlers();
	},

	initialize_option_select: function()
	{
		this.option_select = new EasySelect(
		{
			id: this.options.selector_id,
			disappearing_hint: false
		});
		var option_pairs = $H(this.options.data).collect(function(pair)
		{
			return {
				key: pair.key,
				value: pair.value.name
			};
		});
		this.option_select.update_options(option_pairs);
		this.option_select.add_hint(this.options.add_option_hint);
	},

	get_option_template: function(option_key)
	{
		return this.option_templates.get(option_key);
	},

	get_option_index: function(option_key)
	{
		//select's index is unstable as options are removed, and Hash key order is technically also unstable (hence the sorting)
		return this.option_templates.keys().sort().indexOf(option_key);
	},

	get_option_key: function(option_index)
	{
		return this.option_templates.keys().sort()[option_index];
	},

	add_option: function(option_key, initial_dimensions)
	{
		var option_template = this.get_option_template(option_key);
		var option_control = this.add_option_control(option_template);
		var id = option_control.identify();
		this.keys_by_id.set(id, option_key);
		//place the control in the DOM before initializing so events bubble
		new Option(initial_dimensions,
		{
			id: id,
			data: option_template,
			type_index: this.get_option_index(option_key)
		});
	},

	restore_options: function(options)
	{
		options.each(function(option)
		{
			var option_key = this.get_option_key(option.type);
			this.add_option(option_key, option.dimensions);
			this.remove_select_option(option_key);
		}, this);
	},

	remove_select_option: function(key)
	{
		this.option_select.remove_option(key);
	},

	reinstate_select_option: function(option_id)
	{
		var key = this.keys_by_id.get(option_id);
		var value = this.options.data[key].name;
		this.option_select.add_option(
		{
			key: key,
			value: value
		});
		this.option_select.set('');
	}
};
