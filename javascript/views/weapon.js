var WeaponView =
{
	create_controls: function()
	{
		var weapon_control = $(this.options.id);
		var type_selector = new Element('select', { 'class': this.options.type_class });
		type_selector.update(this.create_type_options());
		weapon_control.insert('<label for="' + type_selector.identify() + '" class="descriptor">Type: </label>');
		weapon_control.insert(type_selector);

		weapon_control.insert('<span class="descriptor"> base attack dice: </span><span class="' + this.options.attack_dice_class + '"></span>');
		weapon_control.insert('<span class="descriptor"> damage: </span><span class="' + this.options.damage_class + '"></span>');
		weapon_control.insert('<span class="descriptor"> ammo: </span><span class="' + this.options.ammo_class + '"></span>');
		weapon_control.insert('<span> (cost: <span class="' + this.options.cost_class + '"></span> slots: <span class="' + this.options.slots_class + '"></span>) </span>');
		weapon_control.insert('<input type="button" class="' + this.options.delete_class + '" value="Delete" />');
	},

	refresh_weapon_stats: function(weapon_template, damage_types)
	{
		var weapon_control = $(this.options.id);
		weapon_control.down('.' + this.options.attack_dice_class).update('2D' + weapon_template.attack_die);
		weapon_control.down('.' + this.options.damage_class).update(damage_types[weapon_template.damage_index]);
		weapon_control.down('.' + this.options.ammo_class).update(weapon_template.ammo);
		weapon_control.down('.' + this.options.cost_class).update(weapon_template.cost);
		weapon_control.down('.' + this.options.slots_class).update(weapon_template.slots);
	}
};
