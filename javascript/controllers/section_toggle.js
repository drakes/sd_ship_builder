var SectionToggleController =
{
	connect_event_handlers: function()
	{
		$(this.options.id).observe('click', this.click_handler.bindAsEventListener(this));
		this.bound_template_changed_handler = this.template_changed_handler.bindAsEventListener(this);
		document.observe(this.options.template_changed_event, this.bound_template_changed_handler);
		if (this.options.hide_on_restoring_zero_crew_skills)
		{
			document.observe(this.options.crew_skills_restored_event, this.crew_skills_restored_handler.bindAsEventListener(this));
		}
	},

	click_handler: function(event)
	{
		if (event)
		{
			event.stop();
		}
		var show = this.toggle_section();
		this.send_update(show);
	},

	template_changed_handler: function(event)
	{
		$(this.options.id).show();
		document.stopObserving(this.options.template_changed_event, this.bound_template_changed_handler);
		if (this.options.hide_on_first_change)
		{
			this.click_handler();
		}
	},

	crew_skills_restored_handler: function(event)
	{
		if (!event.memo.length)
		{
			this.click_handler();
		}
	},

	send_update: function(show)
	{
		$(this.options.id).fire(this.options.toggled_event, { show: show });
	}
};
