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
			critical_class: 'critical',

			//events
			template_changed_event: 'template:changed',
			tons_changed_event: 'tons:changed',
			attribute_changed_event: 'attribute:changed',
			weapon_changed_event: 'weapon:changed',
			weapon_deleted_event: 'weapon:deleted',

			//presentation text
			destruction_symbol: 'X',
			damage_reduction_symbol: '&loz;',
			weapon_symbol: 'w',
			weapon_alt_symbol: 'W',
			critical_symbol: '*',

			//data
			criticals: $H(
			{
				1: $R(1, 200),
				2: $R(201, 400),
				3: $R(401, 1000)
			})
		};
		Object.extend(this.options, options);

		this.template = null;
		this.tons = 1;
		this.attributes = {};
		this.weapons = $H();

		this.connect_event_handlers();
	},

	set_template: function(template)
	{
		this.template = template.hit_boxes;
	},

	set_tons: function(tons)
	{
		this.tons = tons;
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

	get_criticals: function()
	{
		var criticals = 1;
		this.options.criticals.each(function(pair)
		{
			var range = pair.value;
			if (range.include(this.tons))
			{
				criticals = pair.key;
				throw $break;
			}
		}, this);
		return criticals;
	},

	generate_hit_boxes: function()
	{
		var hit_boxes = new Array(this.get_template());
		this.add_destruction(hit_boxes);
		this.add_drive(hit_boxes, this.get_drive());
		this.place_symbols(hit_boxes, this.get_damage_reduction(), this.make_damage_reduction_box.bind(this));
		this.place_symbols(hit_boxes, this.get_weapons(), this.make_weapon_box.bind(this));
		this.place_symbols(hit_boxes, this.get_criticals(), this.make_critical_box.bind(this));
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
		this.place_symbols(hit_boxes, drive, this.make_drive_box.bind(this), factor);
	},

	make_drive_box: function(current_drive)
	{
		var box =
		{
			value: current_drive,
			css_class: this.options.drive_class
		};
		return box;
	},

	make_damage_reduction_box: function(current_damage_reduction)
	{
		var box =
		{
			value: this.options.damage_reduction_symbol + current_damage_reduction,
			css_class: this.options.damage_reduction_class
		};
		return box;
	},

	make_weapon_box: function(current_weapons, weapons)
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

	make_critical_box: function()
	{
		var box =
		{
			value: this.options.critical_symbol,
			css_class: this.options.critical_class
		};
		return box;
	},

	place_symbols: function(hit_boxes, total, yield, factor)
	{
		factor = factor || 1;
		var frequency = Math.ceil(hit_boxes.length / (total / factor + 1));
		var index = frequency - 1;
		var current_count = total;
		while (index < hit_boxes.length && current_count > 0)
		{
			var new_count = total - Math.floor((index + 1) / frequency) * factor;
			if (!hit_boxes[index] && new_count < current_count)
			{
				hit_boxes[index] = yield(current_count, total);
				current_count = current_count - factor;
			}
			index++;
		}
	}
};
