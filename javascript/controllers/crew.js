var CrewController =
{
	connect_event_handlers: function()
	{
		var control = $(this.options.id);
		control.observe(this.options.deleted_event, this.delete_handler.bindAsEventListener(this));
		document.observe(this.options.crew_skills_restored_event, this.crew_skills_restored_handler.bindAsEventListener(this));
		if (this.options.pilot)
		{
			var piloting_selector = this.find_skill_selector(true);
			piloting_selector.observe(this.options.selection_changed_event, this.piloting_change_handler.bindAsEventListener(this, this.piloting_select));
			this.piloting_change_handler(null, this.piloting_select);
		}
		var gunnery_selector = this.find_skill_selector();
		gunnery_selector.observe(this.options.selection_changed_event, this.gunnery_change_handler.bindAsEventListener(this, this.gunnery_select));
		this.gunnery_change_handler(null, this.gunnery_select);
	},

	piloting_change_handler: function(event, piloting_selector)
	{
		var index = Number(event ? event.memo.value : this.piloting_select.get());
		this.update_skill_die(index, this.options.template.piloting, true);
		this.update_skill_cost(index + 1, true);
		this.send_update();
	},

	gunnery_change_handler: function(event, gunnery_selector)
	{
		var index = Number(event ? event.memo.value : this.gunnery_select.get());
		this.update_skill_die(index, this.options.template.gunnery);
		this.update_skill_cost(index + 1);
		this.send_update();
	},

	delete_handler: function(event)
	{
		$(this.options.id).remove();
	},

	crew_skills_restored_handler: function(event)
	{
		var skill_indices = event.memo;
		if (!skill_indices.length)
		{
			return;
		}
		if (this.options.pilot)
		{
			var piloting_index = skill_indices[0];
			if (piloting_index !== undefined)
			{
				this.piloting_select.set_by_index(piloting_index);
			}
		}

		var crew_skill_index = this.get_crew_skill_index();
		var gunnery_index = skill_indices[crew_skill_index];
		if (gunnery_index !== undefined)
		{
			this.gunnery_select.set_by_index(gunnery_index);
		}
	},

	send_update: function()
	{
		var gunnery_index = Number(this.gunnery_select.get());
		var memo =
		{
			id: this.options.id,
			cost: 1 + gunnery_index,
			gunnery_index: gunnery_index
		};
		if (this.options.pilot)
		{
			var piloting_index = Number(this.piloting_select.get());
			Object.extend(memo,
			{
				cost: memo.cost + 1 + piloting_index,
				piloting_index: piloting_index
			});
		}
		$(this.options.id).fire(this.options.changed_event, memo);
	}
};
