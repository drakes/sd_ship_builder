var ConstructionTemplateController =
{
	connect_event_handlers: function()
	{
		$(this.options.ship_class_id).observe(this.options.selection_changed_event, this.ship_class_change_handler.bindAsEventListener(this));
		$(this.options.tons_id).observe(this.options.selection_changed_event, this.tons_change_handler.bindAsEventListener(this));
		$(this.options.crew_id).observe(this.options.selection_changed_event, this.crew_change_handler.bindAsEventListener(this));
		document.observe(this.options.template_restored_event, this.template_restored_handler.bindAsEventListener(this));
	},

	ship_class_change_handler: function(event)
	{
		var ship_class = event.memo.value;
		if (ship_class)
		{
			var tons = this.refresh_selector(this.get_tons_options(ship_class), this.options.tons_id, this.tons_select);
			var crew = this.refresh_selector(this.get_crew_options(ship_class, tons), this.options.crew_id, this.crew_select);
			this.send_update(ship_class, tons, crew);
			var gunboat = this.get_ship_template(ship_class, tons).gunboat;
			//this kind of responsibility could be split to a new class, particularly if it expands
			this.switch_gunboat_mode(gunboat);
		}
	},

	tons_change_handler: function(event)
	{
		var ship_class = this.get_ship_class();
		var tons = event.memo.value;
		var crew = this.refresh_selector(this.get_crew_options(ship_class, tons), this.options.crew_id, this.crew_select);
		this.send_update(ship_class, tons, crew);
	},

	crew_change_handler: function(event)
	{
		var ship_class = this.get_ship_class();
		var tons = this.get_tons();
		var crew = event.memo.value;
		this.send_update(ship_class, tons, crew);
	},

	template_restored_handler: function(event)
	{
		var ship_class_index = event.memo.ship_class;
		var tons_index = event.memo.tons;
		var crew_size_index = event.memo.crew_size;
		this.ship_class_select.set_by_index(ship_class_index);
		if (tons_index)
		{
			this.tons_select.set_by_index(tons_index);
		}
		if (crew_size_index)
		{
			this.crew_select.set_by_index(crew_size_index);
		}
	},

	send_update: function(ship_class, tons, crew)
	{
		var ship_template = this.get_ship_template(ship_class, tons);
		$(this.options.ship_class_id).fire(this.options.template_changed_event, ship_template);
		$(this.options.tons_id).fire(this.options.tons_changed_event, tons);
		$(this.options.crew_id).fire(this.options.crew_template_changed_event, crew);
	}
};
