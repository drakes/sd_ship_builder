var CrewMembersController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.crew_template_changed_event, this.crew_template_changed_handler.bindAsEventListener(this));
		document.observe(this.options.ship_reset_event, this.ship_reset_handler.bindAsEventListener(this));
		$(this.options.section_toggle_id).observe(this.options.section_toggled_event, this.section_toggled_handler.bindAsEventListener(this));
	},

	crew_template_changed_handler: function(event)
	{
		var crew_template_size = event.memo;
		var current_crew_size = this.find_crew().length;
		if (current_crew_size < crew_template_size)
		{
			this.add_crew_members(crew_template_size, current_crew_size);
		}
		else if (current_crew_size > crew_template_size)
		{
			this.delete_crew_members(current_crew_size - crew_template_size);
		}
	},

	section_toggled_handler: function(event)
	{
		event.stop();
		var show = event.memo.show;
		$(this.options.id).fire(this.options.crew_toggled_event, event.memo);
	},

	ship_reset_handler: function(event)
	{
		var current_crew_size = this.find_crew().length;
		this.delete_crew_members(current_crew_size);
	},

	add_crew_members: function(crew_template_size, current_crew_size)
	{
		while (current_crew_size < crew_template_size)
		{
			this.add_crew(current_crew_size++);
		}
	},

	delete_crew_members: function(crew_to_delete)
	{
		crew_to_delete.times(function()
		{
			var crew = this.find_crew().last();
			crew.fire(this.options.crew_deleted_event, crew.id);
		}, this);
	}
};
