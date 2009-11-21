var WeaponView =
{
	create_controls: function()
	{
		var weapon_control = $(this.options.id);
		var type_selector = new Element('select', { 'class': this.options.type_class });
		type_selector.update(this.create_type_options());
		weapon_control.insert(type_selector);
	},

	update_construction_stats: function()
	{
	}
};
