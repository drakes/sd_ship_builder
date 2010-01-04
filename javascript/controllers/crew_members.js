var CrewController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.crew_template_changed_event, this.crew_template_changed_handler.bindAsEventListener(this));
	},

	crew_template_changed_handler: function(event)
	{
		var crew_template_size = event.memo;
		var current_crew_size = this.find_crew().length;
		if (current_crew_size < crew_template_size)
		{
			this.add_crew_members(crew_template_size - current_crew_size);
		}
		else if (current_crew_size > crew_template_size)
		{
			this.delete_crew_members(current_crew_size - crew_template_size);
		}
	},

	add_crew_members: function(crew_to_add)
	{
		crew_to_add.times(function()
		{
			this.add_crew();
		}, this);
	},

	delete_crew_members: function(crew_to_delete)
	{
		crew_to_delete.times(function()
		{
			this.find_last_crew_member().remove();
		}, this);
	}
};
