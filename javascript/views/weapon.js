var WeaponView =
{
	create_controls: function()
	{
		var weapon_control = $(this.options.id);
		var type_selector = new Element('select', { 'class': this.options.type_class });
		type_selector.update(this.create_type_options());
		weapon_control.insert('<label for="' + type_selector.identify() + '" class="descriptor">Type: </label>');

		var multiple_selector = new Element('select', { 'class': this.options.multiple_class });
		weapon_control.insert(multiple_selector);

		weapon_control.insert(type_selector);

		weapon_control.insert('<span class="descriptor"> base attack dice: </span><span class="' + this.options.attack_dice_class + '"></span>');
		weapon_control.insert('<span class="descriptor"> damage: </span><span class="' + this.options.damage_class + '"></span>');
		weapon_control.insert('<span class="descriptor"> ammo: </span><span class="' + this.options.ammo_class + '"></span>');
		weapon_control.insert('<span class="' + this.options.range_class + '"><span class="descriptor"> range: </span><span class="descriptor"> short (+1): </span><span class="' + this.options.short_class + '"></span><span class="descriptor"> medium (0): </span><span class="' + this.options.medium_class + '"></span><span class="descriptor"> long (-1): </span><span class="' + this.options.long_class + '"></span></span>');
		weapon_control.insert('<span> (cost: <span class="' + this.options.cost_class + '"></span> slots: <span class="' + this.options.slots_class + '"></span>) </span>');
		weapon_control.insert('<input type="button" class="' + this.options.delete_class + '" value="Delete" />');
	},

	refresh_multiples: function(weapon_template)
	{
		var multiple_selector = $(this.options.id).down('.' + this.options.multiple_class);
		if (weapon_template.multiples)
		{
			multiple_selector.update(this.create_multiples_options()).show();
		}
		else
		{
			multiple_selector.update().hide();
		}
	},

	refresh_weapon_stats: function(weapon_stats)
	{
		var weapon_control = $(this.options.id);
		this.refresh_stat(this.options.attack_dice_class, weapon_stats.attack_dice, weapon_control);
		this.refresh_stat(this.options.damage_class, weapon_stats.damage, weapon_control);
		this.refresh_stat(this.options.ammo_class, weapon_stats.ammo || '-', weapon_control);
		this.refresh_stat(this.options.cost_class, weapon_stats.cost, weapon_control);
		this.refresh_stat(this.options.slots_class, weapon_stats.slots, weapon_control);
		this.refresh_stat(this.options.short_class, weapon_stats.short_range, weapon_control);
		this.refresh_stat(this.options.medium_class, weapon_stats.medium_range, weapon_control);
		this.refresh_stat(this.options.long_class, weapon_stats.long_range, weapon_control);
	},

	refresh_stat: function(stat_class, stat_value, weapon_control)
	{
		weapon_control = weapon_control || $(this.options.id);
		weapon_control.down('.' + stat_class).update(stat_value);
	}
};
