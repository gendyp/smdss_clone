const LIB_QUICK_UI = {
    customElements: {
        Input: class extends HTMLInputElement {
            #value = undefined;

            constructor(isLockWhenHeld = false) {
                super();
        
                this.lockValue = false;
                this.#value = super.value;

                // Element value will be locked either only when you hold on
                // to it, or when it's focused.

                if (isLockWhenHeld) {
                    this.addEventListener("mousedown", function (event) {
                        event.target.lockValue = true;
                    });

                    this.addEventListener("mouseup", function (event) {
                        event.target.lockValue = false;
                    });
                } else {
                    this.addEventListener("focus", function (event) {
                        event.target.lockValue = true;
                    });
    
                    this.addEventListener("blur", function (event) {
                        event.target.lockValue = false;
                    });
                }

                this.addEventListener("change", function (event) {
                    event.target.checkInput(event.target.value);
                });
            }

            checkInput(value) {
                // When input type is number, any incorrect input arrives as empty string.

                if (this.type != "number") return;

                // 

                if (value == "") value = this.#value;

                value = Number(value);

                // If min/max not set, its value equals an empty string.

                if ( (this.min != "") && (value < this.min) ) value = this.min;
                else if ( (this.max != "") && (value > this.max) ) value = this.max;

                super.value = this.#value = value;
            }
        
            get value() {
                return super.value;
            }
        
            set value(value) {
                if (!this.lockValue) super.value = this.#value = value;
            }
        }
    },
    callback_registry: [],
    updateRegisteredComponents() {
        this.callback_registry.forEach( callback => callback() );
    },
    appendHeader(element, text = "", hint = "") {
        const HEAD = document.createElement("div");
        HEAD.classList.add("qui-generic-block-head");
        HEAD.textContent = text;

        if (hint != "") HEAD.title = hint;

        if (element.childNodes.length > 0) element.childNodes[0].before(HEAD);
        else element.append(HEAD);

        return element;
    },
    appendSelector(containerHead, containerContent) {
        function changeVisibility(node, value = true) {
            if (value) node.style.display = "";
            else node.style.display = "none";
        }

        function create_selectorOption(name) {
            const OPTION = document.createElement("option");
            OPTION.value = name;
            OPTION.innerText = name;
        
            return OPTION;
        }

        // 

        const SELECTOR = document.createElement("select");
        SELECTOR.classList.add("qui-sturct-selector");

        // #WARNING
        // Content of the container MUST be the second child.

        const CHILDREN = containerContent.childNodes;

        // Hide and create an option for selecting each child.

        CHILDREN.forEach(function (child, index) {
            changeVisibility(child, false);

            SELECTOR.append(
                create_selectorOption(
                    index
                )
            );
        });

        // Make first child visible.

        changeVisibility(CHILDREN[0], true);

        SELECTOR.append(
            create_selectorOption(
                "ALL"
            )
        );

        // Private variable.

        var lastOne = "0";

        SELECTOR.addEventListener("change", function (event) {
            const VALUE = event.target.selectedOptions[0].value;

            if (VALUE == "ALL") {
                CHILDREN.forEach(function (child) {
                    changeVisibility(child, true)
                });
            }
            else {
                if (lastOne == "ALL") {
                    CHILDREN.forEach(function (child) {
                        changeVisibility(child, false)
                    });

                    changeVisibility(CHILDREN[VALUE], true);
                }
                else {
                    changeVisibility(CHILDREN[lastOne], false);
                    changeVisibility(CHILDREN[VALUE], true);
                }
            }

            lastOne = VALUE;
        });
    
        containerHead.append(SELECTOR);
    },
    wrapInContainer_0(node, text = "", hint = "") {
        const CONTAINER = document.createElement("div");
        CONTAINER.classList.add("qui-generic-block-body");

        const HEAD = document.createElement("div");
        HEAD.classList.add("qui-generic-block-head");
        HEAD.textContent = text;

        if (hint != "") HEAD.title = hint;

        CONTAINER.append(HEAD, node);

        return CONTAINER;
    },
    wrapInContainer_1(node, text = "", hint = "") {
        const CONTAINER = document.createElement("div");
        CONTAINER.classList.add("qui-generic-block-body-b");

        const HEAD = document.createElement("div");
        HEAD.classList.add("qui-generic-block-head-b");
        HEAD.textContent = text;

        // 

        if (hint != "") HEAD.title = hint;

        // 

        node.classList.add("qui-generic-block-content-b");

        // 

        CONTAINER.append(HEAD, node);

        return CONTAINER;
    },
    keepCloserToCenter(x = 0, y = 0, node_dom) {
        var tX = 0;
        var tY = 0;
        const RECTANGLE = document.documentElement.getBoundingClientRect();
        const NODE_RECTANGLE = node_dom.getBoundingClientRect();

        //
        
        node_dom.style.transform = "";

        tX = RECTANGLE.width - (x + NODE_RECTANGLE.width);
        tY = RECTANGLE.height - (y + NODE_RECTANGLE.height);

        if (tX < 0) tX = Math.round(tX / NODE_RECTANGLE.width * 100);
        else tX = 0;

        if (tY < 0) tY = Math.round(tY / NODE_RECTANGLE.height * 100);
        else tY = 0;

        // 

        if (tX < 0 || tY < 0) node_dom.style.transform = "translate(" + tX + "%, " + tY + "%)";
    },
    create_labeledContainer(element, text = "") {
        const CONTAINER = document.createElement("div");
        CONTAINER.className = "qui-labeled-container";

        CONTAINER.append(text, element);

        return CONTAINER;
    },
    create_genericBlock(name = "", hint = "") {
        const CONTAINER = document.createElement("div");
        CONTAINER.classList.add("qui-generic-block-body");

        this.appendHeader(CONTAINER, name, hint);

        return CONTAINER;
    },
    create_button(name = "", method, hint = "") {
        const BUTTON = document.createElement("input");
        BUTTON.type = "button";
        BUTTON.title = hint;
        BUTTON.value = name;

        BUTTON.onclick = method;

        return BUTTON;
    },
    create_buttonWithStates(buttonStates, hint = "") {
        const BUTTON = document.createElement("input");
        BUTTON.type = "button";
        BUTTON.title = hint;

        BUTTON.states = buttonStates;
        BUTTON.currentState = buttonStates[0];
        BUTTON.value = BUTTON.currentState[0];

        BUTTON.onclick = function (event) {
            const BUTTON = event.target;

            const NEXT_STATE = BUTTON.currentState[1]();

            BUTTON.currentState = BUTTON.states[NEXT_STATE];

            BUTTON.value = BUTTON.currentState[0];
        };

        return BUTTON;
    },
    create_numberInput({ name = "Number input", min = 0, max = 100, step = 1, value = 0 } = {}) {
        // Private?

        var private_value = value;

        // 

        const CONTAINER = document.createElement("div");
        CONTAINER.className = "qui-fine-number-input";

        const NUMBER_ELEMENT = CONTAINER.numberElement = document.createElement("input", { is: "custom-input" });
        NUMBER_ELEMENT.type = "number";
        NUMBER_ELEMENT.inputMode = "numeric";
        NUMBER_ELEMENT.min = min;
        NUMBER_ELEMENT.max = max;
        NUMBER_ELEMENT.step = step;
        NUMBER_ELEMENT.className = "qui-number-input";

        const RANGE_ELEMENT = CONTAINER.rangeElement = new this.customElements.Input(true);
        RANGE_ELEMENT.type = "range";
        RANGE_ELEMENT.min = min;
        RANGE_ELEMENT.max = max;
        RANGE_ELEMENT.step = step;

        Object.defineProperties(CONTAINER, {
            value: {
                get() {
                    return private_value;
                },
                set(value) {
                    private_value = value;
                    this.numberElement.value = value;
                    this.rangeElement.value = value;
                }
            },
            disabled: {
                get() {
                    return this.numberElement.disabled;
                },
                set(value) {
                    this.numberElement.disabled = value;
                    this.rangeElement.disabled = value;
                }
            }
        });

        // 

        const CHANGE = (function (event) {
            event.stopPropagation();

            this.value = event.target.value;

            CONTAINER.dispatchEvent( new Event("anychange", { bubbles: true }) );
        }).bind(CONTAINER);

        // We don't need to do anything on input in the number field and should
        // not let the event come outside of this container.

        NUMBER_ELEMENT.addEventListener("input", (event) => event.stopPropagation() );
        NUMBER_ELEMENT.addEventListener("change", CHANGE);

        RANGE_ELEMENT.addEventListener("input", CHANGE);
        RANGE_ELEMENT.addEventListener("change", function (event) {
            CONTAINER.dispatchEvent( new Event("release", { bubbles: true }) )

            // Calling change after the event so if value changes
            // elsewhere on release, it will be applied.

            CHANGE(event);
        });

        // Appending enclosed elements to shadow root changes
        // the target of the events to container.

        CONTAINER/*.attachShadow({ mode: "closed" })*/.append(name, RANGE_ELEMENT, NUMBER_ELEMENT);
        CONTAINER.value = value;

        return CONTAINER;
    },
    create_dialog(message = "", buttonText = "OK", action = function () {}) {
        const DIALOG = document.createElement("dialog");
        DIALOG.textContent = message;
        DIALOG.classList.add("qui-dialog", "qui-large");
    
        const BUTTON = document.createElement("button");
        BUTTON.textContent = buttonText;
        BUTTON.addEventListener("click", function () {
            action();
            DIALOG.close();
            DIALOG.remove();
        });
    
        DIALOG.append(BUTTON);
    
        document.documentElement.append(DIALOG);
    
        DIALOG.showModal();
    },
    make_floatingBlock(
        {
            blockContent,
            eventTarget = window,
            openName = "",
            partsOfSafeArea = []
        }
    ) {
        // Floating block appears on top of most UI elements, it is
        // detached by default. It's attached when opening event is triggered on
        // an opening target.
        // If event has position data, it'll be used to position the block,
        // otherwise it'll be placed in the center.

        blockContent.classList.add("qui-floating-block");
        /*
        const REORDER = function () {
            // For accessibility, I guess, reorder list elements and scroll to the bottom.

            blockContent.replaceChildren( ...Array.prototype.toReversed.call(blockContent.children) );
            blockContent.scrollTo(0, blockContent.scrollHeight);
        }
        */
        // 

        const SAFE_AREA_PARTS = [blockContent, ...partsOfSafeArea];
        const LENGTH = SAFE_AREA_PARTS.length;

        const REMOVER = function (event) {
            var target = null;

            for (let i = 0; i < LENGTH; i++) {
                target = SAFE_AREA_PARTS[i];

                if ( (event.target == target) || (target.contains(event.target)) ) return;
            }

            blockContent.remove();
        };

        const LISTENER = function (event) {
            event.preventDefault();
            document.documentElement.append(blockContent);

            // If event you've decided to use doesn't have pointer position info
            // but you need it, you can provide it by adding properties named
            // accordingly to a node. Those properties will be removed after
            // they are used.
            
            if ("placeMeX" in blockContent) {
                blockContent.style.left = blockContent.placeMeX + "px";
                blockContent.style.top = blockContent.placeMeY + "px";

                LIB_QUICK_UI.keepCloserToCenter(blockContent.placeMeX, blockContent.placeMeY, blockContent);

                delete blockContent.placeMeX;
                delete blockContent.placeMeY;
            }
            else if ( (event instanceof PointerEvent) && (event.button != -1) ) {
                blockContent.style.left = event.pageX + "px";
                blockContent.style.top = event.pageY + "px";

                LIB_QUICK_UI.keepCloserToCenter(event.pageX, event.pageY, blockContent);
            }
            else {
                const RECTANGLE = document.documentElement.getBoundingClientRect();

                blockContent.style.left = RECTANGLE.width * 0.5 + "px";
                blockContent.style.top = RECTANGLE.height * 0.5 + "px";

                blockContent.style.transform = "translate(-50%, -50%)";
            }

            // 

            addEventListener("pointerdown", REMOVER); // Try using "once". Check if same listener is added multiple times.
        };
        
        eventTarget.addEventListener(openName, LISTENER);

        addEventListener("visibilitychange", REMOVER);

        return LISTENER;
    },
    create_optionList(listGetter = () => {}) {
        // When an option selected, it sends a signal with its name.
        // That's all it does.

        const EMPTY_HOLDER = document.createElement("span");
        EMPTY_HOLDER.textContent = "List is empty";
        EMPTY_HOLDER.classList.add("qui-text-dim");

        // 

        const LISTCONTENT = document.createElement("div");
        LISTCONTENT.classList.add("qui-contrast-block-body", "qui-select-list", "qui-large");

        // 

        Object.defineProperties(LISTCONTENT, {
            "options": {
                get() {
                    return listGetter();
                }
            }
        });

        // 

        LISTCONTENT.fill = function (options) {
            // If you want, you can swap default list for some other.
            // Made possible to provide filtered list for example.

            if (options == null) options = listGetter();

            LISTCONTENT.replaceChildren();

            // 

            if (options.length == 0) {
                LISTCONTENT.append(EMPTY_HOLDER);

                return;
            }

            // 
    
            options.forEach(function (value) {
                // We use button because it's focusable and you
                // can "click" on it using keyboard, and it's focusable.

                const OPTION = document.createElement("button");
                OPTION.classList.add("qui-select-list-element");
                OPTION.textContent = value;
    
                LISTCONTENT.append(OPTION);
            });
        };

        LISTCONTENT.addEventListener("click", function (event) {
            if (event.target == this) return;

            LISTCONTENT.dispatchEvent(new CustomEvent("optionlistselect", {
                bubbles: true,
                detail: event.target.textContent
            }));
        });

        LISTCONTENT.fill();

        return LISTCONTENT;
    },
    create_optionList_immediate(mapGetter = () => {}) {
        // Makes a list and attaches a method to an option, so as soon
        // as option is selected, method is executed.

        const OPTION_LIST = LIB_QUICK_UI.create_optionList(
            () => Object.keys( mapGetter() )
        );

        OPTION_LIST.addEventListener("optionlistselect", function (event) {
            OPTION_LIST.remove();

            try {
                mapGetter()[event.detail]();
            } catch {
                shellMessage("😳 Could not execute a method provided for the option");
            }
            
        });

        return OPTION_LIST;
    },
    create_dropDownSelector(listGetter = () => {}) {
        function checkSelection() {
            const KEY = FIELD.value;

            // If value that we have when we're out of focus is
            // one of those form the list, signal that a valid value
            // was selected.
            // Othewise highlight that non-existent value was selected.
    
            if (LISTCONTENT.options.indexOf(KEY) != -1) {
                FIELD.style.color = "";

                FIELD.dispatchEvent(new CustomEvent("entrychange", {
                    bubbles: true,
                    detail: ["select", KEY]
                }));
            }
            else {
                FIELD.style.color = "red";
            }

            // Update list. We search of an occurence of characters, regardless
            // if they are separated by another characters.
            // F.e. query "jss" would match "Jazz Bass", because letters (j)(s)(s)
            // are in "(J)azz Ba(s)(s)".

            // List must always be (marked) visible before each input. After checking it,
            // we will decide should it stay visible or be hidden.
            
            LISTCONTENT.style.display = "";

            if (KEY != "") {
                // First we split the characters, "escape" non-word characters and join with
                // adding "any character" token in between.
                // We escape all the characters so the special characters won't "leak"
                // into the expression.

                const REGEXP = (function () {
                    const SET = KEY.toLowerCase().split("");

                    SET.forEach(function (element, index, array) {
                        if ( element.match(/\W/g) ) {
                            array[index] = "\\" + element;
                        }
                    });

                    return RegExp( SET.join(".*") );
                })();

                const NEW_OPTIONS = LISTCONTENT.options.filter( word => word.toLowerCase().match(REGEXP) );

                // If nothing was found, hide the list, but don't remove it.

                if (NEW_OPTIONS.length == 0) LISTCONTENT.style.display = "none";
                else LISTCONTENT.fill(NEW_OPTIONS);
            }
            else LISTCONTENT.fill();
        }

        // 

        const LISTCONTENT = LIB_QUICK_UI.create_optionList(listGetter);

        LISTCONTENT.addEventListener("optionlistselect", function (event) {
            FIELD.value = event.detail;
            checkSelection();
            this.remove();
        })

        // 

        const FIELD = document.createElement("input");

        FIELD.setOptions = function (options) {
            LISTCONTENT.options = options;
            checkSelection();
        };

        FIELD.addEventListener("focus", function () {
            // Each time list is focused we should show the whole list as
            // if no options were selected. Make sure list is visible,
            // it might have been hidden last time.

            LISTCONTENT.fill();
            LISTCONTENT.style.display = "";
        });

        FIELD.addEventListener("pointerdown", function (event) {
            LISTCONTENT.placeMeX = event.pageX;
            LISTCONTENT.placeMeY = event.pageY;
        });

        FIELD.addEventListener("input", checkSelection);

        this.make_floatingBlock(
            {
                blockContent: LISTCONTENT,
                eventTarget: FIELD,
                openName: "focus",
                partsOfSafeArea: [FIELD]
            }
        );
        
        // 

        checkSelection();

        return FIELD;
    },
    create_entryEditor(mapGetter = () => {}) {
        // #WARNING
        // You must copy your object before sending here if you don't want it to be
        // changed by this module.

        const ENTRIES = mapGetter();
    
        const CONTAINER = document.createElement("div");
        CONTAINER.className = "qui-generic-group";

        const ENTRY = this.create_dropDownSelector(
            () => Object.keys( mapGetter() )
        );
    
        // 
    
        const BUTTON_CU = document.createElement("button");
        BUTTON_CU.textContent = "CU";
        BUTTON_CU.title = "Create/Update";
    
        BUTTON_CU.addEventListener("click", function () {
            const ENTRIES = mapGetter();
            const KEY = ENTRY.value;
    
            if (KEY == "") return;
    
            if (KEY in ENTRIES) {
                CONTAINER.dispatchEvent(new CustomEvent("entrychange", {
                    bubbles: true,
                    detail: ["update", KEY]
                }));
            }
            else {
                ENTRIES[KEY] = undefined;
    
                CONTAINER.dispatchEvent(new CustomEvent("entrychange", {
                    bubbles: true,
                    detail: ["create", KEY]
                }));
    
                ENTRY.setOptions(
                    Object.keys(ENTRIES)
                );
            }
        });
    
        // 
    
        const BUTTON_DELELTE = document.createElement("button");
        BUTTON_DELELTE.textContent = "D";
        BUTTON_DELELTE.title = "Delete";
    
        BUTTON_DELELTE.addEventListener("click", function () {
            const ENTRIES = mapGetter();
            const KEY = ENTRY.value;
    
            if (KEY == "") return;
    
            if (KEY in ENTRIES) {
                delete ENTRIES[KEY];
    
                CONTAINER.dispatchEvent(new CustomEvent("entrychange", {
                    bubbles: true,
                    detail: ["delete", KEY]
                }));
    
                ENTRY.setOptions(
                    Object.keys(ENTRIES)
                );
            }
        });
    
        // 
    
        CONTAINER.append(BUTTON_CU, ENTRY, BUTTON_DELELTE);
    
        return CONTAINER;
    },
    create_customHint(text = "", pathToImage = "") {
        var block = document.createElement("div");
        var img = document.createElement("img");
    
        img.src = pathToImage;
    
        block.append(img, text);
    
        block.classList.add("qui-generic-block-body", "qui-hint", "qui-floating-block");

        return block;
    },
    create_fileSelector(accept = "", name = "Drop file", receiveFile = function () { }) {
        const HTMLE_HIDDEN = document.createElement("input");
        HTMLE_HIDDEN.type = "file";
        HTMLE_HIDDEN.accept = accept;
        HTMLE_HIDDEN.style.display = "none";
    
        const HTMLE_VISIBLE = document.createElement("input");
        HTMLE_VISIBLE.type = "button";
        HTMLE_VISIBLE.value = name;
        HTMLE_VISIBLE.title = "You can also drop files on the button";
        HTMLE_VISIBLE.className = "qui-dropzone";
    
        HTMLE_VISIBLE.addEventListener("click", function () {
            HTMLE_HIDDEN.click();
        });
    
        HTMLE_VISIBLE.addEventListener("dragover", function (event) {
            event.preventDefault();
        });
    
        HTMLE_VISIBLE.addEventListener("drop", function (event) {
            event.preventDefault();
    
            receiveFile(event.dataTransfer.files[0]);
        });
    
        HTMLE_HIDDEN.addEventListener("input", function (event) {
            const FILE = event.target.files[0];
            event.target.value = null;
    
            if (!FILE) return;
            
            receiveFile(FILE);
        });
    
        return HTMLE_VISIBLE;
    },
    attachHint(key, descriptor, node) {
        const HINT_ARRAY = [];

        if (descriptor.compact == true) HINT_ARRAY.push(
            (descriptor.displayName == undefined) ? key : descriptor.displayName
        );

        if (node.title != "") HINT_ARRAY.push(node.title);

        if (descriptor.hint != undefined) HINT_ARRAY.push(descriptor.hint);

        // Must delete for now. It will be added again later.

        delete node.title;
    
        if (HINT_ARRAY.length != 0) {
            // Here we will either add regular title (hint) or a custom one.

            const HINT = HINT_ARRAY.join("\n\n");

            if (descriptor.hintImage != undefined) {
                var timerId = 0;
                var x, y;

                const HINT_NODE = LIB_QUICK_UI.create_customHint(HINT, descriptor.hintImage);

                const SET_TIMER = function () {
                    try {
                        clearTimeout(timerId);
                    } catch {}

                    timerId = setTimeout(
                        function () {
                            document.documentElement.append(HINT_NODE);
                            LIB_QUICK_UI.keepCloserToCenter(x, y, HINT_NODE);

                            HINT_NODE.style.left = x + "px";
                            HINT_NODE.style.top = y + "px";

                            node.removeEventListener("pointermove", LISTENER);
                        },
                        1000
                    );
                }

                const LISTENER = function (event) {
                    x = event.pageX;
                    y = event.pageY;

                    SET_TIMER();

                    this.addEventListener("pointermove", LISTENER);
                }

                node.addEventListener("pointerenter", LISTENER);
                node.addEventListener("pointerout", function (event) {
                    // Trigger only when pointer is leaving the boundaries
                    // of the element itself.
                    // Target is the element we are leaving. Related target is the one
                    // we entering after leaving.
                    // It's counts as leaving if target is an element or its child,
                    // which enters related target, which is not an element or its child.
                    // 
                    // #TODO
                    // Maybe there's simpler way? Shadow root comes to mind.

                    if (
                        ( (event.target == this) || this.contains(event.target) )
                        && ( (event.relatedTarget != this) && !this.contains(event.relatedTarget) )
                    ) {
                        try {
                            clearTimeout(timerId);
                        } catch {}
    
                        HINT_NODE.remove();
                    }
                });
            }
            else node.title = HINT;
        }
    },
    create_domNode(name, value, descriptor) {
        var node = null;
        const NAME = (descriptor.displayName == undefined) ? name : descriptor.displayName;

        switch (descriptor.type) {
            case "boolean":
                const CHECKBOX = document.createElement("input");
                CHECKBOX.type = "checkbox";
                CHECKBOX.checked = value;
    
                // 

                if (descriptor.compact == true) node = CHECKBOX;
                else node = LIB_QUICK_UI.create_labeledContainer(CHECKBOX, NAME);
    
                // Define custom getter/setter for "value" property
                // of checkbox to be able to access its checked state.
    
                Object.defineProperty(node, "value", {
                    get() {
                        return CHECKBOX.checked;
                    },
                    set(value) {
                        CHECKBOX.checked = Boolean(value);
                    }
                });
    
                break;
            case "number":
                node = LIB_QUICK_UI.create_numberInput({
                    name: NAME,
                    min: descriptor.min,
                    max: descriptor.max,
                    step: descriptor.step,
                    value: value
                });
    
                break;
            case "function":
                node = document.createElement("button");
                node.textContent = NAME;

                break;
        }

        this.attachHint(name, descriptor, node);
    
        return node;
    },
    create_controlDomNode(target, key, descriptor) {
        // Creates an element and makes it a "control node".

        const NODE = this.create_domNode(key, target[key], descriptor);

        if (NODE == null) return null;

        // 
        
        var eventName = {
            "number": "anychange",
            "function": "click"
        }[descriptor.type];

        if (eventName == null) eventName = "change";

        // 

        return this.make_controlDomNode(target, key, descriptor, NODE, eventName);
    },
    make_controlDomNode(target, key, descriptor, node, eventName) {
        // This function makes "control node" out of any node you provide,
        // but you still need to describe it, because listeners will be
        // added to it based on the description.

        if (node == null) return null;
        if ( !(key in target) ) {
            console.warn("There's no", key, "in", target, "value is", target[key]);

            return null;
        }
    
        // 
    
        var listener = function () {};
    
        switch (descriptor.type) {
            case "boolean":
                listener = function (event) {
                    target[key] = event.target.checked;
                };
    
                break;
            case "number":
                listener = function (event) {
                    target[key] = Number(event.target.value);
                };
    
                break;
            case "function":
                listener = target[key].bind(target);

                break;
        }
    
        node.addEventListener(eventName, listener);

        // 

        this.callback_registry.push(function () {
            node.value = target[key];
        });
    
        return node;
    },
    make_displayDomNode(target, key, descriptor, node) {
        // This one makes a "display node", it only shows the value by reading
        // form source, you can't set value using it.

        this.attachHint(key, descriptor, node);

        this.callback_registry.push(function () {
            node.value = target[key];
        });
    
        return node;
    },
    create_controlDomNode_objectStructure(target = {}, descriptor = {}) {
        // Creates a structure which contains properties that are
        // described and do exist. If either is false, nothing will be created.
        // You can decide what will happen upon creation of
        // the DOM element.
    
        function wheresElement(element) {
            // document.body.append(element);
    
            return element;
        }
    
        function processTarget(target = {}, descriptor = {}) {
            const OBJECT = {};
    
            // Create elements for properties of a target using descriptor.
            // Pass through all properties of current descriptor.
    
            Object.keys(descriptor).forEach(function (key) {
                // If described property doesn't exist on target - ignore.
                
                if (!(key in target)) return;
    
                const TARGET_VALUE = target[key];
                const DESC_VALUE = descriptor[key];
                
                // If value of current descriptor property has "properties" key,
                // you must enter a new pass.
    
                if (DESC_VALUE.properties != undefined) {
                    // If target value is an array, create one and do a pass
                    // for each element of that target array.
    
                    if (Array.isArray(TARGET_VALUE)) {
                        const LIST = [];
    
                        TARGET_VALUE.forEach(function (element, index) {
                            LIST[index] = processTarget(element, DESC_VALUE.properties);
                        });
    
                        OBJECT[key] = LIST;
                    }
                    else OBJECT[key] = processTarget(TARGET_VALUE, DESC_VALUE.properties);
                }
                else if (DESC_VALUE.type != undefined) {
                    // Value of current descriptor property has "type" key, which describes
                    // a value. If target value is object, create a "list" of elements.
                    // Otherwise, just element.
    
                    if (typeof TARGET_VALUE == "object") {
                        let list = {};
    
                        Object.keys(TARGET_VALUE).forEach(function (value_key) {
                            list[value_key] = wheresElement(
                                LIB_QUICK_UI.create_controlDomNode(TARGET_VALUE, value_key, DESC_VALUE)
                            );
                        });
    
                        OBJECT[key] = list;
                    }
                    else OBJECT[key] = wheresElement(
                        LIB_QUICK_UI.create_controlDomNode(target, key, DESC_VALUE)
                    );
                }
            });
    
            return OBJECT;
        }
    
        return processTarget(target, descriptor);
    },
    create_domNodeStructureFromObjectStructure(target = {}, descriptor = {}) {
        // It forms already created UI elements into a structure.
        // This one creates a sturctured UI by some basic rules if there's
        // no description for a property at hand, otherwise by description.
        // If descriptor describes some property as object, when it's not,
        // it will be ignored. Descriptions are ignored if they don't match
        // the structure of target object.
    
        function makeContentNode() {
            const CONTENT = document.createElement("div");
    
            CONTENT.classList.add("qui-struct-content");
        
            return CONTENT;
        }

        const WRAP_IN_1 = LIB_QUICK_UI.wrapInContainer_1;
    
        function isThereKeyword(descriptor, keyword) {
            if ("keywords" in descriptor) {
                if (descriptor.keywords.indexOf(keyword) != -1) return true;
            }
    
            return false;
        }
    
        // 
    
        function processTarget(target = {}, descriptor = {}, key) {
            const LIST = [];
            const LABEL_TEXT = (descriptor.displayName == undefined) ? key : descriptor.displayName;
            
            // Pass through keys of TARGET object.
            
            Object.keys(target).forEach(function (key) {
                const VALUE = target[key];
                
                if (VALUE instanceof HTMLElement) LIST.push(VALUE);
                else if (typeof VALUE == "object") {
                    let _descriptor;
    
                    if (Array.isArray(VALUE)) {
                        // In case of array, one common container should be used,
                        // with a label. Calls to function should return only content,
                        // not wrapped into container. Or, wrapped into numbered
                        // container.
    
                        _descriptor = descriptor.properties[key];
    
                        const ARRAY_LABEL = (_descriptor.displayName == undefined) ? key : _descriptor.displayName;
                        const ARRAY_CONTENT = makeContentNode();
    
                        // Make new description without display name. Array itself and
                        // its elements use same descriptor, but we must force array
                        // elements to have either numbers as labels or no labels.
    
                        const ARRAY_DESC = Object.assign({}, _descriptor);
    
                        delete ARRAY_DESC.displayName;
                        delete ARRAY_DESC.classList;
    
                        // New descrptior is used only here.
    
                        VALUE.forEach(function (element, index) {
                            ARRAY_CONTENT.append(
                                ...processTarget(element, ARRAY_DESC, index)
                            );
                        });
    
                        // 
    
                        if ("classList" in _descriptor) {
                            ARRAY_CONTENT.classList.add(..._descriptor.classList);
                        }
    
                        // 

                        const CONTAINER = WRAP_IN_1(ARRAY_CONTENT, ARRAY_LABEL);

                        LIST.push(CONTAINER);

                        // Check if we should append selector.
    
                        if (isThereKeyword(_descriptor, "select")) LIB_QUICK_UI.appendSelector(CONTAINER.childNodes[0], CONTAINER.childNodes[1]);
                    }
                    else {
                        // Current object may be a "container object", created after typed array f.e.
                        // So check if there's "properties" key before accessing it.
    
                        try {
                            _descriptor = descriptor.properties[key];
                        } catch {
                            _descriptor = descriptor;
                        }
    
                        // 
    
                        LIST.push(
                            ...processTarget(VALUE, _descriptor, key)
                        );
                    }
                }
            });
    
            // If there's a keyword for merging current container with
            // the previous, we should only pass elements and containers
            // created for this container to the previous, and this container
            // should be discarded.
    
            if ( isThereKeyword(descriptor, "mergeUp") ) return LIST;
    
            const CONTENT = makeContentNode();
            CONTENT.append(...LIST);

            const RESULT = WRAP_IN_1(CONTENT, LABEL_TEXT);
    
            if ("classList" in descriptor) {
                CONTENT.classList.add(...descriptor.classList);
            }
    
            // Add "solo" ability to the boolean container.
    
            if ( (LIST.length > 1) && (descriptor.type == "boolean") ) {
                CONTENT.addEventListener("click", function (event) {
                    if (event.ctrlKey) {
                        const STUFF = this.getElementsByTagName("input");
    
                        if (event.target.type == "checkbox") {
                            const CHECKED = event.target.checked;
    
                            Array.prototype.forEach.call(STUFF, function (checkbox) {
                                if (checkbox == event.target) return;
    
                                // Only click method changes value, because UI here elements
                                // are mostly reflection of some other value.
                                // First we set a value, same as the checkbox we clicked on,
                                // then click method inverts and actually applies new value.
    
                                checkbox.checked = CHECKED;
                                checkbox.click();
                            });
                        }
                    }
                });
    
                CONTENT.title = "Boolean container - hold \"Ctrl\" to use solo ability";
            }
    
            if ( isThereKeyword(descriptor, "noShell") ) {
                CONTENT.classList.remove("qui-generic-block-content-b");
                return [CONTENT];
            }

            return [RESULT];
        }
    
        // 
        
        const MAIN_CONTAINER = processTarget(
            target,
            descriptor
        )[0];
    
        return MAIN_CONTAINER;
    },
    defineReactiveUiProperty(
        {
            sourceObject,
            sourceKey,
            object,
            key,
            initialValue = undefined,
            node,
            eventName = "",
            getter = (value) => value,
            before = (value) => value,
            after = () => {}
        } = {}
    ) {
        // This function either defines a property "tied" to an UI element,
        // or ties existing property with an element using kind of like using proxy.
        // If you want to tie and existing property, you must provide source object and key.

        getter = getter.bind(object);
        before = before.bind(object);
        after = after.bind(object);

        if (sourceObject != null) {
            if (sourceKey == null) throw "You must provide a source key";

            Object.defineProperties(object, {
                [key]: {
                    get() {
                        getter();
                        return sourceObject[sourceKey];
                    },
                    set(value) {
                        node.value = sourceObject[sourceKey] = before(value);
                        after();
                    }
                }
            });

            node.addEventListener(eventName, function () {
                sourceObject[sourceKey] = before(this.value);
                after();
            });
        }
        else {
            if (key == null) throw "You must provide a key";

            var propertyValue = initialValue;

            Object.defineProperties(object, {
                [key]: {
                    get() {
                        getter();
                        return propertyValue;
                    },
                    set(value) {
                        node.value = propertyValue = before(value);
                        after();
                    }
                }
            });

            node.addEventListener(eventName, function () {
                propertyValue = before(this.value);
                after();
            });
        }

        // Initialize.

        node.value = before(initialValue);
        after();
    }
};

Object.defineProperties(LIB_QUICK_UI, {
    "MESSAGER": {
        value: new class {
            #makeMessageNode = function (textContent = "") {
                const NODE = document.createElement("div");

                NODE.classList.add("qui-contrast-block-body", "qui-large", "qui-messager-message");

                NODE.textContent = textContent;

                return NODE;
            }

            #node_dom = null;

            #registry = {};

            constructor() {
                {
                    const NODE = document.createElement("div");
                    NODE.classList.add("qui-messager-container");
    
                    const CLEANER = (function () {
                        this.#node_dom.remove();
    
                        const REGISTRY = this.#registry;
    
                        Object.keys(REGISTRY).forEach(function (key) {
                            REGISTRY[key].bomb.force();
    
                            delete REGISTRY[key];
                        });
                    }).bind(this);
    
                    NODE.addEventListener("click", CLEANER)
    
                    this.#node_dom = NODE;
                }

                this.pushMessage = function (text = "") {
                    // If exactly the same message was added before, only reset
                    // its timeout.

                    if (text in this.#registry) {
                        const NODE = this.#registry[text];

                        // Restart animation.

                        NODE.bomb.launch();
                        NODE.classList.remove("qui-messager-message");
                        NODE.offsetWidth; // This forces the reflow, whatever that is.
                        NODE.classList.add("qui-messager-message");
                    }
                    else {
                        const NODE = this.#makeMessageNode(text);

                        if (Object.keys(this.#registry).length == 0) document.documentElement.append(this.#node_dom);

                        this.#node_dom.append(NODE);

                        // 

                        const METHOD = (function () {
                            this.#registry[text].remove();

                            delete this.#registry[text];

                            if (Object.keys(this.#registry).length == 0) this.#node_dom.remove();
                        }).bind(this);

                        // Why bomb? Well, its role is to delete the element, so it's
                        // like a sticky bomb attached to an element...

                        NODE.bomb = new TimeoutMethod(
                            METHOD,
                            3000
                        );

                        // 

                        this.#registry[text] = NODE;
                    }
                }
            }
        }
    }
});

customElements.define("custom-input", LIB_QUICK_UI.customElements.Input, { extends: "input" });


// If you want to call a function with a timeout and be able to reset the timer
// easily, this is what it's for.
// Timeout is launched as soon as object created.

class TimeoutMethod {
    #id = 0;
    #launched = false;

    constructor(method = () => {}, time = 1000) {
        this.time = time;
        this.method = method;

        this.launch = function () {
            if (this.#launched) clearTimeout(this.#id);

            const DETONATE = (function () {
                this.method(...arguments);
                this.#launched = false;
            }).bind(this);

            this.#id = setTimeout(
                DETONATE,
                this.time,
                ...arguments
            );

            this.#launched = true;
        };

        this.cancel = function () {
            if (this.#launched) clearTimeout(this.#id);
            
            this.#launched = false;
        }

        this.force = function () {
            this.cancel();

            this.method(...arguments);
        }

        // 

        this.launch();
    }
}

var shellMessage = LIB_QUICK_UI.MESSAGER.pushMessage.bind(LIB_QUICK_UI.MESSAGER);