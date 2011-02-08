var PersistenceModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and CSS
			id: 'duplicate',
			name_id: 'name',
			name_display_id: 'display_name',
			crew_section_toggle_id: 'crew_section_toggle',

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
			template_restored_event: 'template:restored',
			attributes_restored_event: 'attributes:restored',
			crew_skills_restored_event: 'crew_skills:restored',
			weapons_restored_event: 'weapons:restored',
			options_restored_event: 'options:restored',

			//data serialization
			symbols:
			{
				protocol_version: 'p', //reserved in case changes are needed and backward compatibility is desired
				ship_name: 'n',
				ship_class: 's',
				tons: 't',
				crew_size: 'c',
				crew_skill: 'k',
				drive: 'r',
				defense: 'e',
				damage_reduction: 'd',
				weapon_type: 'w',
				weapon_multiple: 'm',
				ammo: 'a',
				firing_arcs: 'f',
				ship_option_type: 'o',
				option_dimensions: ['x', 'y'], //only two are currently needed/used
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

		this.original_title = document.title;

		this.connect_event_handlers();
		this.restore_ship(this.decode_query_string());
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

	add_name_parameter: function(parameter_pairs)
	{
		var name_field = $(this.options.name_id);
		var name = name_field.value;
		if (name == name_field.defaultValue || !name.match(/\S/))
		{
			return;
		}
		this.add_parameter(parameter_pairs, this.options.symbols.ship_name, encodeURIComponent(name));
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

	add_ship_option_parameters: function(parameter_pairs)
	{
		var ship_options = this.ship_options.values();
		for (var i = 0, l = ship_options.length; i < l; i++)
		{
			var ship_option = ship_options[i];
			this.add_parameter(parameter_pairs, this.options.symbols.ship_option_type + (i ? i : ''), ship_option.type_index, true);
			for (var j = 0, dl = ship_option.dimension_indices.length; j < dl; j++)
			{
				this.add_parameter(parameter_pairs, this.options.symbols.option_dimensions[j] + (i ? i : ''), ship_option.dimension_indices[j]);
			}
		}
	},

	sanitize_text: function(text)
	{
		return text.escapeHTML();
	},

	encode_to_url: function()
	{
		var parameter_pairs= [];
		this.add_name_parameter(parameter_pairs);
		this.add_parameter(parameter_pairs, this.options.symbols.ship_class, this.template.ship_class_index, true);
		this.add_parameter(parameter_pairs, this.options.symbols.tons, this.template.tons_index);
		this.add_parameter(parameter_pairs, this.options.symbols.crew_size, this.template.crew_index);
		this.add_attribute_parameters(parameter_pairs);
		this.add_crew_skill_parameters(parameter_pairs);
		this.add_weapon_parameters(parameter_pairs);
		this.add_ship_option_parameters(parameter_pairs);

		return this.get_base_url() + this.encode_query_string(parameter_pairs);
	},

	encode_query_string: function(parameter_pairs)
	{
		if (!parameter_pairs.length)
		{
			return '';
		}
		return '#' + parameter_pairs.invoke('join', '=').join('&');
	},

	decode_query_string: function()
	{
		//the old method used the query string
		//new method uses the hash, which is like a client-side-only query string
		if (location.search.length == 1)
		{
			//Start over link "clears" query string with '?'
			location.replace(this.get_base_url());
		}
		if (location.search.length > 1)
		{
			//"redirect" from old to new method
			location.replace(this.get_base_url() + '#' + location.search.slice(1));
		}

		return location.hash.length > 1 ? $H(location.hash.slice(1).toQueryParams()) : null;
	},

	decode_damage_reduction_parameters: function(ship_parameters)
	{
		var damage_reduction_keys = ship_parameters.keys().findAll(function(key)
		{
			return key.indexOf(this.options.symbols.damage_reduction) == 0;
		}, this);
		if (damage_reduction_keys.length == 1)
		{
			return ship_parameters.get(damage_reduction_keys[0]);
		}
		var damage_reduction = {};
		damage_reduction_keys.each(function(key)
		{
			var order = key.slice(this.options.symbols.damage_reduction.length);
			var facing = this.options.gunboat_facing_order[order];
			var index = ship_parameters.get(key);
			if (index)
			{
				damage_reduction[facing] = index;
			}
		}, this);
		return $H(damage_reduction).keys().length ? damage_reduction : null;
	},

	decode_crew_skill_parameters: function(ship_parameters)
	{
		var piloting_index = ship_parameters.get(this.options.symbols.crew_skill);
		//piloting is required, unless crew section is disabled
		if (!piloting_index)
		{
			return [];
		}
		//piloting first
		var crew_skills = [piloting_index];
		var gunnery_skill_pattern = new RegExp(this.options.symbols.crew_skill + '(\\d+)');
		var gunnery_skill_keys = ship_parameters.keys().findAll(function(key)
		{
			return key.match(gunnery_skill_pattern);
		});
		gunnery_skill_keys.each(function(key)
		{
			var index = key.match(gunnery_skill_pattern)[1];
			crew_skills[index] = ship_parameters.get(key);
		}, this);
		return crew_skills;
	},

	decode_weapon_parameters: function(ship_parameters)
	{
		var weapons = [];
		while (true)
		{
			var index = weapons.length ? weapons.length : '';
			var weapon_type = ship_parameters.get(this.options.symbols.weapon_type + index);
			if (weapon_type === undefined)
			{
				return weapons.length ? weapons : null;
			}
			var weapon =
			{
				type: weapon_type,
				multiple: ship_parameters.get(this.options.symbols.weapon_multiple + index),
				ammo: ship_parameters.get(this.options.symbols.ammo + index),
				firing_arcs: ship_parameters.get(this.options.symbols.firing_arcs + index)
			};
			weapons.push(weapon);
		}
	},
	decode_option_parameters: function(ship_parameters)
	{
		var options = [];
		while (true)
		{
			var index = options.length ? options.length : '';
			var ship_option_type = ship_parameters.get(this.options.symbols.ship_option_type + index);
			if (ship_option_type === undefined)
			{
				return options.length ? options : null;
			}
			var option =
			{
				type: ship_option_type,
				dimensions: []
			};
			for (var i = 0, l = this.options.symbols.option_dimensions.length; i < l; i++)
			{
				option.dimensions[i] = ship_parameters.get(this.options.symbols.option_dimensions[i] + index);
			}
			options.push(option);
		}
	},
};
