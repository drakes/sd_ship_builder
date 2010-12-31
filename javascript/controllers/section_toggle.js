var SectionToggleController =
{
	connect_event_handlers: function()
	{
		$(this.options.id).observe('click', this.click_handler.bindAsEventListener(this));
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
	},

	click_handler: function(event)
	{
		event.stop();
		var show = this.toggle_class();
		this.send_update(show);
	},

	template_changed_handler: function(event)
	{
		$(this.options.id).show();
	},

	send_update: function(show)
	{
		$(this.options.id).fire(this.options.toggled_event, { show: show });
	}
};
