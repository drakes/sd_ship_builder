var ArmamentsController =
{
	connect_event_handlers: function()
	{
		$(this.options.add_button_id).observe('click', this.add_button_click_handler.bindAsEventListener(this));
	},

	add_button_click_handler: function(event)
	{
		event.stop();

		this.add_weapon();
	}
};
