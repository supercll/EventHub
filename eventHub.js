class EventHub {
    events = {
        /* 
            eventName: [fn1, fn2, fn3, ...]
        */
    };
    on(eventName, fn) {}
    emit(eventName) {}
    off(eventName, fn) {}
}
