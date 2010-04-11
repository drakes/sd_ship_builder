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

			//data
			template: null,
			pilot: true
		};
		Object.extend(this.options, options);

		this.decorate_control();
		this.create_controls(this.options.pilot);
		this.connect_event_handlers();
	},

	create_skill_options: function(piloting)
	{
		return this.options.template[piloting ? 'piloting' : 'gunnery'].inject('', function(options, die_size, index)
		{
			return options + '<option value="' + index + '"' + (!options ? ' selected="selected"' : '') + '>' + (index + 1) + '</option>';
		});
	}
};
