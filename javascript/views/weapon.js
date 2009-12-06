var WeaponView =
{
	find_firing_arc: function()
	{
		return $(this.options.id).down('.' + this.options.firing_arc_class);
	},

	create_controls: function()
	{
		var weapon_control = $(this.options.id);
		var controls = new Element('span', { 'class': 'controls' });
		var type_control = new Element('span', { 'class': 'type_control' });
		var type_selector = new Element('select', { 'class': this.options.type_class });
		type_selector.update(this.create_type_options());
		type_control.insert('<label for="' + type_selector.identify() + '" class="descriptor">Type: </label>');
		var multiple_selector = new Element('select', { 'class': this.options.multiple_class });
		type_control.insert(multiple_selector);
		type_control.insert(type_selector);
		type_control.insert('<span class="construction_stats"> (cost: <span class="' + this.options.cost_class + '"></span> slots: <span class="' + this.options.slots_class + '"></span>) </span>');
		controls.insert(type_control);
		controls.insert('<' + this.options.firing_arc_tag + ' class="' + this.options.firing_arc_class + '"></' + this.options.firing_arc_tag + '>');
		weapon_control.insert(controls);

		this.create_stats(weapon_control);
	},
	
	create_stats: function(weapon_control)
	{
		weapon_control.insert('<span class="stat"><span class="descriptor"> Base Attack Dice: </span><span class="' + this.options.attack_dice_class + '"></span></span>');
		weapon_control.insert('<span class="stat"><span class="descriptor"> Damage: </span><span class="' + this.options.damage_class + '"></span>');
		weapon_control.insert('<span class="stat"><span class="descriptor"> Ammo: </span><span class="' + this.options.ammo_class + '"></span>');
		weapon_control.insert('<span class="stat"><span class="descriptor"> Target Speed Restriction: </span><span class="' + this.options.speed_restriction_class + '"></span>');
		weapon_control.insert('<span class="' + this.options.range_class + ' stat"><span class="descriptor"> Range: </span><span class="descriptor"> Short (+1): </span><span class="' + this.options.short_class + '"></span><span class="descriptor"> Medium (0): </span><span class="' + this.options.medium_class + '"></span><span class="descriptor"> Long (-1): </span><span class="' + this.options.long_class + '"></span></span>');
		weapon_control.insert('<span class="' + this.options.note_container_class + ' stat" style="display: none;"><span class="descriptor"> Note: </span><span class="' + this.options.note_class + '"></span></span>');
		weapon_control.insert('<input type="button" class="' + this.options.delete_class + '" value="Delete" />');
	},

	decorate_control: function()
	{
		$(this.options.id).addClassName(this.options.weapon_class);
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
		this.refresh_stat(this.options.speed_restriction_class, (weapon_stats.speed_restriction ? ('Drive =< ' + weapon_stats.speed_restriction) : '-'), weapon_control);
		this.refresh_stat(this.options.short_class, weapon_stats.short_range, weapon_control);
		this.refresh_stat(this.options.medium_class, weapon_stats.medium_range, weapon_control);
		this.refresh_stat(this.options.long_class, weapon_stats.long_range, weapon_control);
		this.refresh_stat(this.options.cost_class, weapon_stats.cost, weapon_control);
		this.refresh_stat(this.options.slots_class, weapon_stats.slots, weapon_control);

		var note_container = weapon_control.down('.' + this.options.note_container_class);
		if (weapon_stats.note)
		{
			this.refresh_stat(this.options.note_class, weapon_stats.note, weapon_control);
			note_container.show();
		}
		else
		{
			note_container.hide();
		}
	},

	refresh_stat: function(stat_class, stat_value, weapon_control)
	{
		weapon_control = weapon_control || $(this.options.id);
		weapon_control.down('.' + stat_class).update(stat_value);
	}
};
