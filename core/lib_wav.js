// MDSI stands for Mega Drive Sound Instruction

const LIB_WAV = {
    parse_bytes(reader) {
        // Wav data consists of chunks and "chunk lists".
        // First chunk is the root chunk, the data of which is a chunk list.
        // Chunk list starts with ID (f.e. WAVE) and right after it the chunks
        // it contains follow.
        // Root chunk may be "RIFF" or "RIFX", where first means bytes
        // should be read as little endian, second as big endian.
    
        const CHUNK_RIFF = reader.read_chunk(true, true);
    
        if (CHUNK_RIFF.id != "RIFF") throw "Not prepared! Wav file has a different of \"RIFF\" type of the first chunk";
    
        // Reading chunk contents.
    
        CHUNK_RIFF.data = {
            [ reader.read_iso_8859_1(4) ]: []  // WAVE chunk list.
        };
    
        // Read chunks contained in WAVE chunk list.
    
        var chunk = null;
    
        while (reader.position < CHUNK_RIFF.length) {
            chunk = reader.read_chunk(true);
    
            switch (chunk.id) {
                case "fmt ":
                    chunk.data = {
                        audioFormat: reader.read_int16_le(),
                        numberOfChannels: reader.read_int16_le(),
                        frameRate: reader.read_int32_le(),
                        byteRate: reader.read_int32_le(),
                        bytesPerFrame: reader.read_int16_le(),
                        bitsPerSample: reader.read_int16_le()
                    }
    
                    break;
                case "data":
                    // Skip pad byte.
    
                    if (chunk.length % 2) reader.position++;
    
                    // Continue.
                default:
                    // For any other chunk leave it's data as is.
    
                    reader.position += chunk.length;
            }
    
            CHUNK_RIFF.data["WAVE"].push(chunk);
        }
    
        return CHUNK_RIFF;
    },
    convert_fileData_to_bytes(samples = new Float32Array, bitsPerSample = 16, sampleRate = 44100, numberOfChannels = 2) {
        numberOfChannels &= 65535;
        bitsPerSample &= 65535;
    
        const WRITER = new Bytestream_Writer();
    
        WRITER.write_iso_8859_1("RIFF"); // Write RIFF chunk.
    
        // Write chunk length later (position 4).
    
        WRITER.position += 4; 
    
        WRITER.write_iso_8859_1("WAVE"); // Start writing a list named WAVE.
    
        WRITER.write_iso_8859_1("fmt "); // Start writing format chunk.
        WRITER.write_le(4, 16); // Chunk length.
        WRITER.write_le(2, 1); // Now write data. First - audio format. 1 is PCM.
        WRITER.write_le(2, numberOfChannels);
        WRITER.write_le(4, sampleRate); // Frame rate.
        WRITER.write_le(4, (bitsPerSample / 8) * numberOfChannels * sampleRate); // Byte rate.
        WRITER.write_le(2, (bitsPerSample / 8) * numberOfChannels); // Bytes per frame.
        WRITER.write_le(2, bitsPerSample);
    
        WRITER.write_iso_8859_1("data"); // Start writing data chunk.
        WRITER.write_le(4, samples.length);
    
        // 
    
        const LENGTH = samples.length;
    
        for (let i = 0; i < LENGTH; i++) WRITER.write(samples[i]);
    
        // Pad byte needs to be added if number of samples is odd.
        // It's not counted for chunk length.
    
        if (LENGTH % 2) WRITER.write(0);
    
        WRITER.position = 4;
        WRITER.write_le(4, WRITER.stream.length - 8); // Chunk length.
    
        return WRITER.eof();
    },
    convert_fileData_to_MdsiSequence(parsedObject) {
        const CHUNKS = LIB_0.object.create_indexedFromArray(parsedObject.data["WAVE"], "id");
    
        const NAMES = LIB_MD_VGM.instructionNames;
        const FORMAT = CHUNKS["fmt "].data;
        const DATA = CHUNKS["data"].data; // Confusing a bit?
    
        var sample_list = DATA;
        var valueFormat = function (value) {
            return value;
        };
    
        // Create typed array depending on number of bits per frame
        // and make a method for reducing the value to unsigned 8 bit number.
        // Just in case create new array buffer, instead of using existing.
    
        switch (FORMAT.bitsPerSample) {
            case 8:
                break;
            case 16:
                sample_list = new Int16Array( Bytestream_Reader.create_arrayBufferFromView(sample_list) );
                valueFormat = function (value) {
                    return Math.trunc(value * Math.pow(2, -8)) + 128;
                };
                break;
            case 32:
                sample_list = new Int32Array( Bytestream_Reader.create_arrayBufferFromView(sample_list) );
                valueFormat = function (value) {
                    return Math.trunc(value * Math.pow(2, -24)) + 128;
                };
                break;
            default:
                throw "Can't handle this number of bits per sample: " + FORMAT.bitsPerSample;
        }
    
        const LENGTH = sample_list.length;
        const NUM_OF_CHANNELS = FORMAT.numberOfChannels;
    
        // Here, the adjustment with number of channels not handled, it's handled later.
    
        const DELTA = 1000000 / FORMAT.frameRate;
    
        const DELTA_TIME = [];
        const EVENTS = [];
    
        // 
    
        DELTA_TIME.push(0, 0, 0);
        EVENTS.push(
            {
                name: NAMES[3],
                0: 128
            },
            {
                name: NAMES[4],
                0: true
            },
            {
                name: NAMES[17],
                0: 0,
                1: 0,
                2: true,
                3: true,
                channelNumber: 5
            }
        );
    
        // Merge all channel's data.
    
        let sampleValue = 0;
    
        for (let i = 0; i < LENGTH; i += NUM_OF_CHANNELS) {
            DELTA_TIME.push(DELTA);
    
            sampleValue = 0;
    
            for (let j = 0; j < NUM_OF_CHANNELS; j++) {
                sampleValue += sample_list[i + j];
            }
    
            sampleValue /= NUM_OF_CHANNELS;
            sampleValue = Math.trunc( valueFormat(sampleValue) );
    
            EVENTS.push(
                {
                    name: NAMES[3],
                    0: sampleValue
                }
            );
        }
    
        // 
    
        return [DELTA_TIME, EVENTS];
    }
}