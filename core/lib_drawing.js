const LIB_DRAWING = new function () {
    this.Viewport = class extends HTMLBodyElement {
        #dummyNode;
    
        #viewWidth = 0;
        #viewHeight = 0;
    
        constructor() {
            super();
    
            // Invisible dummy element, used to move all attached
            // elements using transform. To achieve camera effect, I guess.
    
            this.#dummyNode = document.createElement("div");
            this.#dummyNode.classList.add("view-focus-point")
    
            this.appendChild(this.#dummyNode);
    
            // 
    
            this.classList.add("view-body");
    
            Object.defineProperties(this, {
                "canvas_list": {
                    value: []
                },
                "viewX": {
                    value: 0,
                    writable: true
                },
                "viewY": {
                    value: 0,
                    writable: true
                },
                "matrix": {
                    value: new DOMMatrix
                }
            });
    
            // 
    
            const FOCUS_MOVE = (function (event) {
                this.matrix.e += event.movementX;
                this.matrix.f += event.movementY;
    
                this.updateTransform();
            }).bind(this);
            
            addEventListener("pointerdown", function (event) {
                switch (event.button) {
                    case 1:
                        addEventListener("pointermove", FOCUS_MOVE);
    
                        break;
                }
            });
            
            addEventListener("pointerup", function (event) {
                switch (event.button) {
                    case 0:
                        break;
                    case 1:
                        removeEventListener("pointermove", FOCUS_MOVE);
    
                        break;
                }
            });
    
            // 
    
            const RESIZE = (function () {
                if (
                    this.#viewWidth != this.clientWidth ||
                    this.#viewHeight != this.clientHeight
                ) {
                    this.#viewWidth = this.clientWidth;
                    this.#viewHeight = this.clientHeight;
    
                    this.canvas_list.forEach(
                        (function (canvas) {
                            canvas.width = this.#viewWidth;
                            canvas.height = this.#viewHeight;
                        }).bind(this)
                    );
        
                    this.updateTransform();
                }
    
                requestAnimationFrame(RESIZE);
            }).bind(this);
    
            RESIZE();
        }
    
        addDomNodes() {
            this.#dummyNode.append(...arguments);
        }
    
        addCanvas(value) {
            this.append(value);
            this.canvas_list.push(value);
        }
    
        redrawCanvas(index) {
            this.canvas_list[index].draw(this.#viewWidth, this.#viewHeight);
        }
    
        updateTransform() {
            this.#dummyNode.style.transform = "matrix(" +
            String([this.matrix.a, this.matrix.b, this.matrix.c, this.matrix.d, this.matrix.e, this.matrix.f]) + ")";
    
            this.canvas_list.forEach(
                (function (canvas) {
                    canvas.draw(this.#viewWidth, this.#viewHeight, this.matrix);
                }).bind(this)
            );
        }
    };

    customElements.define("viewport-body", this.Viewport, { extends: "body" });

    // 

    this.makeCanvas = function (drawingMethod = () => {}) {
        const CANVAS = document.createElement("canvas");
        CANVAS.classList.add("view-canvas");
    
        CANVAS.draw = drawingMethod;
    
        return CANVAS;
    };
    
    this.makeOffscreenCanvas = function (width = 0, height = 0, drawingMethod = () => {}) {
        const CANVAS = new OffscreenCanvas(width, height);
    
        CANVAS.draw = drawingMethod;
    
        return CANVAS;
    };
}