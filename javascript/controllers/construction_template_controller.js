var ConstructionTemplateController =
{
	connect_event_handlers: function()
	{
		$(this.options.ship_class_id).observe('change', this.ship_class_change_handler.bindAsEventListener(this));
	},

	ship_class_change_handler: function(event)
	{
		var ship_class = this.get_ship_class();
		if (ship_class)
		{
			this.strip_hint(event.element());
			var tonnage = this.refresh_tonnage(this.get_tonnage_options(ship_class));
			this.send_update(ship_class, tonnage);
		}
	},

	send_update: function(ship_class, tonnage)
	{
		var memo = this.get_ship_template(ship_class, tonnage);
		$(this.options.ship_class_id).fire(this.options.send_update_event, memo);
	}
};
