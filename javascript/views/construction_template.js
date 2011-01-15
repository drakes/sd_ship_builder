var ConstructionTemplateView =
{
	//traversal helpers
	find_selector_template: function(selector)
	{
		return selector.up('.' + this.options.template_control_class).down(this.options.template_tag);
	},

	fill_ship_classes: function(ship_class_options, hint)
	{
		this.ship_class_select.update_options(ship_class_options);
		this.ship_class_select.add_hint(hint);
	},

	refresh_selector: function(options, selector_id, easy_select)
	{
		var selector = $(selector_id);
		var text_element = this.find_selector_template(selector);
		if (options.length > 1)
		{
			easy_select.update_options(options);
			easy_select.set(options[0]);
			selector.show();
			text_element.hide();
		}
		else
		{
			//show a single option as static text rather than a select
			text_element.update(options[0]).show();
			selector.hide();
		}
		selector.up('.' + this.options.template_control_class).show();
		return options.first();
	},

	switch_gunboat_mode: function(gunboat)
	{
		var body = $$('body')[0];
		if (gunboat)
		{
			body.addClassName(this.options.gunboat_class);
		}
		else
		{
			body.removeClassName(this.options.gunboat_class);
		}
	}
};
