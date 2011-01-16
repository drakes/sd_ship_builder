var SectionToggleView =
{
	toggle_section: function()
	{
		var toggle_control = $(this.options.id);
		var show = toggle_control.hasClassName(this.options.hide_class);
		var section_elements = toggle_control.nextSiblings();
		if (show)
		{
			toggle_control.removeClassName(this.options.hide_class);
			section_elements.invoke('removeClassName', this.options.hide_class);
		}
		else
		{
			toggle_control.addClassName(this.options.hide_class);
			section_elements.invoke('addClassName', this.options.hide_class);
		}
		return show;
	}
};
