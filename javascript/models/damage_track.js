var DamageTrackModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: 'damage_track',

			//events
			template_changed_event: 'template:changed'
		};
		Object.extend(this.options, options);

		this.template = null;

		this.connect_event_handlers();
	},

	store_template: function(template)
	{
		this.template = template.hit_boxes;
	},

	get_template: function()
	{
		return this.template;
	}
};
