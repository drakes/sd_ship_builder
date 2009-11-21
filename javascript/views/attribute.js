var AttributeView =
{
	refresh_display: function(template)
	{
		var attribute = $(this.options.id);
		var attribute_control = attribute.up();
		
		var options = $H(template).keys().inject('', function(html, value)
		{
			return html + '<option value="' + value + '"' + (!html ? 'selected="selected"' : '') + '>' + value + '</option>';
		});
		attribute.update(options);

		attribute_control.show();
	}
};
