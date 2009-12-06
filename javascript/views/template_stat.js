var TemplateStatView =
{
	refresh_display: function(template)
	{
		var stat_control = $(this.options.id);
		stat_control.down('.' + this.options.template_class).update(template);
		stat_control.show();
	}
};
