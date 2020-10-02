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
    }
    off(eventName, fn) {
    }
}

module.exports = {
    EventHub,
};
