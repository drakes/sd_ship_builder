var FiringArcModel =
{
	initialize: function(weapon_control, current_crew_size, options)
	{
		this.options =
		{
			//selectors and css
			firing_arc_class: 'firing_arc',

			//events
			crew_template_changed_event: 'crew_template:changed',
			weapon_deleted_event: 'weapon:deleted',

			//messages
			no_arcs_selected_message: 'At least one firing arc must be selected',

			//firing arc template
			template:
			[
				{ cost: 0, slots: 0 },
				{ cost: 1, slots: 0 },
				{ cost: 3, slots: 0 },
				{ cost: 5, slots: 1 },
				{ cost: 6, slots: 1 },
				{ cost: 7, slots: 2 }
			],
			arc_names: ['F', 'FQL', 'FQR', 'RQL', 'RQR', 'R'],
			front_index: 0
		};
		Object.extend(this.options, options);

		this.create_controls();
		this.connect_event_handlers(weapon_control);
		this.select_front_arc();
		this.crew_size_changed(current_crew_size);
	},

	validate_arc_selection: function(arc_control)
	{
		if (!this.get_firing_arc_selection())
		{
			alert(this.options.no_arcs_selected_message);
			this.set_arc_control(arc_control, true);
			return false;
		}
		return true;
	},

	get_arc_control_state: function(arc_control)
	{
		return !!$F(arc_control);
	},

	get_firing_arc_stats: function()
	{
		var selected_arcs = this.get_firing_arc_selection();
		return Object.clone(this.options.template[selected_arcs - 1]);
	},

	get_firing_arc_selection: function()
	{
		var selected_arcs = 0;
		this.find_arc_controls().each(function(arc_control)
		{
			if (this.get_arc_control_state(arc_control))
			{
				selected_arcs++;
			}
		}, this);
		return selected_arcs;
	},

	select_front_arc: function()
	{
		this.set_arc_control(this.options.front_index, true);
	},

	set_arc_control: function(arc, selected)
	{
		var arc_control = Object.isNumber(arc) ? this.find_indexed_arc_control(arc) : arc;
		if (selected != this.get_arc_control_state(arc_control))
		{
			arc_control.checked = selected;
			this.arc_selection_handler(arc_control);
		}
	}
};
