var OptionController =
{
	connect_event_handlers: function()
	{
		var option_control = $(this.options.id);
		option_control.on('click', '.' + this.options.delete_class, this.delete_handler.bind(this));
		option_control.on(this.options.selection_changed_event, 'select', this.selection_changed_handler.bind(this));
		this.bound_ship_reset_handler = this.ship_reset_handler.bindAsEventListener(this);
		document.observe(this.options.ship_reset_event, this.bound_ship_reset_handler);
	},

	disconnect_event_handlers: function()
	{
		document.stopObserving(this.options.ship_reset_event, this.bound_ship_reset_handler);
	},

	delete_handler: function(event, delete_button)
	{
		if (event)
		{
			event.stop();
		}

		this.disconnect_event_handlers();
		var option_control = $(this.options.id);
		option_control.fire(this.options.deleted_event, this.options.id);
		option_control.remove();
		//now GC should be able to reclaim this object
	},

	selection_changed_handler: function(event, selector)
	{
		var index = this.find_selector_index(selector);
		this.store_key(event.memo.value, index);
		var stats = this.get_stats();
		if (!stats)
		{
			//during initialization with multiple dimensions wait until stats are available (all dimensions have changed)
			return;
		}
		this.refresh_construction_stats(stats);
		this.send_update(stats);
	},

	ship_reset_handler: function(event)
	{
		this.delete_handler();
	},

	send_update: function(stats)
	{
		var memo =
		{
			id: this.options.id,
			cost: stats.cost,
			slots: stats.slots,
			type_index: this.options.type_index,
			dimension_indices: this.get_dimension_indices()
		};
		$(this.options.id).fire(this.options.changed_event, memo);
	}
};
