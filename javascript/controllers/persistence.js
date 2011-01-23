var PersistenceController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
		document.observe(this.options.attribute_changed_event, this.attribute_changed_handler.bindAsEventListener(this));
		document.observe(this.options.weapon_changed_event, this.weapon_changed_handler.bindAsEventListener(this));
		document.observe(this.options.weapon_deleted_event, this.weapon_deleted_handler.bindAsEventListener(this));
		document.observe(this.options.option_changed_event, this.option_changed_handler.bindAsEventListener(this));
		document.observe(this.options.option_deleted_event, this.option_deleted_handler.bindAsEventListener(this));
		document.observe(this.options.crew_changed_event, this.crew_changed_handler.bindAsEventListener(this));
		document.observe(this.options.crew_deleted_event, this.crew_deleted_handler.bindAsEventListener(this));
		document.observe(this.options.crew_toggled_event, this.crew_toggled_handler.bindAsEventListener(this));
	},

	template_changed_handler: function(event)
	{
		this.store_template(event.memo);
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

	refresh: function()
	{
		this.refresh_link(this.encode_to_url());
	}
};
