var ArmamentsController =
{
	connect_event_handlers: function()
	{
		$(this.options.add_button_id).observe('click', this.add_button_click_handler.bindAsEventListener(this));
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
	},

	add_button_click_handler: function(event)
	{
		event.stop();

		this.add_weapon();
	},

	template_changed_handler: function(event)
	{
		$(this.options.add_button_id).enable();
	}
};
