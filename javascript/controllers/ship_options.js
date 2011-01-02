var ShipOptionsController =
{
	connect_event_handlers: function()
	{
		$(this.options.selector_id).observe(this.options.selection_changed_event, this.add_option_changed_handler.bindAsEventListener(this));
		$(this.options.id).on('click', this.options.delete_class, this.delete_handler.bind(this));
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
	},

	template_changed_handler: function(event)
	{
		$(this.options.selector_id).show();
	},

	add_option_changed_handler: function(event)
	{
		event.stop();
		this.add_option(event.memo.value);
		this.remove_select_option(event.memo.value);
	},

	delete_handler: function(event, delete_button)
	{
		event.stop();
		var deleted_id = this.find_option_id(delete_button);
		this.reinstate_select_option(deleted_id);
	}
};
