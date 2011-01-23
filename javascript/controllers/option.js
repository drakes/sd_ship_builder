var OptionController =
{
	connect_event_handlers: function()
	{
		var option_control = $(this.options.id);
		option_control.on('click', '.' + this.options.delete_class, this.delete_handler.bind(this));
		option_control.on(this.options.selection_changed_event, 'select', this.selection_changed_handler.bind(this));
	},

	delete_handler: function(event, delete_button)
	{
		event.stop();

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
