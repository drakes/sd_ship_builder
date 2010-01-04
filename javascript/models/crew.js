var CrewModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: 'weapon',
			weapon_class: 'weapon',
			delete_class: 'delete',
			type_class: 'weapon_type',
			attack_dice_class: 'base_attack_dice',
			damage_class: 'damage',
			ammo_class: 'ammo',
			multiple_class: 'multiples',
			speed_restriction_class: 'speed_restriction',
			range_class: 'range',
			short_class: 'short',
			medium_class: 'medium',
			long_class: 'long',
			note_class: 'note',
			note_container_class: 'note_container',
			cost_class: 'cost',
			slots_class: 'slots',
			firing_arc_tag: 'span',
			firing_arc_class: 'firing_arc',

			//events
			deleted_event: 'weapon:deleted',
			changed_event: 'weapon:changed',
			firing_arc_changed_event: 'firing_arc:changed',

			//weapon templates
			data: null,
			damage_types: ['Low', 'Medium', 'High', 'All', 'Allx2', '10/8/6'],
			multiples_names: { 2: 'Twin', 3: 'Triple', 4: 'Quad', 5: 'Quint', 6: 'Sext' }
		};
		Object.extend(this.options, options);

		this.firing_arc_stats = { cost: 0, slots: 0 };

		this.decorate_control();
		this.create_controls();
		this.type_change_handler();
		this.connect_event_handlers();
		this.create_firing_arc();
	},
};
