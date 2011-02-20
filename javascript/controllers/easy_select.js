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
		if (this.options.disappearing_hint)
		{
			this.remove_hint();
		}
		$(this.options.id).fire(this.options.changed_event, { value: value });
	},

	get: function()
	{
		return $F(this.options.id);
	},

	set: function(value, force_update)
	{
		this.store_value(value);
		$(this.options.id).setValue(value);
		if (force_update)
		{
			this.send_update(value);
		}
	},

	set_by_index: function(index)
	{
		var options = $(this.options.id).childElements();
		options = options.reject(function(option)
		{
			return option.hasClassName(this.options.hint_class);
		}, this);
		var value = options[index].readAttribute('value');
		this.set(value, true);
	},

	index_of: function(key)
	{
		if (key === undefined)
		{
			key = this.get();
		}
		var options = $(this.options.id).select('option');
		var index = 0;
		var hints = 0;
		options.each(function(option, i)
		{
			if (option.value == key)
			{
				index = i;
			}
			else if (option.hasClassName(this.options.hint_class))
			{
				hints++;
			}
		}, this);
		//don't count hints as valid previous options
		return index - hints;
	},

	reset: function()
	{
		this.store_value();
	},

	update_options: function(keys)
	{
		var value = this.get();
		this.replace_options(this.format_option_data(keys));
		if (value)
		{
			this.set(value);
		}
	},

	remove_option: function(key)
	{
		this.remove_option_by_key(key);
		this.toggle_by_option_presence();
	},

	add_option: function(key)
	{
		this.append_options(this.format_option_data(key));
		this.toggle_by_option_presence();
	},

	add_hint: function(hint)
	{
		var existing_option_contents = $(this.options.id).childElements().pluck('innerHTML');
		if (existing_option_contents.any(function(content) { return content == hint; }))
		{
			//prevent duplicate hints
			return;
		}
		this.prepend_hint(hint);
	}
};
