var DamageTrackController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
	},

	template_changed_handler: function(event)
	{
		var template = event.memo;
		this.store_template(template);
		this.refresh();
	},

	refresh: function()
	{
		this.clear();
		this.add_hit_boxes(this.get_template());
	}
};
