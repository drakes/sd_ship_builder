var AttributeController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
		$(this.options.id).observe(this.options.selection_changed_event, this.selection_changed_handler.bindAsEventListener(this));
	},

	template_changed_handler: function(event)
	{
		var template = event.memo[this.options.attribute_property];
		this.set_template(template);
		this.refresh_display(template);
		this.send_update();
	},

	selection_changed_handler: function(event)
	{
		this.refresh_construction_stats(this.get_template());
		this.send_update(event.memo.value);
	},

	send_update: function(value)
	{
		value = value === undefined ? this.select.get() : value;
		var memo =
		{
			id: this.options.id,
			attribute: this.options.attribute_property,
			value: value
		};
		var attribute_construction = this.get_template()[value];
		$(this.options.id).fire(this.options.attribute_changed_event, Object.extend(memo, attribute_construction));
	}
};
