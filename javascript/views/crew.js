var CrewView =
{
	//traversal helpers
	find_skill_selector: function(piloting)
	{
		var crew_control = $(this.options.id);
		var skill_selectors = crew_control.select('.' + this.options.skill_class);
		return (piloting) ? skill_selectors.first() : skill_selectors.last();
	},

	decorate_control: function()
	{
		$(this.options.id).addClassName(this.options.crew_class);
	},

	create_controls: function(pilot)
	{
		var crew_control = $(this.options.id);
		if (pilot)
		{
			crew_control.insert('<span class="crew_type">Pilot</span>');
			this.create_skill(crew_control, pilot);
		}
		else
		{
			crew_control.insert('<span class="crew_type">Gunner</span>');
		}
		this.create_skill(crew_control);
	},

	create_skill: function(crew_control, piloting)
	{
		var skill_control = new Element('span', { 'class': 'skill_control' });
		var skill_selector = new Element('select', { 'class': this.options.skill_class });
		skill_selector.update(this.create_skill_options(piloting));
		skill_control.insert('<label for="' + skill_selector.identify() + '" class="descriptor">' + (piloting ? 'Piloting' : 'Gunnery') + ': </label>');
		skill_control.insert(skill_selector);
		skill_control.insert('<span class="' + this.options.skill_die_class + '"></span>');
		skill_control.insert('<span class="construction_stats"> (cost: <span class="' + this.options.cost_class + '"></span>) </span>');
		crew_control.insert(skill_control);
	},

	update_skill_die: function(index, skill_template, piloting)
	{
		var control = $(this.options.id);
		var skill_die_controls = $(this.options.id).select('.' + this.options.skill_die_class);
		var skill_die_control = piloting ? skill_die_controls.first() : skill_die_controls.last();
		skill_die_control.update('1d' + skill_template[index]);
	}
};
