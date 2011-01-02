var ShipOptionsController =
{
	connect_event_handlers: function()
	{
		$(this.options.selector_id).observe(this.options.selection_changed_event, this.add_option_changed_handler.bindAsEventListener(this));
		$(this.options.id).on(this.options.option_deleted_event, this.option_delete_handler.bind(this));
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

	option_delete_handler: function(event)
	{
		var deleted_id = event.memo;
		this.reinstate_select_option(deleted_id);
	}
};
