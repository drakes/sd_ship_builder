var ConstructionStatModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and CSS
			id: 'stat',
			current_class: 'current',
			template_class: 'template',
			invalid_class: 'invalid',

			//events
			template_changed_event: 'template:changed',
			crew_template_changed_event: 'crew_template:changed',
			attribute_changed_event: 'attribute:changed',
			weapon_changed_event: 'weapon:changed',
			weapon_deleted_event: 'weapon:deleted',
			option_changed_event: 'option:changed',
			option_deleted_event: 'option:deleted',
			crew_changed_event: 'crew:changed',
			crew_deleted_event: 'crew:deleted',
			crew_toggled_event: 'crew:toggled',

			//data
			stat_property: 'stat',
			crew_based: false
		};
		Object.extend(this.options, options);

		this.template = null;
		this.crew_size = 1;
		this.control_attributes = $H();
		this.weapons = $H();
		this.ship_options = $H();
		this.crew_costs = $H();

		this.connect_event_handlers();
	},

	store_template: function(template)
	{
		this.template = template;
	},

	store_crew_template: function(crew)
	{
		this.crew_size = crew;
	},

	store_control_attribute: function(attribute_package)
	{
		this.control_attributes.set(attribute_package.id, attribute_package[this.options.stat_property]);
	},

	store_weapon: function(weapon_package)
	{
		this.weapons.set(weapon_package.id, weapon_package[this.options.stat_property]);
	},

	delete_weapon: function(weapon_id)
	{
		this.weapons.unset(weapon_id);
	},

	store_option: function(option_package)
	{
		this.ship_options.set(option_package.id, option_package[this.options.stat_property]);
	},

	delete_option: function(option_id)
	{
		this.ship_options.unset(option_id);
	},

	store_crew: function(crew_package)
	{
		if (crew_package[this.options.stat_property] !== undefined)
		{
			this.crew_costs.set(crew_package.id, crew_package[this.options.stat_property]);
		}
	},

	store_crew_disabled: function(disabled)
	{
		this.crew_disabled = disabled;
	},

	delete_crew: function(crew_id)
	{
		this.crew_costs.unset(crew_id);
	},

	get_template_value: function()
	{
		if (this.options.crew_based)
		{
			//sometimes the template changes before the crew's been updated
			//the crew_template change event immediately following has the necessary info, in the meantime this covers the gap
			return (((this.template || {}).crew || {})[this.get_crew_template()] || {})[this.options.stat_property];
		}
		else
		{
			//sometimes the attribute change event fires before the template's been updated
			//the template change event immediately following has the necessary info, in the meantime this covers the gap
			return (this.template || {})[this.options.stat_property];
		}
	},

	get_crew_template: function()
	{
		return this.crew_size;
	},

	calculate_current: function()
	{
		var current_stat = this.control_attributes.values().inject(0, this.tally_current);
		current_stat = this.weapons.values().inject(current_stat, this.tally_current);
		current_stat = this.ship_options.values().inject(current_stat, this.tally_current);
		if (!this.crew_disabled)
		{
			current_stat = this.crew_costs.values().inject(current_stat, this.tally_current);
		}
		return current_stat;
	},

	tally_current: function(current, value)
	{
		return current + value;
	}
};
