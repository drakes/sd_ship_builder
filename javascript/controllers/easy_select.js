var EasySelectController =
{
	connect_event_handlers: function()
	{
		var control = $(this.options.id);
		control.observe('click', this.change_handler.bindAsEventListener(this));
		control.observe('change', this.change_handler.bindAsEventListener(this));
		control.observe('keyup', this.change_handler.bindAsEventListener(this));
	},

	change_handler: function(event)
	{
		//deliberately listening for multiple events which could be firing in tandem, duplicate "changes" should not be passed on
		var value = this.get();
		if (this.has_changed(value))
		{
			this.send_update(value);
		}
	},

	send_update: function(value)
	{
		$(this.options.id).fire(this.options.changed_event, { value: value });
	},

	get: function()
	{
		return $F(this.options.id);
	},

	set: function(value)
	{
		this.store_value(value);
		$(this.options.id).setValue(value);
	},

	update_options: function(keys)
	{
		var value = this.get();
		this.replace_options(keys);
		this.set(value);
	}
};
