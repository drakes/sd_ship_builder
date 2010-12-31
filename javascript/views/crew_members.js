var CrewMembersView =
{
	find_crew: function()
	{
		return $(this.options.id).childElements();
	},

	add_crew_control: function()
	{
		var crew_control = new Element(this.options.crew_tag);
		$(this.options.id).insert(crew_control);
		return crew_control;
	},

	toggle_crew: function(show)
	{
		if (show)
		{
			$(this.options.id).removeClassName(this.options.hide_class);
		}
		else
		{
			$(this.options.id).addClassName(this.options.hide_class);
		}
	}
};
