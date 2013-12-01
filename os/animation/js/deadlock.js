var terminal = document.getElementById('terminal');
var canvas = document.getElementById('canvas');
window.onload = function(){
	
}

var commands = new Commands();

terminal.onkeypress = function(e){
	if(e.keyCode == 13){
		var val = (this.value.substr(this.value.lastIndexOf(">>") + 2)).trim();
		commands.cacheCommand(val);
		commands.execute(val);
	}		
}

var temp = '';
var tempCheck = 0;
terminal.onkeyup = function(e){
	//console.log(e.keyCode);
	if(e.keyCode == 13){
		this.value +='>> ';
		tempCheck = 0;
	}else if(e.keyCode == 40){
		if(tempCheck == 0){
			temp = this.value; tempCheck++;
		}
        var pvcmd = commands.previousCommand();
		this.value = temp+''+(( pvcmd != false )? pvcmd: '');		
	}
}

function Commands(){
	var cmduser = [];
	var cmdp = 0;
	var cmds = ["-c", "-l", "->", "-d", "-k", '-h'];
	var processes = [];
	var resources = [];	
    var arrows = [];
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
								this.addProcessToResourcce(pid, rid);
								this.addResourceToProcess(rid, pid);
								this.mapProcessToResource(pid, rid);
                            }
						}else{
							this.nextLine("There are no resource available for use\nPLease create resource by using resource -c [resource_name]");	
						}
					}else{
						this.nextLine("Invalid operation on resource");			
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
							this.kill_resource(getName(command));
						}
					}
					break;				
				case cmds.indexOf('-h'):
						this.help(getName(command));		
					break;				
				default:
					this.nextLine('No such command exist');			
			}
		}else if(command.substr(0, 9).indexOf('help') != -1 ){
			this.help('process');
			this.help('resource');
		}else{
			this.nextLine('No such command exist');					
		}
	}
			
	this.nextCommandLine = function(message){
		terminal.value += message+'\n>>';		
	}
	
	this.nextLine = function(message){
		terminal.value += '\n'+message;			
	}
	
	var validateCommand = function(command){
		command = command.substr(command.indexOf('-'), 2);	
        console.log(command);
		return cmds.indexOf(command);			
	}
	
	this.cacheCommand = function(command){
		cmduser.push(command);
		cmdp = cmduser.length;
	}
	
	this.previousCommand = function(){
		if(cmduser.length != 0){
			if(cmdp !== 0){
				return cmduser[(--cmdp)];	
			}else{
				cmdp = cmduser.length;
				return cmduser[cmdp-1];
			}		
		}else{
			return false;
		}
	}
	
	this.nextCommand = function(){
		if(cmduser.length != 0){
			if(cmdp + 1 != cmduser.length){
				return cmduser[(++cmdp)];	
			}else{
				cmdp = 0;
				return cmduser[cmdp];
			}		
		}else{
			return false;
		}
	}
	
	var getName = function(command){		
		var name = command.substr(command.indexOf('-') + 2, command.length).trim();
		return name;	
	}
	
	this.getResource = function(resource_id){
        for(var x in resources){
            if(resources[x].rid === resource_id){
                return resources[x];   
            }
        }
        this.nextLine('Resource '+resource_id+' does not exist\nYou can create a process by using resource -c [resource_name]');
        return false;
    }
    
    this.getProcess = function(process_id){
		for(var x in processes){
            if(processes[x].pid === process_id){
                return processes[x];   
            }
        }
        this.nextLine('Process '+process_id+' does not exist\nYou can create a process by using process -c [process_name]');
        return false;
    }
    
    this.resourceExists = function(resource_id){
        for(var x in resources){
            if(resources[x].rid === resource_id){
                return true;   
            }
        }
        this.nextLine('Resource '+resource_id+' does not exist\nYou can create a process by using resource -c [resource_name]');
        return false;
    }
    
    this.processExists = function(process_id){
		for(var x in processes){
            if(processes[x].pid === process_id){
                return true;   
            }
        }
        this.nextLine('Process '+process_id+' does not exist');
        return false;
    }
	
	this.addProcessToResourcce = function(process_id, resource_id){		
        var resource = this.getResource(resource_id);
        if(resource != false){
            resource.addProcess(process_id);	
        }else{
            this.nextLine("\nAfterwards you can link them together by doing process -r {process_id]->[resource_id]");				
        }
	}
	
	this.addResourceToProcess = function(resource_id, process_id){	
        var process = this.getProcess(process_id);
        if(process != false){
            process.addResource(resource_id);	
        }else{
            this.nextLine("\nAfterwards you can link them together by doing process -r {process_id]->[resource_id]");				
        }
	}
    
    this.mapProcessToResource = function(process_id, resource_id){        
		var resource = this.getResource(resource_id);
		var process = this.getProcess(process_id);	           
        if(resource != false && process != false){
            var rtop = resource.div.offsetTop;   
            var rleft = resource.div.offsetLeft;
            var rheight = resource.div.offsetHeight;
            var rwidth = resource.div.offsetWidth;
            var ptop = process.div.offsetTop;   
            var pleft = process.div.offsetLeft;
            var pheight = process.div.offsetHeight;
            var pwidth = process.div.offsetWidth;
            var arrow = document.createElement('div');
            arrow.setAttribute('id', process_id+'->'+resource_id);
			arrow.setAttribute('class', 'arrow');
            arrow.style.top = (ptop + (pheight/2))+'px';
			arrow.style.left = (pleft+pwidth)+'px'
			arrow.style.width = (rleft-(pleft+pwidth))+'px';
			arrow.style.backgroundColor = 'blue';
            var effect = new Animation();
            var x = rleft - (pleft + pwidth);
            var y = rtop - ptop;
            var thea = Math.atan2(y,x)*(180/Math.PI);
           // console.log(thea);  
            effect.rotate(arrow, thea);
			canvas.appendChild(arrow);
        }
    }
	
	
	this.help = function(type){
		if(type == 'resource'){
			this.nextLine('To execute a command for a resource do resource [option] [process_name]. \nThe resource options are as followed \n-c \t create resource\n-l\t list all resource\n-d\t describe resource\n-k\t kill resource');			
		}else if(type=='process'){
			this.nextLine('To execute a command for a process do process [option] [process_name]. \nThe process options are as followed \n-c \t create process\n-l\t list all process\n-d\t describe process\n-k\t kill process\nThere is a special process function for requesting resource which is done by doing process [process_name]->[resource_name]');
		}
	}
	
	this.describe_process = function(process_id){
		for(var x = 0; x < processes.length; x++){
			if(processes[x].pid === process_id){
				this.summary(process_id, 'process', processes[x].resources);	
			}else if((x+1) == processes.lenght){
				this.nextLine("There is no process of such nature\nYou can create a process by using process -c or create a resource by resource -c\nAfterwards you can link them together by doing process -r {process_id]->[resource_id]");				
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
			this.nextLine((processes.length > 1)? 'There are '+processes.length+' processes' : 'There is only '+processes.length+' process');
			for(var x = 0; x < processes.length; x++){
				this.nextLine('process '+processes[x].pid);
			}
		}else{
			this.nextLine('there are no process available');	
		}
	}
	
	this.list_resources = function(){
		if(resources.length != 0){
			this.nextLine((resources.length > 1)? 'There are '+resources.length+' resource' : 'There is only '+resources.length+' resource');
			for(var x = 0; x < resources.length; x++){
				this.nextLine('resource '+resources[x].rid);
			}
		}else{
			this.nextLine('there are no resources available');	
		}
	}
	
	this.kill_process = function(process_id){
		for(var x = 0; x < processes.length; x++){
			if(processes[x].pid === process_id){
                canvas.removeChild(processes[x].div);
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
                canvas.removeChild(resources[x].div);
				resources.splice(x,1);	
				this.remove_resource(resource_id);
			}
		}
	}
}

function Process(process_id){
	this.div = false;
    this.pid = process_id;
    this.running = false;
    this.resources = [];
	this.cords = [];
	this.nextLine('Process '+this.pid+' was created');
    this.addResource = function(resource_id){
        this.resources.push(resource_id);
		this.nextLine('Process '+this.pid+' has requested resource '+resource_id);
    }
	
	this.removeResource = function(resource_id){
		var index = resources.indexOf(resource_id);
		this.resources.splice(index, 1);
		this.nextLine('Resource '+resource_id+' was removed from process '+this.pid);
	}
	
	this.removeLastResource = function(){
		var rid = this.resource.pop();
		this.nextLine('Resource '+rid+' was removed from process '+this.pid);
	}       
	
	this.draw = function(){
		var pr = document.createElement('div');
		pr.setAttribute('id', this.pid);
		pr.setAttribute('class', 'process');
		pr.innerHTML = 'Process<br>'+this.pid;
		this.cords[0] = Process.cords[0][0];
		this.cords[1] = Process.cords[0][1];
		pr.style.top = this.cords[1]+'px';
		pr.style.left = this.cords[0]+'%';		
		Process.cords.splice(0,1);
		canvas.appendChild(pr);
		this.div = pr;
		this.nextLine('create process diagram');
	}
	this.draw();	
}

function Resource(resource_id){
	this.div = false;
	this.unit = null;
	this.rid = resource_id;
	this.processes = [];	
	this.cords = [];
	this.nextLine('Resource '+this.rid+' was created');
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
	
	this.draw = function(){
		var re = document.createElement('div');
		re.setAttribute('id', this.rid);
		re.setAttribute('class', 'resource');
		re.innerHTML = 'Reource<br>'+this.rid;
		this.cords[0] = 45;
		this.cords[1] = Resource.top[0];
		re.style.left = this.cords[0]+'%';
		re.style.top = this.cords[1]+'px';
		Resource.top.splice(0,1);
		canvas.appendChild(re);
		this.div = re;
		this.nextLine('create resource diagram for '+this.rid);
	}
	this.draw();	
}

Resource.top = [50, 140, 230, 320, 410];
Process.cords = [[15, 10], [15, 100], [15,190], [15,280], [15,370], [70, 10], [70, 100], [70,190], [70,280], [70,370]];

//inherit commands class
//only two functions are inherit becasue of the variable scope
//the two functions are nextLine and nextCommand
Process.prototype = new Commands();
Resource.prototype = new Commands();

function Animation(){    
    var looper;
    this.degrees = 0;
    this.rotate = function(elem, degrees){
        this.degrees = degrees;
        if(navigator.userAgent.match("Chrome")){
            elem.style.WebkitTransform = "rotate("+this.degrees+"deg)";
        } else if(navigator.userAgent.match("Firefox")){
            elem.style.MozTransform = "rotate("+this.degrees+"deg)";
        } else if(navigator.userAgent.match("MSIE")){
            elem.style.msTransform = "rotate("+this.degrees+"deg)";
        } else if(navigator.userAgent.match("Opera")){
            elem.style.OTransform = "rotate("+this.degrees+"deg)";
        } else {
            elem.style.transform = "rotate("+this.degrees+"deg)";
        }
    }   
    
    this.rotateAnimation = function(elem,speed){
        this.rotate(elem, this.degrees);
        looper = setTimeout('rotateAnimation(\''+elem+'\','+speed+')',speed);
        degrees++;
        if(degrees > 359){
            degrees = 1;
        }
    }
}