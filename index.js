function SimpleEmitter(){
    this.listeners = {};
}

// add a listener
SimpleEmitter.prototype.on = function(type, listener, useCapture){
    if(!this.listeners[type]){
        this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
}

// support for older ways of adding listeners
SimpleEmitter.prototype.addEventListener = SimpleEmitter.prototype.on;
SimpleEmitter.prototype.addListener = SimpleEmitter.prototype.on;

// remove a listener
SimpleEmitter.prototype.removeListener = function(type, fn){
	if(typeof this.listeners[type] !== 'undefined') {
        for(var i = 0, l; l = this.listeners[type][i]; i++){
            if(l == fn) break;
        }
    this.listeners[type].splice(i, 1);
    }
};

// support for older ways of removing listeners
SimpleEmitter.prototype.removeEventListener = SimpleEmitter.prototype.removeListener;

// trigger an event to all it's listeners
SimpleEmitter.prototype.emit = function(type, object){
    if (
        this.listeners 
        && typeof this.listeners[type] !== 'undefined' 
        && this.listeners[type].length
    ) {
		var array = this.listeners[type].slice();
    	for (var i = 0, fn; fn = array[i]; i++) {
    		fn.apply(object, [object]);
   		 }
    	return true;          
	}
    return false;
};

// trigger an event, then remove all listeners
SimpleEmitter.prototype.emitOnce = function(type, object){
    if (
        this.listeners 
        && typeof this.listeners[type] !== 'undefined' 
        && this.listeners[type].length
    ) {
		var array = this.listeners[type].slice();
    	for (var i = 0, fn; fn = array[i]; i++) {
    		fn.apply(object, [object]);
    		this.removeListener(type, fn);
   		 }
    	return true;          
	}
    return false;
};

module.exports = SimpleEmitter;
