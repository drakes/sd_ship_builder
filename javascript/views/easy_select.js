var EasySelectView =
{
	replace_options: function(option_pairs)
	{
		var options = option_pairs.inject('', function(html, pair)
		{
			return html + '<option value="' + pair.key + '">' + pair.value + '</option>';
		});
		$(this.options.id).update(options);
	},

	prepend_hint: function(hint)
	{
		var select = $(this.options.id);
		select.insert({ top: '<option value="" class="' + this.options.hint_class + '">' + hint + '</option>' });
		select.selectedIndex = 0;
	},

	remove_hint: function()
	{
		var hint = $(this.options.id).down('.' + this.options.hint_class);
		if (hint)
		{
			hint.remove();
		}
	}
};
