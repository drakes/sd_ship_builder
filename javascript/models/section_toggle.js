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

			//behavior
			hide_on_first_change: false
		};
		Object.extend(this.options, options);

		$(this.options.id).hide();
		this.connect_event_handlers();
	}
};
