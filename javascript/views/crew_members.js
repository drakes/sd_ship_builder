var CrewView =
{
	find_last_crew_member: function()
	{
		return $(this.options.id).childElements().last();
	},

	add_crew_control: function()
	{
		var crew_control = new Element(this.options.crew_tag);
		$(this.options.id).insert(crew_control);
		return crew_control;
	}
};
