var AttributeView =
{
	clear: function()
	{
		this.select.update_options();
	},

	refresh_display: function(template)
	{
		var attribute_values = $H(template).keys();
		var attribute = $(this.options.id);
		var attribute_control = attribute.up('.' + this.options.attribute_class);
		var last_value = this.select.get();
		last_value = attribute_values.include(last_value) ? last_value : attribute_values.first();
		
		this.select.update_options(attribute_values);
		this.select.set(last_value);

		this.refresh_construction_stats(template);
		attribute_control.show();
	},

	refresh_construction_stats: function(template)
	{
		var attribute_control = $(this.options.id).up('.' + this.options.attribute_class);
		var value = this.select.get();
		attribute_control.down('.' + this.options.cost_class).update(template[value].cost);
		attribute_control.down('.' + this.options.slots_class).update(template[value].slots);
	}
};
