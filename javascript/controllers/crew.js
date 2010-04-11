var CrewController =
{
	connect_event_handlers: function()
	{
		if (this.options.pilot)
		{
			var piloting_selector = this.find_skill_selector(true);
			piloting_selector.observe('change', this.piloting_change_handler.bindAsEventListener(this, piloting_selector));
			this.piloting_change_handler(null, piloting_selector);
		}
		var gunnery_selector = this.find_skill_selector();
		gunnery_selector.observe('change', this.gunnery_change_handler.bindAsEventListener(this, gunnery_selector));
		this.gunnery_change_handler(null, gunnery_selector);
	},

	piloting_change_handler: function(event, piloting_selector)
	{
		var index = Number(piloting_selector.value);
		this.update_skill_die(index, this.options.template.piloting, true);
		this.update_skill_cost(index + 1, true);
		this.send_update(index + 1, true);
	},

	gunnery_change_handler: function(event, gunnery_selector)
	{
		var index = Number(gunnery_selector.value);
		this.update_skill_die(index, this.options.template.gunnery);
		this.update_skill_cost(index + 1);
		this.send_update(index + 1);
	},

	send_update: function(value, piloting)
	{
		var control = $(this.options.id);
	}
};
