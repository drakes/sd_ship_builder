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
				defense: 'v', //defensive value
				damage_reduction: 'd',
				weapon_type: 'w',
				weapon_multiple: 'm',
				ammo: 'a',
				firing_arcs: 'f',
				ship_option_type: 'o',
				option_dimension_one: 'x',
				option_dimension_two: 'y',
				quirk_type: 'q'
			},
			gunboat_facing_order: ['front', 'right', 'rear', 'left']
		};
		Object.extend(this.options, options);

		this.template = null;
		this.ship_class = null;
		this.tons = null;
		this.attributes = $H();
		this.weapons = $H();
		this.ship_options = $H();
		this.crew_skills = $H();

		this.connect_event_handlers();
	},

	store_template: function(template)
	{
		this.template = template;
	},

	store_attribute: function(attribute_package)
	{
		this.attributes.set(attribute_package.id, attribute_package);
	},

	store_crew: function(crew_package)
	{
		this.crew_skills.set(crew_package.id, crew_package);
	},

	store_crew_disabled: function(disabled)
	{
		this.crew_disabled = disabled;
	},

	delete_crew: function(crew_id)
	{
		this.crew_skills.unset(crew_id);
	},

	store_weapon: function(weapon_package)
	{
		this.weapons.set(weapon_package.id, weapon_package);
	},

	delete_weapon: function(weapon_id)
	{
		this.weapons.unset(weapon_id);
	},

	store_option: function(option_package)
	{
		this.ship_options.set(option_package.id, option_package);
	},

	delete_option: function(option_id)
	{
		this.ship_options.unset(option_id);
	},

	get_base_url: function()
	{
		return location.protocol + '//' + location.host + location.pathname;
	},

	add_parameter: function(parameter_pairs, symbol, index, required)
	{
		if (index || required)
		{
			//symbols ending in a number are assumed to already have an instance number
			if (!symbol.match(/\d$/))
			{
				var instance_number = parameter_pairs.findAll(function(pair)
				{
					return pair[0].indexOf(symbol) > -1;
				}).length;
				if (instance_number)
				{
					symbol += instance_number;
				}
			}
			parameter_pairs.push([symbol, index]);
		}
	},

	add_crew_skill_parameters: function(parameter_pairs)
	{
		var skill_sets = this.crew_skills.values();
		if (this.crew_disabled || !skill_sets.length)
		{
			return;
		}
		skill_sets = skill_sets.partition(function(skill_set)
		{
			return skill_set.piloting_index !== undefined;
		});
		var pilot = skill_sets[0][0];
		var gunners = skill_sets[1];
		//ensures the pilot's piloting, then gunnery, are first
		this.add_parameter(parameter_pairs, this.options.symbols.crew_skill, pilot.piloting_index, true);
		this.add_parameter(parameter_pairs, this.options.symbols.crew_skill, pilot.gunnery_index, true);
		gunners.pluck('gunnery_index').each(function(gunnery_index)
		{
			this.add_parameter(parameter_pairs, this.options.symbols.crew_skill, gunnery_index);
		}, this);
	},

	add_attribute_parameters: function(parameter_pairs)
	{
		var attributes = this.attributes.values();
		if (!attributes.length)
		{
			return;
		}
		attributes.each(function(attribute)
		{
			if (attribute.attribute != 'damage_reduction' || (!this.template.gunboat && !attribute.gunboat))
			{
				this.add_parameter(parameter_pairs, this.options.symbols[attribute.attribute], attribute.index);
			}
			else if (this.template.gunboat && attribute.gunboat)
			{
				var order = this.options.gunboat_facing_order.indexOf(attribute.facing);
				//suffixing order even when 0 prevents automatic indexing, as the front is not necessarily first
				var symbol = this.options.symbols[attribute.attribute] + order;
				this.add_parameter(parameter_pairs, symbol, attribute.index);
			}
		}, this);
	},

	add_weapon_parameters: function(parameter_pairs)
	{
		var weapons = this.weapons.values();
		for (var i = 0, l = weapons.length; i < l; i++)
		{
			var weapon = weapons[i];
			this.add_parameter(parameter_pairs, this.options.symbols.weapon_type + (i ? i : ''), weapon.type_index, true);
			this.add_parameter(parameter_pairs, this.options.symbols.weapon_multiple + (i ? i : ''), weapon.multiples_index);
			this.add_parameter(parameter_pairs, this.options.symbols.ammo + (i ? i : ''), weapon.ammo_index);
			this.add_parameter(parameter_pairs, this.options.symbols.firing_arcs + (i ? i : ''), weapon.firing_arcs);
		}
	},

	encode_to_url: function()
	{
		var parameter_pairs= [];
		this.add_parameter(parameter_pairs, this.options.symbols.ship_class, this.template.ship_class_index, true);
		this.add_parameter(parameter_pairs, this.options.symbols.tons, this.template.tons_index);
		this.add_parameter(parameter_pairs, this.options.symbols.crew_size, this.template.crew_index);
		this.add_attribute_parameters(parameter_pairs);
		this.add_crew_skill_parameters(parameter_pairs);
		this.add_weapon_parameters(parameter_pairs);

		return this.get_base_url() + this.encode_query_string(parameter_pairs);
	},

	encode_query_string: function(parameter_pairs)
	{
		if (!parameter_pairs.length)
		{
			return '';
		}
		return '?' + parameter_pairs.invoke('join', '=').join('&');
	}
};
