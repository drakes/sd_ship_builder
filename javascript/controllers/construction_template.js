var ConstructionTemplateController =
{
	connect_event_handlers: function()
	{
		$(this.options.ship_class_id).observe('change', this.ship_class_change_handler.bindAsEventListener(this));
		$(this.options.tons_id).observe('change', this.tons_change_handler.bindAsEventListener(this));
		$(this.options.crew_id).observe('change', this.crew_change_handler.bindAsEventListener(this));
	},

	ship_class_change_handler: function(event)
	{
		var ship_class = this.get_ship_class();
		if (ship_class)
		{
			this.strip_hint(event.findElement());
			var tons = this.refresh_selector(this.get_tons_options(ship_class), this.options.tons_id);
			var crew = this.refresh_selector(this.get_crew_options(ship_class, tons), this.options.crew_id);
			this.send_update(ship_class, tons, crew);
		}
	},

	tons_change_handler: function(event)
	{
		var ship_class = this.get_ship_class();
		var tons = this.get_tons();
		var crew = this.refresh_selector(this.get_crew_options(ship_class, tons), this.options.crew_id);
		this.send_update(ship_class, tons, crew);
	},

	crew_change_handler: function(event)
	{
		var ship_class = this.get_ship_class();
		var tons = this.get_tons();
		var crew = this.get_crew();
		this.send_update(ship_class, tons, crew);
	},

	send_update: function(ship_class, tons, crew)
	{
		var ship_template = this.get_ship_template(ship_class, tons);
		$(this.options.ship_class_id).fire(this.options.template_changed_event, ship_template);
		$(this.options.crew_id).fire(this.options.crew_template_changed_event, crew);
	}
};
