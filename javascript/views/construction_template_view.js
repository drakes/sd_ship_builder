var ConstructionTemplateView =
{
	refresh_tons: function(tons_options)
	{
		var options = tons_options.inject('', function(html, value)
		{
			return html + '<option value="' + value + '"' + (!html ? 'selected="selected"' : '') + '>' + value + '</option>';
		});
		var tons = $(this.options.tons_id);
		tons.update(options);
		tons.up().show();
		return tons_options.first();
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
