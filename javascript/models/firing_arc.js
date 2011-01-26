var FiringArcModel =
{
	initialize: function(weapon_control, current_crew_size, initial_arcs, options)
	{
		this.options =
		{
			//selectors and css
			firing_arc_class: 'firing_arc',
			arc_container_tag: 'span',
			arc_class: 'arc',

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
			arc_names: ['F', 'FQL', 'FQR', 'RQL', 'RQR', 'R']
		};
		Object.extend(this.options, options);

		this.create_controls();
		this.connect_event_handlers(weapon_control);
		this.select_initial_arcs(initial_arcs);
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
		var arc_selection = this.get_firing_arc_selection();
		var firing_arc_stats = Object.clone(this.options.template[arc_selection.selected - 1]);
		firing_arc_stats.encoded = arc_selection.encoded;
		return firing_arc_stats;
	},

	get_firing_arc_selection: function()
	{
		var selected_arcs = 0;
		var encoded = 0;
		var arc_controls = this.find_arc_controls();
		for (var i = 0, l = arc_controls.length; i < l; i++)
		{
			if (this.get_arc_control_state(arc_controls[i]))
			{
				selected_arcs++;
				encoded += Math.pow(2, i);
			}
		}
		//front-only (assuming front is first) is redundant
		if (encoded == 1)
		{
			encoded = 0;
		}
		return {
			selected: selected_arcs,
			encoded: encoded
		};
	},

	select_initial_arcs: function(initial_arcs)
	{
		if (!initial_arcs)
		{
			//default to front-only
			this.set_arc_control(0, true);
			return;
		}
		for (var i = this.find_arc_controls().length - 1; i >= 0; i--)
		{
			var power = Math.pow(2, i);
			if (initial_arcs >= power)
			{
				initial_arcs -= power;
				this.set_arc_control(i, true);
			}
		}
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
