var ShipOptionsView =
{
	add_option_control: function(option_template)
	{
		var option_control = new Element(this.options.option_tag, { 'class': this.options.option_class });
		$(this.options.id).insert(option_control);
		return option_control;
	}
};
