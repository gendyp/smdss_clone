// #NOTE
// Project uses "shellMessage" method as "console.warn" so you can redefine it
// to something else, in this case, to messages shown to user in UI.

// LIB_MD_VGM.convert_sequence_to_fileData(player.sequence).downloader()
// LIB_MD_VGM.convert_sequence_to_fileData( player.CONVERT_SEQUENCE(player.sequence, player.handler) ).downloader()

document.documentElement.classList.add("qui-style-dimglow");

var context_audio = null;
var desiredSampleRate = undefined;
var bufferSize = 1024;
var numberOfChannels = 2;

var shouldLookUpToUpdate = false;
var shouldDisableAnalyzer = false;

var engine = null;
var generator = null;
var bufferingHandler = null;
var node_filter = null;
var node_audio_postGain = null;
var analyzer = null;
var pianoKeyboard = null;
var player = null;
var storageLoader = null;
var magnifier = null;
var waBlueprint = null;

var node_domUi_utilities = null;

const LEFT_PANEL = document.createElement("div");
LEFT_PANEL.className = "qui-side-panel";

// #NOTE
// Audio cannot be activated when page is loaded. User must activate
// it explicitly.

function constructor() {
    // window.node_domUi_registry = {};
    // window.hint_registry = {};

    if (!context_audio) {
        context_audio = new AudioContext({
            sampleRate: desiredSampleRate
        });

        // 

        generator = new Ypsilon(context_audio.sampleRate);

        engine = new Ypsilon_Engine(generator);

        // #NOTE
        // Filter is important for recreating the shape of the wave when
        // imitating DAC issue. Without it there will be a phase shift,
        // like DC offset, but not quite, I guess. Filter eliminates that.

        node_filter = context_audio.createBiquadFilter();
        node_filter.type = "highpass";
        node_filter.frequency.value = 20;

        node_audio_postGain = context_audio.createGain();
        node_audio_postGain.gain.value = 1;

        analyzer = new AudioAnalyzer(context_audio, bufferSize);

        // 
        
        player = new EventSequencePlayer;
        player.rate = 1000000 / context_audio.sampleRate;

        extendPlayer(player.node_domUi);

        // 

        bufferingHandler = new BufferingHandler(context_audio, numberOfChannels, bufferSize, generator.OUTPUT);
        bufferingHandler.LISTENERS.push(
            () => generator.EXECUTE(),
            () => player.EXECUTE()
        );
        bufferingHandler.EXECUTE();

        // bufferingHandler.node_audio_destination.connect(node_filter).connect(analyzer.node_audio).connect(node_audio_postGain).connect(context_audio.destination);

        pianoKeyboard = new VirtualPianoKeyboard;

        pianoKeyboard.addEventListener("generatemidi", function (customEvent) {
            engine.HANDLE_MIDI(customEvent.detail);
        });

        // This will send volume, pitch and pan data to engine.

        pianoKeyboard.channelNumber += 0;

        // 

        storageLoader = new StorageLoader(
            "34#MV9AV",
            [
                [ analyzer, ["isFrequencyDomain"] ],
                [ engine.presetModule, ["presets"] ],
                [ pianoKeyboard, ["channelNumber", "noteNumberAddend", "numberOfOctaves", "volume"] ]
            ]
        );

        addEventListener("visibilitychange", function () {
            storageLoader.save();

            shellMessage("💾 Property values saved");
        });
        
        storageLoader.load();

        shellMessage("👩‍💻 Property values loaded");

        // 

        construct_utilities();
        construct_contextMenu();
        animationFrameCode();

        // 

        LEFT_PANEL.append(
            analyzer.node_domUi,
            pianoKeyboard,
            player.node_domUi,
            engine.node_domUi,
            node_domUi_utilities
        );

        document.body.append(
            LEFT_PANEL,
            generator.node_domUi
        );

        // 

        magnifier = new class {
            #body = document.body;

            #bodyContainer = document.createElement("div");
            #magnifierContainer = document.createElement("div");

            #placeholderNode = document.createElement("div");
            #capturedNode = null;
        
            constructor() {
                // Magnifier makes selected generic block a main element in
                // the document, by "replacing" the body with it. That also may improve
                // performance, because all the tree doesn't need to be drawn/updated.

                this.#bodyContainer.classList.add("magnifier-body");

                this.#bodyContainer.append(
                    ...this.#body.childNodes
                );

                this.#body.append(this.#bodyContainer);

                // 

                this.#magnifierContainer.classList.add("magnifier");

                // 
        
                this.target = null;
        
                this.magnify = function () {
                    if (!this.isInUse) {
                        if (this.target == null) {
                            shellMessage("Invalid target");
                            return;
                        }

                        // Capture node and swap for placholder.

                        this.#capturedNode = this.target;

                        if (this.#capturedNode.parentNode != null) this.#capturedNode.replaceWith(this.#placeholderNode);

                        // 

                        this.#magnifierContainer.append(this.#capturedNode);
                        this.#bodyContainer.replaceWith(this.#magnifierContainer);
                    } else {
                        if (this.#placeholderNode.parentNode != null) this.#placeholderNode.replaceWith(this.#capturedNode);
                        else this.#capturedNode.remove();

                        // 

                        this.#magnifierContainer.replaceWith(this.#bodyContainer);
                        this.#capturedNode = null;
                    }
                }
            }
        
            get isInUse() {
                return this.#capturedNode != null;
            }
        };

        // Blueprint stuff.

        waBlueprint = new WaBlueprint;

        waBlueprint.referenceEntries = {
            "Buffering Handler": bufferingHandler.node_audio_destination,
            "Filter": node_filter,
            "Analyzer": analyzer.node_audio,
            "Post Gain": node_audio_postGain,
            "Audio Device": context_audio.destination
        };

        waBlueprint.nodeConnectionMethod = function (output, input) {
            try {
                output.connect(input);
                return true;
            }
            catch {
                shellMessage("Failed to connect audio nodes");
                return false;
            };
        };

        waBlueprint.nodeDisconnectionMethod = function (output, input) {
            try {
                output.disconnect(input);
                return true;
            }
            catch {
                shellMessage("Failed to disconnect audio nodes");
                return false;
            };
        };

        waBlueprint.loadProject();
    }
}

function construct_utilities() {
    node_domUi_utilities = LIB_QUICK_UI.create_genericBlock("Utilities");

    const LOG_STATE = LIB_QUICK_UI.create_buttonWithStates(
        [
            [
                "Start logging",
                function () {
                    bufferingHandler.shouldEnableLogging = true;
                    return 1;
                }
            ],
            [
                "Stop logging",
                function () {
                    bufferingHandler.shouldEnableLogging = false;
                    return 0;
                }
            ]
        ],
        "Logs buffering handler's output. Press to start, then press again to stop"
    );

    const LOG_DOWNLOAD = LIB_QUICK_UI.create_button(
        "Download",
        function () {
            if (bufferingHandler.logData == null) {
                shellMessage("🤔 Failed to complete. Log data location is corrupted");

                return;
            }

            if (bufferingHandler.logData.length == 0) {
                shellMessage("🙁 Failed to complete. No log data available");

                return;
            }

            makeWavFile(bufferingHandler.logData, "Ypsilon_Log_Render");
        },
        "Make a \".wav\" file from a last logged data and download"
    );

    const GROUP_0 = document.createElement("div");
    GROUP_0.className = "qui-generic-group";

    GROUP_0.append(LOG_STATE, LOG_DOWNLOAD);

    // 

    const SEQ_RENDER = LIB_QUICK_UI.create_button(
        "Render sequence",
        function () {
            if (player.duration <= 0) {
                shellMessage("🙁 Failed to complete. Length of sequence is 0 (no sequence)");

                return;
            }

            const SAMPLES = [];
            const GENERATOR_OUTPUT = generator.OUTPUT;

            // Remember values at the start of operation.

            const MEMORY_WRAP = player.shouldRepeat;
            const MEMORY_PRECISION = player.shouldBePrecise;
            
            // Force no repeat and high precision. Set in playing state.

            player.shouldBePrecise = true;
            player.shouldRepeat = false;
            player.shouldBePlaying = true;
            

            // #TODO
            // How all of that works? I need to make a pipeline diagram or something, because it's all confusing.
            // I mean, event player sends events, how they are handled - seems like state first set, then
            // new output genereated by calling function... so on.

            while (player.EXECUTE()) {
                generator.EXECUTE();

                SAMPLES.push(
                    GENERATOR_OUTPUT[0], GENERATOR_OUTPUT[1]
                );
            }

            // Set back to what it was before.

            player.shouldBePrecise = MEMORY_PRECISION;
            player.shouldRepeat = MEMORY_WRAP;

            // 

            makeWavFile(SAMPLES, "Ypsilon_Sequence_Render");
        },
        "Renders currently set sequence in Sequence Player to a WAV file.\nRepeat is forced off. Player is quickly playing sequence as usual until it stops"
    );

    // 

    node_domUi_utilities.append(GROUP_0, SEQ_RENDER);
}

function animationFrameCode() {
    try {
        if (!shouldLookUpToUpdate) LIB_QUICK_UI.updateRegisteredComponents();
    
        if (!shouldDisableAnalyzer) {
            analyzer.EXECUTE();
        }
    }
    catch {
        console.warn("Animation frame code has an error");
    }

    requestAnimationFrame(animationFrameCode);
}

function extendPlayer(playerDomNode) {
    const CONTAINER = document.createElement("div");
    CONTAINER.className = "qui-generic-group";

    // 

    function sendSequence(sequence) {
        player.SET_SEQUENCE(
            sequence,
            function (instruction) {
                // Handlers should return list of events, modified or
                // at least original, if it only "consumes" them, like in this case.

                generator.handler(instruction);

                return [instruction];
            }
        );
    }

    function sendSequence_midi(sequence) {
        player.SET_SEQUENCE(
            sequence,
            function (event) {
                return engine.HANDLE_MIDI(event);
            }
        );
    }

    const VGM = LIB_QUICK_UI.create_fileSelector(".vgm, .vgz", "Upload VGM/VGZ file", function (file) {
        file.arrayBuffer().then(function (arrayBuffer) {
            // Check if we have VGZ file here.

            (function () {
                var arrayIn = new Uint8Array(arrayBuffer);
                var arrayOut = arrayIn;
                
                if (arrayIn[0] == 0x1F && arrayIn[1] == 0x8B) arrayOut = new Zlib.Gunzip(arrayIn).decompress();

                arrayBuffer = arrayOut.buffer;
            })();

            var sequenceData;

            try {
                sequenceData = LIB_MD_VGM.convert_fileData_to_sequenceData(
                    LIB_MD_VGM.parse_bytes(
                        new Bytestream_Reader(arrayBuffer)
                    )
                );

                sendSequence(sequenceData.sequence);

                player.loopStart = (sequenceData.loopStart == null) ? 0 : sequenceData.loopStart;
            }
            catch {
                shellMessage("🤔 Failed to parse \"Video Game Music\" file");
            }
        });
    });

    const WAV = LIB_QUICK_UI.create_fileSelector(".wav, .wave", "Upload WAV file", function (file) {
        file.arrayBuffer().then(function (arrayBuffer) {
            var sequence;
            
            try {
                sequence = LIB_WAV.convert_fileData_to_MdsiSequence(
                    LIB_WAV.parse_bytes(
                        new Bytestream_Reader(arrayBuffer)
                    )
                );

                sendSequence(sequence);
            }
            catch {
                shellMessage("🤔 Failed to parse \"WAVE\" file");
            } 
        });
    });
    
    const MIDI = LIB_QUICK_UI.create_fileSelector(".mid, .midi", "Upload MIDI file", function (file) {
        file.arrayBuffer().then(function (arrayBuffer) {
            var sequence;

            try {
                sequence = LIB_MIDI.convert_fileData_to_sequence(
                    LIB_MIDI.parse_bytes(
                        new Bytestream_Reader(arrayBuffer)
                    )
                );

                sendSequence_midi(sequence);
            }
            catch {
                shellMessage("🤔 Failed to parse \"MIDI\" file");
            }
        });
    });

    CONTAINER.append(VGM, WAV, MIDI);

    playerDomNode.append(CONTAINER);
}

function construct_contextMenu() {
    addEventListener("contextmenu", function (event) {
        if (magnifier.isInUse) return;

        // 

        const BRANCH = document.elementsFromPoint(event.pageX, event.pageY);
        const LENGTH = BRANCH.length;
    
        // 
    
        var node = null;
    
        for (let i = 0; i < LENGTH; i++) {
            node = BRANCH[i];
    
            if ( node.classList.contains("qui-generic-block-body") ) {
                magnifier.target = node;
    
                return;
            }
        }

        magnifier.target = null;
    });

    // 

    function toggleUiUpdateState() {
        if (shouldLookUpToUpdate) {
            shouldLookUpToUpdate = false;
            LIB_QUICK_UI.create_dialog("✔️ UI is up to date and updating\n😣 UI components will now lookup the value from associated object to update their state");
        } else {
            shouldLookUpToUpdate = true;
            LIB_QUICK_UI.create_dialog("❌ UI is out of date\n😌 UI components will no longer update their state using property lookups");
        }
    }

    const OPTION_LIST = LIB_QUICK_UI.create_optionList_immediate(
        function () {
            return {
                "🔎 Magnify block/Cancel": () => magnifier.magnify(),
                // "👁️ Hide block": broken,
                // "👁️ Unhide hidden blocks": () => {},
                "Toggle UI lookups 💥60%": toggleUiUpdateState,
                "Toggle analyzer updates 💥20%": () => shouldDisableAnalyzer = !shouldDisableAnalyzer,
                "🧭 Magnify Web Audio Blueprint/Cancel": function () {
                    magnifier.target = waBlueprint.viewport;
                    magnifier.magnify();
                }
            }
        }
    );

    LIB_QUICK_UI.make_floatingBlock(
        {
            blockContent: OPTION_LIST,
            openName: "contextmenu"
        }
    );
}

function makeWavFile(samples = [], fileName = "") {
    function convertToInt16Value(sampleValue) {
        if (sampleValue < 0) sampleValue *= 32768;
        else sampleValue *= 32767;

        if (sampleValue > 32767) sampleValue = 32767;
        else if (sampleValue < -32768) sampleValue = -32768;

        return sampleValue;
    }

    samples.forEach(function (sample, index) {
        samples[index] = convertToInt16Value(sample);
    })

    LIB_0.file.download(
        new Blob(
            [
                LIB_WAV.convert_fileData_to_bytes(
                    new Uint8Array( new Int16Array(samples).buffer ),
                    16,
                    context_audio.sampleRate
                )
            ],
            {
                type: 'application/octet-stream'
            }
        ),
        fileName + "_" + LIB_0.unsorted.getSimpleNow() + ".wav"
    );
}

// #NOTE
// This is to prevent browser's default action on files you may drop into
// browser window.

addEventListener("dragover", function (event) {
    event.preventDefault();

    if ( event.target.classList.contains("qui-dropzone") ) {
        event.target.classList.add("qui-valid-drop-target");
    }
});

addEventListener("dragleave", function (event) {
    event.target.classList.remove("qui-valid-drop-target");
});

addEventListener("drop", function (event) {
    event.target.classList.remove("qui-valid-drop-target");
    event.preventDefault();
});

// #NOTE
// I don't know where to put this.

class StorageLoader {
    #id = null;

    constructor(id = "", map = []) {
        /* Input map must have following format:
        
        [
            [ object, [key, key_1, key_2] ],
            [ object, [key] ],
        ]

        */

        this.#id = id;

        this.map = new Map(map);
    }

    load() {
        var result = localStorage.getItem(this.#id);

        if (result != undefined) {
            try {
                result = JSON.parse(result);

                let index = 0;

                for (const ENTRY of this.map) {
                    ENTRY[1].forEach(function (key) {
                        ENTRY[0][key] = result[index];

                        index++;
                    })
                }
            } catch {
                localStorage.removeItem(this.#id);
                console.warn("Bad local storage entry");
            }
        }
    }

    save() {
        var saveObject = [];

        for (const ENTRY of this.map) {
            // #NOTE
            // Go through list of keys.
            // Simply write all values without any grouping. But they should be
            // read in the same way they were written.
            // This method makes it hard to modify saved data,
            // so it's expected data will be fully loaded/saved each time.

            ENTRY[1].forEach(function (key) {
                saveObject.push( ENTRY[0][key] );
            })
        }

        localStorage.setItem( this.#id, JSON.stringify(saveObject) );
    }
}

// 

LIB_QUICK_UI.create_dialog(
    "Press to build audio elements and activate audio",
    undefined,
    constructor
);