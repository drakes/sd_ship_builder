var StatModel =
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
			stat_changed_event: 'stat:changed',

			//data
			stat_property: 'stat'
		};
		Object.extend(this.options, options);

		this.template = null;
		this.control_stats = $H();

		this.connect_event_handlers();
	},

	store_template: function(template)
	{
		this.template = template;
	},

	store_control_stat: function(pair)
	{
		this.control_stats.set(pair.key, pair.value);
	},

	get_template: function()
	{
		return this.template;
	},

	calculate_current: function()
	{
		return this.control_stats.values().collect(0, function(current, value)
		{
			return current + value;
		});
	}
};
