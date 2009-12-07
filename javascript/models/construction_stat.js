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

			//data
			stat_property: 'stat',
			crew_based: false
		};
		Object.extend(this.options, options);

		this.template = null;
		this.crew = 1;
		this.control_attributes = $H();
		this.weapons = $H();

		this.connect_event_handlers();
	},

	store_template: function(template)
	{
		this.template = template;
	},

	store_crew: function(crew)
	{
		this.crew = crew;
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

	get_template_value: function()
	{
		if (this.options.crew_based)
		{
			//sometimes the template changes before the crew's been updated
			//the crew_template change event immediately following has the necessary info, in the meantime this covers the gap
			return (this.template.crew[this.get_crew()] || {})[this.options.stat_property];
		}
		else
		{
			return this.template[this.options.stat_property];
		}
	},

	get_crew: function()
	{
		return this.crew;
	},

	calculate_current: function()
	{
		var current_stat = this.control_attributes.values().inject(0, function(current, value)
		{
			return current + value;
		});
		return this.weapons.values().inject(current_stat, function(current, value)
		{
			return current + value;
		});
	}
};
