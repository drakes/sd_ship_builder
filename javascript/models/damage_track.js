var DamageTrackModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: 'damage_track',

			//events
			template_changed_event: 'template:changed',

			//presentation text
			destruction_symbol: 'X'
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
	},

	generate_hit_boxes: function()
	{
		var hit_boxes = new Array(this.get_template());
		this.add_destruction(hit_boxes);
		return hit_boxes;
	},

	add_destruction: function(hit_boxes)
	{
		hit_boxes[hit_boxes.length - 1] = this.options.destruction_symbol;
	}
};
