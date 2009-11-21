(function()
{
	//instantiate: true to create a single instance immediately
	var classes =
	[
		{ name: 'ConstructionTemplate', instantiate: true }
	];
	
	var instances =
	[
		{ name: 'region_creator', class_name: 'Creator' },
		{ name: 'region_list', class_name: 'List' },
		{ name: 'site_list', class_name: 'List' },
		{ name: 'user_creator', class_name: 'Creator' },
		{ name: 'user_list', class_name: 'List' }
	];
	
	//event handlers
	function start()
	{
		classes.each(class_builder);
		instances.each(instance_builder);
	}
	
	function class_builder(class_spec)
	{
		var model;
		var view;
		var controller;
		
		try
		{
			model = eval(class_spec.name + 'Model');
			view = eval(class_spec.name + 'View');
			controller = eval(class_spec.name + 'Controller');
		}
		catch(exception)
		{
			//component(s) of the class not here, moving on...
		}
		
		//check first for the presence of the components; this allows each class to built optionally, ignored by pages that don't need it, simply by including or excluding those script tags in the header 
		if (model && view && controller)
		{
			if (class_spec.superclass)
			{
				if (window[class_spec.superclass])
				{
					window[class_spec.name] = Class.create(window[class_spec.superclass], model, view, controller);
				}
				else
				{
					throw 'Missing superclass ' + class_spec.superclass + ' (required by ' + class_spec.name + ')';
				}
			}
			else
			{
				window[class_spec.name] = Class.create(model, view, controller);
			}

			if (class_spec.instantiate)
			{
				var options = class_spec.options || {}; //instance_builder does not build if !options

				try
				{
					options.data = eval(class_spec.name + 'Data');
				}
				catch(exception)
				{
					//data not here, moving on...
				}

				return instance_builder(
				{
					class_name: class_spec.name,
					options: options
				});
			}
		}
	}
	
	function instance_builder(instance_spec)
	{
		if (window[instance_spec.class_name])
		{
			//aside from classes (instantiate), instance_builder triggers when 'name'_options is declared (preferably in a partial) for the instance
			var options = instance_spec.options;
			if (!options && instance_spec.name)
			{
				try
				{
					options = eval(instance_spec.name + '_options');
				}
				catch(exception)
				{
					//options for the instance not here, moving on...
				}
			}
			if (options)
			{
				var instance = new window[instance_spec.class_name](options);
				return instance;
			}
		}
	}

	document.observe("dom:loaded", start);	
})();
