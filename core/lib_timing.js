class EventSequencePlayer {
    #deltaType = null;

    // Delta time is how much time must pass
    // before an event at hand, not the next event. If we
    // move to an event with delta 300 microseconds, we wait
    // and then fire the event.

    #deltaTime = null;
    #events = null;
    #handler = null;

    // Duration of 0 indicates that no sequence was provided or
    // it's invalid, so playback should not be enabled.

    #duration = 0;
    #druation_string = "";

    // Actual position in sequence, measured in microseconds.

    #position = 0;
    #loopStart = 0;

    // In-frame positions.
    
    #timeUntilNext = 0;
    #timeLeft = 0;

    #index = 0;

    // Rate can be negative.

    #rate = 0.0;
    #rateRatio = 1.0;
    #calculatedRate = 0.0;

    // Show be rate precise? If so, it won't be rounded and therefore
    // more accurate. Not sure if that impacts performance much - using
    // float instead of rounded integer.

    #shouldBePrecise = false;

    // Used to track movement direction inside sequence.
    // It must initially be set to false.

    #backward = false;

    #updateRate() {
        this.#calculatedRate = this.#rate * this.#rateRatio;

        if (!this.#shouldBePrecise) this.#calculatedRate = Math.round(this.#calculatedRate);

        if (this.#handler != null) this.FIND_DURATION();
    }

    #initializePosition() {
        this.#backward = false;
        this.#position = 0;
        this.#index = 0;
        this.#timeUntilNext = this.#timeLeft = this.delta;

        // Reset tempo.

        window.dispatchEvent(
            new CustomEvent(
                "tempochange",
                {
                    detail: {
                        source: this,
                        value: 0
                    }
                }
            )
        );
    }

    constructor(rate = 1000000 / 32000) {
        this.rate = rate;
        
        // 

        this.shouldBePlaying = false;
        this.shouldRepeat = true;
        this.fireEventsWhenJumping = true;

        // 

        this.FIND_DURATION();
        this.APPEND_UI();
        this.SET_SEQUENCE();
    }

    get position() {
        return this.#position;
    }

    set position(value) {
        this.JUMP_TO(value);
    }

    get duration() {
        return this.#duration;
    }

    get duration_string() {
        return this.#druation_string;
    }

    get rate() {
        return this.#rate;
    }

    set rate(value) {
        this.#rate = value;

        this.#updateRate();
    }

    get rateRatio() {
        return this.#rateRatio;
    }
    
    set rateRatio(value) {
        this.#rateRatio = value;

        this.#updateRate();
    }

    get sequence() {
        if (this.#handler == undefined) return undefined;
        else return [this.#deltaTime, this.#events];
    }

    get handler() {
        return this.#handler;
    }

    get delta() {
        switch(this.#deltaType) {
            case "list":
                return this.#deltaTime[this.#index];
            case "constant":
                return this.#deltaTime;
            default:
                return this.#rate;
        }
    }

    get loopStart() {
        return this.#loopStart;
    }

    set loopStart(value) {
        const LOOP_MARK_LIST = this.node_domUi_registry["slider_loopMarkList"];
        LOOP_MARK_LIST.replaceChildren();

        // 

        if ( (value < 1) || (value >= this.#duration) ) value = 0;
        else {
            const OPTION = document.createElement("option");
            OPTION.value = value;

            LOOP_MARK_LIST.append(OPTION);
        }

        this.#loopStart = value;
    }

    get shouldBePrecise() {
        return this.#shouldBePrecise;
    }

    set shouldBePrecise(value) {
        this.#shouldBePrecise = value;

        this.#updateRate();
    }

    SET_SEQUENCE(sequence, handler) {
        if (sequence != null) {
            this.#deltaTime = sequence[0];
            this.#events = sequence[1];
            this.#handler = handler;

            this.#deltaType = this.FIND_DELTA_TYPE();
            this.FIND_DURATION();

            this.#initializePosition();
            this.loopStart = 0;
        }

        // 

        const SLIDER = this.node_domUi_registry["slider_position"];

        SLIDER.max = this.duration;
        SLIDER.disabled = (this.duration == 0) ? true : false;
    }

    FIND_DURATION() {
        var timeMicroseconds = 0;

        if (this.#events != null) {
            const LENGTH = this.#events.length;
            const MEMORY_INDEX = this.#index;
    
            // We use this index because if delta is a list it must
            // be set to get corresponding delta time from list.
    
            this.#index = 0;
    
            while (this.#index < LENGTH) {
                timeMicroseconds += this.delta;
                this.#index++;
            }

            this.#index = MEMORY_INDEX;
        }

        this.#duration = timeMicroseconds;
        this.#druation_string = LIB_0.unsorted.getTimeAsString(timeMicroseconds);
    }

    FIND_DELTA_TYPE() {
        if ( Array.isArray(this.#deltaTime) ) return "list";
        else if (this.#deltaTime > 0) return "constant";
        else return "";
    }

    MOVE_INDEX(backward = false) {
        if (backward) {
            this.#index--;

            if (this.#index < 0) {
                this.#index += this.#events.length;
                this.#position += this.#duration;

                return true;
            }
        } else {
            this.#index++;

            if (this.#index >= this.#events.length) {
                this.#index = 0;
                this.#position -= this.#duration;
                
                return true;
            }
        }

        return false;
    }

    HANDLE_EVENT() {
        const EVENT = this.#events[this.#index];

        this.#handler(EVENT);

        // What else to do with an event?

        if (EVENT.name == "setTempo") {
            window.dispatchEvent(
                new CustomEvent(
                    "tempochange",
                    {
                        detail: {
                            source: this,
                            value: Math.round(
                                60000000 / EVENT.microsecondsPerBeat
                            )
                        }
                    }
                )
            );
        }
    }

    ADVANCE(offset = 0, fireAlongTheWay = true) {
        if (offset == 0) return;

        // 

        this.#position += offset;

        // Check if this frame changed direction.

        if ( (offset < 0) ^ this.#backward ) {
            this.#backward = offset < 0;

            // Mirror the time and change target index. If say we had
            // 300/700 until event 12, now we turn back and should have
            // 400/700 until event 11.

            this.#timeLeft = this.#timeUntilNext - this.#timeLeft;
            this.MOVE_INDEX(this.#backward);
        }

        offset = Math.abs(offset);

        // 

        var isBoundariesCrossed = false;

        while (true) {
            // We "consume" time until next event here. If end of the
            // frame won't be reached, index moves and new value aquired.
            // Else index stays the same and time is adjusted.

            offset -= this.#timeLeft;

            if (offset > 0) {
                if (fireAlongTheWay) this.HANDLE_EVENT();

                // When moving backward we need to get the time until current
                // event and then move back to new target event number.

                if (this.#backward) {
                    this.#timeUntilNext = this.#timeLeft = this.delta;
                    if ( this.MOVE_INDEX(true) ) isBoundariesCrossed = true;
                }
                else {
                    if ( this.MOVE_INDEX(false) ) isBoundariesCrossed = true;
                    this.#timeUntilNext = this.#timeLeft = this.delta;
                }

                // 

                if (isBoundariesCrossed) {
                    // Pause when either start or end reached if
                    // playback is not "wrapped".
                    // If playback is wrapped, go to loop point.
        
                    if (this.shouldRepeat) {
                        if (this.#loopStart > 0) {
                            this.JUMP_TO(this.#loopStart, false);
        
                            return;
                        }
                    }
                    else {
                        this.shouldBePlaying = false;
                        
                        this.#initializePosition();
        
                        return;
                    }
    
                    isBoundariesCrossed = false;
                }
            }
            else {
                // Adjusting the time that is left to reach the next event
                // when end of current frame is reached.

                this.#timeLeft = Math.abs(offset);
                
                return;
            }
        }
    }

    JUMP_TO(position = 0, fireAlongTheWay) {
        var offset = position - this.#position;

        if (offset == 0) return;

        if (fireAlongTheWay == null) fireAlongTheWay = this.fireEventsWhenJumping;
        
        if (fireAlongTheWay) {
            this.#initializePosition();
            offset = position;
        }

        this.ADVANCE(offset, fireAlongTheWay);
    }

    APPEND_UI() {
        this.node_domUi_registry = {};

        const THIS = this;
        const CONTAINER = document.createElement("div");
		CONTAINER.classList.add("qui-generic-block-body");

        // 

        const FIELD_SPEED = document.createElement("input", { is: "custom-input" });
        FIELD_SPEED.inputMode = "decimal";
        FIELD_SPEED.type = "number";

        Object.assign(FIELD_SPEED, {
            className: "qui-number-input",
            value: 1,
            max: 4,
            min: -4,
            step: 0.2,
            style: "text-align: center"
        });

        // 

        const FIELD_TIME = document.createElement("span");
        FIELD_TIME.className = "qui-number-input";

        Object.defineProperties(FIELD_TIME, {
            "value": {
                set(microseconds) {
                    this.textContent = LIB_0.unsorted.getTimeAsString(microseconds) + "/" + THIS.duration_string;
                }
            }
        });

        // 

        const FIELD_TEMPO = document.createElement("span");
        FIELD_TEMPO.className = "qui-number-input";
        FIELD_TEMPO.title = "Tempo";

        Object.defineProperties(FIELD_TEMPO, {
            "value": {
                set(bpm) {
                    if (bpm > 999) bpm = 999;
                    else if (bpm < 0) bpm = 0;

                    this.textContent = String(bpm).padStart(3, 0);
                }
            }
        });

        FIELD_TEMPO.value = 0;

        addEventListener("tempochange", function (event) {
            const VALUE = event.detail.value;

            FIELD_TEMPO.value = VALUE;
        });

        // 

        const GROUP_0 = document.createElement("div");
		GROUP_0.classList.add("qui-generic-group");

        GROUP_0.append(
            FIELD_TEMPO,
            LIB_QUICK_UI.make_displayDomNode(this, "position", { type: "number", compact: true }, FIELD_TIME),
            LIB_QUICK_UI.make_controlDomNode(this, "rateRatio", { type: "number", compact: true }, FIELD_SPEED, "change"),
            LIB_QUICK_UI.create_controlDomNode(this, "shouldBePlaying", { type: "boolean", compact: true }),
            LIB_QUICK_UI.create_controlDomNode(this, "shouldRepeat", { type: "boolean", compact: true }),
            LIB_QUICK_UI.create_controlDomNode(this, "fireEventsWhenJumping", { type: "boolean", compact: true })
        );

        // 

        const GROUP_1 = document.createElement("div");
		GROUP_1.classList.add("qui-generic-group");

        const SLIDER_POSITION = new LIB_QUICK_UI.customElements.Input(true);
        Object.assign(SLIDER_POSITION, {
            type: "range",
            min: 0,
            step: 1,
            className: "player-slider"
        });

        SLIDER_POSITION.setAttribute("list", "player_loopMark");

        const LOOP_MARK_LIST = document.createElement("datalist");
        LOOP_MARK_LIST.id = "player_loopMark";

        GROUP_1.append(
            LIB_QUICK_UI.make_controlDomNode(this, "position", { type: "number", compact: true }, SLIDER_POSITION, "change"),
            LOOP_MARK_LIST
        )

        this.node_domUi_registry["slider_position"] = SLIDER_POSITION;
        this.node_domUi_registry["slider_loopMarkList"] = LOOP_MARK_LIST;

        // 

        CONTAINER.append(
			GROUP_0,
            GROUP_1,
		);

		LIB_QUICK_UI.appendHeader(CONTAINER, "Event Sequence Player");

        this.node_domUi = CONTAINER;
    }

    CONVERT_SEQUENCE(sequence, handler) {
        // F.e. we have MIDI sequence, events of which first go to
        // some MIDI module which handles them by modifying or converting to some
        // other events. After that, MIDI module output goes to receiver.
        // Using this function we can create modified sequence by handling all
        // events beforehand with MIDI module handler - this will allow us to bypass
        // this MIDI module and gain some performance

        const DELTA_TIME = [];
        const EVENTS = [];
    
        const IN_DELTA_TIME = sequence[0];
        const IN_EVENTS = sequence[1];
    
        var outEventList;
        var deltaBuffer = 0;
    
        IN_EVENTS.forEach(function (event, index) {
            outEventList = handler(event);
    
            if (outEventList.length == 0) deltaBuffer += IN_DELTA_TIME[index];
            else {
                DELTA_TIME.push(IN_DELTA_TIME[index] + deltaBuffer);
                DELTA_TIME.push(
                    ...Array(outEventList.length - 1).fill(0)
                );
    
                deltaBuffer = 0;
                
                EVENTS.push(...outEventList);
            }
        });
    
        return [DELTA_TIME, EVENTS];
    }

    EXECUTE() {
        if (!this.shouldBePlaying) return false;
        if (this.#duration <= 0) return false;

        this.ADVANCE(this.#calculatedRate);

        return true;
    }
}

// 

Object.seal(EventSequencePlayer);
Object.freeze(EventSequencePlayer.prototype);