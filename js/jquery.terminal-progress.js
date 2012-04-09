(function($){
	$.terminal_progress = function(terminal, options){
		var fatal_error = 'terminal_progress Fatal Error: ';
		if(!options)
			options = terminal;
		else	
			options.terminal = terminal;
			
		//Defaults
		var defaults = {
			show_rate: true,
			show_percent: true,
			show_completion: true,
			show_eta: true
		};

		options = $.extend(defaults, options);
			
		//Enforce required options
		if(!options.total)
			throw new Error(fatal_error + 'MUST provide a total.');
		if(!options.update)
			throw new Error(fatal_error + 'MUST provide an update callback.');
		if(!options.terminal)
			throw new Error(fatal_error + 'Must provide a terminal.');

		var unit = (options.unit)? options.unit : '', interval = setInterval(update, 50), lastUpdate = new Date().getTime(), timeout, completed = 0, rate = 0, eta = 0;
			
		function addCommas(subject)
		{
			//Ensure subject is a string and not a number
			var sub_string = new String(subject); 
			return sub_string.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}

		function formatTLeft(time)
		{
			var hours = Math.floor(time / 3600), minutes, seconds = time % 60, ret = "";
			if(hours > 0)
			{
				ret += hours + ' hrs, ';
				minutes = time % 3600;
			}
			else 
				minutes = Math.floor(time / 60);
			if(minutes > 0 || hours > 0)
				ret += minutes + 'min, ';
			
			
			return ret + seconds + 'sec';
		}

		function render(completed, rate, eta)
		{
			var percent = Math.floor((completed / options.total) * 100), output = "[";
			for(var i = 0; i < 32; i++)
			{
				if(i < Math.ceil(percent * 0.3) + 1)
					output += "=";
				else if(i == Math.ceil(percent * 0.3) + 1)
					output += ">";
				else
					output += "&nbsp;";
			}
			return output + ']' + 
				((options.show_percent === true)? ' ' + percent + '%' : '') + 
				((options.show_completion === true)? ' ' + addCommas(completed) + '/' + addCommas(options.total) + unit : '') + 
				((options.show_rate)? ' at ' + rate + unit + '/sec' : '') + 
				((options.show_eta)? ' ETA: ' + formatTLeft(eta) : '');
		}

		function update() { terminal.clear_last().echo(render(completed, rate, eta)); }
			
		terminal.echo(render(0, 0, 0));
		terminal.disable();

		timeout = function()
		{
			var prev = completed, prevUpdate = lastUpdate;
			lastUpdate = new Date().getTime();
			completed = options.update();
			rate = Math.floor(((completed - prev) / (lastUpdate - prevUpdate)) * 1000);
			eta = Math.ceil((options.total - completed) / rate);
			if(eta < 0)
				eta = 0;
			if(completed > options.total)
				completed = options.total;
			if(completed != options.total)
				setTimeout(timeout, 50);
			else
			{
				clearInterval(interval);
				update();
				terminal.enable();
			}
		}

		setTimeout(timeout, 50);
	}
})(jQuery);