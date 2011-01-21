var PersistenceView =
{
	refresh_link: function(ship_url)
	{
		var link = $(this.options.id);
		link.href = ship_url;
		link.up().show();
	}
};
