var ArmamentsView =
{
	add_weapon_control: function()
	{
		var weapon_control = new Element(this.options.weapon_tag);
		$(this.options.id).insert(weapon_control);
		return weapon_control;
	}
};
