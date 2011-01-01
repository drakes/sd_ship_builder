var ConstructionTemplateModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and CSS
			ship_class_id: 'ship_class',
			tons_id: 'tons',
			crew_id: 'crew',
			hint_class: 'hint',
			template_class: 'template',

			//events
			template_changed_event: 'template:changed',
			tons_changed_event: 'tons:changed',
			crew_template_changed_event: 'crew_template:changed',
			selection_changed_event: 'selection:changed',

			//presentation text
			ship_class_hint: 'Select a ship class',

			//templates
			data: null
		};
		Object.extend(this.options, options);

		this.initialize_ship_classes();
		this.connect_event_handlers();
	},

	initialize_ship_classes: function()
	{
		this.ship_class_select = new EasySelect({ id: this.options.ship_class_id });
		this.fill_ship_classes(this.get_ship_class_options(), this.options.ship_class_hint);
	},

	get_ship_class_options: function()
	{
		var class_ids_and_names = $H(this.options.data).collect(function(pair)
		{
			var id_and_name = pair;
			id_and_name.value = pair.value.name;
			return id_and_name;
		});
		return class_ids_and_names;
	},

	get_ship_template: function(ship_class, tons)
	{
		if (!ship_class)
		{
			ship_class = this.get_ship_class();
		}
		if (!tons)
		{
			tons = this.get_tons();
		}

		var ship_template = Object.clone(this.options.data[ship_class].tons[tons]);
		return ship_template;
	},

	get_tons_options: function(ship_class)
	{
		return $H(this.options.data[ship_class].tons).keys();
	},

	get_crew_options: function(ship_class, tons)
	{
		return $H(this.options.data[ship_class].tons[tons].crew).keys();
	},

	get_ship_class: function()
	{
		return this.ship_class_select.get();
	},

	get_tons: function()
	{
		return this.get_template_value(this.options.tons_id);
	},
	
	get_crew: function()
	{
		return this.get_template_value(this.options.crew_id);
	},
	
	get_template_value: function(selector_id)
	{
		var selector = $(selector_id);
		if (selector.visible())
		{
			return $F(selector);
		}
		else
		{
			return this.find_selector_template(selector).innerHTML;
		}
	}
};
