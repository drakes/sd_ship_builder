var WeaponModel =
{
	initialize: function(current_crew_size, options)
	{
		this.options =
		{
			//selectors and css
			id: 'weapon',
			weapon_class: 'weapon',
			delete_class: 'delete',
			type_class: 'weapon_type',
			attack_dice_class: 'base_attack_dice',
			damage_class: 'damage',
			ammo_class: 'ammo',
			multiple_class: 'multiples',
			speed_restriction_class: 'speed_restriction',
			range_class: 'range',
			short_class: 'short',
			medium_class: 'medium',
			long_class: 'long',
			note_class: 'note',
			note_container_class: 'note_container',
			cost_class: 'cost',
			slots_class: 'slots',
			firing_arc_tag: 'span',
			firing_arc_class: 'firing_arc',

			//events
			deleted_event: 'weapon:deleted',
			changed_event: 'weapon:changed',
			firing_arc_changed_event: 'firing_arc:changed',
			selection_changed_event: 'selection:changed',

			//weapon templates
			data: null,
			default_number_of_attack_dice: 2,
			damage_types: ['Low', 'Medium', 'High', 'All', 'Allx2', '10/8/6', 'High +1/'],
			multiples_names: { 2: 'Twin', 3: 'Triple', 4: 'Quad', 5: 'Quint', 6: 'Sext' }
		};
		Object.extend(this.options, options);

		this.firing_arc_stats = { cost: 0, slots: 0 };

		this.decorate_control();
		this.initialize_controls();
		this.type_change_handler();
		this.connect_event_handlers();
		this.create_firing_arc(current_crew_size);
	},

	initialize_controls: function()
	{
		var ids = this.create_controls();
		this.type_select = new EasySelect({ id: ids.type });
		var type_options = this.create_type_options();
		this.type_select.update_options(type_options);
		this.type_select.set(type_options[0].key);
		this.multiple_select = new EasySelect({ id: ids.multiple });
		this.ammo_select = new EasySelect({ id: ids.ammo });
	},

	get_weapon_type: function()
	{
		return this.type_select.get();
	},

	get_multiple_key: function()
	{
		return this.multiple_select.get();
	},

	get_ammo_expansions: function()
	{
		return Number(this.ammo_select.get());
	},

	get_weapon_template: function()
	{
		return this.options.data[this.get_weapon_type()];
	},

	get_ammo_template: function()
	{
		var weapon_template = this.get_weapon_template();
		var multiple_key = this.get_multiple_key();
		if (multiple_key)
		{
			var multiple = weapon_template.multiples[multiple_key];
			return multiple.ammo;
		}
		return weapon_template.ammo;
	},

	get_damage_types: function()
	{
		return this.options.damage_types;
	},

	get_attack_dice: function()
	{
		var weapon_template = this.get_weapon_template();
		var torpedo_mk;
		if (weapon_template.torpedoes)
		{
			torpedo_mk = this.get_multiple_key() || 1;
		}
		return (weapon_template.number_of_attack_dice || torpedo_mk || this.options.default_number_of_attack_dice) + 'D' + weapon_template.attack_die;
	},

	get_weapon_stats: function(add_extras)
	{
		//shallow copy
		var weapon_stats = Object.clone(this.get_weapon_template());
		weapon_stats.attack_dice = this.get_attack_dice();
		weapon_stats.damage = this.options.damage_types[weapon_stats.damage_index];
		if (add_extras)
		{
			if (!weapon_stats.torpedoes)
			{
				weapon_stats.cost += this.firing_arc_stats.cost;
				weapon_stats.slots += this.firing_arc_stats.slots;
			}
			if (this.get_ammo_template())
			{
				var ammo_stats = this.get_ammo_stats();
				weapon_stats.cost += ammo_stats.cost;
				weapon_stats.slots += ammo_stats.slots;
			}
		}
		return this.add_multiples_bonuses(weapon_stats);
	},

	get_weapon_stats_total: function()
	{
		return this.get_weapon_stats(true);
	},

	get_ammo_stats: function()
	{
		var ammo_expansions = this.get_ammo_expansions();
		var ammo_template = this.get_ammo_template();
		//some weapons, such as missile launchers, don't have a nice progression and instead list the cost and slots bonuses at each quantity
		if (Object.isArray(ammo_template))
		{
			return {
				cost: ammo_template[ammo_expansions].cost_bonus,
				slots: ammo_template[ammo_expansions].slots_bonus
			};
		}
		return {
			cost: ammo_template.cost * ammo_expansions,
			slots: ammo_template.slots * ammo_expansions
		};
	},

	store_firing_arc_stats: function(firing_arc_stats)
	{
		this.firing_arc_stats = firing_arc_stats;
	},

	add_multiples_bonuses: function(weapon_stats)
	{
		var multiple_key = this.get_multiple_key();
		if (multiple_key && !weapon_stats.torpedoes)
		{
			var multiple = weapon_stats.multiples[multiple_key];
			var combat_bonus = multiple_key - 1;
			weapon_stats.attack_dice += ' + ' + combat_bonus;
			weapon_stats.damage += ' + ' + (combat_bonus * (weapon_stats.damage_bonus_multiplier || 1));
			weapon_stats.cost += multiple.cost_bonus;
			weapon_stats.slots += multiple.slots_bonus;
		}
		return weapon_stats;
	},

	create_firing_arc: function(current_crew_size)
	{
		var weapon_control = $(this.options.id);
		var firing_arc_control = this.find_firing_arc();
		//place the control in the DOM before initializing so events bubble
		new FiringArc(weapon_control, current_crew_size,
		{
			id: firing_arc_control.identify(),
			cost_class: this.options.cost_class,
			slots_class: this.options.slots_class,
			firing_arc_changed_event: this.options.firing_arc_changed_event
		});
	},

	create_type_options: function()
	{
		return $H(this.options.data).collect(function(pair)
		{
			return {
				key: pair.key,
				value: pair.value.name
			};
		});
	},

	create_multiples_options: function()
	{
		var weapon_template = this.get_weapon_template();
		var multiples = $H(weapon_template.multiples);
		var options;
		options = multiples.collect(function(pair)
		{
			var label;
			if (weapon_template.multiples_prefix)
			{
				label = weapon_template.multiples_prefix + pair.key;
			}
			else
			{
				label = this.options.multiples_names[pair.key];
			}
			return {
				key: pair.key,
				value: label
			};
		}, this);
		var first_label = 'Single';
		if (weapon_template.multiples_prefix)
		{
			first_label = weapon_template.multiples_prefix + 1;
		}
		options.unshift(
		{
			key: '',
			value: first_label
		});
		return options;
	},

	create_ammo_options: function()
	{
		var ammo_template = this.get_ammo_template();
		if (Object.isArray(ammo_template))
		{
			return ammo_template.collect(function(ammo, index)
			{
				return {
					key: index,
					value: ammo.count
				};
			});
		}
		var ammo_expansions = 0;
		var ammo = ammo_template.min;
		var options = [];
		while (ammo <= ammo_template.max)
		{
			options.push(
			{
				key: ammo_expansions,
				value: ammo
			});
			ammo += ammo_template.add;
			ammo_expansions++;
		}
		return options;
	}
};
