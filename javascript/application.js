(function()
{
	//instantiate: true to create a single instance immediately
	var classes =
	[
		{ name: 'EasySelect' },
		{ name: 'ConstructionTemplate', instantiate: true },
		{ name: 'ConstructionStat' },
		{ name: 'Attribute' },
		{ name: 'CrewMembers', instantiate: true },
		{ name: 'Crew' },
		{ name: 'Armaments', instantiate: true },
		{ name: 'Weapon' },
		{ name: 'FiringArc' },
		{ name: 'ShipOptions', instantiate: true },
		{ name: 'Option' },
		{ name: 'DamageTrack' },
		{ name: 'SectionToggle' },
		{ name: 'Persistence', instantiate: true }
	];

	var instances =
	[
		{
			name: 'cost_control',
			class_name: 'ConstructionStat',
			options:
			{
				id: 'cost_control',
				stat_property: 'cost'
			}
		},
		{
			name: 'slots_control',
			class_name: 'ConstructionStat',
			options:
			{
				id: 'slots_control',
				stat_property: 'slots',
				crew_based: true
			}
		},
		{
			name: 'torpedoes_control',
			class_name: 'ConstructionStat',
			options:
			{
				id: 'torpedoes_control',
				stat_property: 'torpedoes'
			}
		},
		{
			name: 'drive_control',
			class_name: 'Attribute',
			options:
			{
				id: 'drive',
				attribute_property: 'drive'
			}
		},
		{
			name: 'defense_control',
			class_name: 'Attribute',
			options:
			{
				id: 'defense',
				attribute_property: 'defense'
			}
		},
		{
			name: 'damage_reduction_control',
			class_name: 'Attribute',
			options:
			{
				id: 'damage_reduction',
				attribute_property: 'damage_reduction',
				gunboat: false
			}
		},
		{
			name: 'damage_reduction_control_left',
			class_name: 'Attribute',
			options:
			{
				id: 'damage_reduction_left',
				attribute_property: 'damage_reduction',
				gunboat: true,
				facing: 'left'
			}
		},
		{
			name: 'damage_reduction_control_right',
			class_name: 'Attribute',
			options:
			{
				id: 'damage_reduction_right',
				attribute_property: 'damage_reduction',
				gunboat: true,
				facing: 'right'
			}
		},
		{
			name: 'damage_reduction_control_front',
			class_name: 'Attribute',
			options:
			{
				id: 'damage_reduction_front',
				attribute_property: 'damage_reduction',
				gunboat: true,
				facing: 'front'
			}
		},
		{
			name: 'damage_reduction_control_rear',
			class_name: 'Attribute',
			options:
			{
				id: 'damage_reduction_rear',
				attribute_property: 'damage_reduction',
				gunboat: true,
				facing: 'rear'
			}
		},
		{
			name: 'crew_section_toggle',
			class_name: 'SectionToggle',
			options:
			{
				id: 'crew_section_toggle',
				hide_on_restoring_zero_crew_skills: true
			}
		},
		{
			name: 'damage_track',
			class_name: 'DamageTrack',
			options:
			{
				id: 'damage_track',
				gunboat: false
			}
		},
		{
			name: 'damage_track_left',
			class_name: 'DamageTrack',
			options:
			{
				id: 'damage_track_left',
				gunboat: true,
				facing: 'left'
			}
		},
		{
			name: 'damage_track_right',
			class_name: 'DamageTrack',
			options:
			{
				id: 'damage_track_right',
				gunboat: true,
				facing: 'right'
			}
		},
		{
			name: 'damage_track_front',
			class_name: 'DamageTrack',
			options:
			{
				id: 'damage_track_front',
				gunboat: true,
				facing: 'front'
			}
		},
		{
			name: 'damage_track_rear',
			class_name: 'DamageTrack',
			options:
			{
				id: 'damage_track_rear',
				gunboat: true,
				facing: 'rear'
			}
		},
		{
			name: 'info_toggle',
			class_name: 'SectionToggle',
			options:
			{
				id: 'info_toggle',
				hide_on_first_change: true
			}
		}
	];
	
	//event handlers
	function start()
	{
		classes.each(class_builder);
		instances.each(instance_builder);

		//prevent accidental form submissions from reloading page (pressing enter while a control has focus, for example)
		$('builder').observe('submit', function(event) { event.stop(); });
	}
	
	function class_builder(class_spec)
	{
		var model;
		var view;
		var controller;
		
		try
		{
			model = eval(class_spec.name + 'Model');
			view = eval(class_spec.name + 'View');
			controller = eval(class_spec.name + 'Controller');
		}
		catch(component_exception)
		{
			//component(s) of the class not here, moving on...
		}
		
		//check first for the presence of the components; this allows each class to built optionally, ignored by pages that don't need it, simply by including or excluding those script tags in the header 
		if (model && view && controller)
		{
			if (class_spec.superclass)
			{
				if (window[class_spec.superclass])
				{
					window[class_spec.name] = Class.create(window[class_spec.superclass], model, view, controller);
				}
				else
				{
					throw 'Missing superclass ' + class_spec.superclass + ' (required by ' + class_spec.name + ')';
				}
			}
			else
			{
				window[class_spec.name] = Class.create(model, view, controller);
			}

			if (class_spec.instantiate)
			{
				var options = class_spec.options || {}; //instance_builder does not build if !options

				try
				{
					options.data = eval(class_spec.name + 'Data');
				}
				catch(data_exception)
				{
					//data not here, moving on...
				}

				return instance_builder(
				{
					class_name: class_spec.name,
					options: options
				});
			}
		}
	}
	
	function instance_builder(instance_spec)
	{
		if (window[instance_spec.class_name])
		{
			//aside from classes (instantiate), instance_builder triggers when 'name'_options is declared (preferably in a partial) for the instance
			var options = instance_spec.options;
			if (!options && instance_spec.name)
			{
				try
				{
					options = eval(instance_spec.name + '_options');
				}
				catch(options_exception)
				{
					//options for the instance not here, moving on...
				}
			}
			if (options)
			{
				var instance = new window[instance_spec.class_name](options);
				return instance;
			}
		}
	}

	document.observe("dom:loaded", start);	
})();
