var FiringArcView =
{
	//traversal helpers
	find_arc_controls: function()
	{
		return $(this.options.id).select('input');
	},

	find_indexed_arc_control: function(index)
	{
		return this.find_arc_controls()[index];
	},

	decorate_control: function()
	{
		$(this.options.id).addClassName(this.options.firing_arc_class);
	},

	create_controls: function()
	{
		var firing_arc_control = $(this.options.id);
		firing_arc_control.insert('<span class="descriptor"> Firing Arc: </span>');

		this.options.arc_names.each(function(name, index)
		{
			this.create_arc_control(name, firing_arc_control);
		}, this);

		firing_arc_control.insert('<span> (cost: <span class="' + this.options.cost_class + '"></span> slots: <span class="' + this.options.slots_class + '"></span>) </span>');
	},

	create_arc_control: function(arc_name, firing_arc_control)
	{
		if (!firing_arc_control)
		{
			firing_arc_control = $(this.options.id);
		}

		var checkbox = new Element('input',
		{
			type: 'checkbox',
			value: 'true'
		});
		var arc_id = checkbox.identify();

		var arc_container = new Element('span');
		arc_container.insert(checkbox);
		arc_container.insert('<label for="' + arc_id + '">(' + arc_name + ')</label> ');
		firing_arc_control.insert(arc_container);
	},

	refresh_firing_arc_stats: function(firing_arc_stats)
	{
		var firing_arc_control = $(this.options.id);
		this.refresh_stat(this.options.cost_class, firing_arc_stats.cost, firing_arc_control);
		this.refresh_stat(this.options.slots_class, firing_arc_stats.slots, firing_arc_control);
	},

	refresh_stat: function(stat_class, stat_value, firing_arc_control)
	{
		firing_arc_control = firing_arc_control || $(this.options.id);
		firing_arc_control.down('.' + stat_class).update(stat_value);
	}
};
