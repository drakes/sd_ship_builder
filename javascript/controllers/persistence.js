var PersistenceController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
		document.observe(this.options.attribute_changed_event, this.attribute_changed_handler.bindAsEventListener(this));
		document.observe(this.options.weapon_changed_event, this.weapon_changed_handler.bindAsEventListener(this));
		document.observe(this.options.weapon_deleted_event, this.weapon_deleted_handler.bindAsEventListener(this));
		document.observe(this.options.option_changed_event, this.option_changed_handler.bindAsEventListener(this));
		document.observe(this.options.option_deleted_event, this.option_deleted_handler.bindAsEventListener(this));
		document.observe(this.options.crew_changed_event, this.crew_changed_handler.bindAsEventListener(this));
		document.observe(this.options.crew_deleted_event, this.crew_deleted_handler.bindAsEventListener(this));
		document.observe(this.options.crew_toggled_event, this.crew_toggled_handler.bindAsEventListener(this));
		var name_field = $(this.options.name_id);
		name_field.observe('focus', this.name_focused_handler.bindAsEventListener(this));
		name_field.observe('blur', this.name_blurred_handler.bindAsEventListener(this));
		name_field.observe('change', this.name_changed_handler.bindAsEventListener(this));
		name_field.observe('keyup', this.name_changed_handler.bindAsEventListener(this));
	},

	name_focused_handler: function(event)
	{
		var name_field = event.findElement();
		if (name_field.value == name_field.defaultValue)
		{
			name_field.value = '';
			this.refresh();
		}
	},

	name_blurred_handler: function(event)
	{
		var name_field = event.findElement();
		if (name_field.value == '')
		{
			name_field.value = name_field.defaultValue;
			this.refresh();
		}
	},

	name_changed_handler: function(event)
	{
		var name_field = event.findElement();
		var name = name_field.value;
		if (name == name_field.defaultValue || !name.match(/\S/))
		{
			name = '';
		}
		else
		{
			name += ' - ';
		}
		document.title = name + this.original_title;
		this.refresh();
	},

	template_changed_handler: function(event)
	{
		this.store_template(event.memo);
		this.refresh();
	},

	attribute_changed_handler: function(event)
	{
		this.store_attribute(event.memo);
		this.refresh();
	},

	weapon_changed_handler: function(event)
	{
		this.store_weapon(event.memo);
		this.refresh();
	},

	weapon_deleted_handler: function(event)
	{
		this.delete_weapon(event.memo);
		this.refresh();
	},

	option_changed_handler: function(event)
	{
		this.store_option(event.memo);
		this.refresh();
	},

	option_deleted_handler: function(event)
	{
		this.delete_option(event.memo);
		this.refresh();
	},

	crew_changed_handler: function(event)
	{
		this.store_crew(event.memo);
		this.refresh();
	},

	crew_deleted_handler: function(event)
	{
		this.delete_crew(event.memo);
		this.refresh();
	},

	crew_toggled_handler: function(event)
	{
		this.store_crew_disabled(!event.memo.show);
		this.refresh();
	},

	refresh: function()
	{
		$(this.options.name_id).show();
		this.refresh_link(this.encode_to_url());
	}
};
