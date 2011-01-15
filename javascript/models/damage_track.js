var DamageTrackModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: 'damage_track',
			hit_box_tag: 'div',
			hit_box_class: 'hit_box',
			destruction_class: 'destruction',
			drive_class: 'drive',
			damage_reduction_class: 'damage_reduction',
			weapon_class: 'weapon_hit_box',
			critical_class: 'critical',
			damaged_class: 'damaged',

			//events
			template_changed_event: 'template:changed',
			tons_changed_event: 'tons:changed',
			attribute_changed_event: 'attribute:changed',
			weapon_changed_event: 'weapon:changed',
			weapon_deleted_event: 'weapon:deleted',

			//presentation text
			destruction_symbol: 'X',
			destruction_title: 'Destruction',
			gunboat_destruction_title: 'Destruction (after two Xs anywhere)',
			damage_reduction_symbol: '&loz;',
			damage_reduction_title: 'Damage reduction',
			weapon_symbol: 'w',
			weapon_title: 'Weapon destroyed (defender\'s choice)',
			weapon_alt_symbol: 'W',
			weapon_alt_title: 'Weapon destroyed (attacker\'s choice)',
			torpedo_symbol: 't',
			torpedo_title: 'Torpedo destroyed (defender\'s choice)',
			torpedo_alt_symbol: 'T',
			torpedo_alt_title: 'Torpedo destroyed (attacker\'s choice)',
			critical_symbol: '*',
			critical_title: 'Critical',
			drive_title: 'Drive',

			//data
			gunboat: false,
			facing: null,
			criticals: $H(
			{
				1: $R(1, 200),
				2: $R(201, 400),
				3: $R(401, 1000)
			}),
			gunboat_criticals: 2
		};
		Object.extend(this.options, options);

		this.template = null;
		this.tons = 1;
		this.attributes = {};
		this.weapons = $H();

		this.connect_event_handlers();
	},

	gunboat_compatibility_match: function()
	{
		return this.template && (this.template.gunboat && this.options.gunboat || !this.template.gunboat && !this.options.gunboat);
	},

	set_template: function(template)
	{
		this.template = template;
	},

	set_tons: function(tons)
	{
		this.tons = tons;
	},

	set_attribute: function(attribute_package)
	{
		if (attribute_package.attribute == 'damage_reduction' && attribute_package.facing != this.options.facing)
		{
			this.attributes.damage_reduction = this.attributes.damage_reduction || 0;
			return;
		}
		this.attributes[attribute_package.attribute] = Number(attribute_package.value);
	},

	add_weapon: function(weapon_id, torpedoes)
	{
		this.weapons.set(weapon_id, { torpedoes: torpedoes });
	},

	delete_weapon: function(weapon_id)
	{
		this.weapons.unset(weapon_id);
	},

	get_template: function()
	{
		if (!this.gunboat_compatibility_match())
		{
			return 0;
		}
		if (this.options.gunboat && this.template.gunboat)
		{
			var facing = (this.options.facing == 'left' || this.options.facing == 'right') ? 'sides' : this.options.facing;
			return this.template.hit_boxes[facing];
		}
		return this.template.hit_boxes;
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
		//non-torpedoes
		var total_weapons = this.weapons.values().inject(0, function(sum, weapon)
		{
			return sum + (weapon.torpedoes ? 0 : 1);
		});
		if (this.options.gunboat)
		{
			var weapon_factor = 2;
			switch (this.options.facing)
			{
				case 'left':
				case 'right':
					weapon_factor = 3;
				break;
				case 'rear':
					weapon_factor = 4;
				break;
			}
			total_weapons = Math.round(total_weapons / weapon_factor);
		}
		return total_weapons;
	},

	get_torpedoes: function()
	{
		var total_torpedoes = this.weapons.values().inject(0, function(sum, weapon)
		{
			return sum + (weapon.torpedoes || 0);
		});
		if (this.options.gunboat)
		{
			var torpedo_factor = 4;
			switch (this.options.facing)
			{
				case 'left':
				case 'right':
					torpedo_factor = 2;
				break;
				case 'rear':
					torpedo_factor = 8;
				break;
			}
			total_torpedoes = Math.round(total_torpedoes / torpedo_factor);
		}
		return total_torpedoes;
	},

	get_criticals: function()
	{
		if (this.options.gunboat)
		{
			return this.options.gunboat_criticals;
		}
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
		var hit_boxes = [];
		hit_boxes.length = this.get_template();
		this.add_destruction(hit_boxes);
		this.add_drive(hit_boxes, this.get_drive());
		this.place_symbols(hit_boxes, this.get_damage_reduction(), this.make_damage_reduction_box.bind(this));
		this.place_symbols(hit_boxes, this.get_weapons(), this.make_weapon_box.bind(this));
		this.place_symbols(hit_boxes, this.get_torpedoes(), this.make_torpedo_box.bind(this));
		this.place_symbols(hit_boxes, this.get_criticals(), this.make_critical_box.bind(this));
		return hit_boxes;
	},

	add_destruction: function(hit_boxes)
	{
		var destruction_box =
		{
			value: this.options.destruction_symbol,
			css_class: this.options.destruction_class,
			title: this.options.gunboat ? this.options.gunboat_destruction_title : this.options.destruction_title
		};
		var hit_box_count = hit_boxes.length;
		hit_boxes[hit_box_count - 1] = destruction_box;
		if (this.options.gunboat)
		{
			var second_destruction_index = hit_box_count - Math.round(hit_box_count / 5);
			if (this.options.facing == 'rear')
			{
				second_destruction_index = hit_box_count - Math.round(hit_box_count / 3);
			}
			hit_boxes[second_destruction_index] = Object.clone(destruction_box);
		}
	},

	add_drive: function(hit_boxes, drive)
	{
		if (this.options.gunboat && this.options.facing == 'front')
		{
			return;
		}
		var factor = 2;
		if (hit_boxes.length < 20)
		{
			factor = 4;
		}
		if (hit_boxes.length < 10)
		{
			factor = 8;
		}
		var total_drive_boxes = drive;
		if (this.options.gunboat)
		{
			factor = 1;
			if (this.options.facing == 'left' || this.options.facing == 'right')
			{
				total_drive_boxes = Math.floor(drive / 4);
			}
		}
		this.place_symbols(hit_boxes, total_drive_boxes, this.make_drive_box.bind(this), factor);
	},

	make_drive_box: function(current_drive)
	{
		var box =
		{
			value: this.options.gunboat ? '-1' : current_drive,
			css_class: this.options.drive_class,
			title: this.options.drive_title
		};
		return box;
	},

	make_damage_reduction_box: function(current_damage_reduction)
	{
		var box =
		{
			value: this.options.damage_reduction_symbol + current_damage_reduction,
			css_class: this.options.damage_reduction_class,
			title: this.options.damage_reduction_title
		};
		return box;
	},

	make_weapon_box: function(current_weapons, weapons)
	{
		var symbol = this.options.weapon_symbol;
		var title = this.options.weapon_title;
		if ((weapons - current_weapons) % 2 == 1)
		{
			symbol = this.options.weapon_alt_symbol;
			title = this.options.weapon_alt_title;
		}
		var box =
		{
			value: symbol,
			css_class: this.options.weapon_class,
			title: title
		};
		return box;
	},

	make_torpedo_box: function(current_torpedoes, torpedoes)
	{
		var symbol = this.options.torpedo_symbol;
		var title = this.options.torpedo_title;
		if ((torpedoes - current_torpedoes) % 2 == 1)
		{
			symbol = this.options.torpedo_alt_symbol;
			title = this.options.torpedo_alt_title;
		}
		var box =
		{
			value: symbol,
			css_class: this.options.weapon_class,
			title: title
		};
		return box;
	},

	make_critical_box: function()
	{
		var box =
		{
			value: this.options.critical_symbol,
			css_class: this.options.critical_class,
			title: this.options.critical_title
		};
		return box;
	},

	place_symbols: function(hit_boxes, total, yield_function, factor)
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
				hit_boxes[index] = yield_function(current_count, total);
				current_count = current_count - factor;
			}
			index++;
		}
	}
};
