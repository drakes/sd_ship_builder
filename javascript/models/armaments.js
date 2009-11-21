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

			//weapon templates
			data: null
		};
		Object.extend(this.options, options);

		this.connect_event_handlers();
	},

	add_weapon: function()
	{
		var weapon_control = this.add_weapon_control();
		//place the control in the DOM before initializing Weapon so events bubble
		new Weapon({ id: weapon_control.identify(), data: this.options.data });
	}
};
