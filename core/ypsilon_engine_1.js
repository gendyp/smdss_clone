Object.defineProperties(Ypsilon_Engine, {
    "HINTS": {
        value: {
            shouldUseInterpolation: "Used to make synth's SGL and PM components run at their intended speed (53267.041666666664 cycles per second for PM and 223721.5625 cycles per second for SGL). This feature makes resource consumption the same regardles of sample rate. Disabling this feature makes the synth's components depend on sample rate. Note that currently samples have absolute timing, and won't be affected by this in terms of time",
            isUsingLowPassFilter: "Non-linear. To reduce downsampling aliasing of PM component, caused by interpolation",
            shouldImitateYm2612_dacIssue: "What it says",
            reset: "Soft reset of internal counters and states of the synth components",
            detune: "Detune value is a signed integer (0, 1, 2, 3, -1, -2, -3)"
        }
    }
});

Object.defineProperties(Ypsilon_Engine, {
    "DEFAULT_PRESETS": {
        value: {
            "Starter": [
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 127,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 127,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 127,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Approximate Square": [
                {
                    "0": 0,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Approximate Saw": [
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 22,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 127,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 127,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 2,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Crunchy Bass (Algo. 0)": [
                {
                    "0": 3,
                    "1": 6,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 25,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 7,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 7,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 2,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 3,
                    "1": 5,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 55,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 6,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 6,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 3,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 19,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 9,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 6,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 3,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 11,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 6,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 8,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 8,
                    "1": 15,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": 4,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Metallic Bass (Algo. 0)": [
                {
                    "0": 3,
                    "1": 8,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 16,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 28,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 10,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 6,
                    "1": 4,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 3,
                    "1": 4,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 56,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 6,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 5,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 6,
                    "1": 4,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 7,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 25,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 12,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 4,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 6,
                    "1": 8,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 7,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 11,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 4,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 7,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Grainy Distortion Guitar (Algo. 0)": [
                {
                    "0": 7,
                    "1": 5,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 21,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 8,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 3,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 22,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 16,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 16,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 5,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 7,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 25,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 8,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 3,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 10,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 8,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Distortion Guitar (Algo. 1)": [
                {
                    "0": 1,
                    "1": 3,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 21,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 7,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 28,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 13,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 19,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 13,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 5,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 3,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 7,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 11,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 6,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 1,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Harsh Distortion Guitar (Algo. 2)": [
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 8,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 7,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 4,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 15,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 127,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 29,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 7,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 8,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 8,
                    "1": 5,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 4,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 5,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 20,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 4,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 6,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 5,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 27,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 4,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 7,
                    "1": 7,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 2,
                    "1": 0,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Detuned Distortion Guitar (Algo. 2)": [
                {
                    "0": 3,
                    "1": 3,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 21,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 22,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 25,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 7,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 20,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 7,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 2,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Banjo (Algo. 2)": [
                {
                    "0": 3,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 29,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 24,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 11,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 11,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 5,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 3,
                    "1": 7,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 21,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 22,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 5,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 2,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 1,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 40,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 19,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 20,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 11,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 22,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 22,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 7,
                    "1": true,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 6,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 7,
                    "1": 2,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 2,
                    "1": 2,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Piano (Algo. 2)": [
                {
                    "0": 7,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 37,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 24,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 4,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 6,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 12,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 47,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 24,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 9,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 6,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 3,
                    "1": 3,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 37,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 21,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 4,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 3,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 6,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 24,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 25,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 10,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 5,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 6,
                    "1": 2,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 2,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Closed Hat (Algo. 2, G5)": [
                {
                    "0": 7,
                    "1": 11,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 33,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 9,
                    "1": 15,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 5,
                    "1": 11,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 1,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 11,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 25,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 5,
                    "1": 15,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 4,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 1,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 5,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 12,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 9,
                    "1": 15,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 4,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 16,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 12,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 19,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 6,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 2,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Steel Strings Guitar (Algo. 3)": [
                {
                    "0": 7,
                    "1": 3,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 25,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 2,
                    "1": true,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 7,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 9,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 13,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 30,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 22,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 10,
                    "1": 6,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 11,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 30,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": true,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 10,
                    "1": 3,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 13,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 27,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 21,
                    "1": true,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 9,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 10,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 3,
                    "1": 4,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Electric Piano (Algo. 4)": [
                {
                    "0": 3,
                    "1": 15,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 22,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 6,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "1": 2,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 4,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 14,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 16,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 5,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 4,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 41,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 9,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 2,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 4,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 11,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 24,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 6,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 3,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 4,
                    "1": 5,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Bell (Algo. 4)": [
                {
                    "0": 3,
                    "1": 7,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 35,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 7,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 7,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 5,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 10,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 11,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 7,
                    "1": 7,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 35,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 7,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 4,
                    "1": 9,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 5,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 13,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 11,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 4,
                    "1": 0,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Metallic Lead (Algo. 4)": [
                {
                    "0": 7,
                    "1": 3,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 13,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 7,
                    "1": 3,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 13,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 3,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 3,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 23,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 3,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 13,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 3,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 4,
                    "1": 5,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Snare (Algo. 4, C#4)": [
                {
                    "0": 0,
                    "1": 15,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 7,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 23,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 4,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 26,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 17,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 14,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 22,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 24,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 26,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 20,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 15,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 4,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 28,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 14,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 16,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 15,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 4,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Kick (Algo. 4, C1)": [
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 9,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 22,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 10,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 10,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 15,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 4,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 15,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 4,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Cowbell (Algo. 4, F#2)": [
                {
                    "0": 0,
                    "1": 3,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 5,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 5,
                    "1": 7,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 16,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 9,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 20,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 3,
                    "1": 11,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 19,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 12,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 6,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 3,
                    "1": 7,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 16,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 13,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 26,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 6,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 4,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "High Brass (Algo. 5)": [
                {
                    "0": 2,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 21,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 14,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 1,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 7,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 3,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 24,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 27,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 5,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 2,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 6,
                    "1": 3,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 2,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 26,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 2,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 7,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 3,
                    "1": 4,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 12,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 20,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": true,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 2,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 8,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 5,
                    "1": 6,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 2,
                    "1": 1,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Low Brass (Algo. 5)": [
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 29,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 16,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 3,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 17,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 8,
                    "1": 11,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 20,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 17,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 9,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 8,
                    "1": 6,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 42,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 17,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 9,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 8,
                    "1": 6,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 21,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 20,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 11,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 5,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Pew Bass (Algo. 5)": [
                {
                    "0": 1,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 19,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 14,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 6,
                    "1": 4,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 5,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 12,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 7,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 36,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 7,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 1,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 12,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 7,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 5,
                    "1": 6,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Tom (Algo. 6, F#2)": [
                {
                    "0": 0,
                    "1": 15,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 9,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 20,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 20,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 16,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 9,
                    "1": 5,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 14,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 17,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 9,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 14,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 17,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 9,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 6,
                    "1": 7,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Organ (Algo. 7)": [
                {
                    "0": 0,
                    "1": 4,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 35,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 24,
                    "1": true,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "1": 1,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "1": 8,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 35,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 18,
                    "1": true,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 2,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 7,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 27,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 28,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 2,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 23,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 14,
                    "1": true,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 2,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 7,
                    "1": 0,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 3,
                    "1": 3,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                },
                {
                    "0": true,
                    "1": 3,
                    "name": "isLfoEnabled-lfoFrequency"
                }
            ],
            "Percussive Organ (Algo. 7)": [
                {
                    "0": 1,
                    "1": 6,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 13,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 28,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 18,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "1": 15,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 6,
                    "1": 1,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 13,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 2,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "1": 3,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 13,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 5,
                    "1": 2,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 13,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 0,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": false,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 15,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 7,
                    "1": 3,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                }
            ],
            "Sizzling Closed Hat (Special Mode, A3)": [
                {
                    "0": 3,
                    "1": 15,
                    "name": "detune-multiple",
                    "operatorNumber": 0
                },
                {
                    "0": 8,
                    "name": "totalLevel",
                    "operatorNumber": 0
                },
                {
                    "0": 31,
                    "1": 1,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 0
                },
                {
                    "0": 15,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 0
                },
                {
                    "0": 28,
                    "name": "sustainRate",
                    "operatorNumber": 0
                },
                {
                    "0": 8,
                    "1": 8,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 0
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 0
                },
                {
                    "0": 7,
                    "1": 12,
                    "name": "detune-multiple",
                    "operatorNumber": 1
                },
                {
                    "0": 14,
                    "name": "totalLevel",
                    "operatorNumber": 1
                },
                {
                    "0": 31,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 1
                },
                {
                    "0": 0,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 1
                },
                {
                    "0": 16,
                    "name": "sustainRate",
                    "operatorNumber": 1
                },
                {
                    "0": 13,
                    "1": 4,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 1
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 1
                },
                {
                    "0": 1,
                    "1": 15,
                    "name": "detune-multiple",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "totalLevel",
                    "operatorNumber": 2
                },
                {
                    "0": 28,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "sustainRate",
                    "operatorNumber": 2
                },
                {
                    "0": 8,
                    "1": 0,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 2
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 2
                },
                {
                    "0": 7,
                    "1": 0,
                    "name": "detune-multiple",
                    "operatorNumber": 3
                },
                {
                    "0": 20,
                    "name": "totalLevel",
                    "operatorNumber": 3
                },
                {
                    "0": 31,
                    "1": 3,
                    "name": "attackRate-keyScale",
                    "operatorNumber": 3
                },
                {
                    "0": 17,
                    "name": "decayRate-shouldEnableAm",
                    "operatorNumber": 3
                },
                {
                    "0": 16,
                    "name": "sustainRate",
                    "operatorNumber": 3
                },
                {
                    "0": 13,
                    "1": 4,
                    "name": "releaseRate-sustainLevel",
                    "operatorNumber": 3
                },
                {
                    "0": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "name": "ssg_shouldHold-alternate-attack-enabled",
                    "operatorNumber": 3
                },
                {
                    "0": 4,
                    "1": 4,
                    "name": "algorithm-feedback"
                },
                {
                    "0": 0,
                    "1": 0,
                    "2": true,
                    "3": true,
                    "name": "pms-ams-r-l"
                },
                {
                    "0": 32,
                    "name": "f_num_msb_block"
                },
                {
                    "0": 117,
                    "name": "f_num_lsb"
                },
                {
                    "0": true,
                    "name": "channel_2_mode"
                },
                {
                    "0": 32,
                    "name": "f_num_msb_block_special",
                    "operatorNumber": 1
                },
                {
                    "0": 94,
                    "name": "f_num_lsb_special",
                    "operatorNumber": 1
                },
                {
                    "0": 32,
                    "name": "f_num_msb_block_special",
                    "operatorNumber": 2
                },
                {
                    "0": 0,
                    "name": "f_num_lsb_special",
                    "operatorNumber": 2
                },
                {
                    "0": 32,
                    "name": "f_num_msb_block_special",
                    "operatorNumber": 3
                },
                {
                    "0": 95,
                    "name": "f_num_lsb_special",
                    "operatorNumber": 3
                }
            ]
        }
    },
    "GENERATOR_DESCRIPTOR": {
        value: {
            keywords: ["noShell"],
            properties: {
                RESET: {
                    type: "function",
                    hint: Ypsilon_Engine.HINTS["reset"]
                },
                shouldBeBypassed_sgpm: {
                    type: "boolean",
                    classList: ["qui-flex-column-flow-important"]
                },
                shouldBeBypassed_sgl: {
                    type: "boolean",
                    classList: ["qui-flex-column-flow-important"]
                },
                SGPM_WRAP: {
                    displayName: "Signal Generator, Type \"Phase Modulation\"",
                    properties: {
                        shouldUseInterpolation: {
                            type: "boolean"
                        },
                        target: {
                            keywords: ["mergeUp"],
                            properties: {
                                shouldImitateYm2612_dacIssue: {
                                    type: "boolean"
                                },
                                CHANNELS: {
                                    keywords: ["select"],
                                    properties: {
                                        shouldBeBypassed: {
                                            type: "boolean"
                                        },
                                        algorithm: {
                                            type: "number",
                                            min: 0,
                                            max: 7,
                                            hint: "Operator output is either fed to another operators or sent to the destination. All in the order they are numbered. Operators that are sent to the destination marked green.\nColor in the center shows the amount of clipping distortion, if all slots of a channel are at maximum volume",
                                            hintImage: "../assets/algorithms.png"
                                        },
                                        ams: {
                                            type: "number",
                                            min: 0,
                                            max: 3
                                        },
                                        pms: {
                                            type: "number",
                                            min: 0,
                                            max: 7
                                        },
                                        l: {
                                            type: "boolean"
                                        },
                                        r: {
                                            type: "boolean"
                                        },
                                        shouldUseSpecialMode: {
                                            type: "boolean"
                                        },
                                        shouldEnablePcmMode: {
                                            type: "boolean"
                                        },
                                        pcmData: {
                                            type: "number",
                                            min: 0,
                                            max: 255
                                        },
                                        f_num_msb_block: {
                                            type: "number",
                                            min: 0,
                                            max: 63
                                        },
                                        f_num_lsb: {
                                            type: "number",
                                            min: 0,
                                            max: 255
                                        },
                                        OPERATORS: {
                                            classList: ["qui-flex-column-flow"],
                                            properties: {
                                                keyState: {
                                                    type: "boolean"
                                                },
                                                totalLevel: {
                                                    type: "number",
                                                    min: 0,
                                                    max: 127
                                                },
                                                shouldEnableAm: {
                                                    type: "boolean"
                                                },
                                                feedback: {
                                                    type: "number",
                                                    min: 0,
                                                    max: 7
                                                },
                                                PHASE_GENERATOR: {
                                                    properties: {
                                                        multiple: {
                                                            type: "number",
                                                            min: 0,
                                                            max: 15
                                                        },
                                                        detune: {
                                                            type: "number",
                                                            min: 0,
                                                            max: 7,
                                                            hint: Ypsilon_Engine.HINTS["detune"]
                                                        }
                                                    }
                                                },
                                                ENVELOPE_GENERATOR: {
                                                    properties: {
                                                        attackRate: {
                                                            type: "number",
                                                            min: 0,
                                                            max: 31
                                                        },
                                                        decayRate: {
                                                            type: "number",
                                                            min: 0,
                                                            max: 31
                                                        },
                                                        sustainRate: {
                                                            type: "number",
                                                            min: 0,
                                                            max: 31
                                                        },
                                                        releaseRate: {
                                                            type: "number",
                                                            min: 0,
                                                            max: 15
                                                        },
                                                        keyScale: {
                                                            type: "number",
                                                            min: 0,
                                                            max: 3
                                                        },
                                                        sustainLevel: {
                                                            type: "number",
                                                            min: 0,
                                                            max: 15
                                                        },
                                                        ssg_shouldHold: {
                                                            type: "boolean"
                                                        },
                                                        ssg_shouldAlternate: {
                                                            type: "boolean"
                                                        },
                                                        ssg_shouldAttack: {
                                                            type: "boolean"
                                                        },
                                                        ssg_shouldBeEnabled: {
                                                            type: "boolean",
                                                            hint: "Patterns created by SSG EG. When enabled, rates increase x4 times. If attack of the operator is not equal to 31, patterns change in terms of inversion...",
                                                            hintImage: "../assets/ssg_eg_envelope_shape.png"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                LFO: {
                                    properties: {
                                        shouldBeEnabled: {
                                            type: "boolean"
                                        },
                                        frequency: {
                                            type: "number",
                                            min: 0,
                                            max: 7
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                SGL_WRAP: {
                    displayName: "Signal Generator, Type \"Latch\"",
                    properties: {
                        shouldUseInterpolation: {
                            type: "boolean"
                        },
                        target: {
                            keywords: ["mergeUp"],
                            properties: {
                                CHANNELS: {
                                    classList: ["qui-flex-column-flow"],
                                    properties: {
                                        shouldBeBypassed: {
                                            type: "boolean"
                                        },
                                        volume: {
                                            type: "number",
                                            min: 0,
                                            max: 15
                                        },
                                        tone: {
                                            type: "number",
                                            min: 0,
                                            max: 1023
                                        },
                                        shouldBeWhiteInsteadOfPeriodic: {
                                            type: "boolean"
                                        },
                                        noisePeriod: {
                                            type: "number",
                                            min: 0,
                                            max: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

// 

Object.seal(Ypsilon_Engine);
Object.freeze(Ypsilon_Engine.prototype);