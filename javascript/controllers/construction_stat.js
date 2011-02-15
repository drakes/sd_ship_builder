var ConstructionStatController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
		document.observe(this.options.crew_template_changed_event, this.crew_template_changed_handler.bindAsEventListener(this));
		document.observe(this.options.attribute_changed_event, this.attribute_changed_handler.bindAsEventListener(this));
		document.observe(this.options.weapon_changed_event, this.weapon_changed_handler.bindAsEventListener(this));
		document.observe(this.options.weapon_deleted_event, this.weapon_deleted_handler.bindAsEventListener(this));
		document.observe(this.options.option_changed_event, this.option_changed_handler.bindAsEventListener(this));
		document.observe(this.options.option_deleted_event, this.option_deleted_handler.bindAsEventListener(this));
		document.observe(this.options.crew_changed_event, this.crew_changed_handler.bindAsEventListener(this));
		document.observe(this.options.crew_deleted_event, this.crew_deleted_handler.bindAsEventListener(this));
		document.observe(this.options.crew_toggled_event, this.crew_toggled_handler.bindAsEventListener(this));
		document.observe(this.options.ship_reset_event, this.ship_reset_handler.bindAsEventListener(this));
	},

	template_changed_handler: function(event)
	{
		this.store_template(event.memo);
		this.refresh();
	},

	crew_template_changed_handler: function(event)
	{
		this.store_crew_template(event.memo);
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

	option_changed_handler: function(event)
	{
		this.store_option(event.memo);
		this.refresh();
	},

	option_deleted_handler: function(event)
	{
		this.delete_option(event.memo);
		this.refresh();
	},

	crew_changed_handler: function(event)
	{
		this.store_crew(event.memo);
		this.refresh();
	},

	crew_deleted_handler: function(event)
	{
		this.delete_crew(event.memo);
		this.refresh();
	},

	crew_toggled_handler: function(event)
	{
		this.store_crew_disabled(!event.memo.show);
		this.refresh();
	},

	ship_reset_handler: function(event)
	{
		$(this.options.id).hide();
		this.reset_data();
	},

	refresh: function()
	{
		this.refresh_display(this.calculate_current(), this.get_template_value());
	}
};
