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
			cost_class: 'cost',

			//events

			//data
			data: null,
			pilot: true
		};
		Object.extend(this.options, options);

		this.decorate_control();
		this.create_controls(this.options.pilot);
		this.connect_event_handlers();
	},

	create_skill_options: function()
	{
		return $H(this.options.data).inject('', function(options, pair)
		{
			return options + '<option value="' + pair.key + '"' + (!options ? ' selected="selected"' : '') + '>' + pair.value.name + '</option>';
		});
	}
};
