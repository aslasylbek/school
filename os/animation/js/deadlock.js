var terminal = document.getElementById('terminal');
window.onload = function(){
	
}

var commands = new Commands();

terminal.onkeypress = function(e){
	if(e.keyCode == 13){
		var val = (this.value.substr(this.value.lastIndexOf(">>") + 2)).trim();
		commands.user.push(val);
		commands.execute(val);
	}
}

terminal.onkeyup = function(e){
	if(e.keyCode == 13){
		this.value +='>> ';
	}
}

function Commands(){
	this.user = [];
	var cmds = ["-c", "-l", "->", "-d", "-k", '-h'];
	var processes = [];
	var resources = [];	
	this.execute = function(command){
		command = (command.toLowerCase()).trim();
		var run = validateCommand(command);
		if(command.substr(0, 9).indexOf('process') != -1 ||  command.substr(0, 9).indexOf('resource') != -1){
			switch(run){
				case cmds.indexOf('-c'):			
					if(command.substr(0, 9).indexOf('process') != -1){
						processes.push((new Process(getName(command))));	
					}else{
						resources.push((new Resource(getName(command))));				
					}				
					break;
				case cmds.indexOf('-l'):					
					if(command.substr(0, 9).indexOf('process') != -1){
						this.list_processes();
					}else{
						this.list_resources();			
					}	
					break;
				case cmds.indexOf('->'):				
					if(command.substr(0, 9).indexOf('process') != -1){
						if(resources.length != 0){
							var rid = command.substr(command.indexOf('->') + 2);
							var pid = command.substring(command.indexOf('process')+7, command.indexOf('->')).trim();
                            if(this.processExists(pid) && this.resourceExists(rid)){
							     this.addProcessResource(pid,rid); 
								 this.addResourceProcess(rid,pid);
                            }
						}else{
							this.nextCommand("There are no resource available for use\n PLease create resource by using resource -c [resource_name]");	
						}
					}else{
						this.nextCommand("Invalid operation on resource");			
					}	
					break;
				case cmds.indexOf('-d'):				
					if(command.substr(0, 9).indexOf('process') != -1){
						if(this.processExists(getName(command))){
							this.describe_process(getName(command));
						}
					}else{
						if(this.resourceExists(getName(command))){
							this.describe_resource(getName(command));
						}
					}	
					break;
				case cmds.indexOf('-k'):					
					if(command.substr(0, 9).indexOf('process') != -1){						
						if(this.processExists(getName(command))){
							this.kill_process(getName(command));
						}
					}else{
						if(this.resourceExists(getName(command))){
							this.remove_resource(getName(command));
						}
					}
				default:
					this.nextCommand('No such command exist');			
			}
		}
	}
			
	this.nextCommand = function(message){
		terminal.value += '\n>> '+message;		
	}
	
	this.nextLine = function(message){
		terminal.value += '\n '+message;			
	}
	
	var validateCommand = function(command){
		command = command.substr(command.indexOf('-'), 2);	
		//console.log(cmds.indexOf(command));
		return cmds.indexOf(command);			
	}
	
	var getName = function(command){		
		var name = command.substr(command.indexOf('-') + 2, command.length).trim();
		return name;	
	}
	
	var getResource = function(resource){
		if(resources.length != 0){
		}else{
			false;	
		}
	}
    
    this.resourceExists = function(resource_id){
        for(var x in resources){
            if(resources[x].rid === resource_id){
                return true;   
            }
        }
        this.nextCommand('Resource '+resource_id+' does not exist');
        return false;
    }
    
    this.processExists = function(process_id){
		for(var x in processes){
            if(processes[x].pid === process_id){
                return true;   
            }
        }
        this.nextCommand('Process '+process_id+' does not exist');
        return false;
    }
	
	this.addProcessToResourcce = function(resource_id, process_id){		
		for(var x = 0; x < resources.length; x++){
			if(resources[x].rid == resource_id){
				resources[x].addProcess(process_id);	
			}else{
				this.nextCommand("There is no process of such nature\nYou can create a process by using process -c or create a resource by resource -c\nAfterwards you can link them together by doing process -r {process_id]->[resource_id]");				
			}
		}
	}
	
	this.addResourceToProcess = function(process_id, resource_id){
		for(var x = 0; x < processes.length; x++){
			if(processes[x].pid == process_id){
				processes[x].addResource(resource_id);	
			}else{
				this.nextCommand("There is no process of such nature\nYou can create a process by using process -c or create a resource by resource -c\nAfterwards you can link them together by doing process -r {process_id]->[resource_id]");				
			}
		}
	}
	
	this.describe_process = function(process_id){
		for(var x = 0; x < processes.length; x++){
			if(processes[x].pid === process_id){
				this.summary(process_id, 'process', processes[x].resources);	
			}else if((x+1) == processes.lenght){
				this.nextCommand("There is no process of such nature\nYou can create a process by using process -c or create a resource by resource -c\nAfterwards you can link them together by doing process -r {process_id]->[resource_id]");				
				break
			}
		}
	}
	
	this.describe_resource = function(resource_id){
		for(var x = 0; x < resources.length; x++){
			if(resources[x].rid === resource_id){
				this.summary(resource_id, 'resource', resources[x].processes);	
			}else if((x+1) == resources.lenght){
				this.nextLine("There is no process of such nature\nYou can create a process by using process -c or create a resource by resource -c\nAfterwards you can link them together by doing process -r {process_id]->[resource_id]");				
				break
			}
		}
	}
	
	this.summary = function(id, type, links){
		if(type === 'resource'){
			if(links.length > 2 ){
				this.nextLine(''+type+' '+id+' has been requested by '+links.length+' processes. They are:'); 
			}else if(links.length == 1){
				this.nextLine(''+type+' '+id+' has been requested by '+links.length+' process. They is:'); 
			}
			if(links.length > 0){		
				for(var x in links){
					this.nextLine('process '+links[x]);	
				}	
			}else{
				this.nextLine('There are no processes requesting this resources')
			}
		}else{
			if(links.length > 2 ){
				this.nextLine(''+type+' '+id+' is requesting '+links.length+' resources. They are:'); 
			}else if(links.length == 1){
				this.nextLine(''+type+' '+id+' is requesting '+links.length+' resource. They is:'); 
			}
			if(links.length > 0){		
				for(var x in links){
					this.nextLine('resource '+links[x]);	
				}	
			}else{
				this.nextLine('There are no reesource been requested by this process')
			}
		}
	}
	
	this.list_processes = function(){
		if(processes.length != 0){
			this.nextCommand((processes.length > 1)? 'There are '+processes.length+' processes' : 'There is only '+processes.length+' process');
			for(var x = 0; x < processes.length; x++){
				this.nextLine('process '+processes[x].pid);
			}
		}else{
			this.nextCommand('there are no process available');	
		}
	}
	
	this.list_resources = function(){
		if(resources.length != 0){
			this.nextCommand((resources.length > 1)? 'There are '+resources.length+' resource' : 'There is only '+resources.length+' resource');
			for(var x = 0; x < resources.length; x++){
				this.nextLine('resource '+resources[x].rid);
			}
		}else{
			this.nextCommand('there are no resources available');	
		}
	}
	
	this.kill_process = function(process_id){
		for(var x = 0; x < processes.length; x++){
			if(processes[x].pid === process_id){
				processes.splice(x,1);	
				this.remove_process(process_id);
			}
		}
	}	
	
	this.remove_process = function(process_id){
		for(var x in resources){
			if(resources[x].processes.indexOf(process_id) != -1){
				resources[x].processes.splice(resources[x].processes.indexOf(process_id), 1);
			}
		}
	}
	
	this.remove_resource = function(resource_id){
		for(var x in processes){
			if(processes[x].resources.indexOf(resource_id) != -1){
				processes[x].resources.splice(processes[x].resources.indexOf(resource_id), 1);
			}
		}
	}
	
	this.kill_resource = function(resource_id){
		for(var x = 0; x < resources.length; x++){
			if(resources[x].rid === resource_id){
				console.log(resource_id);
				resources.splice(x,1);	
				this.remove_resource(resource_id);
			}
		}
	}
}

function Process(process_id){
    this.pid = process_id;
    this.running = false;
    this.resources = [];
	this.nextCommand('Process '+this.pid+' was created');
    this.addResource = function(resource_id){
        this.resources.push(resource_id);
		this.nextCommand('Process '+this.pid+' has requested resource '+resource_id);
    }
	
	this.removeResource = function(resource_id){
		var index = resources.indexOf(resource_id);
		this.resources.splice(index, 1);
		this.nextCommand('Resource '+resource_id+' was removed from process '+this.pid);
	}
	
	this.removeLastResource = function(){
		var rid = this.resource.pop();
		this.nextCommand('Resource '+rid+' was removed from process '+this.pid);
	}       
}

function Resource(resource_id){
	this.unit = null;
	this.rid = resource_id;
	this.processes = [];	
	this.nextCommand('Resource '+this.rid+' was created');
	this.addProcess = function(process_id){
		this.processes.push(process_id);
	}
	this.removeProcess = function(process_id){
		var index = this.processes.indexOf(process_id);
		this.processes.splice(index, 1);
	}
	this.removeLastProces = function(){
		this.processes.pop();
	}
		
}


//inherit commands class
//only two functions are inherit becasue of the variable scope
//the two functions are nextLine and nextCommand
Process.prototype = new Commands();
Resource.prototype = new Commands();