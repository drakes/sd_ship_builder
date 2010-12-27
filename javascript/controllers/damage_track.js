var DamageTrackController =
{
	connect_event_handlers: function()
	{
		document.observe(this.options.template_changed_event, this.template_changed_handler.bindAsEventListener(this));
		document.observe(this.options.tons_changed_event, this.tons_changed_handler.bindAsEventListener(this));
		document.observe(this.options.attribute_changed_event, this.attribute_changed_handler.bindAsEventListener(this));
		document.observe(this.options.weapon_changed_event, this.weapon_changed_handler.bindAsEventListener(this));
		document.observe(this.options.weapon_deleted_event, this.weapon_deleted_handler.bindAsEventListener(this));
		$(this.options.id).on('click', '.' + this.options.hit_box_class, this.hit_box_click_handler.bind(this));
	},

	template_changed_handler: function(event)
	{
		var template = event.memo;
		this.set_template(template);
		this.refresh();
	},

	tons_changed_handler: function(event)
	{
		var tons = event.memo;
		this.set_tons(tons);
		this.refresh();
	},

	attribute_changed_handler: function(event)
	{
		var attribute_package = event.memo;
		this.set_attribute(attribute_package);
		this.refresh();
	},

	weapon_changed_handler: function(event)
	{
		var weapon_id = event.memo.id;
		this.add_weapon(weapon_id);
		this.refresh();
	},

	weapon_deleted_handler: function(event)
	{
		var weapon_id = event.memo;
		this.delete_weapon(weapon_id);
		this.refresh();
	},

	hit_box_click_handler: function(event, target_box)
	{
		this.update_damage(target_box);
	},

	refresh: function()
	{
		$(this.options.id).show();
		this.clear();
		this.render_hit_boxes(this.generate_hit_boxes());
	}
};
