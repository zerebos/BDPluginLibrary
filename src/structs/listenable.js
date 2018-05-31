//TODO: Documentation
class Listenable {

	constructor() {
		this.listeners = [];
	}

	addListener(callback) {
		if (typeof(callback) !== "function") return;
        this.listeners.push(callback);
        return () => {
            this.listeners.splice(this.listeners.indexOf(callback), 1);
        };
	}

	removeListener(callback) {
		if (typeof(callback) !== "function") return;
		this.listeners.splice(this.listeners.indexOf(callback), 1);
    }
    
    alertListeners() {
        for (let l = 0; l < this.listeners.length; l++) this.listeners[l]();
    }
}

export default Listenable;