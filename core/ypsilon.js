class Ypsilon {
    constructor(sampleRate = 0) {
        if (sampleRate <= 0) throw "Sample rate of less or equal to 0 is not allowed";

        // Rates of each module are found like so:
        // 
        // For YM2612:
        // Clock / Divider / ...channels / ...operators
        // 7670454 / 6 / 6 / 4
        // 53267.041666666664
        // 
        // For SN76489:
        // Clock / Divider
        // 3579545 / 16
        // 223721.5625

        Object.defineProperties(this, {
            "OUTPUT": {
                value: new Float32Array(2)
            },
            "SGPM_WRAP": {
                value: new Ypsilon.GeneratorWrap(
                    new Ypsilon.Sgpm,
                    53267.041666666664 / sampleRate,
                    2
                )
            },
            "SGL_WRAP": {
                value: new Ypsilon.GeneratorWrap(
                    new Ypsilon.Sgl,
                    223721.5625 / sampleRate,
                    1
                )
            }
        });

        // Make an array which accesses a property of many similar
        // objects "by reference".

        function reference(array, key) {
            const SPECIAL_ARRAY = [];

            array.forEach(function (object, index) {
                Object.defineProperty(SPECIAL_ARRAY, index, {
                    enumerable: true,
                    get() {
                        return object[key];
                    },
                    set(value) {
                        object[key] = value;
                    }
                });
            });

            return SPECIAL_ARRAY;
        }

        this.shouldBeBypassed_sgpm = reference(this.SGPM_WRAP.target.CHANNELS, "shouldBeBypassed");
        this.shouldBeBypassed_sgl = reference(this.SGL_WRAP.target.CHANNELS, "shouldBeBypassed");

        this.MAKE_INSTR_HANDLER();
    }

    RESET() {
        this.SGPM_WRAP.target.RESET();
        this.SGL_WRAP.target.RESET();
    }

    MAKE_INSTR_HANDLER(names) {
        if (names == undefined) try {
            names = LIB_MD_VGM.instructionNames;
        }
        catch {
            throw "Without proper enum of names the instructions won't be recognized";
        }

        const NAMES = names;
        const LFO = this.SGPM_WRAP.target.LFO;
        const SGPM_CHANNELS = this.SGPM_WRAP.target.CHANNELS;
        const SGL = this.SGL_WRAP.target;
    
        this.handler = function (instruction) {
            try {
                switch (instruction.name) {
                    case NAMES[0]:
                        LFO.shouldBeEnabled = instruction[0];
                        LFO.frequency = instruction[1];
            
                        break;
                    case NAMES[1]:
                        SGPM_CHANNELS[2].shouldUseSpecialMode = instruction[0];
            
                        break;
                    case NAMES[2]: {
                        const CHANNEL = SGPM_CHANNELS[instruction.channelNumber];
            
                        Object.keys(instruction[0]).forEach(function (operatorNumber) {
                            CHANNEL.OPERATORS[operatorNumber].keyState = instruction[0][operatorNumber];
                        });
            
                        break;
                    }
                    case NAMES[3]:
                        SGPM_CHANNELS[5].pcmData = instruction[0];
            
                        break;
                    case NAMES[4]:
                        SGPM_CHANNELS[5].shouldEnablePcmMode = instruction[0];
            
                        break;
                    case NAMES[5]: {
                        const TARGET = SGPM_CHANNELS[instruction.channelNumber].OPERATORS[instruction.operatorNumber].PHASE_GENERATOR;
            
                        TARGET.detune = instruction[0];
                        TARGET.multiple = instruction[1];
            
                        break;
                    }
                    case NAMES[6]:
                        SGPM_CHANNELS[instruction.channelNumber].OPERATORS[instruction.operatorNumber].totalLevel = instruction[0];
            
                        break;
                    case NAMES[7]: {
                        const TARGET = SGPM_CHANNELS[instruction.channelNumber].OPERATORS[instruction.operatorNumber].ENVELOPE_GENERATOR;
            
                        TARGET.attackRate = instruction[0];
                        TARGET.keyScale = instruction[1];
            
                        break;
                    }
                    case NAMES[8]: {
                        const TARGET = SGPM_CHANNELS[instruction.channelNumber].OPERATORS[instruction.operatorNumber];
            
                        TARGET.ENVELOPE_GENERATOR.decayRate = instruction[0];
                        TARGET.shouldEnableAm = instruction[1];
            
                        break;
                    }
                    case NAMES[9]:
                        SGPM_CHANNELS[instruction.channelNumber].OPERATORS[instruction.operatorNumber].ENVELOPE_GENERATOR.sustainRate = instruction[0];
            
                        break;
                    case NAMES[10]: {
                        const TARGET = SGPM_CHANNELS[instruction.channelNumber].OPERATORS[instruction.operatorNumber].ENVELOPE_GENERATOR;
            
                        TARGET.releaseRate = instruction[0];
                        TARGET.sustainLevel = instruction[1];
            
                        break;
                    }
                    case NAMES[11]: {
                        const TARGET = SGPM_CHANNELS[instruction.channelNumber].OPERATORS[instruction.operatorNumber].ENVELOPE_GENERATOR;
            
                        TARGET.ssg_shouldHold = instruction[0];
                        TARGET.ssg_shouldAlternate = instruction[1];
                        TARGET.ssg_shouldAttack = instruction[2];
                        TARGET.ssg_shouldBeEnabled = instruction[3];
            
                        break;
                    }
                    case NAMES[12]:
                        SGPM_CHANNELS[2].f_num_msb_block[instruction.operatorNumber] = instruction[0];
            
                        break;
                    case NAMES[13]:
                        SGPM_CHANNELS[2].f_num_lsb[instruction.operatorNumber] = instruction[0];
            
                        break;
                    case NAMES[14]:
                        SGPM_CHANNELS[instruction.channelNumber].f_num_msb_block[0] = instruction[0];
            
                        break;
                    case NAMES[15]:
                        SGPM_CHANNELS[instruction.channelNumber].f_num_lsb[0] = instruction[0];
            
                        break;
                    case NAMES[16]: {
                        const TARGET = SGPM_CHANNELS[instruction.channelNumber];
            
                        TARGET.algorithm = instruction[0];
                        TARGET.OPERATORS[0].feedback = instruction[1];
            
                        break;
                    }
                    case NAMES[17]: {
                        const TARGET = SGPM_CHANNELS[instruction.channelNumber];
            
                        TARGET.pms = instruction[0];
                        TARGET.ams = instruction[1];
                        TARGET.r = instruction[2];
                        TARGET.l = instruction[3];
            
                        break;
                    }
                    case NAMES[18]:
                    case NAMES[19]:
                        SGL.SEND_DATA(instruction);
            
                        break;
                }

                return true;
            } catch {
                return false;
            }
        }
    }

    EXECUTE() {
        this.OUTPUT[0] = this.OUTPUT[1] = 0;

        // 

        this.SGPM_WRAP.EXECUTE();
        this.SGL_WRAP.EXECUTE();

        this.OUTPUT[0] = this.SGPM_WRAP.output[0] + this.SGL_WRAP.output[0];
        this.OUTPUT[1] = this.SGPM_WRAP.output[1] + this.SGL_WRAP.output[0];
        
        // 

        return this.OUTPUT;
    }
}

Ypsilon.GeneratorWrap = class {
    #shouldUseInterpolation = true;

    constructor(target, ratio, numberOfChannels) {
        this.target = target;
        this.output;

        // 

        Object.defineProperties(this, {
            "INTERPOLATOR": {
                value: new Interpolator(
                    this.DO_WORK.bind(this),
                    ratio,
                    numberOfChannels
                )
            }
        });

        this.target.output = this.INTERPOLATOR.input;

        // Initialize.

        this.shouldUseInterpolation = this.#shouldUseInterpolation;
    }

    get shouldUseInterpolation() {
        return this.#shouldUseInterpolation;
    }

    set shouldUseInterpolation(value) {
        this.#shouldUseInterpolation = value;

        if (value) this.output = this.INTERPOLATOR.output;
        else this.output = this.INTERPOLATOR.input;
    }

    DO_WORK() {
        this.target.EXECUTE();
    }

    EXECUTE() {
        if (this.#shouldUseInterpolation) this.INTERPOLATOR.EXECUTE();
        else this.DO_WORK();
    }
}

//////////////////////
//      SHUSH!      //
//////////////////////

Ypsilon.Sgpm = class {
    constructor() {
        this.output = new Float32Array(2);

        this.shouldImitateYm2612_dacIssue = true;

        Object.defineProperties(this, {
            "LFO": {
                value: new Ypsilon.Sgpm.Lfo
            },
            "CHANNELS": {
                value: [
                    new Ypsilon.Sgpm.Channel,
                    new Ypsilon.Sgpm.Channel,
                    new Ypsilon.Sgpm.Channel_2,
                    new Ypsilon.Sgpm.Channel,
                    new Ypsilon.Sgpm.Channel,
                    new Ypsilon.Sgpm.Channel_5
                ]
            }
        });
    }

    RESET() {
        this.output[0] = this.output[1] = 0;
        this.LFO.RESET();
        this.CHANNELS.forEach( channel => channel.RESET() );
    }

    EXECUTE() {
        const OUTPUT = this.output;
        OUTPUT[0] = OUTPUT[1] = 0;

        const CHANNEL_COUNT = this.CHANNELS.length;

        var channel;
        var channelOutput;

        // Loop through channels.

        for (let i = 0; i < CHANNEL_COUNT; i++) {
            channel = this.CHANNELS[i];

            // 

            channel.lfo_counter = this.LFO.counter;
            channelOutput = channel.EXECUTE();

            // I've decided to do the step using min/max instead of adding,
            // to keep loudness the same. Not sure if that's right, but overall same
            // thing.

            if (this.shouldImitateYm2612_dacIssue) {
                if (channelOutput < 0) channelOutput = Math.min(channelOutput, -128);
                else channelOutput = Math.max(channelOutput, 128);
            }

            if (channel.l) OUTPUT[0] += channelOutput;
            if (channel.r) OUTPUT[1] += channelOutput;
        }

        // Dividing by different number to correctly convert to [-1, 1] range.

        if (OUTPUT[0] < 0) OUTPUT[0] /= 32768;
        else OUTPUT[0] /= 32767;

        if (OUTPUT[1] < 0) OUTPUT[1] /= 32768;
        else OUTPUT[1] /= 32767;

        // 

        this.LFO.EXECUTE();

        return OUTPUT;
    }
}

// 

Ypsilon.Sgpm.Lfo = class {
    #timer = 0;
    #counter = 0; // 7 bit.

    constructor() {
        this.shouldBeEnabled = false;
        this.frequency = 0; // 3 bit.
    }

    get counter() {
        return this.#counter;
    }

    RESET() {
        this.#timer = 0;
        this.#counter = 0;
    }

    EXECUTE() {
        if (this.shouldBeEnabled) {
            this.#timer--;

            if (this.#timer <= 0) {
                this.#timer = this.PERIOD_TABLE[this.frequency & 7];

                this.#counter++;
                this.#counter &= 127;
            }
        }
        else this.#counter = 0;
    }
}

Object.defineProperties(Ypsilon.Sgpm.Lfo.prototype, {
    "PERIOD_TABLE": {
        value: new Uint8Array(
            [
                108, 77, 71, 67, 62, 44, 8, 5
            ]
        )
    }
});

// 

Ypsilon.Sgpm.Channel = class {
    #lfo_b7 = 0;
    #lfo_factor = 0;

    constructor() {
        this.algorithm = 0; // 3 bit.
        this.ams = 0; // 2 bit.
        this.pms = 0; // 3 bit.
        this.l = true;
        this.r = true;
        this.shouldBeBypassed = false;

        // 

        this.f_num_msb_block = new Uint8Array(1);
        this.f_num_lsb_storage = new Uint8Array(1);

        this.lfo_counter = 0;

        // 

        Object.defineProperties(this, {
            "f_num_lsb": {
                configurable: true,
                writable: true, // Should not be writable though.

                // #NOTE
                // Important. Source object must resemble the
                // object you want to proxy.

                value: new Proxy({
                    0: undefined
                }, {
                    get: this.GETTER.bind(this),
                    set: this.SETTER.bind(this)
                })
            },
            "keyCode": {
                writable: true,
                value: new Uint8Array(1) // 5 bit.
            },
            "lfo_amAttenuation": {
                writable: true,
                value: 0 // 7 bit.
            },
            "lfo_pmPhase": {
                writable: true,
                value: new Int8Array(1) // 8 bit signed.
            },
            "OPERATORS": {
                value: [
                    new Ypsilon.Sgpm.Channel.Operator_0,
                    new Ypsilon.Sgpm.Channel.Operator,
                    new Ypsilon.Sgpm.Channel.Operator,
                    new Ypsilon.Sgpm.Channel.Operator,
                ]
            },
        })
    }

    RESET() {
        this.#lfo_b7 = 0;
        this.#lfo_factor = 0;
        this.lfo_amAttenuation = 0;
        this.keyCode[0] = 0;
        this.lfo_pmPhase[0] = 0;

        this.OPERATORS.forEach( operator => operator.RESET() );
    }

    UPDATE_PM_VALUES(index = 0) {
        var result = 0;

        const F_NUM = this.f_num_lsb_storage[index] + ((this.f_num_msb_block[index] & 7) << 8);

        // Perform binary multiplication of frequency
        // number by scale factor you calculated.
        // Maximum value would be:
        // (2047 * 24) >> 9 = 95

        for (let b = 0; b < 11; b++) {
            if ((F_NUM & (1 << b)) != 0) result += this.#lfo_factor << b;
        }

        result >>= 9;

        if (this.#lfo_b7) result = -result;

        //

        this.lfo_pmPhase[index] = result;
    }

    UPDATE_LFO_DATA() {
        const B6 = (this.lfo_counter >> 5) & 1;
        const B7 = this.#lfo_b7 = this.lfo_counter >> 6;

        // Set amplitude modulation value.

        this.lfo_amAttenuation = this.lfo_counter & 63;

        // Check if ascending. It goes back and forth from attenuating
        // to not attenuating.

        if (!B7) this.lfo_amAttenuation = ~this.lfo_amAttenuation & 63;

        this.lfo_amAttenuation <<= 1;
        this.lfo_amAttenuation >>= this.AM_SENSITIVITY_TABLE[this.ams];

        // Prepare variables to find phase modulation value.
        // First find phase. Only high 3 of 5 bits are used.

        var phase = this.lfo_counter >> 2; // 3 bit.
        phase &= 7;

        // Check if descending.

        if (B6) phase = ~phase & 7;

        // Now find scale factor.

        this.#lfo_factor = this.PM_SENSITIVITY_TABLE[
            phase
            + (8 * this.pms)
        ];

        // 

        this.UPDATE_PM_VALUES();        
    }

    EXECUTE_OPERATOR(index) {
        this.OPERATORS[index].EXECUTE(
            this.f_num_msb_block[0],
            this.f_num_lsb_storage[0],
            this.keyCode[0],
            this.lfo_amAttenuation,
            this.lfo_pmPhase[0]
        );
    }

    DO_WORK() {
        this.UPDATE_LFO_DATA();

        // Loop through operators. Direct their output
        // according to algorithm.

        const ALGORITHM = this.ALGORITHMS[this.algorithm];
        const OPERATORS = this.OPERATORS;
        const LENGTH = 4;

        var destination = 0;
        var channelOutput = 0;

        // #NOTE
        // Initially I wanted to make it dynamic so you could create any
        // algorithm in case you want to make more than four operators.
        // Leaving as is.

        for (let i = 0; i < LENGTH; i++) {
            this.EXECUTE_OPERATOR(i);

            // Direct the output of current operator to each
            // destination there is.

            for (let d = 0; d < ALGORITHM[i].length; d++) {
                destination = ALGORITHM[i][d];

                if (destination < 0) channelOutput += OPERATORS[i].output;
                else OPERATORS[destination].input += OPERATORS[i].output;
            }
        }

        // #NOTE
        // Channel output can go higher than range allows.
        // It's clamped.

        if (channelOutput > 8191) channelOutput = 8191;
        else if (channelOutput < -8192) channelOutput = -8192;

        return channelOutput;
    }

    EXECUTE() {
        if (this.shouldBeBypassed) return 0;
        else return this.DO_WORK();
    }
}

Object.defineProperties(Ypsilon.Sgpm.Channel.prototype, {
    "ALGORITHMS": {
        // #NOTE
        // You won't be notified if you've set wrong destinations.
        // Wrong are those, which won't give you any result, which are
        // non-existent destination or same or lower index than own.
        // 
        // Array structure:
        // 0 - Algorithm
        //     0 - Generator (element index is generator index)
        //         0 - Destinations (generator indexes)
        //     ...
        // ...

        value: [
            [
                [1],
                [2],
                [3],
                [-1]
            ],
            [
                [2],
                [2],
                [3],
                [-1]
            ],
            // 2
            [
                [3],
                [2],
                [3],
                [-1]
            ],
            [
                [1],
                [3],
                [3],
                [-1]
            ],
            // 4
            [
                [1],
                [-1],
                [3],
                [-1]
            ],
            [
                [1, 2, 3],
                [-1],
                [-1],
                [-1]
            ],
            // 6
            [
                [1],
                [-1],
                [-1],
                [-1]
            ],
            [
                [-1],
                [-1],
                [-1],
                [-1]
            ]
        ]
    },
    "PM_SENSITIVITY_TABLE": {
        value: new Uint8Array([
            // 8 x 8

            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 1, 1,
            0, 0, 0, 1, 1, 1, 2, 2,
            0, 0, 1, 1, 2, 2, 3, 3,
            0, 0, 1, 2, 2, 2, 3, 4,
            0, 0, 2, 3, 4, 4, 5, 6,
            0, 0, 4, 6, 8, 8, 10, 12,
            0, 0, 8, 12, 16, 16, 20, 24
        ])
    },
    "AM_SENSITIVITY_TABLE": {
        value: new Uint8Array([8, 3, 1, 0])
    },
    GETTER: {
        value: function (target, key) {
            return this.f_num_lsb_storage[key];
        }
    },
    SETTER: {
        value: function (target, key, value) {
            this.f_num_lsb_storage[key] = value;

            // Get key code.
            // Keep only 4 bits, from number 8 to 11, of 14 bit frequency value.
            // --00 0111 1000 0000

            const RANGE = ((this.f_num_msb_block[key] << 8) + value) & 1920;
            const BLOCK = this.f_num_msb_block[key] >> 3;
            var N3N4 = 0;

            // * F11 is true and any of the 3 other bits are true.
            // * F11 is true, but the other 3 are false.
            // * F11 is false and all other 3 bits are true.

            if (RANGE >= 1152) N3N4 = 3;
            else if (RANGE == 1024) N3N4 = 2;
            else if (RANGE == 896) N3N4 = 1;
            
            this.keyCode[key] = (N3N4 + (BLOCK << 2)) & 31

            // Setter is required to return true for successful
            // assignment.

            return true;
        }
    }
});

// 

Ypsilon.Sgpm.Channel.Operator = class {
    #eg_timer = 0; // 2 bit.
    #phase = 0; // 10 bit.
    #amplitude = 0; // 14 bit signed.
    #keyState = false;

    constructor() {
        this.totalLevel = 0; // 7 bit.
        this.shouldEnableAm = false;

        this.input = 0; // Modulation.

        Object.defineProperties(this, {
            "PHASE_GENERATOR": {
                value: new Ypsilon.Sgpm.Channel.Operator.PhaseGenerator
            },
            "ENVELOPE_GENERATOR": {
                value: new Ypsilon.Sgpm.Channel.Operator.EnvelopeGenerator
            }
        });
    }

    //

    get output() {
        return this.#amplitude;
    }

    get keyState() {
        return this.#keyState;
    }

    set keyState(value) {
        if (value != this.#keyState) {
            if (value) {
                this.PHASE_GENERATOR.KEY_ON();
                this.ENVELOPE_GENERATOR.KEY_ON();
            }
            else this.ENVELOPE_GENERATOR.KEY_OFF();
        }

        this.#keyState = value;
    }

    // 

    RESET() {
        this.#eg_timer = 0;
        this.#phase = 0;
        this.#amplitude = 0;
        this.#keyState = false;
        this.input = 0;

        this.PHASE_GENERATOR.RESET();
        this.ENVELOPE_GENERATOR.RESET();
    }
    
    EXPONENTIATE2(negativeExponent = 0) {
        const WHOLE = negativeExponent >> 8;
        const FRACTION = negativeExponent & 255;
        const TABLE_OUTPUT = this.POWER2_TABLE[FRACTION] << 2; // 13 bit.

        return TABLE_OUTPUT >> WHOLE;
    }

    GET_MODULATION() {
        return this.input >> 1;
    }

    EXECUTE(f_num_msb_block = 0, f_num_lsb = 0, keyCode = 0, lfo_amAttenuation = 0, lfo_pmPhase = 0) {
        // Get modulated 10 bit phase.

        this.#phase = (this.PHASE_GENERATOR.output >> 10) + this.GET_MODULATION();

        this.input = 0;

        this.#phase &= 1023;

        // For now we sum all the attenuation using amplitude
        // variable as temporary storage.
        //
        // First step of summing is summing of 3 values - EG, total level
        // and AM attenuation.
        // Result is clamped, because maximum attenuation would exceed allowed
        // 10 bit number range:
        // 1023 + (127 << 3) + 126 = 2165
        // 
        // Then, convert to 12 bit range.
         
        this.#amplitude = this.ENVELOPE_GENERATOR.output;
        this.#amplitude += this.totalLevel << 3;

        if (this.shouldEnableAm) this.#amplitude += lfo_amAttenuation;

        this.#amplitude = Math.min(1023, this.#amplitude) << 2;

        // Second step of summing is to get and add attenuation from sine
        // table, output of which is 12 bit value. Together they will form
        // 13 bit number, which should not exceed 13 bit range:
        // 4092 + 2137 = 6229

        this.#amplitude += this.LOG2_SINE_TABLE[
            ( (this.#phase & 256) ? ~this.#phase : this.#phase ) & 255
        ];

        // Now it's time to get actual amplitude.

        this.#amplitude = this.EXPONENTIATE2(this.#amplitude);

        if (this.#phase & 512) this.#amplitude = -this.#amplitude;

        //

        this.#eg_timer++;

        if (this.#eg_timer > 2) {
            this.#eg_timer = 0;
            this.ENVELOPE_GENERATOR.EXECUTE(keyCode, this);
        }

        this.PHASE_GENERATOR.EXECUTE(f_num_msb_block, f_num_lsb, lfo_pmPhase, keyCode);

        // 
        
        return this.#amplitude;
    }
}

Object.defineProperties(Ypsilon.Sgpm.Channel.Operator.prototype, {
    "LOG2_SINE_TABLE": {
        value: new Uint16Array([
            // 256

            2137, 1731, 1543, 1419, 1326, 1252, 1190, 1137, 1091, 1050, 1013, 979, 949, 920, 894, 869, 846,
            825, 804, 785, 767, 749, 732, 717, 701, 687, 672, 659, 646, 633, 621, 609, 598, 587, 576, 566,
            556, 546, 536, 527, 518, 509, 501, 492, 484, 476, 468, 461, 453, 446, 439, 432, 425, 418, 411,
            405, 399, 392, 386, 380, 375, 369, 363, 358, 352, 347, 341, 336, 331, 326, 321, 316, 311, 307,
            302, 297, 293, 289, 284, 280, 276, 271, 267, 263, 259, 255, 251, 248, 244, 240, 236, 233, 229,
            226, 222, 219, 215, 212, 209, 205, 202, 199, 196, 193, 190, 187, 184, 181, 178, 175, 172, 169,
            167, 164, 161, 159, 156, 153, 151, 148, 146, 143, 141, 138, 136, 134, 131, 129, 127, 125, 122,
            120, 118, 116, 114, 112, 110, 108, 106, 104, 102, 100, 98, 96, 94, 92, 91, 89, 87, 85, 83, 82,
            80, 78, 77, 75, 74, 72, 70, 69, 67, 66, 64, 63, 62, 60, 59, 57, 56, 55, 53, 52, 51, 49, 48, 47,
            46, 45, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 23,
            22, 21, 20, 20, 19, 18, 17, 17, 16, 15, 15, 14, 13, 13, 12, 12, 11, 10, 10, 9, 9, 8, 8, 7, 7, 7,
            6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0
        ])
    },
    "POWER2_TABLE": {
        value: new Uint16Array([
            // 256

            2042, 2037, 2031, 2026, 2020, 2015, 2010, 2004, 1999, 1993, 1988, 1983, 1977, 1972, 1966, 1961,
            1956, 1951, 1945, 1940, 1935, 1930, 1924, 1919, 1914, 1909, 1904, 1898, 1893, 1888, 1883, 1878,
            1873, 1868, 1863, 1858, 1853, 1848, 1843, 1838, 1833, 1828, 1823, 1818, 1813, 1808, 1803, 1798,
            1794, 1789, 1784, 1779, 1774, 1769, 1765, 1760, 1755, 1750, 1746, 1741, 1736, 1732, 1727, 1722,
            1717, 1713, 1708, 1704, 1699, 1694, 1690, 1685, 1681, 1676, 1672, 1667, 1663, 1658, 1654, 1649,
            1645, 1640, 1636, 1631, 1627, 1623, 1618, 1614, 1609, 1605, 1601, 1596, 1592, 1588, 1584, 1579,
            1575, 1571, 1566, 1562, 1558, 1554, 1550, 1545, 1541, 1537, 1533, 1529, 1525, 1520, 1516, 1512,
            1508, 1504, 1500, 1496, 1492, 1488, 1484, 1480, 1476, 1472, 1468, 1464, 1460, 1456, 1452, 1448,
            1444, 1440, 1436, 1433, 1429, 1425, 1421, 1417, 1413, 1409, 1406, 1402, 1398, 1394, 1391, 1387,
            1383, 1379, 1376, 1372, 1368, 1364, 1361, 1357, 1353, 1350, 1346, 1342, 1339, 1335, 1332, 1328,
            1324, 1321, 1317, 1314, 1310, 1307, 1303, 1300, 1296, 1292, 1289, 1286, 1282, 1279, 1275, 1272,
            1268, 1265, 1261, 1258, 1255, 1251, 1248, 1244, 1241, 1238, 1234, 1231, 1228, 1224, 1221, 1218,
            1214, 1211, 1208, 1205, 1201, 1198, 1195, 1192, 1188, 1185, 1182, 1179, 1176, 1172, 1169, 1166,
            1163, 1160, 1157, 1154, 1150, 1147, 1144, 1141, 1138, 1135, 1132, 1129, 1126, 1123, 1120, 1117,
            1114, 1111, 1108, 1105, 1102, 1099, 1096, 1093, 1090, 1087, 1084, 1081, 1078, 1075, 1072, 1069,
            1066, 1064, 1061, 1058, 1055, 1052, 1049, 1046, 1044, 1041, 1038, 1035, 1032, 1030, 1027, 1024
        ])
    }
});

// 

Ypsilon.Sgpm.Channel.Operator.PhaseGenerator = class {
    #increment = 0; // 20 bit.
    #phase = 0; // 20 bit.

    constructor() {
        this.multiple = 0; // 4 bit.
        this.detune = 0; // 3 bit signed.
    }

    get output() {
        return this.#phase;
    }

    RESET() {
        this.#increment = 0;
        this.#phase = 0;
    }

    KEY_ON() {
        this.#phase = 0;
    }

    EXECUTE(f_num_msb_block = 0, f_num_lsb = 0, lfo_pmPhase = 0, keyCode = 0) {
        // All summands are phase increments, which form total increment.
        // Set frequency part of increment to increment property.

        this.#increment = f_num_lsb + ((f_num_msb_block & 7) << 8) + lfo_pmPhase; // F. num plus LFO phase.
        this.#increment = ( this.#increment << (f_num_msb_block >> 3) ) >> 1; // Adjust by block.

        // Now set detune part.

        this.#increment += this.GET_DETUNE_INCREMENT(this.detune, keyCode);

        // The number we got so far is 17 bit number, so check for
        // overflow.

        this.#increment &= 131071;

        // Now we work with 20 bit number.
        // Apply multiplier.

        if (!this.multiple) this.#increment >>= 1;
        else this.#increment *= this.multiple;

        // Add new increment to current increment value, check for
        // overflow.

        this.#phase = (this.#phase + this.#increment) & 1048575;
    }
}

Object.defineProperties(
    Ypsilon.Sgpm.Channel.Operator.PhaseGenerator.prototype,
    {
        "DETUNE_TABLE": {
            value: [
                // 4 x 32

                new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]),
                new Uint8Array([0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3,  4,  4,  4,  5,  5,  6,  6,  7,  8,  8,  8,  8]),
                new Uint8Array([1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7,  8,  8,  9,  10, 11, 12, 13, 14, 16, 16, 16, 16]),
                new Uint8Array([2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 20, 22, 22, 22, 22])
            ]
        },
        "GET_DETUNE_INCREMENT": {
            value: function (detune = 0, keyCode = 0) {
                // 17 bit.

                // First 2 bits specify intensity of detune.

                const INTENSITY = detune & 0b011;

                if (!INTENSITY) return 0;

                var output = this.DETUNE_TABLE[INTENSITY][keyCode];

                // 3rd bit specifies sign of detune.
                // We don't need to worry about overflow here, it'll be
                // handled later.

                if (detune & 0b100) output = -output;

                return output;
            }
        }
    }
);

// 

Ypsilon.Sgpm.Channel.Operator.EnvelopeGenerator = class {
    #counter = 0; // 12 bit.
    #state = 3; // 2 bit. Attack, decay, sustain, release.
    #rate = 0; // 6 bit.
    #attenuation = 0; // 10 bit.

    #isSsg_mustInvertOutput = false;

    // This signifies that key on event has occured and
    // EG state should be set to ATTACK at next execution.
    // Setting EG to ATTACK requires key code to be available,
    // which is only at execution time.

    #shouldSetAttackState = false;

    // 

    #calculatedSustainLevel = 0; // 4 bit.
    #sustainLevel = 0; 

    #setAttackState(keyCode = 0) {
        this.#state = 0;

        this.#updateRate(keyCode);

        if (this.#rate > 61) this.#attenuation = 0;
    }

    #updateRate(keyCode = 0) {
        var rateToUse = 0;

        switch (this.#state) {
            case 0:
                rateToUse = this.attackRate;
                break;
            case 1:
                rateToUse = this.decayRate;
                break;
            case 2:
                rateToUse = this.sustainRate;
                break;
            case 3:
                rateToUse = this.releaseRate * 2 + 1; // The only exception.
                break;
        }

        if (rateToUse) this.#rate = Math.min(
            2 * rateToUse + (keyCode >> (3 - this.keyScale)),
            63
        );
        else this.#rate = 0;
    }

    // 

    constructor() {
        this.attackRate = 0; // 5 bit.
        this.decayRate = 0; // 5 bit.
        this.sustainRate = 0; // 5 bit.
        this.releaseRate = 0; // 4 bit.
        this.keyScale = 0; // 2 bit.
        this.sustainLevel = 0; // 4 bit.

        // On hardware SSG-type envelope is controlled using
        // 4 bit SSG-EG registers where each bit enables the feature.
        // Properties listed in the same order as bits appear in hardware.
        // For example, to just enable, you'd set a value of 0x8 or 0b1000.

        this.ssg_shouldHold = false;
        this.ssg_shouldAlternate = false;
        this.ssg_shouldAttack = false;
        this.ssg_shouldBeEnabled = false;

        this.#attenuation = this.ATTENUATION_MAX;
    }

    // 

    get sustainLevel() {
        return this.#sustainLevel;
    }

    set sustainLevel(value) {
        this.#sustainLevel = value;

        // 

        if (value >= 15) this.#calculatedSustainLevel = 31;
        else this.#calculatedSustainLevel = value;

        this.#calculatedSustainLevel <<= this.SUSTAIN_LEVEL_SHIFT;
    }

    get state() {
        return this.#state;
    }

    get output() {
        // Handle SSG inversion each time output is accessed.
        // We shift attenuation range from [0, 1023] to [-512, 511]
        // and mask the value, which wraps it around back in original
        // range.
        // 
        // #NOTE
        // That is external modification. Internally attenuation value doesn't change.

        if (
            this.ssg_shouldBeEnabled
            && (this.#state != 3)
            && (this.#isSsg_mustInvertOutput ^ this.ssg_shouldAttack)
        ) {
            return (512 - this.#attenuation) & this.ATTENUATION_MAX;
        }   
        else return this.#attenuation;
    }

    //

    RESET() {
        this.#counter = 0; 
        this.#state = 3;
        this.#rate = 0;
        this.#attenuation = this.ATTENUATION_MAX;
        this.#isSsg_mustInvertOutput = false;
        this.#shouldSetAttackState = false;
    }

    KEY_ON() {
        this.#isSsg_mustInvertOutput = false;
        this.#shouldSetAttackState = true;
    }

    KEY_OFF() {
        this.#state = 3;
        this.#shouldSetAttackState = false;

        // #NOTE
        // SSG EG doesn't affect release state, but to maintain correct shape
        // attenuation should be modified internally as well if it was externally.

        if ( this.ssg_shouldBeEnabled && (this.#isSsg_mustInvertOutput ^ this.ssg_shouldAttack) ) {
            this.#attenuation = (512 - this.#attenuation) & this.ATTENUATION_MAX;
        }
    }

    EXECUTE(keyCode = 0) {
        if (this.#shouldSetAttackState) {
            this.#setAttackState(keyCode);
            this.#shouldSetAttackState = false;
        }

        // Check for SSG transition if SSG is enabled and attenuation level
        // has crossed the threshold.

        if (
            this.ssg_shouldBeEnabled && (this.#attenuation >= 512)
        ) {
            // We need to flip inversion flag if ALTERNATE is SET and
            // either HOLD or INVERSION FLAG is CLEAR.
            // 
            // Note, inversion flag is cleared at key on event.
            

            if (
                this.ssg_shouldAlternate
                && (!this.ssg_shouldHold || !this.#isSsg_mustInvertOutput)
            ) this.#isSsg_mustInvertOutput = !this.#isSsg_mustInvertOutput;

            // #NOTE
            // It's known that when we should hold and alternate, at this point we would
            // hold phase generator at 0. Though it actually should be done every update
            // cycle, because phase is advanced each cycle, but still.
            // I feel like this is pretty much minor peculiarity, so no to that.

            // Now check for transition.

            if (this.#state != 0) {
                // We transition to ATTACK state if either in
                // DEACY or SUSTAIN and HOLD is CLEAR.

                if (
                    (this.#state != 3) && !this.ssg_shouldHold
                ) {
                    this.#setAttackState(keyCode);
                }

                // Force full attenuation if state is RELEASE or
                // ATTENUATION is NOT INVERTED and HOLD is SET.

                else if (
                    (this.#state == 3) ||
                    !(this.#isSsg_mustInvertOutput ^ this.ssg_shouldAttack)
                ) this.#attenuation = this.ATTENUATION_MAX;
            }
        }
        
        // Check for transition.

        switch (this.#state) {
            case 0:
                // If attenuation reached 0, proceed to DECAY and
                // check for next transition now.

                if (this.#attenuation == 0) this.#state = 1;
                else break;
            case 1:
                // Proceed to SUSTAIN if attenuation has crossed the
                // sustain level.

                if (this.#attenuation >= this.#calculatedSustainLevel) this.#state = 2;
        }

        // Try to modify the attenuation according to state.

        this.#updateRate(keyCode);

        const SHIFT = this.SHIFT_TABLE[this.#rate];

        // Advance counter.

        this.#counter++;
        this.#counter &= 4095;

        // Check whether we should modify.

        if (!(this.#counter % (1 << SHIFT))) {
            const INCREMENT = this.INCREMENT_TABLE[
                8 * this.#rate
                + ((this.#counter >> SHIFT) & 7)
            ];

            switch (this.#state) {
                case 0:
                    this.#attenuation += (~this.#attenuation * INCREMENT) >> 4;
                    break;
                default:
                    if (this.ssg_shouldBeEnabled) {
                        if (this.#attenuation < 512) this.#attenuation += INCREMENT * 4;
                    }
                    else this.#attenuation += INCREMENT;

                    if (this.#attenuation >= this.ATTENUATION_MAX) this.#attenuation = this.ATTENUATION_MAX;
            }
        }
    }
}

Object.defineProperties(
    Ypsilon.Sgpm.Channel.Operator.EnvelopeGenerator.prototype,
    (function () {
        const ATTENUATION_BIT_COUNT = 10;
        const ATTENUATION_MAX = (1 << ATTENUATION_BIT_COUNT) - 1;
        const SUSTAIN_LEVEL_SHIFT = ATTENUATION_BIT_COUNT - 5;

        return {
            "ATTENUATION_BIT_COUNT": {
                value: ATTENUATION_BIT_COUNT
            },
            "ATTENUATION_MAX": {
                value: ATTENUATION_MAX
            },
            "SUSTAIN_LEVEL_SHIFT": {
                value: SUSTAIN_LEVEL_SHIFT
            },
            "SHIFT_TABLE": {
                value: new Uint8Array([
                    // 16 x 4

                    11, 11, 11, 11, // 0 - 3
                    10, 10, 10, 10, // 4 - 7
                    9,  9,  9,  9,  // 8 - 11
                    8,  8,  8,  8,  // 12 - 15
                    7,  7,  7,  7,  // 16 - 19
                    6,  6,  6,  6,  // 20 - 23
                    5,  5,  5,  5,  // 24 - 27
                    4,  4,  4,  4,  // 28 - 31
                    3,  3,  3,  3,  // 32 - 35
                    2,  2,  2,  2,  // 36 - 39
                    1,  1,  1,  1,  // 40 - 43
                    0,  0,  0,  0,  // 44 - 47
                    0,  0,  0,  0,  // 48 - 51
                    0,  0,  0,  0,  // 52 - 55
                    0,  0,  0,  0,  // 56 - 59
                    0,  0,  0,  0   // 60 - 63
                ])
            },
            "INCREMENT_TABLE": {
                value: new Uint8Array([
                    // 16 x (4 x 8)

                    0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0,   0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 0, 1, 0, 1, // 0 - 3
                    0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 1, 1, 0, 1, 1, 1,   0, 1, 1, 1, 0, 1, 1, 1, // 4 - 7
                    0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 1, 1, 0, 1,   0, 1, 1, 1, 0, 1, 1, 1,   0, 1, 1, 1, 1, 1, 1, 1, // 8 - 11
                    0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 1, 1, 0, 1,   0, 1, 1, 1, 0, 1, 1, 1,   0, 1, 1, 1, 1, 1, 1, 1, // 12 - 15
                    0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 1, 1, 0, 1,   0, 1, 1, 1, 0, 1, 1, 1,   0, 1, 1, 1, 1, 1, 1, 1, // 16 - 19
                    0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 1, 1, 0, 1,   0, 1, 1, 1, 0, 1, 1, 1,   0, 1, 1, 1, 1, 1, 1, 1, // 20 - 23
                    0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 1, 1, 0, 1,   0, 1, 1, 1, 0, 1, 1, 1,   0, 1, 1, 1, 1, 1, 1, 1, // 24 - 27
                    0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 1, 1, 0, 1,   0, 1, 1, 1, 0, 1, 1, 1,   0, 1, 1, 1, 1, 1, 1, 1, // 28 - 31
                    0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 1, 1, 0, 1,   0, 1, 1, 1, 0, 1, 1, 1,   0, 1, 1, 1, 1, 1, 1, 1, // 32 - 35
                    0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 1, 1, 0, 1,   0, 1, 1, 1, 0, 1, 1, 1,   0, 1, 1, 1, 1, 1, 1, 1, // 36 - 39
                    0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 1, 1, 0, 1,   0, 1, 1, 1, 0, 1, 1, 1,   0, 1, 1, 1, 1, 1, 1, 1, // 40 - 43
                    0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 1, 1, 0, 1,   0, 1, 1, 1, 0, 1, 1, 1,   0, 1, 1, 1, 1, 1, 1, 1, // 44 - 47
                    1, 1, 1, 1, 1, 1, 1, 1,   1, 1, 1, 2, 1, 1, 1, 2,   1, 2, 1, 2, 1, 2, 1, 2,   1, 2, 2, 2, 1, 2, 2, 2, // 48 - 51
                    2, 2, 2, 2, 2, 2, 2, 2,   2, 2, 2, 4, 2, 2, 2, 4,   2, 4, 2, 4, 2, 4, 2, 4,   2, 4, 4, 4, 2, 4, 4, 4, // 52 - 55
                    4, 4, 4, 4, 4, 4, 4, 4,   4, 4, 4, 8, 4, 4, 4, 8,   4, 8, 4, 8, 4, 8, 4, 8,   4, 8, 8, 8, 4, 8, 8, 8, // 56 - 59
                    8, 8, 8, 8, 8, 8, 8, 8,   8, 8, 8, 8, 8, 8, 8, 8,   8, 8, 8, 8, 8, 8, 8, 8,   8, 8, 8, 8, 8, 8, 8, 8  // 60 - 63
                ])
            }
        }
    })()
);

//

Ypsilon.Sgpm.Channel.Operator_0 = class extends Ypsilon.Sgpm.Channel.Operator {
    #feedback_buffer = new Int16Array(2);
    #feedback_phase = 0;

    constructor() {
        super();

        this.feedback = 0; // 3 bit.
    }

    RESET() {
        super.RESET();

        this.#feedback_buffer[0] = this.#feedback_buffer[1] = 0;
        this.#feedback_phase = 0;
    }

    GET_MODULATION() {
        if (this.feedback > 0) return super.GET_MODULATION() + this.#feedback_phase;
        else return super.GET_MODULATION();
    }

    EXECUTE(...args) {
        if (this.feedback > 0) {
            this.#feedback_phase = (this.#feedback_buffer[0] + this.#feedback_buffer[1]) >> (10 - (this.feedback & 7));

            // 

            this.#feedback_buffer[1] = this.#feedback_buffer[0];
            return this.#feedback_buffer[0] = super.EXECUTE(...args);
        }
        else return super.EXECUTE(...args);
    }
}

// 

Ypsilon.Sgpm.Channel_2 = class extends Ypsilon.Sgpm.Channel {
    constructor() {
        super();

        this.shouldUseSpecialMode = false;

        this.f_num_msb_block = new Uint8Array(4);
        this.f_num_lsb_storage = new Uint8Array(4);
        this.keyCode = new Uint8Array(4);
        this.lfo_pmPhase = new Int8Array(4);

        // 

        this.f_num_lsb = new Proxy({
            0: undefined,
            1: undefined,
            2: undefined,
            3: undefined
        }, {
            get: this.GETTER.bind(this),
            set: this.SETTER.bind(this)
        });
    }

    RESET() {
        super.RESET();

        this.keyCode.forEach( (value, index, array) => array[index] = 0 );
        this.lfo_pmPhase.forEach( (value, index, array) => array[index] = 0 );
    }
    
    UPDATE_PM_VALUES() {
        // Here we must update for each operator individually, instead
        // of whole channel.

        if (this.shouldUseSpecialMode) for (let i = 0; i < 4; i++) super.UPDATE_PM_VALUES(i);
        else super.UPDATE_PM_VALUES();
    }

    EXECUTE_OPERATOR(index) {
        // In special mode location 0 in frequency arrays is used for
        // operator 3, so indexes must be remapped. 0 becomes 3 and the
        // rest are shifted - 1 2 3 0

        if (this.shouldUseSpecialMode) {
            const DATA_INDEX = (index == 3) ? 0 : (index + 1);

            this.OPERATORS[index].EXECUTE(
                this.f_num_msb_block[DATA_INDEX],
                this.f_num_lsb_storage[DATA_INDEX],
                this.keyCode[DATA_INDEX],
                this.lfo_amAttenuation,
                this.lfo_pmPhase[DATA_INDEX]
            );
        }
        else super.EXECUTE_OPERATOR(index);
    }
}

// 

Ypsilon.Sgpm.Channel_5 = class extends Ypsilon.Sgpm.Channel {
    constructor() {
        super();

        this.shouldEnablePcmMode = false;
        this.pcmData = 128; // 8 bit. Or 7?
    }

    RESET() {
        super.RESET();

        this.pcmData = 128;
    }

    DO_WORK() {
        // If enabled, turn unsigned data to signed and
        // shift to make up a 14 bit number.

        if (this.shouldEnablePcmMode) return (this.pcmData - 128) << 6;
        else return super.DO_WORK();
    }
}

/////////////////////////////////
//      TOO MUCH THINKING      //
/////////////////////////////////

Ypsilon.Sgl = class {
    #shouldUpdateVolumeInsteadOfTone = false;
    #channelNumber = 0;
    
    constructor() {
        this.output = new Float32Array(1);

        Object.defineProperties(this, {
            "CHANNELS": {
                value: (function () {
                    const ARRAY = [
                        new Ypsilon.Sgl.Tone,
                        new Ypsilon.Sgl.Tone,
                        new Ypsilon.Sgl.Tone
                    ];

                    ARRAY.push(
                        new Ypsilon.Sgl.Noise(ARRAY[2])
                    );

                    return ARRAY;
                })()
            }
        });
    }

    RESET() {
        this.output[0] = 0;
        this.#shouldUpdateVolumeInsteadOfTone = false;
        this.#channelNumber = 0;

        this.CHANNELS.forEach( channel => channel.RESET() );
    }

    SEND_DATA(object) {
        const NAMES = LIB_MD_VGM.instructionNames;
        const NAME = object.name;
        var data = 0;

        switch (NAME) {
            case NAMES[18]:
                data = object[0];
                this.#shouldUpdateVolumeInsteadOfTone = object[1];
                this.#channelNumber = object.channelNumber;

                break;
            case NAMES[19]:
                data = object[0];

                break;
            default: return;
        }

        const CHANNEL = this.CHANNELS[this.#channelNumber];

        if (this.#shouldUpdateVolumeInsteadOfTone) {
            CHANNEL.volume = data & 15;
        }
        else {
            if (this.#channelNumber == 3) {
                CHANNEL.shouldBeWhiteInsteadOfPeriodic = !!((data >> 2) & 1);
                CHANNEL.noisePeriod = data & 3;
            }
            else {
                if (NAME == NAMES[18]) {
                    // Replace first 4 bit data of current value with
                    // input 4 bit data.

                    CHANNEL.tone = (CHANNEL.tone & 0b1111110000) + (data & 15);
                }
                else {
                    // Replace last 6 bit data with input.

                    CHANNEL.tone = (CHANNEL.tone & 15) + ((data & 63) << 4);
                }
            }
        }
    }

    EXECUTE() {
        const CHANNEL_COUNT = this.CHANNELS.length;

        var output = 0;

        for (let i = 0; i < CHANNEL_COUNT; i++) {
            output += this.CHANNELS[i].EXECUTE();
        }

        return this.output[0] = output;
    }
}

// 

Ypsilon.Sgl.Tone = class {
    #counter = 0; // 10 bit.
    #positive = false;
    
    constructor() {
        this.output = 0; // 16 bit signed.

        // 

        this.shouldBeBypassed = false;

        this.volume = 15; // 3 bit.
        this.tone = 511; // 10 bit.
    }

    get positive() {
        return this.#positive;
    }

    RESET() {
        this.output = 0;
        this.#counter = 0;
        this.#positive = false;

        this.volume = 15;
    }

    GET_TONE() {
        return this.tone;
    }

    COUNT_DOWN() {
        this.#counter -= 1;

        if (this.#counter <= 0) {
            this.#positive = !this.#positive;
            this.#counter = this.GET_TONE();

            // Don't let the counter be set a value of 0 or negative.

            if (this.#counter <= 0) this.#counter = 1;

            return true;
        }

        return false;
    }

    IS_TIME() {
        if (this.GET_TONE() < 2) {
            return true;
        }

        return this.COUNT_DOWN();
    }

    DO_WORK() { this.output = this.#positive ? 1 : -1 }

    EXECUTE() {
        if ( this.shouldBeBypassed || (this.volume >= 15) ) return 0;

        if ( this.IS_TIME() ) this.DO_WORK();

        // Volume can change at any moment, even if phase changes once
        // in a period of time.

        return this.output * this.VOLUME_TABLE[this.volume];
    }
}

Object.defineProperties(Ypsilon.Sgl.Tone.prototype, {
    "VOLUME_TABLE": {
        value: new Float32Array(
            (function () {
                // There are 16 levels with 2db step. 16th level
                // gives silence. Output resolution is 16 bit.

                var array = [
                    32767, 26028, 20675, 16422,
                    13045, 10362, 8231, 6568,
                    5193, 4125, 3277, 2603,
                    2067, 1642, 1304, 0
                ]

                // #NOTE
                // I've decided to set the maximum level of a SGL channel to...
                // Seems fine, but that's not an accurate value. Unfortunately, I couldn't
                // figure out one.

                array.forEach(function (element, index) {
                    array[index] = element / 32767 * 0.07943282347242814; // -22 dB
                });

                return array;
            })()
        )
    }
});

// 

Ypsilon.Sgl.Noise = class extends Ypsilon.Sgl.Tone {
    #noiseBitArray = 0; // 15 bit.
    #otherChannel = null;

    constructor(otherChannel = { tone: 128 }) {
        super();

        this.#otherChannel = otherChannel;

        this.shouldBeWhiteInsteadOfPeriodic = false;
        this.noisePeriod = 0; // 2 bit.

        // Tone is absent on noise channel.

        delete this.tone;
    }

    RESET() {
        super.RESET();

        this.#noiseBitArray = 0;
    }

    GET_TONE() {
        var tone = 0;

        switch (this.noisePeriod) {
            case 0:
                tone = 16;
                break;
            case 1:
                tone = 32;
                break;
            case 2:
                tone = 64;
                break;
            case 3:
                tone = this.#otherChannel.tone;
        }

        return tone;
    }

    PARITY(value) {
        // Parity function returns 1 if number of 1s in binary number
        // is odd.

        value ^= value >> 8;
        value ^= value >> 4;
        value ^= value >> 2;
        value ^= value >> 1;

        return value & 1;
    }

    IS_TIME() {
        return this.COUNT_DOWN();
    }

    DO_WORK() {
        // Noise channel only modifies its values when in
        // positive phase. While negative phase, last value stays on
        // the output.

        if (this.positive) {
            // So we have a "bit array" in a form of number here. We can
            // get the first, less significant bit as the output right away.
            // Note, that noise channel perceived as louder than the rest,
            // so we output 2 instead of 1.

            const LSB = this.#noiseBitArray & 1;

            this.output = LSB ? 0 : 2;

            // Now we'll get a value which will be used as the most significant bit.
            // In case of white noise we're using bit mask to get the value. You can
            // change this mask to get variations of noise. Default is 0b1001.
            // Bit array is still unchanged for now.

            var msb = this.shouldBeWhiteInsteadOfPeriodic ? this.PARITY(this.#noiseBitArray & 0b1001) : LSB;

            // Now when we have the the bit, we need to invert its value.

            msb = (msb + 1) & 1;

            // And now we modify the array - shift all bits and add the bit we got
            // as last one to the end.

            this.#noiseBitArray >>= 1;
            this.#noiseBitArray |= (msb << 15);
        }
    }
}

/////////////////
//      ?      //
/////////////////

Object.seal(Ypsilon.Sgl.Noise);
Object.seal(Ypsilon.Sgl.Tone);
Object.seal(Ypsilon.Sgl);
Object.seal(Ypsilon.Sgpm.Channel_5);
Object.seal(Ypsilon.Sgpm.Channel_2);
Object.seal(Ypsilon.Sgpm.Channel.Operator_0);
Object.seal(Ypsilon.Sgpm.Channel.Operator.EnvelopeGenerator);
Object.seal(Ypsilon.Sgpm.Channel.Operator.PhaseGenerator);
Object.seal(Ypsilon.Sgpm.Channel.Operator);
Object.seal(Ypsilon.Sgpm.Channel);
Object.seal(Ypsilon.Sgpm.Lfo);
Object.seal(Ypsilon.Sgpm);
Object.seal(Ypsilon.GeneratorWrap);
Object.seal(Ypsilon);

Object.freeze(Ypsilon.Sgl.Noise.prototype);
Object.freeze(Ypsilon.Sgl.Tone.prototype);
Object.freeze(Ypsilon.Sgl.prototype);
Object.freeze(Ypsilon.Sgpm.Channel_5.prototype);
Object.freeze(Ypsilon.Sgpm.Channel_2.prototype);
Object.freeze(Ypsilon.Sgpm.Channel.Operator_0.prototype);
Object.freeze(Ypsilon.Sgpm.Channel.Operator.EnvelopeGenerator.prototype);
Object.freeze(Ypsilon.Sgpm.Channel.Operator.PhaseGenerator.prototype);
Object.freeze(Ypsilon.Sgpm.Channel.Operator.prototype);
Object.freeze(Ypsilon.Sgpm.Channel.prototype);
Object.freeze(Ypsilon.Sgpm.Lfo.prototype);
Object.freeze(Ypsilon.Sgpm.prototype);
Object.freeze(Ypsilon.GeneratorWrap.prototype);
Object.freeze(Ypsilon.prototype);