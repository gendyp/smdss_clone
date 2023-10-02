// Positions on canvas snapped to "grid between pixels" rather
// than pixels. Search through this article.
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors

class AudioAnalyzer {
    #bufferSize = 0;
    #frequencyFftSize = 4096;
    #dataArray = null;
    #isFrequencyDomain = false; // Otherwise it's the amplitude domain.
    #amplitudeDrawingMethod = null;
    #shouldShowVolumeLevels = true;
    #amplitudeZoom = 1;
    #amplitudeScale = 1;

    #context_fg = null;
    #context_bg = null;
    #canvas_width = 0;
    #canvas_height = 0;

    #musicalScale_leastInput = 0;

    #getValueMusicalScale(value = 1, length = 0) {
        return Math.pow(value / (length - 1), 1 / 12);
    }

    constructor(context_audio, bufferSize) {
        this.#bufferSize = bufferSize;

        this.#context_fg = document.createElement("canvas").getContext("2d");
        this.#context_bg = document.createElement("canvas").getContext("2d");
        
        // #NOTE
        // An element with largest value must be the first element because it will
        // define the scale of rectangles.
        // Values should go from large to small because rectangles will be drawn one
        // by one on top of each other.
        // Rectangles are drawn with "horizontal symmetry", you only need to specify
        // highest point at the top, and it will be drawn to the same point at the bottom.

        this.bgRectanglesColors = [
            [ LIB_0.unsorted.dB_to_amplitude(3),    "rgb(255, 0, 0)" ],
            [ 1,                     "rgb(255, 255, 0)" ],
            [ LIB_0.unsorted.dB_to_amplitude(-6),   "rgb(0, 255, 0)" ],
            [ LIB_0.unsorted.dB_to_amplitude(-12),  "rgb(0, 255, 255)" ]
        ]

        // 

        this.color_bg = "rgb(20, 20, 20)";
        this.color_fg = "rgb(255, 255, 255)";

        // 

        this.node_audio = context_audio.createAnalyser();
        this.node_audio.smoothingTimeConstant = 0.5;

        // 

        
        this.node_dom = document.createElement("div");
        this.node_dom.className = "aazer-canvas-container";

        this.node_dom.append(this.#context_bg.canvas, this.#context_fg.canvas);

        // Initialize.

        this.isFrequencyDomain = this.#isFrequencyDomain; 
        this.shouldShowVolumeLevels = true;

        this.APPEND_UI();
    }

    get bufferSize() {
        return this.#bufferSize;
    }

    set bufferSize(value) {
        this.#bufferSize = value;

        this.UPDATE_DATA_ARRAY_FFT_SIZE();
    }

    get isFrequencyDomain() {
        return this.#isFrequencyDomain;
    }

    set isFrequencyDomain(value) {
        this.#isFrequencyDomain = value;

        this.UPDATE_DATA_ARRAY_FFT_SIZE();
    }

    get shouldShowVolumeLevels() {
        return this.#shouldShowVolumeLevels;
    }

    set shouldShowVolumeLevels(value) {
        this.#shouldShowVolumeLevels = value;

        this.#amplitudeDrawingMethod = value ? function () {
            this.#context_fg.fillStyle = this.color_bg;
            this.#context_fg.fillRect(0, 0, this.#canvas_width, this.#canvas_height);
            this.#context_fg.strokeStyle = this.color_fg;
        } : function () {
            this.#context_fg.strokeStyle = this.color_fg;
        };

        this.UPDATE_CANVAS_STYLE();
    }

    get amplitudeZoom() {
        return this.#amplitudeZoom;
    }

    set amplitudeZoom(value) {
        this.#amplitudeZoom = Math.trunc(value);
        this.DRAW_BG();
    }

    UPDATE_VIEWPORT() {
        // If size of containing DOM node changed.

        if (
            this.#canvas_width != this.node_dom.clientWidth ||
            this.#canvas_height != this.node_dom.clientHeight
        ) {
            this.#canvas_width = this.node_dom.clientWidth;
            this.#canvas_height = this.node_dom.clientHeight;

            this.#context_fg.canvas.width = this.#canvas_width;
            this.#context_fg.canvas.height = this.#canvas_height;
            
            this.#context_bg.canvas.width = this.#canvas_width;
            this.#context_bg.canvas.height = this.#canvas_height;

            this.DRAW_BG();

            // Transform is being reset when size changes. So we need to
            // update again.

            this.UPDATE_CANVAS_TRANSFORM();
        }
        
        this.#context_fg.clearRect(0, 0, this.#canvas_width, this.#canvas_height);
    }

    UPDATE_CANVAS_STYLE() {
        if (this.#isFrequencyDomain || !this.#shouldShowVolumeLevels) {
            this.#context_fg.canvas.style = "";
            this.#context_bg.canvas.style = "display: none";

        }
        else {
            this.#context_fg.canvas.style = "mix-blend-mode: multiply";
            this.#context_bg.canvas.style = "";
        }
    }

    UPDATE_CANVAS_TRANSFORM() {
        this.#context_fg.setTransform(1, 0, 0, 1, 0, 0);

        if (this.#isFrequencyDomain) {
            this.#context_fg.scale( 1 / (1 - this.#musicalScale_leastInput), 1 );
            this.#context_fg.translate( -this.#canvas_width * this.#musicalScale_leastInput, 0 );
        }
    }

    UPDATE_DATA_ARRAY_FFT_SIZE() {
        if (this.#isFrequencyDomain) {
            this.node_audio.fftSize = this.#frequencyFftSize;
            this.#dataArray = new Float32Array(this.node_audio.frequencyBinCount);
        }
        else {
            this.node_audio.fftSize = this.#bufferSize;
            this.#dataArray = new Float32Array(this.#bufferSize);
        }

        this.#musicalScale_leastInput = this.#getValueMusicalScale(1, this.#dataArray.length);

        this.UPDATE_CANVAS_STYLE();
        this.UPDATE_CANVAS_TRANSFORM();
    }

    DRAW_BG() {
        const MAX = this.bgRectanglesColors[0][0];

        var y_top, y_length;

        function drawRectangle (element) {
            // Normalize, convert to clip space and invert,
            // scale to canvas height.

            y_top = element[0] / MAX;
            y_top *= this.#amplitudeZoom;
            y_top = (-y_top + 1) * 0.5;
            y_top = Math.round(y_top * this.#canvas_height);

            // 

            y_length = this.#canvas_height - (y_top * 2);

            this.#context_bg.fillStyle = element[1];
            this.#context_bg.fillRect( 0, y_top, this.#canvas_width, y_length );
        }

        drawRectangle = drawRectangle.bind(this);

        // 
        
        this.#context_bg.clearRect(0, 0, this.#canvas_width, this.#canvas_height);
        this.bgRectanglesColors.forEach(drawRectangle);

        // Blurry lines workaround.

        // this.#context_fg.setTransform(1, 0, 0, 1, 0, 0);
        // this.#context_fg.translate(0.5, 0.5);

        // Set amplitude scale for amplitude view.

        this.#amplitudeScale = 1 / MAX;
    }

    DRAW_FREQUENCY() {
        const ARRAY = this.#dataArray;
        const LENGTH = ARRAY.length;

        var x = 0;
        var y = 0;

        // 

        this.#context_fg.beginPath();

        for (let i = 0; i < LENGTH; i++) {
            y = ARRAY[i];
            y = y / -100; // dB range.
            y *= this.#canvas_height;
            this.#context_fg.lineTo(x, y);

            x = this.#getValueMusicalScale(i, LENGTH);
            x = this.#canvas_width * x;
        }

        this.#context_fg.lineTo(this.#canvas_width, this.#canvas_height); // Line to right bottom corner.
        this.#context_fg.lineTo(0, this.#canvas_height); // Line to left bottom corner.

        this.#context_fg.fillStyle = this.color_fg;

        this.#context_fg.fill();
    }

    DRAW_AMPLITUDE() {
        const LENGTH = this.#dataArray.length;
        const SEGMENT_WIDTH = this.#canvas_width / (LENGTH - 1);

        var x = 0;
        var y = 0;

        this.#amplitudeDrawingMethod();
        this.#context_fg.beginPath();
        
        for (let i = 0; i < LENGTH; i++) {
            y = this.#dataArray[i] * -this.#amplitudeScale * this.#amplitudeZoom;
            y = (y + 1) * 0.5;
            y = y * this.#canvas_height;
            
            this.#context_fg.lineTo( Math.round(x), Math.round(y) );

            x += SEGMENT_WIDTH;
        }

        this.#context_fg.stroke();
    }

    APPEND_UI() {
        const CONTAINER = document.createElement("div");
        CONTAINER.classList.add("qui-generic-block-body");

        CONTAINER.append(
            this.node_dom,
            LIB_QUICK_UI.create_controlDomNode(this, "isFrequencyDomain", { type: "boolean", hint: "If checked, histogram view will be used, otherwise amplitude view" }),
            LIB_QUICK_UI.create_controlDomNode(this, "shouldShowVolumeLevels", { type: "boolean", hint: "NOTE: amplitude view only.\nRed [3dB, 0dB], yellow [0dB, -6dB], green [-6dB, -12dB], cyan [-12dB, -Infinity]" }),
            LIB_QUICK_UI.create_controlDomNode(this, "amplitudeZoom", { type: "number", min: 1, max: 80, hint: "NOTE: amplitude view only" })
        );

        LIB_QUICK_UI.appendHeader(CONTAINER, "Audio Analyzer");

        this.node_domUi = CONTAINER;
    }

    EXECUTE() {
        this.UPDATE_VIEWPORT();

        if (this.#isFrequencyDomain) {
            this.node_audio.getFloatFrequencyData(this.#dataArray);
            this.DRAW_FREQUENCY();
        }
        else {
            this.node_audio.getFloatTimeDomainData(this.#dataArray);
            this.DRAW_AMPLITUDE();
        }
    }
}

class BufferingHandler {
    #context = null;
    #buffers = new Array(2);
    #buffersData = [ [], [] ];
    #nodes = new Array(2);

    #duration;

    #lastScheduledTime = 0;
    #index = 0;

    #indicatorElement = null;

    // 

    #shouldEnableLogging = false;
    #logData = null;

    // 

    #initializeBuffers() {
        this.#buffers = [
            this.#context.createBuffer(this.numberOfChannels, this.bufferSize, this.#context.sampleRate),
            this.#context.createBuffer(this.numberOfChannels, this.bufferSize, this.#context.sampleRate)
        ];

        for (let i = 0; i < this.numberOfChannels; i++) {
            this.#buffersData[0][i] = this.#buffers[0].getChannelData(i);
            this.#buffersData[1][i] = this.#buffers[1].getChannelData(i);
        }

        this.#index = 0;
        this.#duration = this.#buffers[0].duration;
    }

    #makeNode() {
        const CHANNEL_LIST = this.#buffersData[this.#index];

        // Stop previous node.

        var node = this.#nodes[this.#index];

        if (node != undefined) {
            node.onended = null;
            node.stop();
        }

        node = this.#nodes[this.#index] = this.#context.createBufferSource();
        node.connect(this.node_audio_destination);
        node.buffer = this.#buffers[this.#index];

        // 

        const ARRAY = this.sourceArray;
        var frameNumber = 0;
        var channelNumber = 0;
        var newValue = 0;

        function addValue() {
            newValue = ARRAY[channelNumber];

            return CHANNEL_LIST[channelNumber][frameNumber] = newValue ? newValue : 0;
        }

        for (frameNumber = 0; frameNumber < this.bufferSize; frameNumber++) {
            this.LISTENERS.forEach( listener => listener() );

            for (channelNumber = 0; channelNumber < CHANNEL_LIST.length; channelNumber++) {
                if (this.#shouldEnableLogging) this.#logData.push( addValue() );
                else addValue();
            }
        }

        // Swap buffer index to fill another buffer next time.

        this.#index ^= 1;

        // 

        return node;
    }

    constructor(context, numberOfChannels, bufferSize, sourceArray) {
        //      Time ----------------------->Late--->
        //      |C  |P  |C  |P  |C  |P  |C      |P  |
        //      |   |C  |P  |C  |P  |C  |P  |---|C  |
        //      ^
        //      Scheduled here. Each square represents time period
        //      which equals "bufferSize / updateRate".

        this.#context = context;

        if (!this.#context) throw "Invalid audio node";

        // Bufferer must have dedicated node, so connections may be rearranged
        // easily. This is the node to which buffer source nodes will be connected.

        this.node_audio_destination = context.createGain();

        this.numberOfChannels = numberOfChannels;
        this.bufferSize = bufferSize;
        this.sourceArray = (sourceArray == null) ? new Uint8Array(this.numberOfChannels) : sourceArray;

        // 

        Object.defineProperties(this, {
            "LISTENERS": {
                value: []
            },
            "SCHEDULE_NEXT": {
                value: (function () {
                    // This is the time when new node is assumed to
                    // be played.

                    const ASSUMED_AT = this.#lastScheduledTime += this.#duration;

                    // Fill buffer.

                    const NODE = this.#makeNode();

                    // Check if there's time left before assumed time should come.
                    // Schedule at assumed time if yes, start now if no.

                    if (ASSUMED_AT > this.#context.currentTime) {
                        NODE.start(ASSUMED_AT);
                        this.#lastScheduledTime = ASSUMED_AT;
                    }
                    else {
                        NODE.start();
                        this.#lastScheduledTime = this.#context.currentTime;

                        // 

                        this.#indicatorElement.animate(
                            [
                                { opacity: 1, scale: 1.5 },
                                { opacity: 0, scale: 1 }
                            ],
                            {
                                duration: 1000,
                                iterations: 1
                            }
                        );
                    }

                    NODE.onended = this.SCHEDULE_NEXT;
                }).bind(this)
            }
        });

        // 

        this.#initializeBuffers();

        // 

        this.#indicatorElement = document.createElement("div");
        this.#indicatorElement.textContent = "LAG";
        this.#indicatorElement.style = "position: absolute; top: 10px; left: 10px; font-weight: bolder; opacity: 0; color: red; z-index: 100";

        document.documentElement.append(this.#indicatorElement);
    }

    get shouldEnableLogging() {
        return this.#shouldEnableLogging;
    }

    set shouldEnableLogging(value) {
        this.#shouldEnableLogging = Boolean(value);

        if (this.#shouldEnableLogging) this.#logData = [];
    }

    get logData() {
        return this.#logData;
    }

    EXECUTE() {
        this.#lastScheduledTime = this.#context.currentTime;
        this.SCHEDULE_NEXT();

        setTimeout(this.SCHEDULE_NEXT, this.#duration);
    }
}

class Interpolator {
    #samplesGeneratedLastIteration = 0.0;
    #weight = 0.0;
    #ratio = 1.0;
    #getValue = () => 0;

    constructor(getValue = function () { }, ratio = 0, numberOfChannels) {
        if (typeof getValue != "function") throw "Can't work without a function for requesting a source generation";
        if (numberOfChannels < 1) throw "Please specify positive number of channels";

        // 

        this.#getValue = getValue;
        this.ratio = ratio;

        this.input = new Float32Array(numberOfChannels);
        this.output = new Float32Array(numberOfChannels);
    }

    get ratio() {
        return this.#ratio;
    }

    set ratio(value) {
        if (value < 0.1) console.warn("Too small for new ratio");
        else this.#ratio = value;
    }

    CLEAR_OUTPUT() {
        // For each channel.

        for (let i = 0; i < this.output.length; i++) this.output[i] = 0;
    }

    ADD_WEIGHTED_TO_OUTPUT() {
        // For each channel.

        for (let i = 0; i < this.output.length; i++) this.output[i] += this.input[i] * this.#weight;
    }

    EXECUTE() {
        if (this.#ratio == 1) {
            this.#getValue();
            Object.assign(this.output, this.input);

            return;
        }

        var generated = 0.0;

        this.CLEAR_OUTPUT();

        while (true) {
            // Check if we generated enough data.
            // F.e. if value is 0.5, that means we generated 0.5 more than
            // needed and it will become a starting point for next iteration.

            generated = this.#samplesGeneratedLastIteration - this.#ratio;

            if (generated >= 0) {
                // Get the weight first and add value to the output.
                // Per execution we can generate many samples. But only one or less than one
                // per iteration.

                this.#weight = Math.min(1, this.#samplesGeneratedLastIteration) - generated;
                this.ADD_WEIGHTED_TO_OUTPUT();

                this.#samplesGeneratedLastIteration = generated;

                // This weight will be used for remainder at next iteration.

                this.#weight = generated;

                // 

                for (let i = 0; i < this.output.length; i++) this.output[i] /= this.#ratio;

                return;
            }
            else {
                // Since it's interpolation, "edge" integer is always split in two and at the end
                // of execution only first half is "consumed". At the start of execution, regardless
                // if there is or isn't, we consume second half.
                // It seems a bit confusing why we do it here and I can't explain clear enough.

                this.ADD_WEIGHTED_TO_OUTPUT();

                // 

                this.#getValue();
                this.#samplesGeneratedLastIteration++;
                this.#weight = Math.min(1, this.#ratio);
            }
        }
    }
}

// 

Object.seal(AudioAnalyzer);
Object.seal(BufferingHandler);
Object.seal(Interpolator);

Object.freeze(AudioAnalyzer.prototype);
Object.freeze(BufferingHandler.prototype);
Object.freeze(Interpolator.prototype);