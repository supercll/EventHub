class EventHub {
    events = {
        /* 
            eventName: [fn1, fn2, fn3, ...]
        */
    };
    on(eventName, fn) {
        this.events[eventName] == null ? (this.events[eventName] = []) : null;
        this.events[eventName].push(fn);
    }
    emit(eventName) {
        this.events[eventName] = this.events[eventName].filter(fn => fn != null);
        this.events[eventName].forEach(fn => fn());
    }
    off(eventName, fn) {
        const index = this.events[eventName].indexOf(fn);
        if (index >= 0) {
            this.events[eventName][index] = null;
        }
    }
}

module.exports = {
    EventHub,
};
