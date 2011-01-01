var EasySelectModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: null,
			hint_class: 'hint',

			//behavior
			disappearing_hint: true,

			//events
			changed_event: 'selection:changed'
		};
		Object.extend(this.options, options);

		this.store_value('');
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
	},

	format_option_data: function(pairs)
	{
		var option_pairs = [];
		if (!pairs)
		{
			return option_pairs;
		}
		if (Object.isString(pairs[0]) || Object.isNumber(pairs[0]))
		{
			option_pairs = pairs.collect(function(key)
			{
				return {
					key: key,
					value: key
				};
			});
		}
		else
		{
			option_pairs = pairs;
		}
		return option_pairs;
	}
};
