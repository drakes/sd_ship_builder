var ConstructionStatView =
{
	refresh_display: function(current, template)
	{
		var stat_control = $(this.options.id);
		stat_control.down('.' + this.options.current_class).update(current);
		var template_control = stat_control.down('.' + this.options.template_class);
		if (template_control)
		{
			template_control.update(template);
		}
		stat_control.show();
	}
};
