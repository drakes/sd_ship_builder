var EasySelectView =
{
	replace_options: function(option_pairs)
	{
		$(this.options.id).update(this.create_options(option_pairs));
	},

	append_options: function(option_pairs)
	{
		var select = $(this.options.id);
		select.insert({ bottom: this.create_options(option_pairs) });
	},

	create_options: function(option_pairs)
	{
		return option_pairs.inject('', function(html, pair)
		{
			return html + '<option value="' + pair.key + '">' + pair.value + '</option>';
		});
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
	},

	remove_option_by_key: function(key)
	{
		var option = $(this.options.id).down('option[value="' + key + '"]');
		option.remove();
	},

	hint_selected: function()
	{
		var select = $(this.options.id);
		var index = select.selectedIndex;
		if (Object.isNumber(index))
		{
			return select.childElements()[index].hasClassName(this.options.hint_class);
		}
		return false;
	}
};
