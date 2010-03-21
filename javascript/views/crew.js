var CrewView =
{
	decorate_control: function()
	{
		$(this.options.id).addClassName(this.options.crew_class);
	},

	create_controls: function(pilot)
	{
		var crew_control = $(this.options.id);
		if (pilot)
		{
			this.create_skill(crew_control, pilot);
		}
		this.create_skill(crew_control);
	},

	create_skill: function(crew_control, pilot)
	{
		var skill_control = new Element('span', { 'class': 'skill_control' });
		var skill_selector = new Element('select', { 'class': this.options.skill_class });
		skill_selector.update(this.create_skill_options());
		skill_control.insert('<label for="' + skill_selector.identify() + '" class="descriptor">' + (pilot ? 'Piloting' : 'Gunnery') + ': </label>');
		skill_control.insert(skill_selector);
		skill_control.insert('<span class="construction_stats"> (cost: <span class="' + this.options.cost_class + '"></span>) </span>');
		crew_control.insert(skill_control);
	}
};
