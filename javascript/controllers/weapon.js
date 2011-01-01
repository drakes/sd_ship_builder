var WeaponController =
{
	connect_event_handlers: function()
	{
		var weapon_control = $(this.options.id);
		weapon_control.observe('click', this.click_handler.bindAsEventListener(this));
		weapon_control.observe(this.options.firing_arc_changed_event, this.firing_arc_changed_handler.bindAsEventListener(this));
		weapon_control.down('.' + this.options.type_class).observe(this.options.selection_changed_event, this.type_change_handler.bindAsEventListener(this));
		weapon_control.down('.' + this.options.multiple_class).observe(this.options.selection_changed_event, this.multiples_change_handler.bindAsEventListener(this));
		this.find_ammo_selector().observe(this.options.selection_changed_event, this.ammo_change_handler.bindAsEventListener(this));
	},

	click_handler: function(event)
	{
		var clicked_element = event.findElement();
		if (clicked_element.hasClassName(this.options.delete_class))
		{
			this.delete_handler(event);
		}
	},

	delete_handler: function(event)
	{
		event.stop();

		var weapon_control = $(this.options.id);
		weapon_control.fire(this.options.deleted_event, this.options.id);
		weapon_control.remove();
		//now GC should be able to reclaim this object
	},

	type_change_handler: function(event)
	{
		this.refresh_multiples(this.get_weapon_template());
		this.refresh_ammo(this.get_ammo_template());
		this.refresh();
		this.send_update();
	},

	multiples_change_handler: function(event)
	{
		this.refresh_ammo(this.get_ammo_template());
		this.refresh();
		this.send_update();
	},

	ammo_change_handler: function(event)
	{
		this.refresh();
		this.send_update();
	},

	firing_arc_changed_handler: function(event)
	{
		this.store_firing_arc_stats(event.memo);
		this.send_update();
	},

	refresh: function()
	{
		this.refresh_weapon_stats(this.get_weapon_stats());
		var ammo_template = this.get_ammo_template();
		if (ammo_template)
		{
			this.refresh_ammo_stats(this.get_ammo_stats());
		}
	},

	send_update: function()
	{
		var weapon_stats = this.get_weapon_stats_total();
		var memo =
		{
			id: this.options.id,
			cost: weapon_stats.cost,
			slots: weapon_stats.slots
		};
		$(this.options.id).fire(this.options.changed_event, memo);
	}
};
