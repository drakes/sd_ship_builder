var ConstructionTemplateModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and CSS
			ship_class_id: 'ship_class',
			tons_id: 'tons',
			hint_class: 'hint',

			//events
			send_update_event: 'template:changed',

			//templates
			data: null
		};
		Object.extend(this.options, options);

		this.connect_event_handlers();
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

		return this.options.data[ship_class][tons];
	},

	get_tons_options: function(ship_class)
	{
		return $H(this.options.data[ship_class]).keys();
	},

	get_ship_class: function()
	{
		return $F(this.options.ship_class_id);
	},
	
	get_tons: function()
	{
		return $F(this.options.tons_id);
	}
};
