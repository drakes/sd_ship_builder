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

			//weapon templates
			data: null
		};
		Object.extend(this.options, options);

		this.connect_event_handlers();
	},

	add_weapon: function()
	{
		var weapon_control = this.add_weapon_control();
		//place the control in the DOM before initializing so events bubble
		new Weapon(this.current_crew_size,
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
