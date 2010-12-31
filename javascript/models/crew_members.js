var CrewMembersModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: 'crew_members',
			section_toggle_id: 'crew_section_toggle',
			crew_class: 'crew',
			crew_tag: 'div',
			hide_class: 'hide',

			//events
			crew_template_changed_event: 'crew_template:changed',
			crew_deleted_event: 'crew:deleted',
			section_toggled_event: 'section:toggled',
			crew_toggled_event: 'crew:toggled',

			//crew data
			template:
			{
				piloting: [10, 10, 8, 8, 6, 6, 4, 4, 4, 4],
				gunnery: [4, 4, 4, 4, 6, 6, 8, 8, 10, 10]
			}
		};
		Object.extend(this.options, options);

		this.connect_event_handlers();
	},

	add_crew: function(current_crew_size)
	{
		var crew_control = this.add_crew_control();
		//place the control in the DOM before initializing so events bubble
		new Crew(
		{
			id: crew_control.identify(),
			crew_tag: 'div',
			crew_class: 'crew',
			template: this.options.template,
			pilot: current_crew_size < 1
		});
	}
};
