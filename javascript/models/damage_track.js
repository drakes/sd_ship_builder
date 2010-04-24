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
			damage_reduction_class: 'damage_reduction',
			weapon_class: 'weapon_hit_box',

			//events
			template_changed_event: 'template:changed',
			attribute_changed_event: 'attribute:changed',
			weapon_changed_event: 'weapon:changed',
			weapon_deleted_event: 'weapon:deleted',

			//presentation text
			destruction_symbol: 'X',
			damage_reduction_symbol: '&loz;',
			weapon_symbol: 'w',
			weapon_alt_symbol: 'W'
		};
		Object.extend(this.options, options);

		this.template = null;
		this.attributes = {};
		this.weapons = $H();

		this.connect_event_handlers();
	},

	set_template: function(template)
	{
		this.template = template.hit_boxes;
	},

	set_attribute: function(attribute_package)
	{
		this.attributes[attribute_package.attribute] = Number(attribute_package.value);
	},

	add_weapon: function(weapon_id)
	{
		this.weapons.set(weapon_id, true);
	},

	delete_weapon: function(weapon_id)
	{
		this.weapons.unset(weapon_id);
	},

	get_template: function()
	{
		return this.template;
	},

	get_drive: function()
	{
		return this.attributes.drive;
	},

	get_damage_reduction: function()
	{
		return this.attributes.damage_reduction;
	},

	get_weapons: function()
	{
		return this.weapons.keys().length;
	},

	generate_hit_boxes: function()
	{
		var hit_boxes = new Array(this.get_template());
		this.add_destruction(hit_boxes);
		this.add_drive(hit_boxes, this.get_drive());
		this.add_damage_reduction(hit_boxes, this.get_damage_reduction());
		this.place_symbols(hit_boxes, this.get_weapons(), this.make_weapon_box.bind(this));
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
	},

	add_damage_reduction: function(hit_boxes, damage_reduction)
	{
		var frequency = Math.ceil(hit_boxes.length / (damage_reduction + 1));
		var index = frequency - 1;
		var current_damage_reduction = damage_reduction;
		while (index < hit_boxes.length && current_damage_reduction > 0)
		{
			var new_damage_reduction = damage_reduction - Math.floor((index + 1) / frequency);
			if (!hit_boxes[index] && new_damage_reduction < current_damage_reduction)
			{
				hit_boxes[index] =
				{
					value: this.options.damage_reduction_symbol + ' ' + current_damage_reduction,
					css_class: this.options.damage_reduction_class
				};
				current_damage_reduction = current_damage_reduction - 1;
			}
			index++;
		}
	},

	make_weapon_box: function(weapons, current_weapons)
	{
		var symbol = this.options.weapon_symbol;
		if ((weapons - current_weapons) % 2 == 1)
		{
			symbol = this.options.weapon_alt_symbol;
		}
		var box =
		{
			value: symbol,
			css_class: this.options.weapon_class
		};
		return box;
	},

	place_symbols: function(hit_boxes, total, yield)
	{
		var frequency = Math.ceil(hit_boxes.length / (total + 1));
		var index = frequency - 1;
		var current_count = total;
		while (index < hit_boxes.length && current_count > 0)
		{
			var new_count = total - Math.floor((index + 1) / frequency);
			if (!hit_boxes[index] && new_count < current_count)
			{
				hit_boxes[index] = yield(total, current_count);
				current_count = current_count - 1;
			}
			index++;
		}
	}
};
