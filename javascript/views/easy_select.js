var EasySelectView =
{
	replace_options: function(keys)
	{
		var options = keys.inject('', function(html, key)
		{
			return html + '<option value="' + key + '">' + key + '</option>';
		});
		$(this.options.id).update(options);
	}
};
