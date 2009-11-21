var AttributeController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
		$(this.options.id).observe('change', this.attribute_changed_handler.bindAsEventListener(this));
	},

	template_changed_handler: function(event)
	{
		var template = event.memo[this.options.attribute_property];
		this.store_template(template);
		this.refresh_display(template);
	},

	attribute_changed_handler: function(event)
	{
		var attribute = $(this.options.id);
		var value = $F(attribute);
		var memo = { id: this.options.id };
		var attribute_construction = this.get_template()[value];
		attribute.fire(this.options.attribute_changed_event, Object.extend(memo, attribute_construction));
	}
};
