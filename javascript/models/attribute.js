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
			selection_changed_event: 'selection:changed',

			//data
			attribute_property: 'attribute'
		};
		Object.extend(this.options, options);

		this.template = null;

		this.initialize_select();
		this.connect_event_handlers();
	},

	initialize_select: function()
	{
		this.select = new EasySelect({ id: this.options.id });
	},

	set_template: function(template)
	{
		this.template = template;
	},

	get_template: function()
	{
		return this.template;
	}
};
