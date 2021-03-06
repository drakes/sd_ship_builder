var SectionToggleModel =
{
	initialize: function(options)
	{
		this.options =
		{
			//selectors and css
			id: null,
			hide_class: 'hide',

			//events
			toggled_event: 'section:toggled',
			template_changed_event: 'template:changed',
			crew_skills_restored_event: 'crew_skills:restored',

			//behavior
			hide_on_first_change: false,
			hide_on_restoring_zero_crew_skills: false
		};
		Object.extend(this.options, options);

		$(this.options.id).hide();
		this.connect_event_handlers();
	}
};
