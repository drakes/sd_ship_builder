var FiringArcController =
{
	connect_event_handlers: function()
	{
		this.find_arc_controls().each(this.connect_arc_event_handler, this);
	},

	connect_arc_event_handler: function(arc_control)
	{
		arc_control.observe('change', this.arc_change_handler.bindAsEventListener(this));
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
