var WeaponModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: 'weapon',
			delete_class: 'delete',
			type_class: 'weapon_type',
			cost_class: 'cost',
			slots_class: 'slots',

			//events
			deleted_event: 'weapon:deleted',
			changed_event: 'weapon:changed',

			//weapon templates
			data: null
		};
		Object.extend(this.options, options);

		this.create_controls();
		this.connect_event_handlers();
	},

	get_cost: function()
	{
	},

	get_slots: function()
	{
	}
};
