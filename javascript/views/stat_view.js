var StatView =
{
	refresh_display: function(current, max)
	{
		var stat_control = $(this.options.stat_id);
		stat_control.down('.' + this.options.current_class).update(current);
		var max_control = stat_control.down('.' + this.options.max_class);
		if (max_control)
		{
			max_control.update(max);
		}
		stat_control.show();
	}
};
