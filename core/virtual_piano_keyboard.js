class VirtualPianoKeyboard extends HTMLElement {
    // List of virtual keys (dom nodes). Index of each key must correspond
    // to note number it supposed to generate.
    
    #keyList = [];

    #modifiers = [];

    // List of active key numbers and their triggers. It is possible
    // to have same key number many times in the list if there are
    // more than one triggers, but same trigger can't be added twice.
    // Trigger is an identifier of PC keyboard key or mouse button.

    #registry_triggerAndKeyNumber = {};
    #registry_keyNumberAndData = {};

    #build(numberOfOctaves = 1) {
        try {
            if (this.node_domUi_registry["keyContainer"] == null) throw 0;
        } catch {
            console.warn("Unable to build a keyboard");
            return;
        }

        const CONTAINER = this.node_domUi_registry["keyContainer"];

        numberOfOctaves = Math.min( Math.max(1, numberOfOctaves), 9 );
        
        // Remove old keys if there were any.

        const CHILDREN = CONTAINER.children;

        if (this.#keyList.length != 0) {
            while (CHILDREN.length != 0) CHILDREN[0].remove();

            this.#keyList = [];
        }

        // Create new.

        for (let i = 0; i < numberOfOctaves; i++) {
            this.#keyList.push( ...this.constructor.newSetOfVirtualKeys(CONTAINER) );
        }
    }

    constructor() {
        super();

        ///////////////////////////////
        //      EVENT LISTENERS      //
        ///////////////////////////////
        // 
        // Here's a description of possible scenarios and
        // what happens when they occur (excluding simple ones).
        // I'll refer to physical keys as buttons and virtual piano keys
        // as just keys.
        // 
        // * If mouse is moved over a key when mouse button is down,
        // press that key, stop pressing a key that was previously held by
        // mouse, if there was any.
        // * If mouse button is up, stop pressing a key that was previously
        // held by mouse, if there was any.
        // * If any button tries to press a key which is already pressed
        // by any other button, all these buttons will participate in pressing
        // that key and that key will be released when all buttons stop pressing
        // that key.
        // * If Control button was held when any button stopped pressing any key,
        // Control button will continue pressing that key or keys and will stop
        // when it's released.
        // * If same button triggers a press more than once without
        // releasing, following presses will not be registered by default, but
        // may dispatch the key event depending on settings.
        // * If many buttons try to press same key every button will be
        // registered, but key event will occur only for the first press.
        
        // *** PHYSICAL KEYBOARD EVENTS ***
        // 
        // #WARNING
        // Key down event will trigger for a held button when previously
        // pressed button is released.

        const KEYBOARD_DOWN = (function (event) {
            var index = this.BUTTON_CODE_INDEX_MAP.indexOf(event.code);

            if (index > 31) index -= 20;

            if (index != -1 && !event.repeat) this.VIRTUAL_KEY_PRESSED(event.code, this.#keyList[index]);
        }).bind(this);

        const KEYBOARD_UP = (function (event) { this.VIRTUAL_KEY_RELEASED(event.code) }).bind(this);

        addEventListener("keydown", KEYBOARD_DOWN);
        addEventListener("keyup", KEYBOARD_UP);

        // *** POINTER EVENTS ***

        const WRAP = (function (method) {
            method = method.bind(this);

            return function (event) {
                if (!event.target.classList.contains("vpk-key")) return;
                
                event.preventDefault();
                event.stopPropagation();
                method(event);
            }
        }).bind(this);

        const POINTER_DOWN = WRAP(function (event) {
            // Button 0 specifies mouse left button, touch, pen, etc.
            // "button" is the button which was actually pressed when
            // this event happened.

            if (event.button == 0) {
                this.VIRTUAL_KEY_PRESSED(
                    event.pointerType + event.pointerId, event.target
                );

                event.target.releasePointerCapture(event.pointerId);
            }
        });

        const POINTER_OVER = WRAP(function (event) {
            // Here we check which buttons are held pressed right now,
            // using "buttons" which tell us that.

            if (event.buttons == 1) {
                const TRIGGER = event.pointerType + event.pointerId;

                this.VIRTUAL_KEY_RELEASED(TRIGGER);
                this.VIRTUAL_KEY_PRESSED(TRIGGER, event.target);
            }
        });

        const POINTER_UP = (function (event) {
            if (event.button == 0) this.VIRTUAL_KEY_RELEASED(event.pointerType + event.pointerId);
        }).bind(this);

        this.addEventListener("pointerdown", POINTER_DOWN);
        this.addEventListener("pointerover", POINTER_OVER);
        addEventListener("pointerup", POINTER_UP);

        // 

        this.APPEND_UI();

        // 

        LIB_QUICK_UI.defineReactiveUiProperty(
            {
                object: this,
                key: "pitch",
                initialValue: 8192,
                node: this.node_domUi_registry["pitch"],
                eventName: "anychange",
                before: function (value) {
                    this.MAKE_WHEEL_EVENT(value);

                    return value;
                }
            }
        );

        LIB_QUICK_UI.defineReactiveUiProperty(
            {
                object: this,
                key: "velocity",
                initialValue: 127,
                node: this.node_domUi_registry["velocity"],
                eventName: "anychange"
            }
        );

        LIB_QUICK_UI.defineReactiveUiProperty(
            {
                object: this,
                key: "pan",
                initialValue: 64,
                node: this.node_domUi_registry["pan"],
                eventName: "anychange",
                before: function (value) {
                    this.MAKE_CC_EVENT(10, value);

                    return value;
                }
            }
        );

        LIB_QUICK_UI.defineReactiveUiProperty(
            {
                object: this,
                key: "volume",
                initialValue: 127,
                node: this.node_domUi_registry["volume"],
                eventName: "anychange",
                before: function (value) {
                    this.MAKE_CC_EVENT(7, value);

                    return value;
                }
            }
        );

        LIB_QUICK_UI.defineReactiveUiProperty(
            {
                object: this,
                key: "numberOfOctaves",
                initialValue: 3,
                node: this.node_domUi_registry["numberOfOctaves"],
                eventName: "change",
                before: function (value) {
                    this.#build(value);

                    return value;
                }
            }
        );

        LIB_QUICK_UI.defineReactiveUiProperty(
            {
                object: this,
                key: "noteNumberAddend",
                initialValue: 48,
                node: this.node_domUi_registry["noteNumberAddend"],
                eventName: "change",
                before: function (value) {
                    return Number(value);
                }
            }
        );

        LIB_QUICK_UI.defineReactiveUiProperty(
            {
                object: this,
                key: "channelNumber",
                initialValue: 0,
                node: this.node_domUi_registry["channelNumber"],
                eventName: "change",
                after: function () {
                    // Force to send events for these properties.

                    this.pitch = this.pitch;
                    this.pan = this.pan;
                    this.volume = this.volume;
                }
            }
        );
    }

    MAKE_CC_EVENT(controllerNumber = 0, value = 0) {
        this.APPLY_MODIFICATIONS([
            {
                name: "controlChange",
                controllerNumber: controllerNumber,
                type: "channel",
                channelNumber: this.channelNumber,
                value: value
            }
        ]);
    }

    MAKE_WHEEL_EVENT(amount = 8192) {
        this.APPLY_MODIFICATIONS([
            {
                name: "pitchWheelChange",
                type: "channel",
                channelNumber: this.channelNumber,
                amount: amount
            }
        ]);
    }

    VIRTUAL_KEY_PRESSED(trigger = "", element) {
        // Virtual key can be either pressed by clicking on it
        // on screen or pressing the keyboard key - trigger defines
        // what it is.
        // First check, if given trigger was already registered.

        if (trigger in this.#registry_triggerAndKeyNumber) return;

        // 
        
        var keyNumber = this.#keyList.indexOf(element);

        if (keyNumber == -1) return false;
        
        // Check if key number was registred, with any trigger.

        if (Object.values(this.#registry_triggerAndKeyNumber).indexOf(keyNumber) == -1) {
            if (!element.classList.contains("pressed")) element.classList.add("pressed");

            const NOTE_NUMBER = keyNumber + this.noteNumberAddend;
            const LABEL = (function () {
                const LABEL = document.createElement("div");

                LABEL.className = "vpk-name-label";
                LABEL.textContent = LIB_MIDI.convert_noteNumber_to_noteName(NOTE_NUMBER);
            
                return LABEL;
            })();

            element.append(LABEL);

            this.#registry_keyNumberAndData[keyNumber] = [NOTE_NUMBER, LABEL];

            // 

            const EVENT = {
                name: "noteOn",
                type: "channel",
                channelNumber: this.channelNumber,
                noteNumber: NOTE_NUMBER,
                velocity: this.velocity
            };
            
            // #NOTE
            // One event can be converted into many, f.e. tranforming
            // one note into chord. That's why we use list.
            // Keyboard doesn't reflect the output, it reflects input.

            this.APPLY_MODIFICATIONS([EVENT]);
        }

        // If trigger wasn't registered, it should be, and it doesn't
        // matter what key it presses.

        this.#registry_triggerAndKeyNumber[trigger] = keyNumber;

        return true;
    }

    VIRTUAL_KEY_RELEASED(trigger = "") {
        // If key press wasn't registered for provided
        // trigger, do nothing.

        if (this.#registry_triggerAndKeyNumber[trigger] == undefined) return false;

        var keyNumber = this.#registry_triggerAndKeyNumber[trigger];

        delete this.#registry_triggerAndKeyNumber[trigger];

        // Check if nothing else is pressing current key.

        if (Object.values(this.#registry_triggerAndKeyNumber).indexOf(keyNumber) == -1) {
            this.#keyList[keyNumber].classList.remove("pressed");

            const NOTE_NUMBER = this.#registry_keyNumberAndData[keyNumber][0];

            // Remove label.

            this.#registry_keyNumberAndData[keyNumber][1].remove();

            delete this.#registry_keyNumberAndData[keyNumber];

            // 

            const EVENT = {
                name: "noteOff",
                type: "channel",
                channelNumber: this.channelNumber,
                noteNumber: NOTE_NUMBER,
                velocity: this.velocity
            };

            this.APPLY_MODIFICATIONS([EVENT]);
        }

        return true;
    }

    APPLY_MODIFICATIONS(eventList) {
        const MODIFIERS = this.#modifiers;

        if (MODIFIERS.length != 0) {
            eventList.forEach(function (event) {
                MODIFIERS.forEach(function (modifier) {
                    modifier(event);
                });
            })
        }
        
        // 

        const THIS = this;

        eventList.forEach(function (eventObject) {
            THIS.dispatchEvent(
                new CustomEvent("generatemidi", {
                    detail: eventObject
                })
            );
        });
    }

    APPEND_UI() {
        this.node_domUi_registry = {};

        // 

        this.classList.add("qui-generic-block-body");
        LIB_QUICK_UI.appendHeader( this, "Virtual MIDI Keyboard" );

        // 

        const KEY_CONTAINER = document.createElement("div");
        KEY_CONTAINER.className = "vpk-key-container";

        // Disallow opening of the context menu on the keys area.

        KEY_CONTAINER.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            event.stopPropagation();
        });

        this.node_domUi_registry["keyContainer"] = KEY_CONTAINER;

        this.#build();

        // 

        const PITCH = LIB_QUICK_UI.create_numberInput({
            name: "Pitch",
            min: 0,
            max: 16384
        });
        
        PITCH.addEventListener("release", function () { this.value = 8192 });

        this.node_domUi_registry["pitch"] = PITCH;

        // 

        const VELOCITY = LIB_QUICK_UI.create_numberInput({
            name: "Velocity",
            min: 0,
            max: 127
        });

        this.node_domUi_registry["velocity"] = VELOCITY;

        // 

        const PAN = LIB_QUICK_UI.create_numberInput({
            name: "Panning",
            min: 0,
            max: 127
        });

        this.node_domUi_registry["pan"] = PAN;

        // 

        const VOLUME = LIB_QUICK_UI.create_numberInput({
            name: "Volume",
            min: 0,
            max: 127
        });

        this.node_domUi_registry["volume"] = VOLUME;

        // 

        const GROUP_0 = document.createElement("div");
        GROUP_0.className = "qui-generic-group";

        GROUP_0.append(PITCH, VELOCITY, PAN, VOLUME);

        // 

        const NUMBER_OF_OCTAVES = document.createElement("input", { is: "custom-input" });
        NUMBER_OF_OCTAVES.type = "number";
        NUMBER_OF_OCTAVES.inputMode = "numberic";
        NUMBER_OF_OCTAVES.max = 9;
        NUMBER_OF_OCTAVES.min = 1;
        NUMBER_OF_OCTAVES.className = "qui-number-input";
        NUMBER_OF_OCTAVES.title = "Number of octaves on the board";

        this.node_domUi_registry["numberOfOctaves"] = NUMBER_OF_OCTAVES;

        // 

        const NOTE_NUM_ADDEND = document.createElement("input", { is: "custom-input" });
        NOTE_NUM_ADDEND.type = "number";
        NOTE_NUM_ADDEND.inputMode = "numberic";
        NOTE_NUM_ADDEND.max = 115;
        NOTE_NUM_ADDEND.min = 0;
        NOTE_NUM_ADDEND.className = "qui-number-input";
        NOTE_NUM_ADDEND.title = "Note number addend";

        this.node_domUi_registry["noteNumberAddend"] = NOTE_NUM_ADDEND;

        // 

        const CHANNEL_NUMBER = document.createElement("input", { is: "custom-input" });
        CHANNEL_NUMBER.type = "number";
        CHANNEL_NUMBER.inputMode = "numberic";
        CHANNEL_NUMBER.max = 15;
        CHANNEL_NUMBER.min = 0;
        CHANNEL_NUMBER.className = "qui-number-input";
        CHANNEL_NUMBER.title = "Channel number\nEvery time value is changed, pitch, panning and volume values will be sent to the selected channel";

        this.node_domUi_registry["channelNumber"] = CHANNEL_NUMBER;

        // 

        const GROUP_1 = document.createElement("div");
        GROUP_1.className = "qui-generic-group";

        GROUP_1.append(NUMBER_OF_OCTAVES, NOTE_NUM_ADDEND, CHANNEL_NUMBER);

        // 

        this.append(KEY_CONTAINER, GROUP_0, GROUP_1);
    }

    static newSetOfVirtualKeys = function (parentElement = document.body) {
        var keyGroup_white = document.createElement("div");
        keyGroup_white.classList.add("vpk-key-group");

        var keyGroup_black = document.createElement("div");
        keyGroup_black.classList.add("vpk-key-group", "black");

        var octaveGroup = document.createElement("div");
        octaveGroup.classList.add("vpk-octave-group");

        octaveGroup.append(keyGroup_white, keyGroup_black)
        parentElement.append(octaveGroup);

        // 

        var elem_key;

        // 7 white keys.

        for (let i = 0; i < 7; i++) {
            elem_key = document.createElement("div");
            elem_key.classList.add("vpk-key");
            keyGroup_white.appendChild(elem_key);
        }

        // 5 black keys (+ 2 spacers).

        for (let i = 0; i < 7; i++) {
            elem_key = document.createElement("div");
            elem_key.classList.add("vpk-key", "black");

            if (i == 0 || i == 3)
                elem_key.classList.add("spacer");

            keyGroup_black.appendChild(elem_key);
        }

        // Sort newly created key elements in order they
        // appear on board.

        return [
            keyGroup_white.children[0],
                keyGroup_black.children[1],
            keyGroup_white.children[1],
                keyGroup_black.children[2],
            keyGroup_white.children[2],
            keyGroup_white.children[3],
                keyGroup_black.children[4],
            keyGroup_white.children[4],
                keyGroup_black.children[5],
            keyGroup_white.children[5],
                keyGroup_black.children[6],
            keyGroup_white.children[6]
        ];
    }
}

// #NOTE
// Initially it was possible to press keys out of "standard" set, like left
// or right "Shift" or "Tab" to extend the range of notes that can be played,
// but keyboards vary and it may happen that the order of some of those keys
// may be different than expected on the board, which would mess things up.

Object.defineProperties(
    VirtualPianoKeyboard.prototype,
    {
        "BUTTON_CODE_INDEX_MAP": {
            value: [
                // 32 + 5 elements.
                // First layer.
        
                "KeyZ",
                        "KeyS",
                "KeyX",
                        "KeyD",
                "KeyC",
                "KeyV",
                        "KeyG",
                "KeyB",
                        "KeyH",
                "KeyN",
                        "KeyJ",
                "KeyM",
        
                // 
        
                "KeyQ",
                        "Digit2",
                "KeyW",
                        "Digit3",
                "KeyE",
                "KeyR",
                        "Digit5",
                "KeyT",
                        "Digit6",
                "KeyY",
                        "Digit7",
                "KeyU",
        
                // 
        
                "KeyI",
                        "Digit9",
                "KeyO",
                        "Digit0",
                "KeyP",
                "BracketLeft",
                        "Equal",
                "BracketRight",
        
                // Second layer. Shares same events
                // with first five buttons from the first layer.
        
                "Comma",
                        "KeyL",
                "Period",
                        "Semicolon",
                "Slash"
            ]
        }
    }
);

Object.seal(VirtualPianoKeyboard.constructor);
Object.freeze(VirtualPianoKeyboard.prototype);

customElements.define("virtual-piano-keyboard", VirtualPianoKeyboard);
