var FiringArcController =
{
	connect_event_handlers: function(weapon_control)
	{
		//save reference to detach later
		this.bound_crew_template_changed_handler = this.crew_template_changed_handler.bindAsEventListener(this);
		document.observe(this.options.crew_template_changed_event, this.bound_crew_template_changed_handler);
		this.find_arc_controls().each(this.connect_arc_event_handler, this);
		weapon_control.observe(this.options.weapon_deleted_event, this.weapon_deleted_handler.bindAsEventListener(this));
	},

	disconnect_event_handlers: function()
	{
		//in order for this object to be reclaimed when the weapon is deleted it must detach the handler from document
		document.stopObserving(this.options.crew_template_changed_event, this.bound_crew_template_changed_handler);
	},

	weapon_deleted_handler: function(event)
	{
		this.disconnect_event_handlers();
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
			//when the crew is one (just a pilot), hide and uncheck other arcs
			this.find_arc_containers().splice(1).each(function(arc_container)
			{
				var arc_control = arc_container.down('input');
				arc_control.checked = false;
				this.arc_selection_handler(arc_control);
				arc_container.hide();
			}, this);
		}
		else
		{
			//when the crew is more than one (gunner(s) present), show other arcs
			this.find_arc_containers().splice(1).each(function(arc_container)
			{
				arc_container.show();
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
