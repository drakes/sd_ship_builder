var WeaponModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: 'weapon',
			delete_class: 'delete',
			type_class: 'weapon_type',
			attack_dice_class: 'base_attack_dice',
			damage_class: 'damage',
			ammo_class: 'ammo',
			multiple_class: 'multiples',
			range_class: 'range',
			short_class: 'short',
			medium_class: 'medium',
			long_class: 'long',
			cost_class: 'cost',
			slots_class: 'slots',

			//events
			deleted_event: 'weapon:deleted',
			changed_event: 'weapon:changed',

			//weapon templates
			data: null,
			damage_types: ['Low', 'Medium', 'High', 'All', 'Allx2', '10/8/6'],
			multiples_names: { 2: 'Twin', 3: 'Triple', 4: 'Quad', 5: 'Quint', 6: 'Sext' }
		};
		Object.extend(this.options, options);

		this.create_controls();
		this.type_change_handler();
		this.connect_event_handlers();
	},

	get_weapon_type: function()
	{
		return $(this.options.id).down('.' + this.options.type_class).getValue();
	},

	get_multiple_key: function()
	{
		return $(this.options.id).down('.' + this.options.multiple_class).getValue();
	},

	get_weapon_template: function()
	{
		return this.options.data[this.get_weapon_type()];
	},

	get_damage_types: function()
	{
		return this.options.damage_types;
	},

	get_weapon_stats: function()
	{
		//shallow copy
		var weapon_stats = Object.clone(this.get_weapon_template());
		weapon_stats.attack_dice = '2D' + weapon_stats.attack_die;
		weapon_stats.damage = this.options.damage_types[weapon_stats.damage_index];
		return this.add_multiples_bonuses(weapon_stats);
	},

	add_multiples_bonuses: function(weapon_stats)
	{
		var multiple_key = this.get_multiple_key();
		if (multiple_key)
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

	create_type_options: function()
	{
		return $H(this.options.data).inject('', function(options, pair)
		{
			return options + '<option value="' + pair.key + '"' + (!options ? ' selected="selected"' : '') + '>' + pair.value.name + '</option>';
		});
	},

	create_multiples_options: function()
	{
		var multiples = $H(this.get_weapon_template().multiples);
		var first_option = '<option value="">Single</option>';
		return multiples.keys().inject(first_option, function(options, multiple_key)
		{
			return options + '<option value="' + multiple_key + '">' + this.options.multiples_names[multiple_key] + '</option>';
		}, this);
	}
};
