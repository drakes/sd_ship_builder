var StatController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
		document.observe(this.options.stat_changed_event, this.stat_changed_handler.bindAsEventListener(this));
	},

	template_changed_handler: function(event)
	{
		this.store_template(event.memo[this.options.stat_property]);
		this.refresh();
	},

	stat_changed_handler: function(event)
	{
		this.store_control_stat(event.memo);
		this.refresh();
	},

	refresh: function()
	{
		this.refresh_display(this.calculate_current(), this.get_max());
	}
};
