class ContainerWithTransform extends HTMLElement {
    constructor() {
        super();

        Object.defineProperties(this, {
            "matrix": {
                value: new DOMMatrix,
                writable: true
            }
        });
    }

    applyTransform() {
        this.style.transform = "matrix(" +
        String([this.matrix.a, this.matrix.b, this.matrix.c, this.matrix.d, this.matrix.e, this.matrix.f]) + ")";
    }
}

customElements.define("container-with-transform", ContainerWithTransform);

class WaBlueprint {
    #disconnect(entryKey = "", portKey = "output") {
        const PART_OF = LIB_0.object.deepCopy( this.entryRegistry[entryKey].ports[portKey].partOf );
        
        if (PART_OF.length != 0) {
            PART_OF.forEach(
                (function (wireKey) {
                    // Disconnect nodes.
    
                    const WIRE = this.visual_wires[wireKey];
            
                    if (
                        !this.nodeDisconnectionMethod(
                            this.entryRegistry[ WIRE.start.nodeDom._key ].node,
                            this.entryRegistry[ WIRE.end.nodeDom._key ].node
                        )
                    ) return;
                    
                    // Clear port links to each other.
            
                    LIB_0.unsorted.array_findAndRemove(
                        WIRE.start.inputs,
                        WIRE.end
                    );
            
                    LIB_0.unsorted.array_findAndRemove(
                        WIRE.end.outputs,
                        WIRE.start
                    );
            
                    // Not a part of a connection anymore.
            
                    LIB_0.unsorted.array_findAndRemove( WIRE.start.partOf, wireKey );
                    LIB_0.unsorted.array_findAndRemove( WIRE.end.partOf, wireKey );
                }).bind(this)
            );
        
            PART_OF.forEach(
                (function (wireKey) {
                    delete this.visual_wires[wireKey];
                }).bind(this)
            );
        };
    }
    
    #connect(wireKey = "", descriptorObject = {}) {
        try {
            const SRC_PORT_OUT = this.entryRegistry[descriptorObject.source].ports.output;
            const TARGET_PORT_IN = this.entryRegistry[descriptorObject.target].ports.input;
            
            // Regardless if connected or not, check the following.
            // Is source also a target?

            if (descriptorObject.source == descriptorObject.target) {
                shellMessage("Can't connect to self");
                return;
            }

            // Abort if target output is connected to source input (while
            // we trying to connect source output to target input, results in
            // loop).

            const TARGET_PORT_OUT = this.entryRegistry[descriptorObject.target].ports.output;
            const SOURCE_PORT_IN = this.entryRegistry[descriptorObject.source].ports.input;
            
            if ( TARGET_PORT_OUT.inputs.includes(SOURCE_PORT_IN) ) {
                shellMessage("Nodes already connected. Disconnect first");
                return;
            };

            // If connected to something.

            if (SRC_PORT_OUT.inputs.length > 0) {
                // Abort if we trying to make same connection again.
    
                if ( SRC_PORT_OUT.inputs.includes(TARGET_PORT_IN) ) {
                    shellMessage("Same connection already exists");
                    return;
                };
            }
            
            this.#disconnect(SRC_PORT_OUT.nodeDom._key, "output");
            
            // 

            if (
                !this.nodeConnectionMethod(
                    this.entryRegistry[descriptorObject.source].node,
                    this.entryRegistry[descriptorObject.target].node
                )
            ) return;

            
            this.visual_wires[wireKey] = {
                start: this.entryRegistry[descriptorObject.source].ports.output,
                end: this.entryRegistry[descriptorObject.target].ports.input
            }
    
            // 
    
            SRC_PORT_OUT.inputs.push(TARGET_PORT_IN);
            TARGET_PORT_IN.outputs.push(SRC_PORT_OUT);
    
            // 
    
            SRC_PORT_OUT.partOf.push(wireKey);
            TARGET_PORT_IN.partOf.push(wireKey);
        }
        catch {
            shellMessage("Could not create a connection");
        }
    }

    constructor() {
        const THIS = this;
        const DISCONNECT = this.#disconnect.bind(this);
        const CONNECT = this.#connect.bind(this);

        Object.defineProperties(this, {
            "entryRegistry": {
                value: {}
            },
            "visual_wires": {
                value: {}
            },
            "viewport": {
                value: new LIB_DRAWING.Viewport
            }
        });

        this.node_constructors = {};

        // Whenever you create a new entry, these names considered to
        // be taken by provided nodes, available only to them.

        this.referenceEntries = {};

        // 

        this.nodeConnectionMethod = () => {};
        this.nodeDisconnectionMethod = () => {};

        this.project = {
            "camera": {
                "translation": {
                    "x": 100,
                    "y": 100
                }
            },
            "entries": {
                "Buffering Handler": {
                    "translation": {
                        "x": 100,
                        "y": 200
                    }
                },
                "Filter": {
                    "translation": {
                        "x": 350,
                        "y": 100
                    }
                },
                "Analyzer": {
                    "translation": {
                        "x": 600,
                        "y": 200
                    }
                },
                "Post Gain": {
                    "translation": {
                        "x": 850,
                        "y": 100
                    }
                },
                "Audio Device": {
                    "translation": {
                        "x": 1100,
                        "y": 200
                    }
                }
            },
            "connections": {
                "0": {
                    "source": "Buffering Handler",
                    "target": "Filter"
                },
                "1": {
                    "source": "Filter",
                    "target": "Analyzer"
                },
                "2": {
                    "source": "Analyzer",
                    "target": "Post Gain"
                },
                "3": {
                    "source": "Post Gain",
                    "target": "Audio Device"
                }
            }
        };

        // Viewport setup.
        // Grid canvas.

        this.viewport.addCanvas(
            LIB_DRAWING.makeCanvas(
                function (width = 0, height = 0, matrix, size = 64) {
                    const CONTEXT = this.getContext("2d");
                    CONTEXT.clearRect(0, 0, width, height);
                
                    // Draw pattern first. A square.
                
                    if (this.patternCanvas == null) {
                        this.patternCanvas = LIB_DRAWING.makeOffscreenCanvas(size, size, function () {
                            const CONTEXT = this.getContext("2d");
                
                            CONTEXT.strokeStyle = "hsla(217, 0%, 100%, 0.25)";
                            CONTEXT.lineWidth = 2;
                            CONTEXT.beginPath();
                            
                            CONTEXT.moveTo(0, 0);
                            CONTEXT.lineTo(size, 0);
                            CONTEXT.lineTo(size, size);
                            CONTEXT.lineTo(0, size);
                            CONTEXT.lineTo(0, 0);
                            
                            CONTEXT.stroke();
                
                            // 
                
                            this.pattern = CONTEXT.createPattern(this, null);
                        });
                
                        this.patternCanvas.draw();
                    }
                
                    if (this.patternCanvas.width != size) {
                        this.patternCanvas.draw();
                    }
                
                    // Draw grid.
                
                    const PATTERN = this.patternCanvas.pattern;
                    PATTERN.setTransform(matrix);
                    
                    CONTEXT.fillStyle = PATTERN;
                    
                    CONTEXT.fillRect(0, 0, width, height);
                
                    // Draw center lines.
                    
                    CONTEXT.strokeStyle = "hsla(217, 0%, 100%, 0.5)";
                    CONTEXT.lineWidth = 4;
                    
                    CONTEXT.beginPath();
                
                    CONTEXT.moveTo(0, matrix.f);
                    CONTEXT.lineTo(width, matrix.f);
                    CONTEXT.moveTo(matrix.e, 0);
                    CONTEXT.lineTo(matrix.e, height);
                
                    CONTEXT.stroke();
                }
            )
        );

        // Wires canvas.

        const WIRES = this.visual_wires;
        const MATRIX = this.viewport.matrix;

        this.viewport.addCanvas(
            LIB_DRAWING.makeCanvas(
                function (width = 0, height = 0, matrix = MATRIX) {
                    const CONTEXT = this.getContext("2d");
                    CONTEXT.setTransform();
                    CONTEXT.clearRect(0, 0, width, height);
                    CONTEXT.setTransform(matrix);

                    // 
                
                    CONTEXT.lineWidth = 4;
                    // CONTEXT.lineCap = "round";
                
                    var startX = 0;
                    var startY = 0;
                    var endX = 0;
                    var endY = 0;
                    var handleLengthX = 0;
                
                    Object.entries(WIRES).forEach(function (entry) {
                        CONTEXT.strokeStyle = (entry[1].color == undefined) ? "white" : entry[1].color;
                
                        [startX, startY] = entry[1].start.position;
                        [endX, endY] = entry[1].end.position;
                
                        handleLengthX = Math.abs(endY - startY) * 0.75;
                        
                        CONTEXT.beginPath();
                    
                        CONTEXT.moveTo(startX, startY);
                        CONTEXT.bezierCurveTo(
                            startX + handleLengthX, startY, // Start handle position
                            endX - handleLengthX, endY, // End handle position
                            endX, endY
                        );
                        
                        CONTEXT.stroke();
                    });
                }
            )
        );

        // #NOTE
        // That way you can use some of features it has if you need it.

        window.pointerManager = new class PointerManager {
            constructor() {
                Object.defineProperties(this, {
                    "x": {
                        value: 0,
                        writable: true
                    },
                    "y": {
                        value: 0,
                        writable: true
                    },
                    "context": {
                        value: null,
                        writable: true
                    },
                    "port": {
                        value: new THIS.constructor.prototype.PORT_MOUSE
                    }
                });

                // Context menu stuff.

                var propList = [];

                const OPTION_LIST = LIB_QUICK_UI.create_optionList(
                    () => propList
                );
            
                const CALL_FLOATY = LIB_QUICK_UI.make_floatingBlock(
                    {
                        blockContent: OPTION_LIST
                    }
                );

                // 

                const BP_MOVE_BLOCK = (function (branch, domNode) {
                    const LISTENER = function (event) {
                        domNode.matrix.e += event.movementX;
                        domNode.matrix.f += event.movementY;

                        domNode.applyTransform();

                        THIS.viewport.redrawCanvas(1);
                        

                        CALL_FLOATY(event);
                    }

                    addEventListener("pointermove", LISTENER);

                    addEventListener("pointerup", function () {
                        this.removeEventListener("pointermove", LISTENER);
                    });

                    // #TODO
                    // Expose modifiable properties in context menu. Menu should have
                    // list of names of properties and input field to set a value.

                    propList = Object.keys(
                        this.entryRegistry[domNode._key].node.constructor.prototype
                    );

                    OPTION_LIST.fill();
                }).bind(THIS);

                const BP_PULL_WIRE = (function (branch, domNode) {
                    try {
                        // Add one to the largest number value of a key.

                        const NEW_KEY = LIB_0.object.getAvailableKeyNumber(this.visual_wires);

                        // 

                        const PORT = this.entryRegistry[domNode._key].ports["output"];

                        this.visual_wires[NEW_KEY] = {
                            start: PORT,
                            end: pointerManager.port,
                            color: "cyan"
                        };

                        const LISTENER = () => this.viewport.redrawCanvas(1);

                        addEventListener("pointermove", LISTENER);

                        addEventListener("pointerup", function () {
                            this.removeEventListener("pointermove", LISTENER);
                        });

                        // 

                        pointerManager.context = {
                            type: "dragWire",
                            wireKey: NEW_KEY,
                            nodeKey: domNode._key
                        };
                    }
                    catch {
                        shellMessage("Could not create a wire");
                    }
                }).bind(THIS);

                const BP_DISCONNECT_PORT = (function (branch, domNode) {
                    DISCONNECT(domNode._key);
                    this.viewport.redrawCanvas(1);
                }).bind(THIS);

                const BP_CONNECT_PORT = (function (branch) {
                    LIB_0.unsorted.switchOnClass(
                        branch,
                        {
                            "qui-transformable": function (branch, domNode) {
                                // Remove temporary wire to a pointer, and then
                                // create new while also creating a connection for same key.

                                delete THIS.visual_wires[
                                    pointerManager.context.wireKey
                                ];

                                CONNECT(
                                    pointerManager.context.wireKey,
                                    {
                                        source: pointerManager.context.nodeKey,
                                        target: domNode._key
                                    }
                                );
                            }
                        }
                    );

                    return true;
                }).bind(THIS);
        
                // #NOTE
                // These events has "this" bound to pointer manager.
                // I can't figure out where-what should go right now.
        
                THIS.viewport.addEventListener(
                    "pointermove",
                    (function (event) {
                        // Position is calculated relative to viewport element.

                        const RECTANGLE = THIS.viewport.getBoundingClientRect();

                        this.x = event.pageX - RECTANGLE.left - THIS.viewport.matrix.e;
                        this.y = event.pageY - RECTANGLE.top - THIS.viewport.matrix.f;
                    }).bind(this)
                );
        
                THIS.viewport.addEventListener(
                    "pointerdown",
                    (function (event) {
                        switch (event.button) {
                            case 0: {
                                const BRANCH = document.elementsFromPoint(event.pageX, event.pageY);
            
                                LIB_0.unsorted.switchOnClass(
                                    BRANCH,
                                    {
                                        "qui-transformable": BP_MOVE_BLOCK,
                                        "qui-drag-handle": function () {
                                            if (event.ctrlKey) {
                                                LIB_0.unsorted.switchOnClass(
                                                    BRANCH,
                                                    {
                                                        "qui-transformable": BP_DISCONNECT_PORT
                                                    }
                                                );
                                            }
                                            else {
                                                LIB_0.unsorted.switchOnClass(
                                                    BRANCH,
                                                    {
                                                        "qui-transformable": BP_PULL_WIRE
                                                    }
                                                );
                                            }
                                        }
                                    }
                                );
            
                                break;
                            }
                        }
                    }).bind(this)
                );
        
                THIS.viewport.addEventListener(
                    "pointerup",
                    (function (event) {
                        if (this.context != null) {
                            switch (this.context.type) {
                                case "dragWire": {
                                    const BRANCH = document.elementsFromPoint(event.pageX, event.pageY);
                
                                    LIB_0.unsorted.switchOnClass(
                                        BRANCH,
                                        {
                                            "qui-drag-handle": BP_CONNECT_PORT
                                        },
                                        function () {
                                            delete THIS.visual_wires[
                                                pointerManager.context.wireKey
                                            ];
                                        }
                                    );
                                }
                            }
                            
                            THIS.viewport.redrawCanvas(1);
                            this.context = null;
                        }
                    }).bind(this)
                );
            }
        }
    }

    makePortContainerNode(entryKey = "Default Key") {
        var CONTAINER = document.createElement("div");
        CONTAINER.classList.add("wabp-port-container", "qui-drag-handle");
        CONTAINER.textContent = "➕";
    
        // 
    
        return LIB_QUICK_UI.wrapInContainer_0(CONTAINER, entryKey);
    }

    makeEntry(entryKey = "", descriptorObject = {}) {
        if ( Object.keys(this.entryRegistry).includes(entryKey) ) return;
        
        // #NOTE
        // Entry key will be baked into a node and a DOM node, so you can identify
        // which entry the target you're having belongs to.
    
        const ENTRY = {
            node: null,
            nodeDom: null,
            ports: null
        }
    
        if ( Object.keys(this.referenceEntries).includes(entryKey) ) ENTRY.node = this.referenceEntries[entryKey];
        else if (descriptorObject.type != null) {
            if (descriptorObject.type in this.node_constructors) {
                ENTRY.node = this.node_constructors[ descriptorObject.type ]();
    
                /* Object.defineProperties(ENTRY.node, {
                    "_key": {
                        value: entryKey
                    }
                }); */
            }
        }
    
        // Now we create an UI component of node.
    
        const NODE_DOM = new ContainerWithTransform;
        NODE_DOM.classList.add("qui-transformable");
    
        NODE_DOM.matrix.e = descriptorObject.translation.x;
        NODE_DOM.matrix.f = descriptorObject.translation.y;
    
        NODE_DOM.applyTransform();
    
        NODE_DOM.append( this.makePortContainerNode(entryKey) );
    
        ENTRY.nodeDom = NODE_DOM;
    
        Object.defineProperties(NODE_DOM, {
            "_key": {
                value: entryKey
            }
        });
    
        this.viewport.addDomNodes(NODE_DOM);
    
        // 
    
        ENTRY.ports = {
            output: new this.PORT_NODE(
                ENTRY.nodeDom
            ),
            input: new this.PORT_NODE(
                ENTRY.nodeDom, true
            )
        };
    
        // 
    
        this.entryRegistry[entryKey] = ENTRY;
    }

    loadProject() {
        this.viewport.matrix.e = this.project.camera.translation.x;
        this.viewport.matrix.f = this.project.camera.translation.y;
    
        const MAKE_ENTRY = this.makeEntry.bind(this);
        const CONNECT = this.#connect.bind(this);

        // 
    
        try {
            Object.entries(this.project.entries).forEach(function (entry) {
                MAKE_ENTRY(entry[0], entry[1]);
            });
        }
        catch {
            shellMessage("Could not create entries from project data");
        }
        
        try {
            Object.entries(this.project.connections).forEach(function (entry) {
                CONNECT(entry[0], entry[1]);
            });
        }
        catch {
            shellMessage("Could not create connections from project data");
        }
    }
}

(function () {
    class Port {
        constructor(isInput = false) {
            // #NOTE
            // If it is an input, it should not have input list, and so
            // we define read only input list as null so it can't be created.
    
            if (isInput) {
                Object.defineProperties(this, {
                    "inputs": {
                        value: null
                    },
                    "outputs": {
                        value: [],
                        writable: true
                    }
                });
            }
            else {
                Object.defineProperties(this, {
                    "inputs": {
                        value: [],
                        writable: true
                    },
                    "outputs": {
                        value: null
                    }
                });
            }
            
            // Keys of connections this connector is part of.
    
            Object.defineProperties(this, {
                "partOf": {
                    value: []
                }
            });
        }
    }
    
    class Port_Mouse extends Port {
        constructor() {
            super(true);
        }
    
        get position() {
            return [pointerManager.x, pointerManager.y];
        }
    }
    
    class Port_Node extends Port {
        #isInput = false;
        
        constructor(nodeDom, isInput = false) {
            super(isInput);
    
            Object.defineProperties(this, {
                "nodeDom": {
                    value: nodeDom
                }
            });
    
            this.#isInput = isInput;
        }
    
        get position() {
            const RECTANGLE = this.nodeDom.getBoundingClientRect();

            const X = this.nodeDom.matrix.e;
            const Y = this.nodeDom.matrix.f;
    
            if (this.#isInput) return [X, Y + RECTANGLE.height * 0.5];
            else return [X + RECTANGLE.width, Y + RECTANGLE.height * 0.5];
        }
    }

    Object.defineProperties(WaBlueprint.prototype, {
        "PORT_MOUSE": {
            value: Port_Mouse
        },
        "PORT_NODE": {
            value: Port_Node
        }
    });
})();