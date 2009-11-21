var ConstructionTemplateView =
{
	refresh_tonnage: function(tonnage_options)
	{
		var options = tonnage_options.inject('', function(html, value)
		{
			return html + '<option value="' + value + '"' + (!html ? 'selected="selected"' : '') + '>' + value + '</option>';
		});
		var tonnage = $(this.options.tonnage_id);
		tonnage.update(options);
		tonnage.up().show();
		return tonnage_options.first();
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
