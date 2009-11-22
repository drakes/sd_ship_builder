var ConstructionStatController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
		document.observe(this.options.attribute_changed_event, this.attribute_changed_handler.bindAsEventListener(this));
		document.observe(this.options.weapon_changed_event, this.weapon_changed_handler.bindAsEventListener(this));
		document.observe(this.options.weapon_deleted_event, this.weapon_deleted_handler.bindAsEventListener(this));
	},

	template_changed_handler: function(event)
	{
		this.store_template(event.memo[this.options.stat_property]);
		this.refresh();
	},

	attribute_changed_handler: function(event)
	{
		this.store_control_attribute(event.memo);
		this.refresh();
	},

	weapon_changed_handler: function(event)
	{
		this.store_weapon(event.memo);
		this.refresh();
	},

	weapon_deleted_handler: function(event)
	{
		this.delete_weapon(event.memo);
		this.refresh();
	},

	refresh: function()
	{
		this.refresh_display(this.calculate_current(), this.get_template());
	}
};
