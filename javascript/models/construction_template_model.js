var ConstructionTemplateModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and CSS
			ship_class_id: 'ship_class',
			tonnage_id: 'tonnage',

			//events
			send_update_event: 'template:changed',

			//templates
			data: null
		};
		Object.extend(this.options, options);

		this.connect_event_handlers();
	},

	get_ship_template: function(ship_class, tonnage)
	{
		if (!ship_class)
		{
			ship_class = this.get_ship_class();
		}
		if (!tonnage)
		{
			tonnage = this.get_tonnage();
		}

		return this.options.data[ship_class][tonnage];
	},

	get_tonnage_options: function(ship_class)
	{
		return $H(this.options.data[ship_class]).keys();
	},

	get_ship_class: function()
	{
		return $F(this.options.ship_class_id);
	},
	
	get_tonnage: function()
	{
		return $F(this.options.tonnage_id);
	}
};
