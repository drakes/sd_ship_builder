var FiringArcController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.crew_template_changed_event, this.crew_template_changed_handler.bindAsEventListener(this));
		this.find_arc_controls().each(this.connect_arc_event_handler, this);
	},

	connect_arc_event_handler: function(arc_control)
	{
		arc_control.observe('change', this.arc_change_handler.bindAsEventListener(this));
	},

	crew_template_changed_handler: function(event)
	{
		this.crew_size_changed(event.memo);
	},

	crew_size_changed: function(current_crew_size)
	{
		//pilots cannot fire a weapon unless it is limited to only the Front arc
		if (current_crew_size == 1)
		{
			//when the crew is one (just a pilot), disable and uncheck other arcs
			this.find_arc_controls().splice(1).each(function(arc_control)
			{
				arc_control.checked = false;
				this.arc_selection_handler(arc_control);
				arc_control.disabled = true;
			}, this);
		}
		else
		{
			//when the crew is more than one (gunner(s) present), enable other arcs
			this.find_arc_controls().splice(1).each(function(arc_control)
			{
				arc_control.disabled = false;
			});
		}
	},

	arc_change_handler: function(event)
	{
		this.arc_selection_handler(event.findElement());
	},

	arc_selection_handler: function(arc_control)
	{
		if (this.validate_arc_selection(arc_control))
		{
			this.refresh_firing_arc_stats(this.get_firing_arc_stats());
			this.send_update();
		}
	},

	send_update: function()
	{
		var memo = this.get_firing_arc_stats();
		$(this.options.id).fire(this.options.firing_arc_changed_event, memo);
	}
};
