var CrewView =
{
	//traversal helpers
	find_skill_selector: function(piloting)
	{
		var skill_control = this.find_skill_control(piloting);
		return skill_control.down('.' + this.options.skill_class);
	},

	find_skill_control: function(piloting)
	{
		var control = $(this.options.id);
		var skill_controls = control.select('.' + this.options.skill_control_class);
		return piloting ? skill_controls.first() : skill_controls.last();
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
			this.piloting_id = this.create_skill(crew_control, pilot);
		}
		else
		{
			crew_control.insert('<span class="crew_type">Gunner</span>');
		}
		this.gunnery_id = this.create_skill(crew_control);
	},

	create_skill: function(crew_control, piloting)
	{
		var skill_control = new Element('span', { 'class': this.options.skill_control_class });
		var skill_selector = new Element('select', { 'class': this.options.skill_class });
		var skill_id = skill_selector.identify();
		skill_control.insert('<label for="' + skill_id + '" class="descriptor">' + (piloting ? 'Piloting' : 'Gunnery') + ': </label>');
		skill_control.insert(skill_selector);
		skill_control.insert('<span class="skill_die_container">1d<span class="' + this.options.skill_die_class + '"></span> </span><span>' + (piloting ? 'tight turn cost' : 'attack bonus') + '</span>');
		skill_control.insert('<span class="construction_stats"> (cost: <span class="' + this.options.cost_class + '"></span>) </span>');
		crew_control.insert(skill_control);
		return skill_id;
	},

	update_skill_die: function(index, skill_template, piloting)
	{
		var skill_control = this.find_skill_control(piloting);
		var skill_die_control = skill_control.down('.' + this.options.skill_die_class);
		skill_die_control.update(skill_template[index]);
	},

	update_skill_cost: function(cost, piloting)
	{
		var skill_control = this.find_skill_control(piloting);
		var skill_cost_control = skill_control.down('.' + this.options.cost_class);
		skill_cost_control.update(cost);
	}
};
