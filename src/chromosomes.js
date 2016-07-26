export const CHROMOSOMES = [
    {
        name: "1",
        pRegions: [
            { num: 1, pattern: [ "xw", "m", "wmw" ] },
            { num: 2, pattern: [ "bmd", "wdw"] },
            { num: 3, pattern: [ "bwm", "wmw", "d", "wlw", "lwl", "wlwmwlwl"] }
        ],
        qRegions: [
            { num: 1, pattern: [ "x", "x"] },
            { num: 2, pattern: [ "wmw", "m", "wmw", "mwd", "wmw" ] },
            { num: 3, pattern: [ "bwb", "wlw" ] },
            { num: 4, pattern: [ "b", "wlwmw", "d", "w"] },
        ]
    },
    {
        name: "2",
        pRegions: [
            { num: 1, pattern: [ "xw", "b", "wmw", "m", "w", "bwb" ] },
            { num: 2, pattern: [ "w", "mwd", "wlw", "dwd", "wmw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xw", "mwl", "w", "mwm" ] },
            { num: 2, pattern: [ "wlw", "bwb", "wlw", "dwd" ] },
            { num: 3, pattern: [ "wmw", "dwd", "wmw", "b", "w", "dwb", "wmw"] }
        ]
    },
    {
        name: "3",
        pRegions: [
            { num: 1, pattern: [ "xw", "dwd", "w", "mwm" ] },
            { num: 2, pattern: [ "wlwmw", "dwm", "w", "dwb", "wlw", "mwm" ] }
        ],
        qRegions: [
            { num: 1, bands: 3, pattern: [ "xx", "wlw", "dwmwdwd" ] },
            { num: 2, bands: 9, pattern: [ "wlw", "lwl", "w", "b", "wmwmw", "bwmwm", "wlw", "d", "w" ] }
        ]
    },
    {
        name: "4",
        pRegions: [
            { num: 1, pattern: [ "x", "w", "m", "w", "bwdwm", "wlw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xw", "bwd" ] },
            { num: 2, pattern: [ "wmwlw", "dwd", "w", "m", "w", "d", "w", "mwb" ] },
            { num: 3, pattern: [ "wlwlw", "bwb", "w", "dwb", "wl" ] }
        ]
    },
    {
        name: "5",
        pRegions: [
            { num: 1, pattern: [ "x", "m", "wlw", "bwb", "wmwlw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xw", "dwd", "wmw", "mwb", "w" ] },
            { num: 2, pattern: [ "bwb", "wmw", "dwd" ] },
            { num: 3, pattern: [ "wlw", "d", "wmw", "d", "wlw" ] }
        ]
    },
    {
        name: "6",
        pRegions: [
            { num: 1, pattern: [ "xw", "bwb" ] },
            { num: 2, pattern: [ "wlwlw", "mwd", "w", "lwm", "wlw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xw", "b", "w", "mwm", "w", "bwb" ] },
            { num: 2, pattern: [ "w", "dwbwd", "wlw", "dwd", "wmw", "m", "w" ] }
        ]
    },
    {
        name: "7",
        pRegions: [
            { num: 1, pattern: [ "xw", "dwd", "w", "dwd", "wmw" ] },
            { num: 2, pattern: [ "bwb", "wlw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xwmw" ] },
            { num: 2, pattern: [ "bwdwd", "wmw" ] },
            { num: 3, pattern: [ "dwdwd", "wlw", "m", "w", "d", "wlw" ] }
        ]
    },
    {
        name: "8",
        pRegions: [
            { num: 1, pattern: [ "xwlw", "d" ] },
            { num: 2, pattern: [ "wmw", "b", "wdw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xwdw", "mwm", "wmw" ] },
            { num: 2, pattern: [ "bwdwb", "wlw", "mwb", "wmwmwdw" ] }
        ]
    },
    {
        name: "9",
        pRegions: [
            { num: 1, pattern: [ "xw", "m", "wlw" ] },
            { num: 2, pattern: [ "bwb", "wlw", "d", "wlw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "x", "x", "w" ] },
            { num: 2, pattern: [ "lwmwmwm", "wlwlw" ] },
            { num: 3, pattern: [ "bwl", "w", "dwl", "wlwlw" ] }
        ]
    },
    {
        name: "10",
        pRegions: [
            { num: 1, pattern: [ "xwlw", "mwdwd", "w", "d", "wlw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xwlw" ] },
            { num: 2, pattern: [ "bwb", "wmw", "bwdwm", "wmwlw", "bwd", "wmwmw" ] }
        ]
    },
    {
        name: "11",
        pRegions: [
            { num: 1, pattern: [ "xdw", "b", "w", "dwb", "wmwmw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "x", "dwl", "wlwmw", "bwb" ] },
            { num: 2, pattern: [ "w", "bwb", "wmw", "mwm", "w" ] }
        ]
    },
    {
        name: "12",
        pRegions: [
            { num: 1, pattern: [ "xwmw", "bwb", "wdwlw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "x", "b", "wlwlw", "dwm", "w" ] },
            { num: 2, pattern: [ "dwbwb", "w", "dwm", "wlwmwmwmw" ] }
        ]
    },
    {
        name: "13",
        pRegions: [
            { num: 1, pattern: [ "xx", "w", "x" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "x", "wlwlw", "mwd", "wlwmw" ] },
            { num: 2, pattern: [ "bwdwb", "wmw" ] },
            { num: 3, pattern: [ "bwb", "wlw", "bwb", "w" ] }
        ]
    },
    {
        name: "14",
        pRegions: [
            { num: 1, pattern: [ "xx", "w", "x" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xw", "b", "wmw" ] },
            { num: 2, pattern: [ "bwb", "wlw", "dwm", "wmw" ] },
            { num: 3, pattern: [ "bwb", "wlwmwmw" ] }
        ]
    },
    {
        name: "15",
        pRegions: [
            { num: 1, pattern: [ "xx", "w", "x" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xw", "m", "wmw", "d", "wlw" ] },
            { num: 2, pattern: [ "dwd", "wlwlw", "l", "wlw", "mwm", "wmw" ] }
        ]
    },
    {
        name: "16",
        pRegions: [
            { num: 1, pattern: [ "xw", "mwm", "wmwmw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xx", "wm", "w" ] },
            { num: 2, pattern: [ "b", "wmw", "dwm", "wlw" ] }
        ]
    },
    {
        name: "17",
        pRegions: [
            { num: 1, pattern: [ "xw", "d", "wmw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xw", "m" ] },
            { num: 2, pattern: [ "wlwlw", "d", "wdw", "mwd", "wlw" ] }
        ]
    },
    {
        name: "18",
        pRegions: [
            { num: 1, pattern: [ "xwlwmw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xw", "bwd" ] },
            { num: 2, pattern: [ "wdwmw", "bwl", "w" ] }
        ]
    },
    {
        name: "19",
        pRegions: [
            { num: 1, pattern: [ "x", "x", "wlwlw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "x", "x", "wlwlwlwlwl" ] }
        ]
    },
    {
        name: "20",
        pRegions: [
            { num: 1, pattern: [ "xwlw", "dwd", "w" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xwlw", "d", "wlwdwmw" ] }
        ]
    },
    {
        name: "21",
        pRegions: [
            { num: 1, pattern: [ "xx", "w", "x" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xw" ] },
            { num: 2, pattern: [ "bwd", "wmwmw" ] }
        ]
    },
    {
        name: "22",
        pRegions: [
            { num: 1, pattern: [ "xx", "w", "x" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xwlw", "mwm", "wmwmw" ] }
        ]
    },
    {
        name: "X",
        pRegions: [
            { num: 1, pattern: [ "xwlwdw" ] },
            { num: 2, pattern: [ "bwb", "wmwmwmw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xw", "m", "wmw" ] },
            { num: 2, pattern: [ "bwbwd", "wmw", "d", "w", "b", "wlw", "dwb", "w" ] }
        ]
    },
    {
        name: "Y",
        pRegions: [
            { num: 1, pattern: [ "xwmw" ] }
        ],
        qRegions: [
            { num: 1, pattern: [ "xwmwmw", "x" ] }
        ]
    },
];
