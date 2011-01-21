var PersistenceModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and CSS
			id: 'duplicate',

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

			symbols:
			{
				protocol_version: 'p',
				ship_name: 'n',
				ship_designer: 'e',
				ship_class: 's',
				tons: 't',
				crew_size: 'c',
				crew_skill: 'k',
				drive: 'r',
				defensive_value: 'v',
				damage_reduction: 'd',
				weapon_type: 'w',
				weapon_multiple: 'm',
				ammo: 'a',
				firing_arcs: 'f',
				ship_option_type: 'o',
				option_dimension_one: 'x',
				option_dimension_two: 'y',
				quirk_type: 'q'
			}
		};
		Object.extend(this.options, options);

		this.template = null;
		this.ship_class = null;
		this.tons = null;
		this.crew_size = null;
		this.control_attributes = $H();
		this.weapons = $H();
		this.ship_options = $H();
		this.crew_skills = $H();

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
		var value_and_traits =
		{
			value: attribute_package[this.options.stat_property],
			gunboat: attribute_package.gunboat
		};
		this.control_attributes.set(attribute_package.id, value_and_traits);
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

	get_base_url: function()
	{
		return location.protocol + '//' + location.host + location.pathname;
	},

	calculate_current: function()
	{
		var current_stat = this.control_attributes.values().inject(0, function(current, value_and_traits)
		{
			if (value_and_traits.gunboat === null || this.template.gunboat && value_and_traits.gunboat || !this.template.gunboat && !value_and_traits.gunboat)
			{
				return current + (value_and_traits.value || 0);
			}
			return current;
		}, this);
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
		return current + (value || 0);
	},

	encode_to_url: function()
	{
		var url = this.get_base_url();
		return url;
	}
};
