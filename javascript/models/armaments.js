var ArmamentsModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: 'armaments',
			add_button_id: 'add_weapon',
			weapon_tag: 'div',

			//events
			template_changed_event: 'template:changed',
			crew_template_changed_event: 'crew_template:changed',
			weapons_restored_event: 'weapons:restored',
			ship_reset_event: 'ship:reset',

			//weapon templates
			data: null
		};
		Object.extend(this.options, options);

		this.connect_event_handlers();
	},

	add_weapon: function(initial_values)
	{
		var weapon_control = this.add_weapon_control();
		//place the control in the DOM before initializing so events bubble
		new Weapon(this.current_crew_size, initial_values,
		{
			id: weapon_control.identify(),
			data: this.options.data
		});
	},

	store_current_crew_size: function(current_crew_size)
	{
		this.current_crew_size = current_crew_size;
	}
};
