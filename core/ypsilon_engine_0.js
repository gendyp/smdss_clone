class Ypsilon_Engine {
    #modulesExecutionMethod = null;

    // Use this function to go through module chain. It handles
    // clearing of each module output at the begining of iteration.
    // If arrays are not cleared, you won't notice, but old events will be piling up.
    // Each module keeps a result of its work in the iteration at hand.

    #collect = function (list = [], module) {
        module.output = [];

        list.forEach(function (event) {
            module.EXECUTE(event);
        });
    }
    
    #makeMethod = function () {
        this.#modulesExecutionMethod = function (midiEvent) {
            this.#collect([midiEvent], this.routerModule);
            this.#collect(this.routerModule.output, this.presetModule);
            this.#collect(this.presetModule.output, this.converterModule);

            return this.converterModule.output;
        }
    }

    constructor(generator) {
        if (generator == undefined) throw "Engine needs a generator to work with";

        // 
        
        this.generator = generator;

        this.routerModule = new this.constructor.ROUTER;

        this.presetModule = new this.constructor.PRESETS(
            this.generator.SGPM_WRAP.target.CHANNELS,
            this.generator.SGPM_WRAP.target.LFO
        );

        this.converterModule = new this.constructor.CONVERTER(
            this.generator.SGPM_WRAP.target.CHANNELS,
            this.generator
        );

        // 
        
        this.#makeMethod();
        this.APPEND_UI();
    }

    HANDLE_MIDI(midiEvent) {
        midiEvent = LIB_0.object.deepCopy(midiEvent);
        return this.#modulesExecutionMethod(midiEvent);
    }

    APPEND_UI() {
        const DESCRIPTOR = this.constructor.GENERATOR_DESCRIPTOR;
        const STRUCT = LIB_QUICK_UI.create_controlDomNode_objectStructure(this.generator, DESCRIPTOR.properties);
        const UI = LIB_QUICK_UI.create_domNodeStructureFromObjectStructure(STRUCT, DESCRIPTOR);

        UI.classList.add("ye-container");

        this.generator.node_domUi = LIB_QUICK_UI.wrapInContainer_0(
            UI, "Signal Generator"
        );

        // 

        const GROUP_0 = document.createElement("div");
        GROUP_0.className = "qui-generic-group";

        GROUP_0.append(
            this.routerModule.node_domUi,
            this.presetModule.node_domUi,
            this.converterModule.node_domUi
        );

        // 

        this.node_domUi = LIB_QUICK_UI.wrapInContainer_0(GROUP_0, "MIDI Engine", "Events get collected or replaced while moving through chain of modules. Any module is able to handle the events, affecting targets outside of engine.\nNOTE: use channels from 10 to 13 to play on Latch generator");
        this.node_domUi.classList.add("qui-flex-column-flow");
    }
}

Object.defineProperties(Ypsilon_Engine, {
    "ROUTER": {
        // Router task is to route note events from an input channel to
        // destination channel. If in poly mode, any note from one or
        // multiple channels will be rerouted to available destination
        // channels. Notes from channel 0 to 9 will be routed to SGPM
        // channel numbers, from 10 to 15 to SGL numbers.
        // In mono mode, channel number stays untouched. Cutting off
        // of previous notes in this mode is also handled by this module.

        value: class {
            #availableNumbers_sgpm = [0, 1, 2, 3, 4, 5];
            #availableNumbers_sgl = [10, 11, 12, 13];

            // These have following form:
            // Input channel number: { note number: [output channel numbers] }.
            // 0: { 32: [0], 34: [1] }

            #inChannelNumbers = {};

            // These have following form:
            // Output channel number: [note number, input channel number].
            // 0: [32, 0]
            // 1: [34, 0]

            #outChannelNumbers = {};

            constructor () {
                this.output = [];

                this.APPEND_UI();

                // 

                LIB_QUICK_UI.defineReactiveUiProperty(
                    {
                        object: this,
                        key: "shouldReassignNumbers",
                        initialValue: false,
                        node: this.node_domUi_registry["shouldReassignNumbers"],
                        eventName: "change",
                        before: function (value) {
                            LIB_0.object.clear(this.#inChannelNumbers);
                            LIB_0.object.clear(this.#outChannelNumbers);

                            return value;
                        }
                    }
                );
            }

            FIND_AVAILABLE(inChannelNumber = 0) {
                const LIST = (inChannelNumber > 9) ? this.#availableNumbers_sgl : this.#availableNumbers_sgpm;
                const LENGTH = LIST.length;

                // If a number is not in the list of output numbers used,
                // it's avaiable.

                var number = -1;

                for (let i = 0; i < LENGTH; i++) {
                    number = LIST[i];

                    if (number in this.#outChannelNumbers);
                    else return number;
                }

                return number;
            }

            UNREGISTER(midiEvent, all = false) {
                const CHANNEL_NUMBERS = [];

                var inNoteNumber = midiEvent.noteNumber;
                var inChannelNumber = midiEvent.channelNumber;

                if (all) {
                    const NOTE_NUMBERS_OBJ = this.#inChannelNumbers[inChannelNumber];

                    if (NOTE_NUMBERS_OBJ != undefined) {
                        Object.values(NOTE_NUMBERS_OBJ).forEach(function (list) {
                            list.forEach(function (number) {
                                CHANNEL_NUMBERS.push(number);
                            });
                        })
                    }
                }
                else {
                    const OUT_CH_NUM_LIST = this.#inChannelNumbers[inChannelNumber][inNoteNumber];

                    OUT_CH_NUM_LIST.forEach(function (number) {
                        CHANNEL_NUMBERS.push(number);
                    });
                }

                const THAT = this;

                CHANNEL_NUMBERS.forEach(function (number) {
                    THAT.REGISTER_OFF(midiEvent, number);
                });
            }

            // Registers out an entry and creates an off event.

            REGISTER_OFF(midiEvent, outChannelNumber = 0) {
                const LIST = this.#outChannelNumbers[outChannelNumber];

                if (LIST == undefined) return null;

                // 

                const NOTE_NUMBER = LIST[0];
                const IN_CHANNEL_NUMBER = LIST[1];

                delete this.#outChannelNumbers[outChannelNumber];

                // Get a list of output channels that were used for this
                // input channel.

                const OUT_NUMBERS_LIST = this.#inChannelNumbers[IN_CHANNEL_NUMBER][NOTE_NUMBER];

                // Remove specified output number from the list.

                OUT_NUMBERS_LIST.splice(OUT_NUMBERS_LIST.indexOf(outChannelNumber), 1);

                // Delete the note key if its value is an empty list.

                if (OUT_NUMBERS_LIST.length == 0) delete this.#inChannelNumbers[IN_CHANNEL_NUMBER][NOTE_NUMBER];

                // Delete the channel key if its value is an empty object.

                if (Object.keys(this.#inChannelNumbers[IN_CHANNEL_NUMBER]).length == 0) delete this.#inChannelNumbers[IN_CHANNEL_NUMBER];

                // 

                midiEvent = LIB_0.object.deepCopy(midiEvent);

                midiEvent.channelNumber = IN_CHANNEL_NUMBER;
                midiEvent.reroutedNumber = outChannelNumber;
                midiEvent.noteNumber = NOTE_NUMBER;

                this.output.push(midiEvent);
            }

            // Registers in an entry and creates an on event.

            REGISTER_ON(midiEvent, outChannelNumber = 0) {
                var inChannelNumber = midiEvent.channelNumber;
                var noteNumber = midiEvent.noteNumber;

                this.#outChannelNumbers[outChannelNumber] = [noteNumber, inChannelNumber];

                // Try to find note entry first.

                var result = this.FIND_ENTRY(inChannelNumber, noteNumber);

                // If failed, try to find channel entry.

                if (result == null) {
                    result = this.#inChannelNumbers[inChannelNumber];

                    // If no channel entry, create one. Create list for note number anyways.

                    if (result == undefined) result = this.#inChannelNumbers[inChannelNumber] = {};

                    result = result[noteNumber] = [];
                }

                result.push(outChannelNumber);

                // 

                midiEvent = LIB_0.object.deepCopy(midiEvent);

                midiEvent.channelNumber = inChannelNumber;
                midiEvent.reroutedNumber = outChannelNumber;

                this.output.push(midiEvent);
            }

            FIND_ENTRY(inChannelNumber = 0, inNoteNumber = 0) {
                var result = this.#inChannelNumbers[inChannelNumber];

                if (result != undefined) {
                    result = result[inNoteNumber];

                    if (result != undefined) return result;
                }

                return null;
            }

            APPEND_UI() {
                this.node_domUi_registry = {};

                // 

                const HINT = "When enabled, reassings a channel number of an input message to another, not yet used.\nNOTE: When toggled, clears internal registry";

                const REASSIGN = LIB_QUICK_UI.create_domNode("shouldReassignNumbers", undefined, { type: "boolean", hint: HINT });

                this.node_domUi_registry["shouldReassignNumbers"] = REASSIGN;

                // 

                this.node_domUi = LIB_QUICK_UI.wrapInContainer_1(REASSIGN, "Router", "Router job is to handle note events and channel number reassignment, if requested. Router doesn't allow more than one note on event for the same channel to be registered at the same time, subsequent note on events cut off previous");
            }

            EXECUTE(midiEvent) {
                const IN_CHANNEL_NUMBER = midiEvent.channelNumber;

                if (midiEvent.name == "noteOff") {
                    // Off events must be created only if input note was registered before.

                    if (
                        this.FIND_ENTRY(IN_CHANNEL_NUMBER, midiEvent.noteNumber) != null
                    ) this.UNREGISTER(midiEvent);
                }
                else if (midiEvent.name == "noteOn") {
                    var outChannelNumber = 0;
                    
                    if (this.shouldReassignNumbers) {
                        outChannelNumber = this.FIND_AVAILABLE(IN_CHANNEL_NUMBER);

                        if (outChannelNumber != -1) this.REGISTER_ON(midiEvent, outChannelNumber);
                    }
                    else {
                        // Unregister and trigger off all notes which were registered
                        // for input channel.

                        this.UNREGISTER(midiEvent, true);

                        this.REGISTER_ON(midiEvent, IN_CHANNEL_NUMBER);
                    }
                }
                else {
                    const OUTPUT = this.output;

                    if (this.shouldReassignNumbers) {
                        // If there are any input entries, all other events are copied and
                        // modified according to these entries.
                        
                        const NOTE_NUMBERS_OBJ = this.#inChannelNumbers[IN_CHANNEL_NUMBER];

                        // If no input entries, let the event pass by.

                        if (NOTE_NUMBERS_OBJ == undefined) {
                            OUTPUT.push(midiEvent);

                            return;
                        };

                        let eventCopy = null;

                        Object.values(NOTE_NUMBERS_OBJ).forEach(function (channelNumbers) {
                            channelNumbers.forEach(function (number) {
                                eventCopy = LIB_0.object.deepCopy(midiEvent);

                                eventCopy.reroutedNumber = number;

                                OUTPUT.push(eventCopy);
                            });
                        });
                    } else OUTPUT.push(midiEvent);
                }
            }
        }
    },
    "PRESETS": {
        value: class {
            #pmChannels;
            #lfo;
            #preset;
            #memory_outChannelPreset = {};

            constructor (pmChannels, lfo) {
                this.#pmChannels = pmChannels;
                this.#lfo = lfo;

                this.output = [];

                this.presets = Ypsilon_Engine.DEFAULT_PRESETS;

                this.APPEND_UI();

                // 

                LIB_QUICK_UI.defineReactiveUiProperty(
                    {
                        object: this,
                        key: "shouldBeBypassed",
                        initialValue: false,
                        node: this.node_domUi_registry["shouldBeBypassed"],
                        eventName: "change"
                    }
                );

                LIB_QUICK_UI.defineReactiveUiProperty(
                    {
                        object: this,
                        key: "channelNumber",
                        initialValue: 0,
                        node: this.node_domUi_registry["channelNumber"],
                        eventName: "anychange"
                    }
                );

                LIB_QUICK_UI.defineReactiveUiProperty(
                    {
                        object: this,
                        key: "shouldCopyFrequency",
                        initialValue: false,
                        node: this.node_domUi_registry["shouldCopyFrequency"],
                        eventName: "change"
                    }
                );

                LIB_QUICK_UI.defineReactiveUiProperty(
                    {
                        object: this,
                        key: "shouldCopyModulation",
                        initialValue: false,
                        node: this.node_domUi_registry["shouldCopyModulation"],
                        eventName: "change"
                    }
                );
            }

            COPY_SETTINGS_TO_PRESET(key = "") {
                const CHANNEL = this.#pmChannels[this.channelNumber];
                const LIST = [];

                LIST.push(
                    ...Ypsilon_Engine.CREATE_INSTR_FROM_CH_SETTINGS(CHANNEL)
                )

                if (this.shouldCopyFrequency) LIST.push(
                    ...Ypsilon_Engine.CREATE_INSTR_FROM_CH_SETTINGS_FREQ(CHANNEL)
                );

                if (this.shouldCopyModulation) LIST.push(
                    ...Ypsilon_Engine.CREATE_INSTR_FROM_CH_SETTINGS_MOD(this.#lfo)
                )

                // 

                this.#preset = this.presets[key] = LIST;
            }

            SET_CURRENT_PRESET(key = "") {
                this.#preset = this.presets[key];
            }

            APPEND_UI() {
                const THIS = this;

                this.node_domUi_registry = {};

                // 

                const BYPASS = LIB_QUICK_UI.create_domNode("shouldBeBypassed", undefined, { type: "boolean" });

                this.node_domUi_registry["shouldBeBypassed"] = BYPASS;

                // 

                const SOURCE_NUMBER = LIB_QUICK_UI.create_domNode("channelNumber", undefined, { type: "number", min: 0, max: 5 });

                this.node_domUi_registry["channelNumber"] = SOURCE_NUMBER;

                // 

                const FREQ = LIB_QUICK_UI.create_domNode("shouldCopyFrequency", undefined, { type: "boolean" });

                this.node_domUi_registry["shouldCopyFrequency"] = FREQ;

                // 

                const MOD = LIB_QUICK_UI.create_domNode("shouldCopyModulation", undefined, { type: "boolean" });

                this.node_domUi_registry["shouldCopyModulation"] = MOD;

                // 

                const EDITOR = LIB_QUICK_UI.create_entryEditor( () => THIS.presets );
                EDITOR.style.flexDirection = "row";

                EDITOR.addEventListener("entrychange", (function (event) {
                    const DATA = event.detail;
        
                    switch (DATA[0]) {
                        case "select":
                            this.SET_CURRENT_PRESET( DATA[1] );
        
                            break;
                        case "update":
                        case "create":
                            this.COPY_SETTINGS_TO_PRESET( DATA[1] );
        
                            break;
                    }
                }).bind(this));

                this.node_domUi_registry["entryEditor"] = EDITOR;

                // 

                const GROUP_0 = document.createElement("div");
                GROUP_0.className = "qui-generic-group";

                GROUP_0.append(BYPASS, SOURCE_NUMBER, FREQ, MOD, EDITOR);

                // 

                this.node_domUi = LIB_QUICK_UI.wrapInContainer_1(GROUP_0, "Preset", "This module creates sequencer specific meta events with channel synthesizer instructions in JSON");
                this.node_domUi.classList.add("qui-flex-column-flow");
            }

            EXECUTE(midiEvent) {
                if (this.shouldBeBypassed) return this.output.push(midiEvent);

                // Only note events can cause the creating of new events.
                                    
                if (midiEvent.name == "noteOn" || midiEvent.name == "noteOff") {
                    const TARGET_NUMBER = (midiEvent.reroutedNumber == undefined) ? midiEvent.channelNumber : midiEvent.reroutedNumber;

                    // Check if preset at hand was NOT already applied to the channel.

                    if (this.#preset != this.#memory_outChannelPreset[TARGET_NUMBER]) {
                        // Remember preset.

                        this.#memory_outChannelPreset[TARGET_NUMBER] = this.#preset;

                        // Push preset first, then the event which triggered preset to
                        // be applied.

                        this.output.push(
                            {
                                type: "meta",
                                name: "sequencerSpecific",
                                id: 43,
                                data: JSON.stringify(this.#preset),
                                channelNumber: TARGET_NUMBER
                            }
                        );
                    }
                }

                // Always push all events to a new list.

                this.output.push(midiEvent);
            }
        }
    },
    "CONVERTER": {
        value: class {
            #frequencyTable = Ypsilon_Engine.prototype.YM2612_FREQUENCY_TABLE;
            #sgl_frequencyTable = Ypsilon_Engine.prototype.SGL_FREQUENCY_TABLE;
            #scaleVolume = Ypsilon_Engine.prototype.SCALE_VOLUME;

            #sgpm_channels = null;
            #generator = null;
            #pitch_channelList = {};
            #volume_channelList = {};
            #velocity_channelList = {};
            #sgl_keyState = {};

            #f_num_msb_block = new Array(9).fill(0);
            #f_num_lsb = new Array(9).fill(0);

            #sgl_channelsStartFrom = 10;
            #sgl_tone = new Array(3).fill(0);

            constructor(sgpm_channels, generator) {
                this.#sgpm_channels = sgpm_channels;
                this.#generator = generator;

                // 

                this.output = [];

                this.APPEND_UI();

                // 

                LIB_QUICK_UI.defineReactiveUiProperty(
                    {
                        object: this,
                        key: "shouldPmScaleVolume",
                        initialValue: false,
                        node: this.node_domUi_registry["shouldPmScaleVolume"],
                        eventName: "change"
                    }
                );

                LIB_QUICK_UI.defineReactiveUiProperty(
                    {
                        object: this,
                        key: "shouldMultiplyByVelocity",
                        initialValue: false,
                        node: this.node_domUi_registry["shouldMultiplyByVelocity"],
                        eventName: "change"
                    }
                );

                LIB_QUICK_UI.defineReactiveUiProperty(
                    {
                        object: this,
                        key: "shouldAllowClipping",
                        initialValue: false,
                        node: this.node_domUi_registry["shouldAllowClipping"],
                        eventName: "change"
                    }
                );
            }

            ADJUST_PITCH_SGPM(msb_block, lsb, amount) {
                let f_num = (msb_block << 8) + lsb;
                let block = f_num >> 11;

                f_num = f_num & 2047;

                // Adjust f. number.

                f_num = Math.round(
                    f_num * Math.pow(2, amount)
                );

                // Optimal range of f. number is probably [512, 1023].
                // You can find out why by looking at the f. number table.

                if (f_num == 0) {
                    return block << 11;
                }
                else if (f_num > 1023) {
                    f_num >>= 1;
                    block++;
                }
                else if (f_num < 512) {
                    f_num <<= 1;
                    block--;
                }

                return f_num + (block << 11);
            }

            GET_VOLUME(channelNumber) {
                // Change multiplier to "velocity factor", if requested.

                let multiplier = 1;

                if (this.#velocity_channelList[channelNumber] == null) this.#velocity_channelList[channelNumber] = 127;
                if (this.shouldMultiplyByVelocity) multiplier = this.#velocity_channelList[channelNumber] / 127;

                return (this.#volume_channelList[channelNumber] / 127) * multiplier;
            }

            GET_VOLUME_SGL(channelNumber) {
                return Math.round( (1 - this.GET_VOLUME(channelNumber)) * 15 );
            }

            ADJUST_PITCH_SGL(tone, amount) {
                // Clamp to available range.

                return Math.min(
                    1023,
                    Math.max(
                        0,
                        Math.round( tone * Math.pow(2, -amount) )
                    )
                );
            }

            APPEND_UI() {
                this.node_domUi_registry = {};

                // 

                const SCALE_VOL = LIB_QUICK_UI.create_domNode("shouldPmScaleVolume", undefined, { type: "boolean" });

                this.node_domUi_registry["shouldPmScaleVolume"] = SCALE_VOL;

                // 

                const MULTIPLY = LIB_QUICK_UI.create_domNode("shouldMultiplyByVelocity", undefined, { type: "boolean" });

                this.node_domUi_registry["shouldMultiplyByVelocity"] = MULTIPLY;

                // 

                const CLIPPING = LIB_QUICK_UI.create_domNode("shouldAllowClipping", undefined, { type: "boolean" });

                this.node_domUi_registry["shouldAllowClipping"] = CLIPPING;

                // 

                const GROUP_0 = document.createElement("div");
                GROUP_0.className = "qui-generic-group";

                GROUP_0.append(SCALE_VOL, MULTIPLY, CLIPPING);

                // 

                this.node_domUi = LIB_QUICK_UI.wrapInContainer_1(GROUP_0, "Converter", "Converts MIDI events to synthesizer instructions and handles them - sends instruction to synthesizer which executes them immediately");
                this.node_domUi.classList.add("qui-flex-column-flow");
            }

            EXECUTE(midiEvent) {
                const OUTPUT = this.output;
                const HANDLER = this.#generator.handler.bind(this.#generator);

                function send(...object) {
                    // Handling instructions in place.

                    object.forEach(HANDLER);

                    OUTPUT.push(...object);
                }

                // 

                let inputChannelNumber = midiEvent.channelNumber;
                let outputChannelNumber = (midiEvent.reroutedNumber == undefined) ? inputChannelNumber : midiEvent.reroutedNumber;
                let name = midiEvent.name;

                // First check for sequencer specific event.
                // Otherwise check whether we should handle for SGL or SGPM.

                if (name == "sequencerSpecific") {
                    // 43 is Yamaha Corporation manufacturer ID. We only
                    // care about those.

                    if (midiEvent.id == 43) {
                        let data = null;

                        try {
                            data = JSON.parse(midiEvent.data);

                            data.forEach(function (element) {
                                element.channelNumber = midiEvent.channelNumber;
    
                                send(element)
                            });
                        } catch {
                            console.warn("Bad data from sequencer specific MIDI event. Must be JSON", midiEvent.data);
                        }
                    }
                }
                else if (outputChannelNumber >= this.#sgl_channelsStartFrom) {
                    // Events for latch generator.

                    outputChannelNumber -= this.#sgl_channelsStartFrom;

                    switch (name) {
                        case "noteOn":
                        case "noteOff": {
                            let tone = 0;

                            // Save last velocity.

                            this.#velocity_channelList[inputChannelNumber] = midiEvent.velocity;

                            // Remember and send frequency events if note number was specified.

                            if (midiEvent.noteNumber != null) {
                                tone = this.#sgl_tone[outputChannelNumber] = this.#sgl_frequencyTable[midiEvent.noteNumber];

                                // Apply pitch changes.

                                if (inputChannelNumber in this.#pitch_channelList) {
                                    tone = this.ADJUST_PITCH_SGL(tone, this.#pitch_channelList[inputChannelNumber]);
                                }

                                send({
                                    name: "data-isVol",
                                    0: tone & 15,
                                    1: false,
                                    channelNumber: outputChannelNumber
                                });

                                send({
                                    name: "data",
                                    0: tone >> 4
                                });
                            }

                            // Change the volume. Regardless if note number was specified.

                            if (name == "noteOn") {
                                // Save note state.

                                this.#sgl_keyState[inputChannelNumber] = true;

                                let volume = 0;

                                // Pick saved number if exists.

                                if (inputChannelNumber in this.#volume_channelList) {
                                    volume = this.GET_VOLUME_SGL(inputChannelNumber);
                                }

                                send({
                                    name: "data-isVol",
                                    0: volume,
                                    1: true,
                                    channelNumber: outputChannelNumber
                                });
                            }
                            else {
                                this.#sgl_keyState[inputChannelNumber] = false;

                                send({
                                    name: "data-isVol",
                                    0: 15,
                                    1: true,
                                    channelNumber: outputChannelNumber
                                });
                            }
            
                            break;
                        }
                        case "controlChange":
                            if (midiEvent.controllerNumber == 7) { // Volume.
                                this.#volume_channelList[inputChannelNumber] = midiEvent.value;

                                // Create events only when key was pressed to play note.

                                if (this.#sgl_keyState[inputChannelNumber]) send({
                                    name: "data-isVol",
                                    0: this.GET_VOLUME_SGL(inputChannelNumber),
                                    1: true,
                                    channelNumber: outputChannelNumber
                                });
                            }
    
                            break;
                        case "pitchWheelChange": {
                            // Convert [0, 16384] range into [-1, 1].
                            
                            let amount = (midiEvent.amount / 8192) - 1;
    
                            // 

                            let tone = this.ADJUST_PITCH_SGL(this.#sgl_tone[outputChannelNumber], amount);
                                
                            send({
                                name: "data-isVol",
                                0: tone & 15,
                                1: false,
                                channelNumber: outputChannelNumber
                            });

                            send({
                                name: "data",
                                0: tone >> 4
                            });
    
                            // Remember the amount for channel.
    
                            this.#pitch_channelList[inputChannelNumber] = amount;
    
                            break;
                        }
                    }
                }
                else {
                    switch (name) {
                        case "noteOn":
                        case "noteOff": {
                            // Make key state event.
                            
                            const STATES = [0, 0, 0, 0];
            
                            if (name == "noteOn") Object.assign(STATES, [1, 1, 1, 1]);
            
                            send({
                                name: "keyState",
                                0: STATES,
                                channelNumber: outputChannelNumber
                            });

                            // Save last velocity.

                            this.#velocity_channelList[inputChannelNumber] = midiEvent.velocity;

                            // Adjust volume.

                            if (this.shouldPmScaleVolume && (inputChannelNumber in this.#volume_channelList)) {
                                send(
                                    ...this.#scaleVolume(
                                        this.#sgpm_channels,
                                        outputChannelNumber,
                                        this.GET_VOLUME(inputChannelNumber),
                                        this.shouldAllowClipping
                                    )
                                );
                            }
            
                            // If note number was specified, create frequency events and
                            // remember values.
                
                            if (midiEvent.noteNumber != null) {
                                let frequency = this.#frequencyTable[midiEvent.noteNumber];

                                this.#f_num_msb_block[outputChannelNumber] = frequency >> 8;
                                this.#f_num_lsb[outputChannelNumber] = frequency & 255;

                                // Apply pitch changes.

                                if (inputChannelNumber in this.#pitch_channelList) {
                                    frequency = this.ADJUST_PITCH_SGPM(
                                        this.#f_num_msb_block[outputChannelNumber],
                                        this.#f_num_lsb[outputChannelNumber],
                                        this.#pitch_channelList[inputChannelNumber]
                                    );
                                }

                                send(
                                    {
                                        name: "f_num_msb_block",
                                        0: frequency >> 8,
                                        channelNumber: outputChannelNumber
                                    },
                                    {
                                        name: "f_num_lsb",
                                        0: frequency & 255,
                                        channelNumber: outputChannelNumber
                                    }
                                );
                            }
            
                            // 
            
                            break;
                        }
                        case "controlChange":
                            if (midiEvent.controllerNumber == 10) try { // Panning.
                                const EVENT = {
                                    name: "pms-ams-r-l",
                                    0: this.#sgpm_channels[outputChannelNumber].pms,
                                    1: this.#sgpm_channels[outputChannelNumber].ams,
                                    2: true,
                                    3: true,
                                    channelNumber: outputChannelNumber
                                };

                                if (midiEvent.value < 32) EVENT[2] = false;
                                else if (midiEvent.value > 95) EVENT[3] = false;

                                send(EVENT);
                            } catch {}
                            else if (midiEvent.controllerNumber == 7) { // Volume.
                                this.#volume_channelList[inputChannelNumber] = midiEvent.value;

                                // #NOTE
                                // If you mean to change the volume that was supposed to be
                                // set by instructions that come before this one, in the same
                                // iteration, they should be handled right away.
    
                                if (this.shouldPmScaleVolume) send(
                                    ...this.#scaleVolume(
                                        this.#sgpm_channels,
                                        outputChannelNumber,
                                        this.GET_VOLUME(inputChannelNumber),
                                        this.shouldAllowClipping
                                    )
                                );
                            }
    
                            break;
                        case "pitchWheelChange": {
                            // Convert [0, 16384] range into [-1, 1].
                            
                            let amount = (midiEvent.amount / 8192) - 1;
    
                            let frequency = this.ADJUST_PITCH_SGPM(
                                this.#f_num_msb_block[outputChannelNumber],
                                this.#f_num_lsb[outputChannelNumber],
                                amount
                            );
                            
                            // 

                            send(
                                {
                                    name: "f_num_msb_block",
                                    0: frequency >> 8,
                                    channelNumber: outputChannelNumber
                                },
                                {
                                    name: "f_num_lsb",
                                    0: frequency & 255,
                                    channelNumber: outputChannelNumber
                                }
                            );
    
                            // Remember the amount for channel.
    
                            this.#pitch_channelList[inputChannelNumber] = amount;
    
                            break;
                        }
                    }
                }
            }
        }
    },
    CREATE_INSTR_FROM_CH_SETTINGS: {
        value: function (channelObject) {
            const LIST = [];
            const NAMES = LIB_MD_VGM.instructionNames;
        
            function send(object) {
                LIST.push(object);
            }
        
            channelObject.OPERATORS.forEach(function (operator, index) {
                send({
                    name: NAMES[5],
                    0: operator.PHASE_GENERATOR.detune,
                    1: operator.PHASE_GENERATOR.multiple,
                    operatorNumber: index
                });
        
                send({
                    name: NAMES[6],
                    0: operator.totalLevel,
                    operatorNumber: index
                });
        
                send({
                    name: NAMES[7],
                    0: operator.ENVELOPE_GENERATOR.attackRate,
                    1: operator.ENVELOPE_GENERATOR.keyScale,
                    operatorNumber: index
                });
        
                send({
                    name: NAMES[8],
                    0: operator.ENVELOPE_GENERATOR.decayRate,
                    1: operator.shouldEnableAm,
                    operatorNumber: index
                });
        
                send({
                    name: NAMES[9],
                    0: operator.ENVELOPE_GENERATOR.sustainRate,
                    operatorNumber: index
                });
        
                send({
                    name: NAMES[10],
                    0: operator.ENVELOPE_GENERATOR.releaseRate,
                    1: operator.ENVELOPE_GENERATOR.sustainLevel,
                    operatorNumber: index
                });
        
                send({
                    name: NAMES[11],
                    0: operator.ENVELOPE_GENERATOR.ssg_shouldHold,
                    1: operator.ENVELOPE_GENERATOR.ssg_shouldAlternate,
                    2: operator.ENVELOPE_GENERATOR.ssg_shouldAttack,
                    3: operator.ENVELOPE_GENERATOR.ssg_shouldBeEnabled,
                    operatorNumber: index
                });
            });
        
            send({
                name: NAMES[16],
                0: channelObject.algorithm,
                1: channelObject.OPERATORS[0].feedback
            });

            // #NOTE
            // L and R values always true.
        
            send({
                name: NAMES[17],
                0: channelObject.pms,
                1: channelObject.ams,
                2: true,
                3: true
            });
        
            return LIST;
        }
    },
    CREATE_INSTR_FROM_CH_SETTINGS_FREQ: {
        value: function (channelObject) {
            const LIST = [];
            const NAMES = LIB_MD_VGM.instructionNames;
        
            function send(object) {
                LIST.push(object);
            }

            // 

            if ("shouldUseSpecialMode" in channelObject) {
                send({
                    name: NAMES[1],
                    0: channelObject.shouldUseSpecialMode
                });

                send({
                    name: NAMES[12],
                    0: channelObject.f_num_msb_block[1],
                    operatorNumber: 1
                });
    
                send({
                    name: NAMES[13],
                    0: channelObject.f_num_lsb[1],
                    operatorNumber: 1
                });

                send({
                    name: NAMES[12],
                    0: channelObject.f_num_msb_block[2],
                    operatorNumber: 2
                });
    
                send({
                    name: NAMES[13],
                    0: channelObject.f_num_lsb[2],
                    operatorNumber: 2
                });

                send({
                    name: NAMES[12],
                    0: channelObject.f_num_msb_block[3],
                    operatorNumber: 3
                });
    
                send({
                    name: NAMES[13],
                    0: channelObject.f_num_lsb[3],
                    operatorNumber: 3
                });
            }

            send({
                name: NAMES[14],
                0: channelObject.f_num_msb_block[0]
            });

            send({
                name: NAMES[15],
                0: channelObject.f_num_lsb[0]
            });

            return LIST;
        }
    },
    CREATE_INSTR_FROM_CH_SETTINGS_MOD: {
        value: function (lfoObject) {
            const LIST = [];
            const NAMES = LIB_MD_VGM.instructionNames;
        
            function send(object) {
                LIST.push(object);
            }

            // 

            send({
                name: NAMES[0],
                0: lfoObject.shouldBeEnabled,
                1: lfoObject.frequency
            });

            return LIST;
        }
    }
});

Object.defineProperties(Ypsilon_Engine.prototype, {
    "YM2612_FREQUENCY_TABLE": {
        value: (function () {
            const ARRAY = new Uint16Array(128);
            const OUT_OF_REACH_OCTAVE = 8;

            function toYm2612_frequency(frequency, octave) {
                // Frequency value of the chip consists of frequency within
                // octave and octave itself separately, so we need to shape the
                // input in the same form.
                // Note, 2^20 is a resolution of phase counter, divided by
                // chip update rate.

                frequency = Math.round(
                    frequency * (Math.pow(2, 20) / 53267.041666666664) / Math.pow(2, octave - 1)
                );

                return frequency + (octave << 11);
            }

            var noteNumber = 12;
            const START = Math.trunc(noteNumber / 12) - 1;

            for (let octave = START; octave < OUT_OF_REACH_OCTAVE; octave++) {
                for (let division = 0; division < 12; division++) {
                    ARRAY[noteNumber] = toYm2612_frequency(
                        LIB_MIDI.convert_noteNumber_to_frequency(noteNumber),
                        octave
                    );

                    noteNumber++;
                }
            }

            return ARRAY;
        })()
    },
    "SGL_FREQUENCY_TABLE": {
        value: (function () {
            const ARRAY = new Uint16Array(128);
            const OUT_OF_REACH_OCTAVE = 11;

            // #NOTE
            // Octaves start from -1.
            // Shift starting point by 4 octaves.
            // Start from C3 - lowest fully available octave.

            var noteNumber = 48;
            const START = Math.trunc(noteNumber / 12) - 1;

            for (let octave = START; octave < OUT_OF_REACH_OCTAVE; octave++) {
                for (let division = 0; division < 12; division++) {
                    // Halved updated rate is the time a half of the phase
                    // takes to pass.

                    ARRAY[noteNumber] = (223721.5625 * 0.5) / LIB_MIDI.convert_noteNumber_to_frequency(noteNumber);

                    noteNumber++;
                }
            }

            return ARRAY;
        })()
    },
    "SCALE_VOLUME": {
        value: function (channelList, channelNumber, percentage = 0.5, shouldAllowClipping = false) {
            const CHANNEL_OBJ = channelList[channelNumber];

            if (CHANNEL_OBJ == undefined) return [];
        
            // Don't let to mute. Use smallest available (1 / 127).
        
            if (percentage <= 0) percentage = 0.008;
        
            // 
        
            const ALGO = CHANNEL_OBJ.ALGORITHMS[CHANNEL_OBJ.algorithm];
            const VECTOR = {};
            var overallMaximum = 0;
            var operatorMaximum = 0;
        
            // Pass through algorithm elements - find amplitude values which
            // make up the output.
        
            ALGO.forEach(function (destinations, index) {
                const TL = CHANNEL_OBJ.OPERATORS[index].totalLevel;
                
                if (destinations.indexOf(-1) != -1) {
                    var amplitude = (TL >= 127) ? 0 : LIB_0.unsorted.dB_to_amplitude(TL * -0.75);
        
                    VECTOR[index] = amplitude;
        
                    operatorMaximum = Math.max(amplitude, operatorMaximum);
                    
                    overallMaximum += amplitude;
                }
            });
        
            // 
        
            const INSTR_LIST = [];
        
            Object.keys(VECTOR).forEach(function (operatorNumber) {
                var result;
                var amplitude = VECTOR[operatorNumber];
        
                if (amplitude <= 0.0000173) result = 127;
                else {
                    // If clipping is not allowed, normalize by overall volume,
                    // otherwise by loudest of them.
        
                    if (!shouldAllowClipping) amplitude /= overallMaximum;
                    else amplitude /= operatorMaximum;
        
                    result = LIB_0.unsorted.amplitude_to_dB(amplitude * percentage) / -0.75;
                    result = Math.round(result);
                }
        
                // 
        
                INSTR_LIST.push({
                    name: "totalLevel",
                    0: result,
                    operatorNumber: operatorNumber,
                    channelNumber: channelNumber
                });
            });

            return INSTR_LIST;
        }
    }
});