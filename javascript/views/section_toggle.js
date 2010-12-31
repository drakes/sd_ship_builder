var SectionToggleView =
{
	toggle_class: function()
	{
		var toggle_control = $(this.options.id);
		if (toggle_control.hasClassName(this.options.hide_class))
		{
			toggle_control.removeClassName(this.options.hide_class);
			return true;
		}
		toggle_control.addClassName(this.options.hide_class);
		return false;
	}
};
