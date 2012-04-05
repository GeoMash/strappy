$JSKK.Trait.create
(
	{
		$namespace:	'framework.trait.command',
		$name:		'Send'
	}
)
(
	{
		sendCommand: function(name,body)
		{
			var command='command.'+name;
			console.debug(this.namespace.concat(this.className).join('.'),':: sendCommand(trait) :: ',command);
			
			if (!Object.isEmpty(name))
			{
				
				this.sendSignal(framework.SIGNAL.CONTROLLER_DO_INIT,{name:command,config:body});
				
				
			}
			else
			{
				throw new Error('Class '+this.className+' attempted to send an empty command.');
			}
		}
	}
);