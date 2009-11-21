var AttributeView =
{
	refresh_display: function(template)
	{
		var attribute_values = $H(template).keys();
		var attribute = $(this.options.id);
		var attribute_control = attribute.up();
		var last_value = $F(attribute);
		last_value = attribute_values.include(last_value) ? last_value : attribute_values.first();
		
		var options = attribute_values.inject('', function(html, value)
		{
			return html + '<option value="' + value + '"' + (value == last_value ? 'selected="selected"' : '') + '>' + value + '</option>';
		});
		attribute.update(options);

		this.refresh_construction_stats(template);
		attribute_control.show();
	},

	refresh_construction_stats: function(template)
	{
		var attribute = $(this.options.id);
		var attribute_control = attribute.up();
		var value = $F(attribute);
		attribute_control.down('.' + this.options.cost_class).update(template[value][this.options.cost_property]);
		attribute_control.down('.' + this.options.slots_class).update(template[value][this.options.slots_property]);
	}
};
