const LIB_MIDI = {
    convert_noteNumber_to_noteName(noteNumber = 0) {
        const LETTERS = [
            "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"
        ];
    
        const OCTAVE = Math.trunc(noteNumber / 12) - 1;
        const NUMBER = noteNumber % 12;
    
        return LETTERS[NUMBER] + OCTAVE;
    },
    convert_noteName_to_noteNumber(noteName = "") {
        const LETTERS = [
            "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"
        ];

        const WHOLE_MATCH = noteName.match(/\w#?-?\d/);
    
        if (WHOLE_MATCH != null) {
            const NUMBER_MATCH = WHOLE_MATCH[0].match(/-?\d/);

            const OCTAVE = new Number( NUMBER_MATCH[0] );
            const NUMBER = LETTERS.indexOf( noteName.substring(0, NUMBER_MATCH.index) );

            if (NUMBER != -1) return NUMBER + ( 12 * (OCTAVE + 1) );
        }
        
        return 0;
    },
    convert_noteNumber_to_frequency(number = 0) {
        return Math.pow(2, (number - 69) / 12) * 440;
    },
    convert_frequency_to_noteNumber(frequency = 0.0) {
        return 69 + 12 * Math.log2(frequency / 440);
    },
    Parser_Bytes: class {
        constructor (reader) {
            this.runningStatus = 0;
            this.reader = reader;
        }
    
        EXECUTE() {
            var reader = this.reader;
    
            const EVENT_BYTE = reader.read_int8();
            const INTERNAL_EVENT = {};
            
            // #NOTE
            // About the "running status".
            // System real-time messages have no effect on running status.
            // System common messages clear the running status and can not
            // have that implemented, probably because the structure of
            // messages differs from those which have.
            // Only channel voice messages can use running status.
        
            if ((EVENT_BYTE & 0xF8) == 0xF8) {
                // "System Real-Time Messages".
        
                switch (EVENT_BYTE) {
                    case 0xFF:
                        // #NOTE
                        // Meta event always consists of its name, length and data.
                        
                        let name = reader.read_int8();
                        let length = reader.read_intVar_be();
                        
                        INTERNAL_EVENT.type = 'meta';
                        
                        switch (name) {
                            case 0x03:
                                INTERNAL_EVENT.name = 'trackName';
                                INTERNAL_EVENT.text = reader.read_iso_8859_1(length);
                                
                                break;
                            case 0x2F:
                                INTERNAL_EVENT.name = 'endOfTrack';
                                
                                if (length != 0) ; // ?
        
                                break;
                            case 0x51:
                                INTERNAL_EVENT.name = 'setTempo';
        
                                if (length != 3)
                                    throw "Expected length for \"Set Tempo\" event is 3, got " + length;
        
                                INTERNAL_EVENT.microsecondsPerBeat =
                                      (reader.read_int8() << 16)
                                    + (reader.read_int8() << 8)
                                    +  reader.read_int8();
        
                                break;
                            case 0x58:
                                INTERNAL_EVENT.name = 'timeSignature';
        
                                if (length != 4)
                                    throw "Expected length for \"Time Signature\" event is 4, got " + length;
        
                                INTERNAL_EVENT.numerator = reader.read_int8();
                                INTERNAL_EVENT.denominator = Math.pow(2, reader.read_int8());
                                INTERNAL_EVENT.metronome = reader.read_int8();
                                INTERNAL_EVENT.thirtyseconds = reader.read_int8();
        
                                break;
                            case 0x7F:
                                INTERNAL_EVENT.name = 'sequencerSpecific';
                                INTERNAL_EVENT.id = reader.read_int8();
    
                                length -= 1;
    
                                if (INTERNAL_EVENT.id == 0) {
                                    INTERNAL_EVENT.id += reader.read_int8() + reader.read_int8();
    
                                    length -= 2;
                                }
    
                                INTERNAL_EVENT.data = reader.read_iso_8859_1(length);
        
                                break;
                            default:
                                INTERNAL_EVENT.name = name;
                                INTERNAL_EVENT.data = reader.read_iso_8859_1(length);
        
                                console.warn("Encountered an unrecognized meta event", INTERNAL_EVENT);
        
                                break;
                        }
        
                        break;
                    default:
                        // It seems like all messages of this type,
                        // except "Reset", are single byte without any
                        // following data bytes.
        
                        INTERNAL_EVENT.type = 'sysRealTime';
                        INTERNAL_EVENT.name = "unknown";
        
                        break;
                }
            }
            else
            if ((EVENT_BYTE & 0xF0) == 0xF0) {
                // "System Common Messages".
                
                INTERNAL_EVENT.type = 'sysCommon';
    
                // Clear running status memory.
    
                this.runningStatus = 0;
        
                switch (EVENT_BYTE) {
                    case 0xF0:
                        INTERNAL_EVENT.name = 'sysEx';
                        INTERNAL_EVENT.data = reader.read_iso_8859_1(
                            reader.read_intVar_be()
                        );
        
                        break;
                    case 0xF7:
                        INTERNAL_EVENT.name = 'endOfEx';
                        INTERNAL_EVENT.data = reader.read_iso_8859_1(
                            reader.read_intVar_be()
                        );
        
                        break;
                    default:
                        // #NOTE
                        // Unknown or undefined events do not have
                        // a following bytes of information.
                        
                        INTERNAL_EVENT.name = 'unknown';
        
                        break;
                }
            }
            else
            {
                // "Channel Voice Messages".
    
                let status, data;
    
                function getData() {
                    return (data == null) ? reader.read_int8() : data;
                }
    
                if (EVENT_BYTE & 0x80) status = this.runningStatus = EVENT_BYTE;
                else {
                    if (this.runningStatus != 0) status = this.runningStatus;
                    data = EVENT_BYTE;
                }
                
                INTERNAL_EVENT.type = 'channel';
    
                if (status != null) {
                    INTERNAL_EVENT.channelNumber = status & 0x0F;
    
                    switch (status >> 4) {
                        case 0x8:
                            INTERNAL_EVENT.name = "noteOff";
                            INTERNAL_EVENT.noteNumber = getData();
                            INTERNAL_EVENT.velocity = reader.read_int8();
        
                            break;
                        case 0x9:
                            INTERNAL_EVENT.name = "noteOn";
                            INTERNAL_EVENT.noteNumber = getData();
                            INTERNAL_EVENT.velocity = reader.read_int8();
        
                            break;
                        case 0xB:
                            INTERNAL_EVENT.name = "controlChange";
                            INTERNAL_EVENT.controllerNumber = getData();
                            INTERNAL_EVENT.value = reader.read_int8();
        
                            break;
                        case 0xC:
                            INTERNAL_EVENT.name = "programChange";
                            INTERNAL_EVENT.programNumber = getData();
        
                            break;
                        case 0xE:
                            INTERNAL_EVENT.name = "pitchWheelChange";
        
                            // 0x2000 or 8192 is "no change" value.
        
                            INTERNAL_EVENT.amount = (getData() & 127) + ((reader.read_int8() & 127) << 7);
        
                            break;
                        default:
                            INTERNAL_EVENT.name = status;
                            
                            console.warn("Encountered status byte, which is not recognized by this script", INTERNAL_EVENT);
        
                            break;
                    }
                }
                else {
                    INTERNAL_EVENT.name = "trailingData";
                    INTERNAL_EVENT.data = EVENT_BYTE;
        
                    console.warn("Encountered data byte. Preceding status byte might have not been recognized, or stream is corrupted", INTERNAL_EVENT);
                }
            }
            
            if (INTERNAL_EVENT.name != undefined)
                return INTERNAL_EVENT;
            else
                return false;
        }
    },
    parse_trackBytes(reader, parser) {
        return {
            deltaTime: reader.read_intVar_be(),
            midiEvent: parser.EXECUTE()
        };
    },
    parse_bytes(reader) {
        const CHUNKS = [];
    
        // First chunk is header.
    
        const CHUNK_HEAD = reader.read_chunk();
    
        if (CHUNK_HEAD.id != "MThd" || CHUNK_HEAD.length != 6) throw "Header chunk wasn't recognized at expected location in file";
    
        CHUNK_HEAD.data = {
            format: reader.read_int16_be(),
            numberOfTracks: reader.read_int16_be(),
            ticksPerBeat: reader.read_int16_be()
        }
    
        if (CHUNK_HEAD.data.ticksPerBeat & 0x8000) throw "SMPTE time division format is not supported";
    
        CHUNKS.push(CHUNK_HEAD);
    
        // Then track chunks follow.
    
        const NUMBER_OF_TRACKS = CHUNK_HEAD.data.numberOfTracks;
    
        var chunk = null;
        var eventParser = null;
    
        for (let i = 0; i < NUMBER_OF_TRACKS; i++) {
            chunk = reader.read_chunk(false, true); // Zooming in to make new view.
    
            if (chunk.id != "MTrk") {
                console.warn("Encountered an unknown \"" + chunk.id + "\" chunk while looking for track chunks. The chunk was skipped");
                reader.position += chunk.length;
            }
            else {
                eventParser = new this.Parser_Bytes(reader);
                chunk.data = [];
    
                while (!reader.isEof()) chunk.data.push(
                    this.parse_trackBytes(reader, eventParser)
                );
            }
    
            reader.zoomOut();
    
            CHUNKS.push(chunk);
        }
    
        return CHUNKS;
    },
    convert_track_to_sequence(midiTrack) {
        const SEQUENCE = [[], []];
    
        midiTrack.forEach(function (midiTrackEvent) {
            SEQUENCE[0].push(midiTrackEvent.deltaTime);
            SEQUENCE[1].push(midiTrackEvent.midiEvent);
        });
    
        return SEQUENCE;
    },
    convert_sequenceList_to_sequence(list = []) {
        const TIMESTAMPS = {};
        var tickTime = 0;

        // First we pass through each sequence and writing events
        // to an object with absolute timing, calculating it from
        // delta times.
    
        list.forEach(function (sequence) {
            tickTime = 0;
    
            sequence[0].forEach(function (deltaTime, index) {
                tickTime += deltaTime;
    
                // If following timestamp already exists, that
                // means a list of events for this timestamp is already
                // created, add to the list.
                // Otherwise create new.

                if ( !(tickTime in TIMESTAMPS) ) TIMESTAMPS[tickTime] = [];

                TIMESTAMPS[tickTime].push( sequence[1][index] );
            });
        });

        // Now we need to convert absolute timing back to delta times.
    
        const DELTA_TIME = [];
        const EVENTS = [];
        var lastTickTime = 0;

        Object.keys(TIMESTAMPS).forEach(function (tickTime) {
            // For each event tied to that absolute time.

            TIMESTAMPS[tickTime].forEach(function (event) {
                DELTA_TIME.push(tickTime - lastTickTime);
                EVENTS.push(event);

                lastTickTime = tickTime;
            });
        });

        return [DELTA_TIME, EVENTS];
    },
    convert_zeroVelocityNotes_to_noteOffs(sequence) {
        sequence[1].forEach(function (event) {
            if (
                (event.name == "noteOn") &&
                (event.velocity == 0)
            )
                event.name = "noteOff";
        });
    },
    convert_fileData_to_sequence(parsedObject) {
        // File data differs from just data in that it has tracks
        // and other timing information.

        const THIS = this;
        const TICKS_PER_BEAT = parsedObject[0].data.ticksPerBeat;
    
        function setTickTime(microsecondsPerBeat = 500000) {
            tickTimeMicroseconds = (microsecondsPerBeat / TICKS_PER_BEAT);
        }
    
        var tickTimeMicroseconds = 0;
    
        setTickTime();
    
        // 
    
        const SEQUENCE_LIST = (function () {
            const LIST = [];
    
            parsedObject.shift();
            
            parsedObject.forEach(function (trackChunkObject) {
                LIST.push(
                    THIS.convert_track_to_sequence(trackChunkObject.data)
                );
            });
    
            return LIST;
        })();
    
        const SEQUENCE = this.convert_sequenceList_to_sequence(SEQUENCE_LIST);
    
        // Convert from ticks to microseconds. Pass through events
        // and search for tempo change events first, and then modify
        // delta time.
    
        SEQUENCE[1].forEach(function (event, index) {
            if (event.name == "setTempo") setTickTime(event.microsecondsPerBeat);
    
            SEQUENCE[0][index] *= tickTimeMicroseconds;
        });
    
        // 
    
        this.convert_zeroVelocityNotes_to_noteOffs(SEQUENCE);
    
        return SEQUENCE;
    }
}