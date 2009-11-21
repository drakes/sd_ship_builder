var ConstructionStatModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and CSS
			stat_id: 'stat',
			current_class: 'current',
			template_class: 'template',

			//events
			template_changed_event: 'template:changed',
			attribute_changed_event: 'attribute:changed',

			//data
			stat_property: 'stat'
		};
		Object.extend(this.options, options);

		this.template = null;
		this.control_attributes = $H();

		this.connect_event_handlers();
	},

	store_template: function(template)
	{
		this.template = template;
	},

	store_control_attribute: function(pair)
	{
		this.control_attributes.set(pair.key, pair.value);
	},

	get_template: function()
	{
		return this.template;
	},

	calculate_current: function()
	{
		return this.control_attributes.values().collect(0, function(current, value)
		{
			return current + value;
		});
	}
};
