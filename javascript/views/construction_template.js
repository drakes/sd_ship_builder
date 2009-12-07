var ConstructionTemplateView =
{
	//traversal helpers
	find_selector_template: function(selector)
	{
		return selector.up().down('.' + this.options.template_class);
	},

	fill_ship_classes: function(ship_class_options)
	{
		var ship_class_element = $(this.options.ship_class_id);
		ship_class_options.each(function(class_id_and_name, index)
		{
			ship_class_element.insert('<option value="' + class_id_and_name.key + '">' + class_id_and_name.value + '</option>');
		});
		ship_class_element.insert({ top: '<option value="" class="' + this.options.hint_class + '">Select a ship class</option>' });
	},

	refresh_selector: function(options, selector_id)
	{
		var selector = $(selector_id);
		var text_element = this.find_selector_template(selector);
		if (options.length > 1)
		{
			var options_html = options.inject('', function(html, value)
			{
				return html + '<option value="' + value + '"' + (!html ? 'selected="selected"' : '') + '>' + value + '</option>';
			});
			selector.update(options_html).show();
			text_element.hide();
		}
		else
		{
			//show a single option as static text rather than a select
			text_element.update(options[0]).show();
			selector.hide();
		}
		selector.up().show();
		return options.first();
	},

	strip_hint: function(element)
	{
		var hint = element.down('.' + this.options.hint_class);
		if (hint)
		{
			hint.remove();
		}
	}
};
