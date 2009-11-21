var ConstructionTemplateController =
{
	connect_event_handlers: function()
	{
		$(this.options.ship_class_id).observe('change', this.ship_class_change_handler.bindAsEventListener(this));
		$(this.options.tons_id).observe('change', this.tons_change_handler.bindAsEventListener(this));
	},

	ship_class_change_handler: function(event)
	{
		var ship_class = this.get_ship_class();
		if (ship_class)
		{
			this.strip_hint(event.element());
			var tons = this.refresh_tons(this.get_tons_options(ship_class));
			this.send_update(ship_class, tons);
		}
	},

	tons_change_handler: function(event)
	{
		var ship_class = this.get_ship_class();
		var tons = this.get_tons();
		this.send_update(ship_class, tons);
	},

	send_update: function(ship_class, tons)
	{
		var memo = this.get_ship_template(ship_class, tons);
		$(this.options.ship_class_id).fire(this.options.send_update_event, memo);
	}
};
