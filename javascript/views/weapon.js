var WeaponView =
{
	find_firing_arc: function()
	{
		return $(this.options.id).down('.' + this.options.firing_arc_class);
	},

	find_ammo_control: function()
	{
		return $(this.options.id).down('.' + this.options.ammo_class);
	},

	find_ammo_selector: function()
	{
		return this.find_ammo_control().down('select');
	},

	create_controls: function()
	{
		var weapon_control = $(this.options.id);
		weapon_control.insert('<input type="button" class="' + this.options.delete_class + '" value="Delete" />');
		var controls = new Element('span', { 'class': 'controls' });
		var type_control = new Element('span', { 'class': 'type_control' });
		var type_selector = new Element('select', { 'class': this.options.type_class });
		var type_id = type_selector.identify();
		type_control.insert('<label for="' + type_id + '" class="descriptor">Type: </label>');
		var multiple_selector = new Element('select', { 'class': this.options.multiple_class });
		var multiple_id = multiple_selector.identify();
		type_control.insert(multiple_selector);
		type_control.insert(type_selector);
		type_control.insert('<span class="construction_stats"> (cost: <span class="' + this.options.cost_class + '"></span> slots: <span class="' + this.options.slots_class + '"></span>)</span>');
		var ammo_control = new Element('span', { 'class': this.options.ammo_class });
		var ammo_selector = new Element('select');
		var ammo_id = ammo_selector.identify();
		ammo_control.insert('<label for=' + ammo_selector.identify() + '" class="descriptor">Ammo: </label>');
		ammo_control.insert(ammo_selector);
		ammo_control.insert('<span class="construction_stats"> (cost: <span class="' + this.options.cost_class + '">0</span> slots: <span class="' + this.options.slots_class + '">0</span>)</span>');
		controls.insert(type_control);
		controls.insert(ammo_control);
		controls.insert('<' + this.options.firing_arc_tag + ' class="' + this.options.firing_arc_class + '"></' + this.options.firing_arc_tag + '>');
		weapon_control.insert(controls);

		this.create_stats(weapon_control);
		return {
			type: type_id,
			multiple: multiple_id,
			ammo: ammo_id
		};
	},
	
	create_stats: function(weapon_control)
	{
		weapon_control.insert('<span class="stat"><span class="descriptor">Base Attack Dice: </span><span class="' + this.options.attack_dice_class + '"></span></span>');
		weapon_control.insert('<span class="stat"><span class="descriptor">Damage: </span><span class="' + this.options.damage_class + '"></span>');
		weapon_control.insert('<span class="stat"><span class="descriptor">Target Speed Restriction: </span><span class="' + this.options.speed_restriction_class + '"></span>');
		weapon_control.insert('<span class="' + this.options.range_class + ' stat"><span class="descriptor">Range: </span><span class="descriptor">Short (+1): </span><span class="' + this.options.short_class + '"></span><span class="descriptor">Medium (0): </span><span class="' + this.options.medium_class + '"></span><span class="descriptor">Long (-1): </span><span class="' + this.options.long_class + '"></span></span>');
		weapon_control.insert('<span class="' + this.options.note_container_class + ' stat" style="display: none;"><span class="descriptor">Note: </span><span class="' + this.options.note_class + '"></span></span>');
	},

	decorate_control: function()
	{
		$(this.options.id).addClassName(this.options.weapon_class);
	},

	toggle_firing_arc_display: function(show)
	{
		var firing_arc = this.find_firing_arc();
		if (show)
		{
			firing_arc.show();
		}
		else
		{
			firing_arc.hide();
		}
	},

	refresh_multiples: function(weapon_template)
	{
		var multiple_selector = $(this.options.id).down('.' + this.options.multiple_class);
		if (weapon_template.multiples)
		{
			var multiples_options = this.create_multiples_options();
			this.multiple_select.update_options(multiples_options);
			this.multiple_select.set(multiples_options[0].key);
			multiple_selector.show();
		}
		else
		{
			this.multiple_select.update_options();
			multiple_selector.hide();
		}
	},

	refresh_ammo: function(ammo_template)
	{
		var ammo_control = this.find_ammo_control();
		var ammo_selector = this.find_ammo_selector();
		if (ammo_template)
		{
			var ammo_options = this.create_ammo_options();
			this.ammo_select.update_options(ammo_options);
			this.ammo_select.set(ammo_options[0].key);
			ammo_control.show();
		}
		else
		{
			ammo_control.hide();
		}
	},

	refresh_ammo_stats: function(ammo_stats)
	{
		var ammo_control = this.find_ammo_control();
		this.refresh_stat(this.options.cost_class, ammo_stats.cost, ammo_control);
		this.refresh_stat(this.options.slots_class, ammo_stats.slots, ammo_control);
	},

	refresh_weapon_stats: function(weapon_stats)
	{
		var weapon_control = $(this.options.id);
		this.refresh_stat(this.options.attack_dice_class, weapon_stats.attack_dice, weapon_control);
		this.refresh_stat(this.options.damage_class, weapon_stats.damage, weapon_control);
		this.refresh_stat(this.options.speed_restriction_class, (weapon_stats.speed_restriction ? ('Drive &le; ' + weapon_stats.speed_restriction) : null), weapon_control);
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

	refresh_stat: function(stat_class, stat_value, control)
	{
		if (!stat_value && stat_value !== 0)
		{
			stat_value = '-';
		}
		control.down('.' + stat_class).update(stat_value);
	}
};
