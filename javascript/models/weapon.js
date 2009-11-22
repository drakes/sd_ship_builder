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
			cost_class: 'cost',
			slots_class: 'slots',

			//events
			deleted_event: 'weapon:deleted',
			changed_event: 'weapon:changed',

			//weapon templates
			data: null,
			damage_types: ['Low', 'Medium', 'High', 'All', 'Allx2', '10/8/6']
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

	get_weapon_template: function()
	{
		return this.options.data[this.get_weapon_type()];
	},

	get_damage_types: function()
	{
		return this.options.damage_types;
	},

	get_cost: function()
	{
		return this.get_weapon_template().cost;
	},

	get_slots: function()
	{
		return this.get_weapon_template().slots;
	},

	create_type_options: function()
	{
		return $H(this.options.data).inject('', function(options, pair)
		{
			return options + '<option value="' + pair.key + '"' + (!options ? ' selected="selected"' : '') + '>' + pair.value.name + '</option>';
		});
	}
};
