var EasySelectModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: null,

			//events
			changed_event: 'selection:changed'
		};
		Object.extend(this.options, options);

		this.store_value(null);
		this.connect_event_handlers();
	},

	has_changed: function(value)
	{
		if (value == this.last_value)
		{
			return false;
		}
		this.store_value(value);
		return true;
	},

	store_value: function(value)
	{
		this.last_value = value;
	}
};
