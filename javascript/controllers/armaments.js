var ArmamentsController =
{
	connect_event_handlers: function()
	{
		$(this.options.add_button_id).observe('click', this.add_button_click_handler.bindAsEventListener(this));
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
		document.observe(this.options.crew_template_changed_event, this.crew_template_changed_handler.bindAsEventListener(this));
		document.observe(this.options.weapons_restored_event, this.weapons_restored_handler.bindAsEventListener(this));
		document.observe(this.options.ship_reset_event, this.ship_reset_handler.bindAsEventListener(this));
	},

	add_button_click_handler: function(event)
	{
		event.stop();
		this.add_weapon();
	},

	template_changed_handler: function(event)
	{
		$(this.options.add_button_id).show();
	},

	crew_template_changed_handler: function(event)
	{
		this.store_current_crew_size(event.memo);
	},

	weapons_restored_handler: function(event)
	{
		var weapons = event.memo;
		weapons.each(this.add_weapon, this);
	},

	ship_reset_handler: function(event)
	{
		$(this.options.add_button_id).hide();
	}
};
