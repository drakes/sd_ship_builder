var ConstructionTemplateView =
{
	refresh_tonnage: function(tonnage_options)
	{
		var options = tonnage_options.inject('', function(html, value)
		{
			return html + '<option value="' + value + '"' + (!html ? 'selected="selected"' : '') + '>' + value + '</option>';
		});
		$(this.options.tonnage_id).update(options);
		return tonnage_options.first();
	}
};
