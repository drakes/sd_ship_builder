var CrewModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: null,
			crew_tag: 'div',
			crew_class: 'crew',
			skill_class: 'skill',
			skill_control_class: 'skill_control',
			skill_die_class: 'skill_die',
			cost_class: 'cost',

			//events
			changed_event: 'crew:changed',
			deleted_event: 'crew:deleted',
			selection_changed_event: 'selection:changed',

			//data
			template: null,
			pilot: true
		};
		Object.extend(this.options, options);

		this.decorate_control();
		this.initialize_selectors(this.options.pilot);
		this.connect_event_handlers();
		this.send_update();
	},

	initialize_selectors: function(piloting)
	{
		this.create_controls(piloting);
		if (piloting)
		{
			this.piloting_select = new EasySelect({ id: this.piloting_id });
			var piloting_options = this.create_skill_options(true);
			this.piloting_select.update_options(piloting_options);
			this.piloting_select.set(piloting_options[0].key);
		}
		this.gunnery_select = new EasySelect({ id: this.gunnery_id });
		var gunnery_options = this.create_skill_options();
		this.gunnery_select.update_options(gunnery_options);
		this.gunnery_select.set(gunnery_options[0].key);
	},

	create_skill_options: function(piloting)
	{
		return this.options.template[piloting ? 'piloting' : 'gunnery'].collect(function(die_size, index)
		{
			return {
				key: index,
				value: index + 1
			};
		});
	}
};
