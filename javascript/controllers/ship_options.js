var ShipOptionsController =
{
	connect_event_handlers: function()
	{
		$(this.options.selector_id).observe(this.options.selection_changed_event, this.add_option_changed_handler.bindAsEventListener(this));
		$(this.options.id).on(this.options.option_deleted_event, this.option_delete_handler.bind(this));
		this.template_observer = document.on(this.options.template_changed_event, this.template_changed_handler.bind(this));
		document.observe(this.options.options_restored_event, this.options_restored_handler.bindAsEventListener(this));
		document.observe(this.options.ship_reset_event, this.ship_reset_handler.bindAsEventListener(this));
	},

	template_changed_handler: function(event)
	{
		$(this.options.selector_id).show();
		this.template_observer.stop();
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
	},

	options_restored_handler: function(event)
	{
		var options = event.memo;
		this.restore_options(options);
	},

	ship_reset_handler: function(event)
	{
		var selector = $(this.options.selector_id);
		selector.hide.bind(selector).defer();
		this.template_observer.start();
	}
};
