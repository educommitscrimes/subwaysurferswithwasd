(function () {
    var WASD_TO_ARROW = {
        KeyW: { key: 'ArrowUp', code: 'ArrowUp', keyCode: 38 },
        KeyA: { key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37 },
        KeyS: { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40 },
        KeyD: { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39 }
    };

    function getMapping(event) {
        return WASD_TO_ARROW[event.code] || WASD_TO_ARROW['Key' + event.key.toUpperCase()];
    }

    function createArrowEvent(type, mapping) {
        var event = new KeyboardEvent(type, {
            key: mapping.key,
            code: mapping.code,
            bubbles: true,
            cancelable: true,
            view: window
        });

        Object.defineProperty(event, 'keyCode', { get: function () { return mapping.keyCode; } });
        Object.defineProperty(event, 'which', { get: function () { return mapping.keyCode; } });
        Object.defineProperty(event, 'charCode', { get: function () { return 0; } });

        return event;
    }

    function getDispatchTarget() {
        return document.querySelector('#game canvas') ||
            document.querySelector('canvas') ||
            document.getElementById('game') ||
            document;
    }

    function remapKey(event) {
        var mapping = getMapping(event);
        if (!mapping) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        getDispatchTarget().dispatchEvent(createArrowEvent(event.type, mapping));
    }

    document.addEventListener('keydown', remapKey, true);
    document.addEventListener('keyup', remapKey, true);
})();
