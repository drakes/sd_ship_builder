var TemplateStatModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and CSS
			id: 'stat',
			template_class: 'template',

			//events
			template_changed_event: 'template:changed',

			//data
			stat_property: 'stat'
		};
		Object.extend(this.options, options);

		this.template = null;

		this.connect_event_handlers();
	},

	store_template: function(ship_template)
	{
		this.template = ship_template[this.options.stat_property];
	},

	get_template: function()
	{
		return this.template;
	}
};
