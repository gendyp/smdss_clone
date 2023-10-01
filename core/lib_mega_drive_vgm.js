const LIB_MD_VGM = {
    instructionNames: {
        0: "isLfoEnabled-lfoFrequency",
        1: "channel_2_mode",
        2: "keyState",
        3: "pcmData",
        4: "shouldEnablePcmMode",
        5: "detune-multiple",
        6: "totalLevel",
        7: "attackRate-keyScale",
        8: "decayRate-shouldEnableAm",
        9: "sustainRate",
        10: "releaseRate-sustainLevel",
        11: "ssg_shouldHold-alternate-attack-enabled",
        12: "f_num_msb_block_special",
        13: "f_num_lsb_special",
        14: "f_num_msb_block",
        15: "f_num_lsb",
        16: "algorithm-feedback",
        17: "pms-ams-r-l",
        18: "data-isVol",
        19: "data"
    },
    parse_ym2612_bytes(port = 0, addressByte = 0, dataByte = 0) {
        const NAMES = this.instructionNames;
        var output = {};
    
        function eventsAction(event) {
            output = event;
        }
    
        // These are at port 0 only.
    
        function general(addressByte, dataByte) {
            switch (addressByte) {
                case 0x21: // Test.
                    break;
                case 0x22:
                    eventsAction(
                        {
                            name: NAMES[0],
                            0: !!(
                                (dataByte >> 3) & 1
                            ),
                            1: dataByte & 7
                        }
                    );
    
                    break;
                case 0x24: // Timer A LSB.
                    break;
                case 0x25: // Timer A MSB.
                    break;
                case 0x26: // Timer B.
                    break;
                case 0x27:
                    // Note that we only need to know if mode is
                    // active, type of mode doesn't matter.
    
                    eventsAction(
                        {
                            name: NAMES[1],
                            0: !!(
                                (dataByte >> 6) != 0
                            )
                        }
                    );
                    
                    break;
                case 0x28: { // Key on/off.
                    let channel_a = (dataByte >> 2) & 1;
                    let channel_b = dataByte & 3;
                    let channelNumber = 0;
                    let states = [
                        !!(
                            (dataByte >> 4) & 1
                        ),
                        !!(
                            (dataByte >> 5) & 1
                        ),
                        !!(
                            (dataByte >> 6) & 1
                        ),
                        !!(
                            (dataByte >> 7) & 1
                        )
                    ];
    
                    if (channel_b == 3) break;
    
                    if (channel_a) channelNumber = 3;
    
                    channelNumber += channel_b;
    
                    // 
    
                    eventsAction(
                        {
                            name: NAMES[2],
                            0: states,
                            channelNumber: channelNumber
                        }
                    );
    
                    break;
                }
                case 0x2A:
                    eventsAction(
                        {
                            name: NAMES[3],
                            0: dataByte
                        }
                    );
    
                    break;
                case 0x2B:
                    eventsAction(
                        {
                            name: NAMES[4],
                            0: !!(dataByte >> 7)
                        }
                    );
    
                    break;
            }
        }
    
        function channel_operator(addressByte, dataByte, row) {
            switch (addressByte >> 4) {
                case 3:
                    eventsAction(
                        {
                            name: NAMES[5],
                            0: (dataByte >> 4) & 7,
                            1: dataByte & 15
                        }
                    );
    
                    break;
                case 4:
                    eventsAction(
                        {
                            name: NAMES[6],
                            0: dataByte & 127
                        }
                    );
    
                    break;
                case 5:
                    eventsAction(
                        {
                            name: NAMES[7],
                            0: dataByte & 31,
                            1: (dataByte >> 6) & 3
                        }
                    );
    
                    break;
                case 6:
                    eventsAction(
                        {
                            name: NAMES[8],
                            0: dataByte & 31,
                            1: !!(
                                dataByte >> 7
                            )
                        }
                    );
    
                    break;
                case 7:
                    eventsAction(
                        {
                            name: NAMES[9],
                            0: dataByte & 31
                        }
                    );
    
                    break;
                case 8:
                    eventsAction(
                        {
                            name: NAMES[10],
                            0: dataByte & 15,
                            1: dataByte >> 4
                        }
                    );
    
                    break;
                case 9:
                    eventsAction(
                        {
                            name: NAMES[11],
                            0: !!(dataByte & 1),
                            1: !!((dataByte >> 1) & 1),
                            2: !!((dataByte >> 2) & 1),
                            3: !!((dataByte >> 3) & 1)
                        }
                    );
    
                    break;
                case 0xA:
                    switch (row) {
                        case 3:
                            eventsAction(
                                {
                                    name: NAMES[12],
                                    0: dataByte & 63
                                }
                            );
    
                            break;
                        case 2:
                            eventsAction(
                                {
                                    name: NAMES[13],
                                    0: dataByte
                                }
                            );
                            
                            break;
                        case 1:
                            eventsAction(
                                {
                                    name: NAMES[14],
                                    0: dataByte & 63
                                }
                            );
    
                            break;
                        case 0:
                            eventsAction(
                                {
                                    name: NAMES[15],
                                    0: dataByte
                                }
                            );
    
                            break;
                    }
        
                    break;
                case 0xB:
                    switch (row) {
                        case 0:
                            eventsAction(
                                {
                                    name: NAMES[16],
                                    0: dataByte & 7,
                                    1: (dataByte >> 3) & 7
                                }
                            );
    
                            break;
                        case 1:
                            eventsAction(
                                {
                                    name: NAMES[17],
                                    0: dataByte & 7,
                                    1: (dataByte >> 4) & 3,
                                    2: !!((dataByte >> 6) & 1),
                                    3: !!(dataByte >> 7)
                                }
                            );
    
                            break;
                    }
        
                    break;
            }
        }
    
        function getResult() {
            // Check the bounds.
    
            if (
                (port < 0) || (port > 1) || (addressByte < 0x21) || (addressByte > 0xB6)
            ) return;
    
            //
    
            if (
                (port == 0) && (addressByte > 0x20) && (addressByte < 0x2C)
            ) general(addressByte, dataByte);
            else {
                // Ranges [0x30, 0x9F] and [0xA8, 0xAE] are channel AND operator
                // specific locations. These locations are sub divided into chunks -
                // 4 channels per parameter, (detune/multiple, totalLevel, etc.) and
                // 4 operators per channel.
                //
                // Ranges [0xA0, 0xA6] and [0xB0, 0xB6] are channel-only specific
                // locations. These divided differently - 4 operators per parameter.
                //
                // In all cases each 4th location is not used.
                //
                // Refer to page 20 of YM2608 manual for more info.
    
                // About FNUM assigment. Value from both registers, FNUM and block,
                // will be used (copied maybe) only when you set less significant
                // 8 bits of this 14 bit number.
    
                const OPERATOR_MAP = [0, 2, 1, 3];

                // #NOTE
                // This map depends on implementation of the synth.
                // There's no command for location 0 in this case because
                // it's the same as 0 in regular mode.

                const OPERATOR_MAP_CHANNEL_3 = [3, 1, 2];
    
                const FIRST_DIVISION = addressByte & 0x0F;
                const COLUMN = FIRST_DIVISION & 3;
    
                // Nothing is allocated for 4th "column".
    
                if (COLUMN == 3) return;
    
                const ROW = Math.trunc(
                    FIRST_DIVISION / 4
                );
    
                //
                
                let channelNumber = port ? 3 : 0;
                channelNumber += COLUMN;
    
                let operatorNumber;
                
                // Check if address is in ranges where operator is involved.
    
                if (addressByte < 0xA0) operatorNumber = OPERATOR_MAP[ROW];
                else if (
                    (addressByte > 0xA7) && (addressByte < 0xAF)
                ) {
                    if (ROW > 1) operatorNumber = OPERATOR_MAP_CHANNEL_3[COLUMN];
                }
    
                channel_operator(addressByte, dataByte, ROW);
    
                // 
    
                output.channelNumber = channelNumber;
                if (operatorNumber != undefined) output.operatorNumber = operatorNumber;
            }
        }
    
        getResult();
    
        return output;
    },
    parse_sglByte(dataByte) {
        var output = {};
        const NAMES = this.instructionNames;

        // Check if the byte describes destinations.

        if (dataByte >> 7) {
            // 4 bit data, 1 bit target, 2 bit channel number.

            output.name = NAMES[18];
            output[0] = dataByte & 15;
            output[1] = (dataByte >> 4) & 1;
            
            output.channelNumber = (dataByte >> 5) & 3;
        }
        else {
            // 6 bit data.

            output.name = NAMES[19];
            output[0] = dataByte & 63;
        }

        return output;
    },
    Parser_Bytes: class {
        constructor (reader) {
            this.reader = reader;
            this.parse_ym2612_bytes = LIB_MD_VGM.parse_ym2612_bytes.bind(LIB_MD_VGM);
            this.parse_sglByte = LIB_MD_VGM.parse_sglByte.bind(LIB_MD_VGM);
    
            this.pcm_bank = null;
            this.pcm_bank_position = 0;
        }
    
        EXECUTE() {
            var reader = this.reader;
    
            const INSTRUCTION = reader.read_int8();
            const INSTRCT_0 = INSTRUCTION & 15;
            const INSTRCT_1 = INSTRUCTION >> 4;
    
            // 
            
            var output = {};
    
            function eventsAction(event) {
                output = event;
            }
    
            switch (INSTRUCTION) {
                case 0x4F:
                    // Game Gear PSG.
    
                    reader.position++;
    
                    break;
                case 0x50:
                    eventsAction(
                        {
                            name: "sgl",
                            sgl: this.parse_sglByte(reader.read_int8())
                        }
                    );
    
                    break;
                case 0x52:
                case 0x53:
                   eventsAction(
                        {
                            name: "ym2612",
                            ym2612: this.parse_ym2612_bytes(
                                (INSTRCT_0 == 3) ? 1 : 0,
                                reader.read_int8(),
                                reader.read_int8()
                            )
                        }
                    );
    
                    break;
                case 0x66:
                    eventsAction(
                        {
                            name: "soundDataEnd"
                        }
                    );
    
                    break;
                case 0x67: {
                    // Data block encountered.
    
                    reader.position++;
    
                    const TYPE = reader.read_int8();
                    const SIZE = reader.read_int32_le();

                    try {
                        let bank = new Uint8Array(
                            reader.byteStreamView.buffer,
                            reader.absolutePosition,
                            SIZE
                        );

                        bank = new Uint8Array(bank); // Create new buffer instead of using old one.

                        if (TYPE == 0) this.pcm_bank = bank;

                        reader.position += SIZE;
                    }
                    catch {
                        console.warn("Bad data block size - " + SIZE + ", at position " + reader.position + ", data stream length is " + reader.byteStreamView.length + ". Ignored");

                        break;
                    }

                    // Reset position.
    
                    this.pcm_bank_position = 0;
    
                    break;
                }
                    
                case 0xE0:
                    // Seek in bank.
    
                    this.pcm_bank_position = reader.read_int32_le();
    
                    break;
                case 0x61:
                    // Wait instructions follow.
    
                    eventsAction(
                        {
                            name: "wait",
                            wait: reader.read_int16_le()
                        }
                    );
    
                    break;
                case 0x62:
                    eventsAction(
                        {
                            name: "wait",
                            wait: 735
                        }
                    );
                    
                    break;
                case 0x63:
                    eventsAction(
                        {
                            name: "wait",
                            wait: 882
                        }
                    );
                    
                    break;
            }
    
            switch (INSTRCT_1) {
                case 7:
                    eventsAction(
                        {
                            name: "wait",
                            wait: INSTRCT_0 + 1
                        }
                    );
                    
                    break;
                case 8: {
                    // If PCM bank wasn't set for some reason,
                    // don't create event.
                    // Timing event should be created regardless.
    
                    if (this.pcm_bank == undefined) {
                        eventsAction(
                            {
                                name: "wait",
                                wait: INSTRCT_0
                            }
                        );
                    }
                    else {
                        eventsAction(
                            {
                                name: "ym2612-wait",
                                ym2612: this.parse_ym2612_bytes(
                                    0,
                                    0x2A,
                                    this.pcm_bank[this.pcm_bank_position]
                                ),
                                wait: INSTRCT_0
                            }
                        );
                    }
    
                    this.pcm_bank_position++;
    
                    break;
                }
            }
    
            return output;
        }
    },
    parse_bytes(reader) {
        const DATA = {};
        const HEADER = DATA.head = {};

        // Header data here takes up 56 bytes.
    
        HEADER.id = reader.read_iso_8859_1(4);
        HEADER.eof_offset = reader.read_int32_le();
    
        {
            // Reads 4 bytes overall.
    
            let newString = reader.read_int8();
    
            newString = (newString >> 4) + '' + (newString & 15);
    
            newString = reader.read_int8() + "." + newString;
    
            HEADER.version = parseFloat(newString);
    
            reader.position += 2;
        }
    
        HEADER.sn76489_clock = reader.read_int32_le();
        reader.position += 4; // YM2413 clock.
        HEADER.gd3_offset = reader.read_int32_le();
        HEADER.totalSamples = reader.read_int32_le(); // 28 bytes read so far.
        HEADER.loopOffset = reader.read_int32_le();
        HEADER.loopSamples = reader.read_int32_le();
        HEADER.rate = reader.read_int32_le();
        reader.position += 4; // SN76489 feedback and shift register width, reserved 1.10.
        HEADER.ym2612_clock = reader.read_int32_le();
        reader.position += 4; // YM2151 clock.
        HEADER.dataOffset = reader.read_int32_le();
    
        // Set our "cursor" in position where song data should begin.
        // We should have eneded on byte 56, so add offset minus
        // bytes of offset data itself.

        reader.position += (HEADER.dataOffset - 4);

        // 
    
        const PARSER = new this.Parser_Bytes(reader);
    
        if (HEADER.loopOffset != 0) {
            // Currently we are at position described above. Loop offset specified
            // with respect to to location of this data in the file, which comes
            // after 28th byte.
            // Focus on intro area and write into intro section.

            const LENGTH = (28 + HEADER.loopOffset) - reader.position;

            if (LENGTH > 0) {
                reader.zoomIn(
                    reader.absolutePosition,
                    (28 + HEADER.loopOffset) - reader.position
                );
    
                DATA.intro = [];
                
                while (!reader.isEof()) DATA.intro.push( PARSER.EXECUTE() );

                reader.zoomOut();
            } else {
                console.warn("Invalid loop offset", HEADER.loopOffset);
            }
        }

        // Fill the loop section.

        DATA.loop = [];
    
        while (!reader.isEof()) DATA.loop.push( PARSER.EXECUTE() );
    
        return DATA;
    },
    convert_fileData_to_sequenceData(parsedData) {
        const DELTA_TIME = [];
        const EVENTS = [];

        const DATA = {
            sequence: [ DELTA_TIME, EVENTS ]
        };
    
        // #NOTE
        // All VGM files are recorded at rate 44100 Hz.

        DATA.sampleTime_actual = 1000000 / 44100;
        const SAMPLETIME_MICROSEC = DATA.sampleTime_used = Math.round(DATA.sampleTime_actual);

        var deltaBuffer = 0;
        var trackLength_microseconds = 0;
    
        // 
    
        function createEvent(event) {
            // Empty events shall not pass!
    
            if (Object.entries(event).length == 0) return;
    
            // 
    
            const DELTA_MICROSECONDS = deltaBuffer * SAMPLETIME_MICROSEC;
    
            DELTA_TIME.push(DELTA_MICROSECONDS);
            EVENTS.push(event);
    
            // 
    
            trackLength_microseconds += DELTA_MICROSECONDS;
    
            // 
    
            deltaBuffer = 0;
        }
    
        // 
    
        function passThrough(events) {
            const LENGTH = events.length;
            var event;
    
            loop: for (let i = 0; i < LENGTH; i++) {
                event = events[i];
    
                switch (event.name) {
                    case "wait":
                        deltaBuffer += event.wait;
        
                        break;
                    case "ym2612":
                        createEvent(event.ym2612);
        
                        break;
                    case "ym2612-wait": {
                        createEvent(event.ym2612);
                        deltaBuffer += event.wait;
        
                        break;
                    }
                    case "sgl":
                        createEvent(event.sgl);
        
                        break;
                    case "soundDataEnd":
                        break loop;
                }
            }
        }
    
        // We split track into section only to find
        // loop start in microseconds.
    
        if (parsedData.intro != undefined) passThrough(parsedData.intro);

        if (parsedData.loop != undefined) {
            DATA.loopStart = trackLength_microseconds;

            passThrough(parsedData.loop);
        }

        // 

        if (EVENTS.length == 0 || DELTA_TIME.length == 0) throw "MDSI sequence turned out to be empty";

        // 
    
        return DATA;
    },
    convert_instruction_to_bytes(event) {
        const OUTPUT = [];

        function makeYm2612_instruction(address, value) {
            var port = 0x52;

            if (address > 0x2F) {
                if (event.channelNumber != undefined) {
                    if (event.channelNumber > 2) port = 0x53;
    
                    address += event.channelNumber % 3;
    
                    // Here we need to swap operator numbers again, using reverse map.
    
                    if (event.operatorNumber != undefined) address += [0, 2, 1, 3][event.operatorNumber] * 4;
                }
                else if (
                    (address > 0xA7) && (address < 0xAF)
                ) {
                    address += [1, 2, 0][event.operatorNumber];
                }
            }

            OUTPUT.push(port, address, value);
        }

        // 

        const NAMES = LIB_MD_VGM.instructionNames;

        switch (event.name) {
            case NAMES[0]:
                makeYm2612_instruction(
                    0x22,
                    (event[0] << 3) + event[1]
                );
                
                break;
            case NAMES[1]:
                makeYm2612_instruction(
                    0x27,
                    event[0] << 6
                );
                
                break;
            case NAMES[2]:
                makeYm2612_instruction(
                    0x28,
                    (event[0][0] << 4) +
                    (event[0][1] << 5) +
                    (event[0][2] << 6) +
                    (event[0][3] << 7) +
                    event.channelNumber + ((event.channelNumber > 2) ? 1 : 0)
                );
                
                break;
            case NAMES[3]:
                makeYm2612_instruction(
                    0x2A,
                    event[0]
                );
                
                break;
            case NAMES[4]:
                makeYm2612_instruction(
                    0x2B,
                    event[0] << 7
                );
                
                break;
            case NAMES[5]:
                makeYm2612_instruction(
                    0x30,
                    (event[0] << 4) + event[1]
                );
                
                break;
            case NAMES[6]:
                makeYm2612_instruction(
                    0x40,
                    event[0]
                );
                
                break;
            case NAMES[7]:
                makeYm2612_instruction(
                    0x50,
                    (event[1] << 6) + event[0]
                );
                
                break;
            case NAMES[8]:
                makeYm2612_instruction(
                    0x60,
                    (event[1] << 7) + event[0]
                );
                
                break;
            case NAMES[9]:
                makeYm2612_instruction(
                    0x70,
                    event[0]
                );
                
                break;
            case NAMES[10]:
                makeYm2612_instruction(
                    0x80,
                    (event[1] << 4) + event[0]
                );
                
                break;
            case NAMES[11]:
                makeYm2612_instruction(
                    0x90,
                    (event[3] << 3) +
                    (event[2] << 2) +
                    (event[1] << 1) +
                    (event[0])
                );
                
                break;
            case NAMES[12]:
                makeYm2612_instruction(
                    0xAD,
                    event[0] & 63
                );

                break;
            case NAMES[13]:
                makeYm2612_instruction(
                    0xA8,
                    event[0]
                );

                break;
            case NAMES[14]:
                makeYm2612_instruction(
                    0xA4,
                    event[0] & 63
                );

                break;
            case NAMES[15]:
                makeYm2612_instruction(
                    0xA0,
                    event[0]
                );

                break;
            case NAMES[16]:
                makeYm2612_instruction(
                    0xB0,
                    (event[1] << 3) + event[0]
                );

                break;
            case NAMES[17]:
                makeYm2612_instruction(
                    0xB4,
                    (event[3] << 7) +
                    (event[2] << 6) +
                    (event[1] << 4) +
                    event[0]
                );

                break;
            case NAMES[18]:
                OUTPUT.push(
                    0x50,
                    0x80 +
                    ( (event.channelNumber & 3) << 5) +
                    ( (event[1] & 1) << 4) +
                    (event[0] & 15)
                );

                break;
            case NAMES[19]:
                OUTPUT.push(
                    0x50,
                    event[0] & 63
                );

                break;
        }
        
        return OUTPUT;
    },
    convert_sequence_to_fileData(sequence) {
        const WRITER = new Bytestream_Writer();

        ///////////////////////////////
        //      FILL THE HEADER      //
        ///////////////////////////////

        WRITER.write_iso_8859_1("Vgm "); // Identifier.

        WRITER.position = 0x08; // Version.
        WRITER.write(0x50);
        WRITER.write(1);

        WRITER.position = 0x0C; // SN76489 clock.
        WRITER.write_le(4, 3579545);

        WRITER.position = 0x24; // Rate.
        WRITER.write_le(4, 60);

        WRITER.position = 0x2C; // YM2612 clock.
        WRITER.write_le(4, 7670453);

        WRITER.position = 0x34; // VGM data offset.
        WRITER.write_le(4, 12);

        WRITER.position = 0x40;

        ///////////////////////////////////
        //      CREATE INSTRUCTIONS      //
        ///////////////////////////////////

        const DELTA_TIME = sequence[0];
        const EVENTS = sequence[1];
        const CONVERT = this.convert_instruction_to_bytes;
        const SAMPLETIME_MICROSEC = 1000000 / 44100;
        
        var totalTime = 0;
        var totalSampleNumber = 0;
        var totalSampleNumber_last = 0;
        var deltaSampleNumber = 0;

        EVENTS.forEach(function (event, index) {
            totalTime += DELTA_TIME[index];
            totalSampleNumber = Math.round(totalTime / SAMPLETIME_MICROSEC);
            deltaSampleNumber = totalSampleNumber - totalSampleNumber_last;
            totalSampleNumber_last = totalSampleNumber;

            // Not the best handling of wait instructions, but at least
            // fast to write...

            while (true) {
                if (deltaSampleNumber > 0) {
                    if (deltaSampleNumber > 65535) {
                        WRITER.write(0x61, 0xFF, 0xFF);
                        deltaSampleNumber -= 0xFFFF;
                    } else {
                        WRITER.write(0x61);
                        WRITER.write_le(2, deltaSampleNumber);

                        break;
                    }
                } else break;
            }

            CONVERT(event).forEach(function (byte) {
                WRITER.write(byte);
            });
        });

        WRITER.write(0x66); // Sound data end.

        // 

        WRITER.position = 0x04; // EOF offset.
        WRITER.write_le(4, WRITER.stream.length - 4);
        
        WRITER.position = 0x18; // Total samples.
        WRITER.write_le(4, totalSampleNumber);

        WRITER.position = 0x1C; // Loop offset.
        WRITER.write_le(4, 0);

        WRITER.position = 0x20; // Loop samples.
        WRITER.write_le(4, totalSampleNumber);
        
        // 

        return {
            stream: WRITER.stream,
            downloader: function () {
                LIB_0.file.download(
                    new Blob(
                        [
                            new Uint8Array(WRITER.stream)
                        ],
                        {
                            type: 'application/octet-stream'
                        }
                    ),
                    "Ypsilon_Vgm_" + LIB_0.unsorted.getSimpleNow() + ".vgm"
                );
            }
        }
    }
}