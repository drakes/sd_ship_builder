var WeaponController =
{
	connect_event_handlers: function()
	{
		var weapon_control = $(this.options.id);
		weapon_control.observe('click', this.click_handler.bindAsEventListener(this));
		weapon_control.down('.' + this.options.type_class).observe('change', this.type_change_handler.bindAsEventListener(this));
	},

	click_handler: function(event)
	{
		var clicked_element = event.findElement();
		if (clicked_element.hasClass(this.options.type_class))
		{
			//type selector, do nothing
		}
		if (clicked_element.hasClass(this.options.delete_class))
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
		this.update_construction_stats();
		var memo =
		{
			id: this.options.id,
			cost: this.get_cost(),
			slots: this.get_slots()
		};
		$(this.options.id).fire(this.options.changed_event, memo);
	}
};
