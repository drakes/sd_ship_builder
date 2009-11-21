var AttributeModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and CSS
			id: 'attribute',
			cost_class: 'cost',
			slots_class: 'slots',

			//events
			template_changed_event: 'template:changed',
			attribute_changed_event: 'attribute:changed',

			//data
			attribute_property: 'attribute'
		};
		Object.extend(this.options, options);

		this.template = null;

		this.connect_event_handlers();
	},

	store_template: function(template)
	{
		this.template = template;
	},

	get_template: function()
	{
		return this.template;
	}
};
