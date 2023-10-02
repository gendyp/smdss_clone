class Bytestream_Reader {
    #isZoomedIn = false;

    constructor(arrayBuffer = new ArrayBuffer) {
        this.byteStreamView = new Uint8Array(arrayBuffer); 
        
        // Position, relative to current view.
        
        this.position = 0;
    }

    get absolutePosition() {
        return this.position + this.byteStreamView.byteOffset;
    }
    
    isEof() {
        return this.position >= this.byteStreamView.length;
    }

    // Zooming in (creating new view) is useful to isolate certain
    // area of the buffer and operate on it with for/while loops.
    // When zoomed in, position is relative to current view, not to
    // the "full" view, and "eof" means the end of current the view.

    zoomIn(start = 0, length = 1) {
        // Don't let zooming in multiple times.
        // If you will try to zoom in again in a loop, position will
        // always be coming back to 0 and the loop will never end,
        // if checking by "end of file".

        if (this.#isZoomedIn) return false;

        if (length <= 0) throw "Bad view length. Must be more than 0";

        this.position = 0;
        this.byteStreamView = new Uint8Array(
            this.byteStreamView.buffer,
            start,
            length
        );

        return true;
    }

    zoomOut() {
        this.position = this.absolutePosition;
        this.byteStreamView = new Uint8Array( this.byteStreamView.buffer );
        this.#isZoomedIn = false;
    }

    // When reading as chunk, position will be at the start of chunk data.

    read_chunk(readLengthAsLe = false, shouldZoomIn = false) {
        const CHUNK = {
            id: this.read_iso_8859_1(4),
            length: readLengthAsLe ? this.read_int32_le() : this.read_int32_be(),
            data: null
        };

        if (shouldZoomIn) {
            this.zoomIn(this.absolutePosition, CHUNK.length);
            CHUNK.data = this.byteStreamView;
        }
        else {
            CHUNK.data = new Uint8Array(
                this.byteStreamView.buffer,
                this.absolutePosition,
                CHUNK.length
            )
        }

        return CHUNK;
    }

    read_iso_8859_1(length) {
        const RESULT = [];
        
        for (let i = 0; i < length; i++) {
            RESULT.push(
                String.fromCharCode(
                    this.byteStreamView[this.position]
                )
            );
            
            this.position++;
        }
        
        return RESULT.join("");
    }

    read_int32_le() {
        var result = (
            this.byteStreamView[this.position]
            + (this.byteStreamView[this.position + 1] << 8)
            + (this.byteStreamView[this.position + 2] << 16)
            + (this.byteStreamView[this.position + 3] << 24)
        );

        this.position += 4;

        return result;
    }

    read_int32_be() {
        var result = (
            (this.byteStreamView[this.position] << 24)
            + (this.byteStreamView[this.position + 1] << 16)
            + (this.byteStreamView[this.position + 2] << 8)
            + this.byteStreamView[this.position + 3]
        );

        this.position += 4;

        return result;
    }

    read_int16_le() {
        var result = (
            this.byteStreamView[this.position]
            + (this.byteStreamView[this.position + 1] << 8)
        );

        this.position += 2;

        return result;
    }

    read_int16_be() {
        var result = (
            (this.byteStreamView[this.position] << 8) +
            this.byteStreamView[this.position + 1]
        );

        this.position += 2;

        return result;
    }

    read_int8(signed = false) {
        var result = this.byteStreamView[this.position];

        if (signed && result > 127) result -= 256;

        this.position++;

        return result;
    }

    // Read a MIDI-style variable-length integer - 
    // (big-endian value in groups of 7 bits, with
    // top bit set to signify that another byte follows)

    read_intVar_be() {
        var result = 0;
        var byte;

        while (true) {
            byte = this.read_int8();

            // If 8th bit is set, join current byte
            // value to overall result and keep going.

            if (byte >> 7) {
                result += (byte & 127);
                result <<= 7;
            } else {
                // No additional bytes. Add current
                // byte to a result and return.

                return result + byte;
            }
        }
    }

    static create_arrayBufferFromView(view) {
        return new view.constructor(view).buffer;
    }
}

class Bytestream_Writer {
    constructor(stream = []) {
        this.position = 0;
        this.stream = stream;
    }

    write_iso_8859_1(string) {
        var length = string.length;

        for (let i = 0; i < length; i++) {
            this.stream[this.position] = string.charCodeAt(i) & 255;

            this.position++;
        }
    }

    write(value) {
        this.stream[this.position] = value & 255;

        this.position++;
    }

    write_le(length, value) {
        for (let i = 0; i < length; i++) {
            this.stream[this.position] = (value >> (8 * i)) & 255;

            this.position++;
        }
    }

    write_be(...bytes) {
        for (
            let i = bytes.length - 1;
            i >= 0;
            i--
        ) {
            this.stream[this.position] = bytes[i];

            this.position++;
        }
    }

    eof() {
        return new Uint8Array(this.stream);
    }
}