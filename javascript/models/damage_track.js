var DamageTrackModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: 'damage_track',
			destruction_class: 'destruction',
			drive_class: 'drive',

			//events
			template_changed_event: 'template:changed',
			attribute_changed_event: 'attribute:changed',

			//presentation text
			destruction_symbol: 'X'
		};
		Object.extend(this.options, options);

		this.template = null;
		this.attributes = {};

		this.connect_event_handlers();
	},

	set_template: function(template)
	{
		this.template = template.hit_boxes;
	},

	set_attribute: function(attribute_package)
	{
		this.attributes[attribute_package.attribute] = attribute_package.value;
	},

	get_template: function()
	{
		return this.template;
	},

	get_drive: function()
	{
		return this.attributes.drive;
	},

	generate_hit_boxes: function()
	{
		var hit_boxes = new Array(this.get_template());
		this.add_destruction(hit_boxes);
		this.add_drive(hit_boxes, this.get_drive());
		return hit_boxes;
	},

	add_destruction: function(hit_boxes)
	{
		hit_boxes[hit_boxes.length - 1] =
		{
			value: this.options.destruction_symbol,
			css_class: this.options.destruction_class
		};
	},

	add_drive: function(hit_boxes, drive)
	{
		var factor = 2;
		if (hit_boxes.length < 20)
		{
			factor = 4;
		}
		if (hit_boxes.length < 10)
		{
			factor = 8;
		}
		var frequency = Math.ceil(hit_boxes.length / ((drive / factor) + 1));
		var index = frequency - 1;
		var current_drive = drive;
		while (index < hit_boxes.length)
		{
			if (!hit_boxes[index])
			{
				hit_boxes[index] =
				{
					value: current_drive,
					css_class: this.options.drive_class
				};
			}
			current_drive = current_drive - factor;
			index += frequency;
		}
	}
};
