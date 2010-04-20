var DamageTrackController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
		document.observe(this.options.attribute_changed_event, this.attribute_changed_handler.bindAsEventListener(this));
	},

	template_changed_handler: function(event)
	{
		var template = event.memo;
		this.set_template(template);
		this.refresh();
	},

	attribute_changed_handler: function(event)
	{
		var attribute_package = event.memo;
		this.set_attribute(attribute_package);
		this.refresh();
	},

	refresh: function()
	{
		$(this.options.id).show();
		this.clear();
		this.render_hit_boxes(this.generate_hit_boxes());
	}
};
