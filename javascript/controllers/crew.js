var CrewController =
{
	connect_event_handlers: function()
	{
		var control = $(this.options.id);
		control.observe(this.options.deleted_event, this.delete_handler.bindAsEventListener(this));
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
		this.send_update();
	},

	gunnery_change_handler: function(event, gunnery_selector)
	{
		var index = Number(gunnery_selector.value);
		this.update_skill_die(index, this.options.template.gunnery);
		this.update_skill_cost(index + 1);
		this.send_update();
	},

	delete_handler: function(event)
	{
		$(this.options.id).remove();
	},

	send_update: function()
	{
		var cost = 1 + Number(this.find_skill_selector().value);
		if (this.options.pilot)
		{
			cost += 1 + Number(this.find_skill_selector(true).value);
		}
		var memo =
		{
			id: this.options.id,
			cost: cost
		};
		$(this.options.id).fire(this.options.changed_event, memo);
	}
};
