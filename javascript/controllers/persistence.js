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
		var bookmark_field = $(this.options.bookmark_field_id);
		bookmark_field.observe('focus', this.bookmark_field_focused_handler.bind(this));
		bookmark_field.observe('click', this.bookmark_field_focused_handler.bind(this));
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
		var name_field = $(this.options.name_id);
		var name = name_field.value;
		if (name == name_field.defaultValue || !name.match(/\S/))
		{
			name = '';
			$(this.options.name_display_id).update(name).up().hide();
		}
		else
		{
			$(this.options.name_display_id).update(name).up().show();
			name += ' - ';
		}
		document.title = name + this.original_title;
		this.refresh();
	},

	bookmark_field_focused_handler: function(event)
	{
		event.findElement().select();
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
		var url = this.encode_to_url();
		this.refresh_link(url);
		$(this.options.bookmark_field_id).setValue(url).show();
	},

	restore_ship: function(ship_parameters)
	{
		if (!ship_parameters)
		{
			return;
		}
		this.restore_template.bind(this).defer(ship_parameters);
		this.restore_attributes.bind(this).defer(ship_parameters);
		this.restore_crew_skills.bind(this).defer(ship_parameters);
		this.restore_weapons.bind(this).defer(ship_parameters);
		this.restore_options.bind(this).defer(ship_parameters);
		var name = ship_parameters.get(this.options.symbols.ship_name);
		if (name)
		{
			$(this.options.name_id).value = name;
			this.name_changed_handler.bind(this).defer();
		}
	},

	restore_template: function(ship_parameters)
	{
		var memo =
		{
			ship_class: ship_parameters.get(this.options.symbols.ship_class),
			tons: ship_parameters.get(this.options.symbols.tons),
			crew_size: ship_parameters.get(this.options.symbols.crew_size)
		};
		document.fire(this.options.template_restored_event, memo);
	},

	restore_attributes: function(ship_parameters)
	{
		var memo =
		{
			drive: ship_parameters.get(this.options.symbols.drive),
			defense: ship_parameters.get(this.options.symbols.defense),
			damage_reduction: this.decode_damage_reduction_parameters(ship_parameters)
		};
		if (memo.drive || memo.defense || memo.damage_reduction)
		{
			document.fire(this.options.attributes_restored_event, memo);
		}
	},

	restore_crew_skills: function(ship_parameters)
	{
		var memo = this.decode_crew_skill_parameters(ship_parameters);
		document.fire(this.options.crew_skills_restored_event, memo);
	},

	restore_weapons: function(ship_parameters)
	{
		var memo = this.decode_weapon_parameters(ship_parameters);
		if (memo)
		{
			document.fire(this.options.weapons_restored_event, memo);
		}
	},

	restore_options: function(ship_parameters)
	{
		var memo = this.decode_option_parameters(ship_parameters);
		if (memo)
		{
			document.fire(this.options.options_restored_event, memo);
		}
	}
};
