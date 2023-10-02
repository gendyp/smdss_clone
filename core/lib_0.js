const LIB_0 = {
    random: {
        stringOfCharacters(length = 5) {
            // Ranges of symbols:
            // Numbers [48, 57], length 9
            // Letters [65, 90], length 25

            var output = "";
            var result = "";

            for (let i = 0; i < length; i++) {
                // Letter or number.

                if (Math.round(
                    Math.random()
                )) {
                    result = Math.round(
                        Math.random() * 25
                    ) + 65;
                }
                else {
                    result = Math.round(
                        Math.random() * 9
                    ) + 48;
                }

                output += String.fromCharCode(result);
            }

            return output;
        }
    },
    object: {
        accessMany(array = [], key = "") {
            const LIST = [];
        
            array.forEach(function (arrayElement) {
                if (arrayElement == null) return LIST.push(arrayElement);
        
                LIST.push(
                    arrayElement[key]
                );
            });
        
            return LIST;
        },
        deepCopy(object) {
            return JSON.parse(
                JSON.stringify(object)
            ); 
        },
        extendProperty(object = {}, key = "", getter, setter) {
            if (getter == undefined && setter == undefined) throw "Can't extend. Specify parameters";
            if (!(key in object)) throw "Property by the given key wasn't found on the given object or its prototype chain";
    
            const NEW_DESC = {
                configurable: true,
                enumerable: true
            };
    
            // Find descriptor where the property was defined.

            const DESCRIPTOR = Object.getOwnPropertyDescriptor(
                this.definedOn(object, key),
                key
            );

            if (DESCRIPTOR.configurable == false) throw "\"" + key + "\"" + " property must be configurable";

            if ("value" in DESCRIPTOR) {
                var enclosedValue = object[key];
        
                if (getter == undefined) {
                    NEW_DESC.get = function () {
                        return enclosedValue;
                    }
                }
                else {
                    NEW_DESC.get = function () {
                        getter(enclosedValue);
            
                        return enclosedValue;
                    }
                }
        
                if (setter == undefined) {
                    NEW_DESC.set = function (value) {
                        enclosedValue = value;
                    }
                }
                else {
                    NEW_DESC.set = function (value) {
                        enclosedValue = value;

                        setter(enclosedValue);
                    }
                }
            }
            else {
                if (getter != undefined) {
                    if ("get" in DESCRIPTOR) {
                        const HYPER_GET = DESCRIPTOR.get;
        
                        NEW_DESC.get = function () {
                            return getter(
                                HYPER_GET.call(this)
                            );
                        }
                    }
                    else NEW_DESC.get = getter;
                }
                else {
                    if ("get" in DESCRIPTOR) NEW_DESC.get = DESCRIPTOR.get;
                }
        
                if (setter != undefined) {
                    if ("set" in DESCRIPTOR) {
                        const HYPER_SET = DESCRIPTOR.set;
        
                        NEW_DESC.set = function (value) {
                            return setter(
                                HYPER_SET.call(this, value)
                            );
                        }
                    }
                    else NEW_DESC.set = setter;
                }
                else {
                    if ("set" in DESCRIPTOR) NEW_DESC.set = DESCRIPTOR.set;
                }
            }
    
            Object.defineProperty(object, key, NEW_DESC);
    
            return object;
        },
        definedOn(object, key) {
            if (!(key in object)) throw "Property by the given key wasn't found on the given object or its prototype chain";
    
            currentObject = object;
    
            while (!currentObject.hasOwnProperty(key)) {
                currentObject = Object.getPrototypeOf(currentObject);
            }
    
            return currentObject;
        },
        traverse(object = {}, rest = [], callback = (list, key) => {}) {
            // A function to access properties of many objects with same structure
            // to do "rest[0].a = object.a" for example.

            Object.keys(object).forEach((function (key) {
                const VALUE = object[key];
        
                if (VALUE == null) return;

                // Only plain objects will be recognized.
        
                if (Object.getPrototypeOf(VALUE) == Object.prototype) {
                    this.traverse(
                        VALUE,
                        LIB_0.object.accessMany(rest, key),
                        callback
                    );
                }
                else if (Array.isArray(VALUE)) {
                    VALUE.forEach((function (arrayElement, index) {
                        this.traverse(
                            arrayElement,
                            LIB_0.object.accessMany(
                                LIB_0.object.accessMany(rest, key), index
                            ),
                            callback
                        );
                    }).bind(this));
                }
                else callback([object, ...rest], key);
            }).bind(this));
        },
        clear(object) {
            Object.keys(object).forEach(function (key) {
                delete object[key];
            });
        },
        create_indexedFromArray(array = [], key = "") {
            const OBJECT = {};
        
            array.forEach( (object) => OBJECT[ object[key] ] = object );
        
            return OBJECT;
        },
        getAvailableKeyNumber(object) {
            // It works with array-like objects with numeric keys.

            const KEYS = Object.keys(object);

            return (KEYS.length == 0) ? 0 : Number( KEYS.reverse()[0] ) + 1;
        }
    },
    file: {
        download(blob, name = "File_Without_Name") {
            // #NOTE
            // Your function must return blobs, so we won't need to deduce
            // the type of data you trying to pass.
        
            const ANCHOR = document.createElement('a');
        
            ANCHOR.href = URL.createObjectURL(blob);
            
            // We don't remove extension, so it's easier to identify
            // the files with same name but different extensions.
            // But here's regex, just in case:
            // .replace(/\.[^/.]+$/, "")
        
            ANCHOR.download = name;
        
            ANCHOR.click();
        
            URL.revokeObjectURL(ANCHOR.href);
        }
    },
    unsorted: {
        quantize(input, resolution) {
            return Math.trunc(input * resolution) / resolution;
        },
        sineFormula(freq = 1, sec = 0, phaseInRads = 0) {
            return Math.sin(
                (2 * Math.PI)
                * freq
                * sec
                + phaseInRads
            );
        },
        dB_to_amplitude(dB) {
            return Math.pow(10, dB / 20);
        },
        amplitude_to_dB(amplitude, reference = 1) {
            return 20 * Math.log10(amplitude / reference);
        },
        getTimeAsString(microseconds = 0) {
            const SEC_VALUE = microseconds / 1e+6 % 60;
            const MILLI = String(SEC_VALUE % 1).substring(3,2);
            const SEC = String( Math.trunc(SEC_VALUE) );
            const MIN = String( Math.trunc(microseconds / 6e+7) % 60 );
        
            return MIN.padStart(2, 0) + ":" + SEC.padStart(2, 0) + "." + MILLI.padStart(1, 0);
        },
        getSimpleNow() {
            const DATE = new Date;

            return String(DATE.getFullYear()).padStart(4, 0) + "-" +
            String(DATE.getMonth() + 1).padStart(2, 0) + "-" + // Month is zero-based (starts form 0, not 1)
            String(DATE.getDate()).padStart(2, 0) + "_" +
            String(DATE.getHours()).padStart(2, 0) + "-" +
            String(DATE.getMinutes()).padStart(2, 0) + "-" +
            String(DATE.getSeconds()).padStart(2, 0);
        },
        array_findAndRemove(array = [], value) {
            const KEY = array.indexOf(value);

            if (KEY != -1) {
                array.splice(KEY, 1);

                return true;
            }
            else return false;
        },
        branch_getNodeOfClass(branch, ...classNames) {
            const BRANCH_LENGTH = branch.length;
            const NAMES_LENGTH = classNames.length;
        
            var node, name;
            
            for (let i = 0; i < BRANCH_LENGTH; i++) {
                node = branch[i];
        
                for (let n = 0; n < NAMES_LENGTH; n++) {
                    name = classNames[n];
        
                    if ( node.classList.contains(name) ) return [node, name];
                }
            }
        
            return null;
        },
        switchOnClass(branch, namesAndMethods = {}, backup = () => {}) {
            const NODE_AND_CLASS = this.branch_getNodeOfClass( branch, ...Object.keys(namesAndMethods) );
        
            // If found any class name in any node of the branch.
        
            if (NODE_AND_CLASS != null) {
                var node = NODE_AND_CLASS[0];
                var name = NODE_AND_CLASS[1];
        
                if ( !namesAndMethods[name](branch, node, name) ) backup();
            }
            else backup();
        }
    }
}

class Pointer {
    constructor(object, key) {
        this.#object = object;
        this.#key = key;
    }

    get value() {
        return this.#object[this.#key];
    }

    set value(value) {
        this.#object[this.#key] = value;
    }
}