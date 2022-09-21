/* eslint-disable camelcase */
var helpers = require(__dirname + "/helpers");

var processDemo = function (path, res, app, workbook) {
    helpers.attachCorsHeader(res, app);
    helpers.attachFileHeaders(res, path);
    return workbook.errors.length === 0
        ? // If all looks well, return the workbook with an all clear
        res.json(workbook)
        : // If all does not look well, return the workbook with an error 400
        res.status(400).json(workbook);
};

var demoWorkbook1 = function (path, res, app) {
    let workbook1 = {
        genes: [
            {name: "ACE2"},
            {name: "ASH1"},
            {name: "CIN5"},
            {name: "GCR2"},
            {name: "GLN3"},
            {name: "HAP4"},
            {name: "HMO1"},
            {name: "MSN2"},
            {name: "SFP1"},
            {name: "STB5"},
            {name: "SWI4"},
            {name: "SWI5"},
            {name: "YHP1"},
            {name: "YOX1"},
            {name: "ZAP1"}
        ],
        links: [
            {
                source: 14,
                target: 0,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 0,
                target: 1,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 7,
                target: 1,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 11,
                target: 1,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 6,
                target: 2,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 7,
                target: 2,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 12,
                target: 4,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 2,
                target: 5,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 6,
                target: 5,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 7,
                target: 5,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 9,
                target: 5,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 10,
                target: 5,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 6,
                target: 6,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 3,
                target: 7,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 6,
                target: 7,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 2,
                target: 8,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 7,
                target: 8,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 9,
                target: 8,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 2,
                target: 9,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 7,
                target: 10,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 8,
                target: 11,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 1,
                target: 12,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 2,
                target: 12,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 7,
                target: 12,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 10,
                target: 12,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 6,
                target: 13,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 7,
                target: 13,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 10,
                target: 13,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            }
        ],
        errors: [],
        warnings: [],
        positiveWeights: [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
        ],
        negativeWeights: [],
        sheetType: "unweighted",
        network: {
            genes: [
                {name: "ACE2"},
                {name: "ASH1"},
                {name: "CIN5"},
                {name: "GCR2"},
                {name: "GLN3"},
                {name: "HAP4"},
                {name: "HMO1"},
                {name: "MSN2"},
                {name: "SFP1"},
                {name: "STB5"},
                {name: "SWI4"},
                {name: "SWI5"},
                {name: "YHP1"},
                {name: "YOX1"},
                {name: "ZAP1"}
            ],
            links: [
                {
                    source: 14,
                    target: 0,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 0,
                    target: 1,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 1,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 11,
                    target: 1,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 6,
                    target: 2,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 2,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 12,
                    target: 4,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 2,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 6,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 9,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 10,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 6,
                    target: 6,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 3,
                    target: 7,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 6,
                    target: 7,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 2,
                    target: 8,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 8,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 9,
                    target: 8,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 2,
                    target: 9,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 10,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 8,
                    target: 11,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 1,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 2,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 10,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 6,
                    target: 13,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 13,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 10,
                    target: 13,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                }
            ],
            errors: [],
            warnings: [],
            positiveWeights: [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
        },
        meta: {
            data: {
                alpha: 0.002,
                kk_max: 1,
                MaxIter: 100000000,
                TolFun: 0.000001,
                MaxFunEval: 100000000,
                TolX: 0.000001,
                production_function: "Sigmoid",
                L_curve: 0,
                estimate_params: 1,
                make_graphs: 1,
                fix_P: 0,
                fix_b: 0,
                expression_timepoints: [15, 30, 60],
                Strain: ["wt", "dcin5", "dgln3", "dhap4", "dhmo1", "dzap1"],
                simulation_timepoints: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
                species: "Saccharomyces cerevisiae",
                taxon_id: 559292
            }
        },
        two_column_sheets: {
            production_rates: {
                data: {
                    ACE2: 0.2236,
                    ASH1: 0.4332,
                    CIN5: 0.2009,
                    GCR2: 0.1925,
                    GLN3: 0.3224,
                    HAP4: 0.2718,
                    HMO1: 0.099,
                    MSN2: 0.4077,
                    SFP1: 0.6931,
                    STB5: 0.14,
                    SWI4: 0.2829,
                    SWI5: 0.3224,
                    YHP1: 0.1733,
                    YOX1: 0.7296,
                    ZAP1: 0.1042
                }
            },
            degradation_rates: {
                data: {
                    ACE2: 0.1118,
                    ASH1: 0.2166,
                    CIN5: 0.1005,
                    GCR2: 0.0963,
                    GLN3: 0.1612,
                    HAP4: 0.1359,
                    HMO1: 0.0495,
                    MSN2: 0.2039,
                    SFP1: 0.3466,
                    STB5: 0.07,
                    SWI4: 0.1415,
                    SWI5: 0.1612,
                    YHP1: 0.0866,
                    YOX1: 0.3648,
                    ZAP1: 0.0521
                }
            },
            threshold_b: {
                data: {
                    ACE2: 0,
                    ASH1: 0,
                    CIN5: 0,
                    GCR2: 0,
                    GLN3: 0,
                    HAP4: 0,
                    HMO1: 0,
                    MSN2: 0,
                    SFP1: 0,
                    STB5: 0,
                    SWI4: 0,
                    SWI5: 0,
                    YHP1: 0,
                    YOX1: 0,
                    ZAP1: 0
                }
            }
        },

        expression: {
            wt_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        0.6139,
                        -1.0689,
                        0.1906,
                        -0.398,
                        0.5827,
                        null,
                        -0.3947,
                        -0.6264,
                        0.3377,
                        0.817,
                        0.5566,
                        -0.4357,
                        -1.2497
                    ],
                    ASH1: [
                        0.97,
                        0.3043,
                        -0.9904,
                        -0.2636,
                        -0.382,
                        0.4206,
                        -0.4911,
                        -0.1284,
                        -0.7236,
                        -1.3477,
                        -1.0468,
                        -1.0978,
                        -0.9248
                    ],
                    CIN5: [
                        -0.1373,
                        -0.0997,
                        1.2386,
                        1.3909,
                        -0.4224,
                        0.5461,
                        1.0285,
                        1.2338,
                        2.2159,
                        2.1796,
                        0.8447,
                        2.4687,
                        1.4785
                    ],
                    GCR2: [
                        0.5064,
                        0.8905,
                        -0.1242,
                        -1.1405,
                        0.3837,
                        0.8525,
                        0.0988,
                        -0.3273,
                        -0.2982,
                        -0.315,
                        -0.5999,
                        -0.9447,
                        -0.3585
                    ],
                    GLN3: [
                        -1.3141,
                        0.3939,
                        0.1439,
                        -0.5133,
                        -0.7004,
                        -0.2467,
                        1.4085,
                        0.9733,
                        0.6504,
                        0.2025,
                        0.8924,
                        0.9007,
                        0.1953
                    ],
                    HAP4: [
                        0.5138,
                        1.9214,
                        -0.8859,
                        -2.6542,
                        0.138,
                        1.5184,
                        0.2794,
                        -2.5135,
                        -1.1181,
                        0.2225,
                        -1.0353,
                        -0.2074,
                        -1.8463
                    ],
                    HMO1: [
                        0.3058,
                        0.2392,
                        1.8398,
                        1.2493,
                        -0.9525,
                        1.405,
                        1.3109,
                        1.2569,
                        1.9007,
                        1.4816,
                        0.938,
                        1.8391,
                        2.2172
                    ],
                    MSN2: [
                        -1.0625,
                        0.9246,
                        0.1666,
                        -0.2696,
                        0.3585,
                        0.9514,
                        0.1233,
                        1.2802,
                        -0.6808,
                        0.7634,
                        1.3451,
                        0.8355,
                        -0.1271
                    ],
                    SFP1: [
                        0.0307,
                        2.1525,
                        1.2789,
                        -0.4526,
                        0.6917,
                        0.5342,
                        2.2598,
                        -0.9232,
                        0.8293,
                        1.3828,
                        0.9004,
                        0.8888,
                        -1.0367
                    ],
                    STB5: [
                        -1.6758,
                        -0.4986,
                        0.38,
                        -0.1274,
                        -2.5269,
                        -1.9189,
                        0.5443,
                        0.0845,
                        0.0407,
                        -1.3691,
                        -2.6627,
                        0.2028,
                        -0.2748
                    ],
                    SWI4: [
                        -0.9286,
                        -0.023,
                        -0.3651,
                        -0.3278,
                        -0.4798,
                        0.2047,
                        0.3222,
                        -0.2377,
                        -0.6369,
                        -1.4226,
                        -0.5294,
                        0.2996,
                        0.2812
                    ],
                    SWI5: [
                        -0.7675,
                        -0.2033,
                        -0.9106,
                        -0.7234,
                        -1.9049,
                        0.7854,
                        -0.257,
                        -0.1687,
                        -1.0667,
                        0.1028,
                        -0.0286,
                        0.4798,
                        0.097
                    ],
                    YHP1: [
                        -1.1269,
                        -0.21,
                        -0.6676,
                        -1.6964,
                        -0.3496,
                        1.2371,
                        0.9432,
                        -0.3621,
                        -1.8086,
                        0.6617,
                        0.6192,
                        0.205,
                        -0.725
                    ],
                    YOX1: [
                        -0.2025,
                        -1.0587,
                        -0.6402,
                        -2.2532,
                        -0.083,
                        -1.6117,
                        -0.104,
                        -0.1487,
                        -0.9394,
                        -0.5901,
                        0.1329,
                        -0.7222,
                        -0.5117
                    ],
                    ZAP1: [
                        0.6594,
                        0.6135,
                        0.3238,
                        -0.3712,
                        1.4712,
                        1.9049,
                        0.599,
                        -0.2354,
                        -0.394,
                        2.9606,
                        3.5569,
                        1.3863,
                        null
                    ]
                }
            },
            dcin5_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        -0.1718,
                        -0.2792,
                        -0.1752,
                        -0.6884,
                        -0.2436,
                        0.1581,
                        -0.4253,
                        null,
                        0.5682,
                        0.1646,
                        -0.3202,
                        -0.3888
                    ],
                    ASH1: [
                        -1.3229,
                        -0.4236,
                        -1.8945,
                        -1.6929,
                        -2.2704,
                        -1.0939,
                        -1.3098,
                        -1.017,
                        -1.7106,
                        -1.7777,
                        -1.9029,
                        -1.3284
                    ],
                    CIN5: [
                        -0.6685,
                        null,
                        -0.4322,
                        -0.1191,
                        -0.383,
                        0.2693,
                        -0.0757,
                        0.5975,
                        null,
                        -0.3216,
                        0.0805,
                        0.4778
                    ],
                    GCR2: [
                        -0.3155,
                        1.4649,
                        -0.8029,
                        0.5141,
                        -0.7654,
                        -1.1456,
                        0.5096,
                        -0.2957,
                        -0.2257,
                        -0.9404,
                        -1.3326,
                        0.1689
                    ],
                    GLN3: [
                        0.9621,
                        -0.3518,
                        0.3101,
                        -0.1589,
                        0.5869,
                        0.0341,
                        0.486,
                        0.4342,
                        1.0717,
                        0.0559,
                        1.1548,
                        0.5446
                    ],
                    HAP4: [
                        0.0633,
                        0.1712,
                        -1.9531,
                        -0.2151,
                        -1.463,
                        0.3025,
                        -2.2646,
                        1.4417,
                        -1.2318,
                        -0.1403,
                        -1.9814,
                        -1.2117
                    ],
                    HMO1: [
                        -0.9169,
                        1.2958,
                        0.427,
                        -0.0712,
                        1.5911,
                        1.2566,
                        0.391,
                        -0.3126,
                        1.5823,
                        2.7767,
                        0.9466,
                        1.4665
                    ],
                    MSN2: [
                        null,
                        -0.5489,
                        0.2491,
                        0.9036,
                        -0.5302,
                        0.016,
                        -0.0997,
                        1.0787,
                        -0.1371,
                        0.029,
                        0.4011,
                        0.0603
                    ],
                    SFP1: [
                        1.0932,
                        0.4726,
                        1.1255,
                        0.6263,
                        0.5256,
                        -0.3325,
                        1.6525,
                        -0.1135,
                        0.61,
                        0.6721,
                        0.9582,
                        0.3127
                    ],
                    STB5: [
                        1.259,
                        1.0717,
                        0.916,
                        0.804,
                        -1.9025,
                        -0.4406,
                        0.5659,
                        1.258,
                        0.4927,
                        0.2925,
                        1.6588,
                        1.1319
                    ],
                    SWI4: [
                        -0.4763,
                        -0.4529,
                        -0.3336,
                        -0.5489,
                        2.5266,
                        0.4041,
                        0.0257,
                        -0.2142,
                        -0.3101,
                        0.905,
                        0.092,
                        0.2312
                    ],
                    SWI5: [
                        -0.1331,
                        0.1802,
                        -0.3214,
                        -0.0182,
                        0.8526,
                        -0.4332,
                        0.2249,
                        -0.7035,
                        0.0663,
                        -0.4419,
                        0.9222,
                        0.209
                    ],
                    YHP1: [
                        -1.2421,
                        0.3344,
                        -0.735,
                        0.2935,
                        -1.2684,
                        -0.8782,
                        1.0021,
                        -0.7668,
                        0.9796,
                        -0.0528,
                        -0.8693,
                        0.5579
                    ],
                    YOX1: [
                        -1.3434,
                        -0.9354,
                        -1.7084,
                        -0.2822,
                        -0.0589,
                        -0.7158,
                        -0.1155,
                        -2.4802,
                        0.6657,
                        0.5316,
                        -1.3987,
                        0.2985
                    ],
                    ZAP1: [
                        0.8344,
                        0.8398,
                        0.9184,
                        0.4747,
                        2.3845,
                        0.1525,
                        0.6511,
                        -0.8263,
                        0.3113,
                        -0.0906,
                        0.9699,
                        -0.0441
                    ]
                }
            },
            dgln3_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        -0.8095,
                        -0.6243,
                        -1.1296,
                        -1.1113,
                        -1.408,
                        2.6021,
                        -0.4079,
                        1.2346,
                        1.1846,
                        -0.0588,
                        0.4404,
                        -0.1933
                    ],
                    ASH1: [
                        -1.0181,
                        -0.3813,
                        0.5164,
                        -0.17,
                        0.4056,
                        -0.3139,
                        -1.1147,
                        -0.9282,
                        0.9089,
                        -0.5136,
                        -0.6743,
                        -1.3101
                    ],
                    CIN5: [
                        1.452,
                        0.3668,
                        0.1465,
                        1.0023,
                        1.662,
                        2.9945,
                        1.3996,
                        1.9426,
                        0.2912,
                        0.6282,
                        3.2391,
                        2.5788
                    ],
                    GCR2: [
                        -0.5184,
                        1.3267,
                        1.0101,
                        -0.0616,
                        null,
                        -0.1998,
                        1.1081,
                        0.1989,
                        1.6447,
                        -1.6054,
                        0.7045,
                        0.7673
                    ],
                    GLN3: [
                        0.5957,
                        0.8549,
                        -0.6759,
                        0.6343,
                        -0.0861,
                        -1.0684,
                        0.3023,
                        0.4177,
                        0.1085,
                        -0.446,
                        0.8018,
                        -0.161
                    ],
                    HAP4: [
                        3.3136,
                        1.8683,
                        0.9064,
                        0.2848,
                        1.2426,
                        1.4451,
                        0.9148,
                        -0.0132,
                        1.2979,
                        0.1059,
                        -0.2976,
                        0.2256
                    ],
                    HMO1: [
                        0.9772,
                        1.4618,
                        -0.7156,
                        0.7899,
                        1.5735,
                        1.1125,
                        1.1016,
                        0.5146,
                        1.3433,
                        0.9501,
                        1.5648,
                        1.7134
                    ],
                    MSN2: [
                        1.0775,
                        -1.2575,
                        0.9656,
                        0.1669,
                        0.9394,
                        0.6417,
                        0.5814,
                        2.5089,
                        0.8539,
                        1.4608,
                        0.7794,
                        -0.287
                    ],
                    SFP1: [
                        -0.4157,
                        0.884,
                        1.2987,
                        1.3916,
                        1.055,
                        -0.6434,
                        2.4701,
                        2.3169,
                        1.2748,
                        1.2483,
                        0.2385,
                        1.2221
                    ],
                    STB5: [
                        0.8397,
                        0.8573,
                        0.2292,
                        null,
                        1.1875,
                        0.2161,
                        0.0347,
                        0.9642,
                        0.7419,
                        0.1088,
                        0.6585,
                        0.2671
                    ],
                    SWI4: [
                        0.1741,
                        -0.5323,
                        -1.2532,
                        -0.0805,
                        -0.3044,
                        0.44,
                        -1.0187,
                        -0.5621,
                        -0.8838,
                        0.9617,
                        -0.8963,
                        -0.2724
                    ],
                    SWI5: [
                        -0.5215,
                        -1.3444,
                        0.4807,
                        0.0665,
                        -0.0551,
                        -0.2995,
                        -0.4057,
                        -0.4289,
                        null,
                        -0.9991,
                        0.4751,
                        0.2162
                    ],
                    YHP1: [
                        -0.7022,
                        0.5408,
                        -0.0443,
                        0.5406,
                        0.8118,
                        0.9184,
                        2.4355,
                        1.1496,
                        1.0066,
                        -0.2962,
                        0.3564,
                        1.0391
                    ],
                    YOX1: [
                        null,
                        0.5644,
                        -0.0194,
                        0.8211,
                        1.1649,
                        0.3713,
                        0.6099,
                        0.9206,
                        0.9647,
                        0.491,
                        0.9253,
                        1.2979
                    ],
                    ZAP1: [
                        -1.2207,
                        -0.2262,
                        null,
                        0.405,
                        -0.5982,
                        1.7576,
                        null,
                        1.3799,
                        -1.6436,
                        -0.5111,
                        -1.0852,
                        null
                    ]
                }
            },
            dhap4_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        -0.558,
                        -0.313,
                        -0.0886,
                        0.5674,
                        -0.448,
                        -0.4768,
                        -0.598,
                        -0.1176,
                        -0.2783,
                        -0.6083,
                        -0.6331,
                        0.1985
                    ],
                    ASH1: [
                        -1.5401,
                        -0.0523,
                        -0.7026,
                        -0.4933,
                        -0.8167,
                        -0.0028,
                        -0.6568,
                        -1.0267,
                        -1.9867,
                        -1.5253,
                        -1.0837,
                        -1.5982
                    ],
                    CIN5: [
                        -0.3943,
                        3.098,
                        -0.7818,
                        0.5366,
                        1.0477,
                        1.9388,
                        1.9985,
                        1.948,
                        2.8678,
                        3.26,
                        2.2513,
                        1.9187
                    ],
                    GCR2: [
                        1.5094,
                        0.4057,
                        0.5999,
                        1.291,
                        1.5787,
                        -0.5042,
                        1.659,
                        1.728,
                        0.4889,
                        -0.2991,
                        0.9863,
                        0.9578
                    ],
                    GLN3: [
                        -0.4169,
                        0.6492,
                        -0.1259,
                        0.7149,
                        0.0457,
                        0.2932,
                        -0.3901,
                        0.2321,
                        0.9238,
                        0.3174,
                        -0.0252,
                        1.0246
                    ],
                    HAP4: [
                        0.4102,
                        -0.9203,
                        0.3786,
                        -0.8169,
                        0.0301,
                        -1.4462,
                        -0.3025,
                        -0.3727,
                        -0.2195,
                        -1.1639,
                        0.2619,
                        -0.5285
                    ],
                    HMO1: [
                        2.9631,
                        0.0054,
                        1.0227,
                        -1.8079,
                        2.6496,
                        1.8897,
                        1.3275,
                        -2.4363,
                        1.3018,
                        -0.2604,
                        2.3205,
                        -0.2676
                    ],
                    MSN2: [
                        0.8346,
                        0.5458,
                        -0.4035,
                        0.5827,
                        1.0075,
                        0.8038,
                        1.1451,
                        0.6532,
                        1.4213,
                        0.7549,
                        0.3324,
                        0.3404
                    ],
                    SFP1: [
                        0.475,
                        0.8935,
                        0.0344,
                        0.9253,
                        -0.2822,
                        0.8125,
                        0.4466,
                        0.3866,
                        -0.1762,
                        0.4906,
                        0.4941,
                        0.4523
                    ],
                    STB5: [
                        -0.1941,
                        -0.1977,
                        0.3222,
                        null,
                        0.4058,
                        -0.84,
                        0.4143,
                        null,
                        null,
                        -0.1119,
                        0.4121,
                        0.1617
                    ],
                    SWI4: [
                        0.857,
                        0.3944,
                        -0.0101,
                        -0.8563,
                        -0.1573,
                        -0.1339,
                        -0.1171,
                        null,
                        0.3775,
                        0.4539,
                        0.3331,
                        0.2096
                    ],
                    SWI5: [
                        null,
                        0.1491,
                        -0.9615,
                        0.6945,
                        -1.177,
                        0.155,
                        -1.3155,
                        -0.1184,
                        -1.0331,
                        0.07,
                        -0.7403,
                        0.728
                    ],
                    YHP1: [
                        -0.8778,
                        -0.5421,
                        -1.4449,
                        -0.6419,
                        -0.986,
                        -0.0224,
                        -0.4459,
                        -0.1383,
                        0.9324,
                        1.2889,
                        0.6571,
                        0.9774
                    ],
                    YOX1: [
                        -1.7099,
                        -1.3898,
                        -2.1356,
                        -1.6842,
                        -0.1238,
                        -1.0174,
                        0.37,
                        -1.6723,
                        -0.259,
                        -0.2008,
                        -1.5284,
                        -1.0413
                    ],
                    ZAP1: [
                        -1.903,
                        null,
                        1.5545,
                        -0.0849,
                        -0.6127,
                        1.2343,
                        -0.5888,
                        -0.8746,
                        -0.8822,
                        0.6754,
                        -0.7341,
                        -0.5958
                    ]
                }
            },
            dhmo1_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        0.2392,
                        -0.3695,
                        -1.0907,
                        0.1755,
                        0.527,
                        -0.1989,
                        -0.9593,
                        -0.2329,
                        0.0175,
                        -0.4998,
                        -0.2991,
                        -0.2388
                    ],
                    ASH1: [
                        0.2718,
                        1.0969,
                        0.0825,
                        -0.4366,
                        -2.2907,
                        0.5026,
                        -0.2715,
                        -0.5741,
                        -1.5159,
                        0.4211,
                        1.7901,
                        -0.8754
                    ],
                    CIN5: [
                        0.6239,
                        0.8184,
                        1.4916,
                        -0.8397,
                        0.8867,
                        1.2387,
                        2.2606,
                        0.3293,
                        1.2067,
                        1.7983,
                        -0.7066,
                        1.0148
                    ],
                    GCR2: [
                        -0.5316,
                        -0.2221,
                        1.0726,
                        -0.9918,
                        0.3892,
                        0.3353,
                        -0.2957,
                        -0.4503,
                        0.2892,
                        1.2637,
                        0.0502,
                        -0.8057
                    ],
                    GLN3: [
                        -0.3938,
                        0.0786,
                        -0.9799,
                        0.3603,
                        -0.5682,
                        -0.0728,
                        -0.186,
                        0.6306,
                        0.2917,
                        -0.1706,
                        0.2925,
                        0.8914
                    ],
                    HAP4: [
                        0.2944,
                        -1.0325,
                        -0.3442,
                        0.8937,
                        -1.578,
                        -1.4498,
                        -0.7384,
                        -0.2666,
                        -1.5417,
                        -3.0545,
                        1.8973,
                        -0.8844
                    ],
                    HMO1: [
                        1.0058,
                        -0.0317,
                        2.0181,
                        0.7888,
                        -0.2066,
                        0.3846,
                        0.0914,
                        0.1787,
                        0.1767,
                        0.4898,
                        0.8354,
                        0.4644
                    ],
                    MSN2: [
                        -0.3229,
                        -0.3717,
                        -0.8013,
                        0.4516,
                        -0.3778,
                        -0.3248,
                        -0.4761,
                        0.9505,
                        -0.2303,
                        -0.5603,
                        1.2227,
                        0.5789
                    ],
                    SFP1: [
                        1.2329,
                        2.2441,
                        0.4948,
                        -0.6945,
                        -0.8346,
                        1.8561,
                        -0.5287,
                        -0.6066,
                        0.9984,
                        1.3966,
                        -0.1514,
                        -0.5851
                    ],
                    STB5: [
                        1.5366,
                        0.5574,
                        null,
                        null,
                        0.297,
                        0.1843,
                        0.1582,
                        null,
                        1.7097,
                        0.6198,
                        null,
                        null
                    ],
                    SWI4: [
                        0.5249,
                        0.1762,
                        -0.1695,
                        0.3361,
                        1.0117,
                        -0.5471,
                        -0.1491,
                        0.2608,
                        0.7408,
                        -0.5783,
                        0.4557,
                        0.5229
                    ],
                    SWI5: [
                        -1.5273,
                        -0.0479,
                        -0.4886,
                        -0.0472,
                        -0.3741,
                        -0.8655,
                        -1.1639,
                        -0.2628,
                        -0.6299,
                        0.0682,
                        0.3035,
                        -0.5416
                    ],
                    YHP1: [
                        -0.182,
                        -1.0702,
                        -0.8447,
                        -1.0068,
                        0.1177,
                        -0.3511,
                        0.0224,
                        -0.6165,
                        0.7703,
                        -1.1442,
                        -0.8058,
                        0.1403
                    ],
                    YOX1: [
                        -2.4929,
                        -0.4533,
                        -0.2265,
                        -1.1137,
                        -0.9117,
                        -0.248,
                        -0.0783,
                        -1.7543,
                        -0.7781,
                        -0.3231,
                        0.2596,
                        -2.0924
                    ],
                    ZAP1: [
                        -0.2308,
                        -0.3917,
                        -1.0017,
                        0.1766,
                        0.0117,
                        0.1751,
                        -0.9756,
                        -0.5304,
                        0.4411,
                        -0.709,
                        -0.0099,
                        0.8415
                    ]
                }
            },
            dzap1_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        -0.2778,
                        -0.804,
                        -0.3835,
                        0.328,
                        -0.6418,
                        -0.8003,
                        -3.4693,
                        -1.458,
                        0.2762,
                        -0.7411,
                        -1.2214,
                        -0.5369
                    ],
                    ASH1: [
                        1.3934,
                        -0.5424,
                        0.2105,
                        2.8875,
                        0.6473,
                        -0.8143,
                        0.2084,
                        -0.8951,
                        -0.0794,
                        -1.7999,
                        -0.441,
                        -1.2416
                    ],
                    CIN5: [
                        null,
                        2.4162,
                        1.1741,
                        0.7413,
                        1.7565,
                        2.5972,
                        0.8693,
                        2.4257,
                        1.5716,
                        3.7502,
                        2.3832,
                        2.675
                    ],
                    GCR2: [
                        0.6693,
                        0.4593,
                        -0.1973,
                        1.153,
                        -0.1936,
                        0.3101,
                        0.9935,
                        0.3293,
                        0.2218,
                        -0.2001,
                        0.8909,
                        0.6109
                    ],
                    GLN3: [
                        0.4944,
                        0.6415,
                        -0.1257,
                        0.9388,
                        0.6684,
                        0.4256,
                        0.198,
                        0.5877,
                        0.5854,
                        0.178,
                        0.0267,
                        1.0084
                    ],
                    HAP4: [
                        0.9889,
                        1.6616,
                        0.5464,
                        1.3427,
                        0.0359,
                        -0.3139,
                        0.246,
                        -1.816,
                        -0.1356,
                        -0.6358,
                        -0.2169,
                        -1.1214
                    ],
                    HMO1: [
                        0.3519,
                        1.4939,
                        2.1933,
                        0.7561,
                        0.3961,
                        1.6777,
                        1.8124,
                        0.7252,
                        1.168,
                        2.1741,
                        2.2209,
                        2.0417
                    ],
                    MSN2: [
                        -0.1455,
                        0.7077,
                        -0.3519,
                        0.9785,
                        1.0745,
                        0.5327,
                        0.5032,
                        1.0997,
                        1.1006,
                        0.4626,
                        -0.2581,
                        0.848
                    ],
                    SFP1: [
                        0.5518,
                        0.6949,
                        0.4098,
                        0.5577,
                        0.82,
                        1.0041,
                        1.372,
                        1.4371,
                        -0.6863,
                        0.0001,
                        0.3495,
                        0.5506
                    ],
                    STB5: [
                        0.3316,
                        -3.3906,
                        0.8183,
                        -0.0735,
                        -0.161,
                        0.5405,
                        0.5489,
                        0.5018,
                        -0.5358,
                        -0.1065,
                        1.1893,
                        0.1914
                    ],
                    SWI4: [
                        -0.0389,
                        -0.9307,
                        0.4958,
                        -0.0196,
                        0.4521,
                        -0.6053,
                        -0.7988,
                        -0.1749,
                        0.3006,
                        0.0909,
                        -0.7866,
                        0.2419
                    ],
                    SWI5: [
                        -1.0275,
                        -0.3405,
                        -1.2339,
                        -0.6617,
                        1.0472,
                        -0.2527,
                        -0.8267,
                        -0.5495,
                        -0.217,
                        -0.1531,
                        -0.3907,
                        -0.2836
                    ],
                    YHP1: [
                        -0.7061,
                        -0.8436,
                        -2.1758,
                        -1.6097,
                        -0.7422,
                        0.4833,
                        0.6116,
                        -0.0835,
                        -0.4454,
                        0.3472,
                        0.7491,
                        0.6957
                    ],
                    YOX1: [
                        -1.7194,
                        -0.4979,
                        -1.2355,
                        -1.9155,
                        -0.5178,
                        0.6255,
                        -0.8938,
                        -0.5063,
                        -1.0352,
                        0.8516,
                        -0.3387,
                        -1.0581
                    ],
                    ZAP1: [
                        null,
                        0.1287,
                        0.7379,
                        0.7652,
                        -1.2348,
                        -0.2555,
                        -5.062,
                        -0.2373,
                        null,
                        0.6914,
                        -2.676,
                        -0.8246
                    ]
                }
            }
        }
    };
    return processDemo(path, res, app, workbook1);
};

var demoWorkbook2 = function (path, res, app) {
    let workbook2 = {
        genes: [
            {name: "ACE2"},
            {name: "ASH1"},
            {name: "CIN5"},
            {name: "GCR2"},
            {name: "GLN3"},
            {name: "HAP4"},
            {name: "HMO1"},
            {name: "MSN2"},
            {name: "SFP1"},
            {name: "STB5"},
            {name: "SWI4"},
            {name: "SWI5"},
            {name: "YHP1"},
            {name: "YOX1"},
            {name: "ZAP1"}
        ],
        links: [
            {
                source: 14,
                target: 0,
                value: 0.7715106466403678,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 0,
                target: 1,
                value: -1.1672013354497313,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 7,
                target: 1,
                value: -2.4438462486461163,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 11,
                target: 1,
                value: 5.212343052095555,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 6,
                target: 2,
                value: 0.826365326790911,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 7,
                target: 2,
                value: -1.485274408559026,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 12,
                target: 4,
                value: 1.5180198066137216,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 2,
                target: 5,
                value: 0.27964603867183396,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 6,
                target: 5,
                value: -0.7371671668856121,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 7,
                target: 5,
                value: 2.9870960868914778,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 9,
                target: 5,
                value: 0.7743557796125339,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 10,
                target: 5,
                value: -2.9527940988546217,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 6,
                target: 6,
                value: 0.6701684007311992,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 3,
                target: 7,
                value: -3.3875125167057103,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 6,
                target: 7,
                value: 0.22069064019031245,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 2,
                target: 8,
                value: -0.0735729607899455,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 7,
                target: 8,
                value: -0.12373154839822605,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 9,
                target: 8,
                value: -0.5487650216350863,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 2,
                target: 9,
                value: -0.442904423529279,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 7,
                target: 10,
                value: -0.8662459811465724,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 8,
                target: 11,
                value: -2.850006860838391,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 1,
                target: 12,
                value: -1.5733259134754158,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 2,
                target: 12,
                value: 0.2841810246722045,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 7,
                target: 12,
                value: 0.08852330457981578,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 10,
                target: 12,
                value: -0.02279063304065471,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 6,
                target: 13,
                value: 0.5563132195423768,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 7,
                target: 13,
                value: -1.9832439149172112,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 10,
                target: 13,
                value: -0.25954746744906587,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            }
        ],
        errors: [],
        warnings: [],
        positiveWeights: [
            0.7715106466403678,
            5.212343052095555,
            0.826365326790911,
            1.5180198066137216,
            0.27964603867183396,
            2.9870960868914778,
            0.7743557796125339,
            0.6701684007311992,
            0.22069064019031245,
            0.2841810246722045,
            0.08852330457981578,
            0.5563132195423768
        ],
        negativeWeights: [
            -1.1672013354497313,
            -2.4438462486461163,
            -1.485274408559026,
            -0.7371671668856121,
            -2.9527940988546217,
            -3.3875125167057103,
            -0.0735729607899455,
            -0.12373154839822605,
            -0.5487650216350863,
            -0.442904423529279,
            -0.8662459811465724,
            -2.850006860838391,
            -1.5733259134754158,
            -0.02279063304065471,
            -1.9832439149172112,
            -0.25954746744906587
        ],
        sheetType: "weighted",
        network: {
            genes: [
                {name: "ACE2"},
                {name: "ASH1"},
                {name: "CIN5"},
                {name: "GCR2"},
                {name: "GLN3"},
                {name: "HAP4"},
                {name: "HMO1"},
                {name: "MSN2"},
                {name: "SFP1"},
                {name: "STB5"},
                {name: "SWI4"},
                {name: "SWI5"},
                {name: "YHP1"},
                {name: "YOX1"},
                {name: "ZAP1"}
            ],
            links: [
                {
                    source: 14,
                    target: 0,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 0,
                    target: 1,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 1,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 11,
                    target: 1,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 6,
                    target: 2,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 2,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 12,
                    target: 4,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 2,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 6,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 9,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 10,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 6,
                    target: 6,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 3,
                    target: 7,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 6,
                    target: 7,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 2,
                    target: 8,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 8,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 9,
                    target: 8,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 2,
                    target: 9,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 10,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 8,
                    target: 11,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 1,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 2,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 10,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 6,
                    target: 13,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 13,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 10,
                    target: 13,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                }
            ],
            errors: [],
            warnings: [],
            positiveWeights: [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
        },
        networkOptimizedWeights: {
            genes: [
                {name: "ACE2"},
                {name: "ASH1"},
                {name: "CIN5"},
                {name: "GCR2"},
                {name: "GLN3"},
                {name: "HAP4"},
                {name: "HMO1"},
                {name: "MSN2"},
                {name: "SFP1"},
                {name: "STB5"},
                {name: "SWI4"},
                {name: "SWI5"},
                {name: "YHP1"},
                {name: "YOX1"},
                {name: "ZAP1"}
            ],
            links: [
                {
                    source: 14,
                    target: 0,
                    value: 0.7715106466403678,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 0,
                    target: 1,
                    value: -1.1672013354497313,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 7,
                    target: 1,
                    value: -2.4438462486461163,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 11,
                    target: 1,
                    value: 5.212343052095555,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 6,
                    target: 2,
                    value: 0.826365326790911,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 7,
                    target: 2,
                    value: -1.485274408559026,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 12,
                    target: 4,
                    value: 1.5180198066137216,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 2,
                    target: 5,
                    value: 0.27964603867183396,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 6,
                    target: 5,
                    value: -0.7371671668856121,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 7,
                    target: 5,
                    value: 2.9870960868914778,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 9,
                    target: 5,
                    value: 0.7743557796125339,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 10,
                    target: 5,
                    value: -2.9527940988546217,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 6,
                    target: 6,
                    value: 0.6701684007311992,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 3,
                    target: 7,
                    value: -3.3875125167057103,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 6,
                    target: 7,
                    value: 0.22069064019031245,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 2,
                    target: 8,
                    value: -0.0735729607899455,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 7,
                    target: 8,
                    value: -0.12373154839822605,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 9,
                    target: 8,
                    value: -0.5487650216350863,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 2,
                    target: 9,
                    value: -0.442904423529279,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 7,
                    target: 10,
                    value: -0.8662459811465724,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 8,
                    target: 11,
                    value: -2.850006860838391,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 1,
                    target: 12,
                    value: -1.5733259134754158,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 2,
                    target: 12,
                    value: 0.2841810246722045,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 7,
                    target: 12,
                    value: 0.08852330457981578,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 10,
                    target: 12,
                    value: -0.02279063304065471,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 6,
                    target: 13,
                    value: 0.5563132195423768,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 7,
                    target: 13,
                    value: -1.9832439149172112,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 10,
                    target: 13,
                    value: -0.25954746744906587,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                }
            ],
            errors: [],
            warnings: [],
            positiveWeights: [
                0.7715106466403678,
                5.212343052095555,
                0.826365326790911,
                1.5180198066137216,
                0.27964603867183396,
                2.9870960868914778,
                0.7743557796125339,
                0.6701684007311992,
                0.22069064019031245,
                0.2841810246722045,
                0.08852330457981578,
                0.5563132195423768
            ],
            negativeWeights: [
                -1.1672013354497313,
                -2.4438462486461163,
                -1.485274408559026,
                -0.7371671668856121,
                -2.9527940988546217,
                -3.3875125167057103,
                -0.0735729607899455,
                -0.12373154839822605,
                -0.5487650216350863,
                -0.442904423529279,
                -0.8662459811465724,
                -2.850006860838391,
                -1.5733259134754158,
                -0.02279063304065471,
                -1.9832439149172112,
                -0.25954746744906587
            ],
            sheetType: "weighted",
        },
        meta: {
            data: {
                alpha: 0.002,
                kk_max: 1,
                MaxIter: 100000000,
                TolFun: 0.000001,
                MaxFunEval: 100000000,
                TolX: 0.000001,
                production_function: "Sigmoid",
                L_curve: 0,
                estimate_params: 1,
                make_graphs: 1,
                fix_P: 0,
                fix_b: 0,
                expression_timepoints: [15, 30, 60],
                Strain: ["wt", "dcin5", "dgln3", "dhap4", "dhmo1", "dzap1"],
                simulation_timepoints: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
                species: "Saccharomyces cerevisiae",
                taxon_id: 559292
            }
        },
        two_column_sheets: {
            production_rates: {
                data: {
                    ACE2: 0.2236,
                    ASH1: 0.4332,
                    CIN5: 0.2009,
                    GCR2: 0.1925,
                    GLN3: 0.3224,
                    HAP4: 0.2718,
                    HMO1: 0.099,
                    MSN2: 0.4077,
                    SFP1: 0.6931,
                    STB5: 0.14,
                    SWI4: 0.2829,
                    SWI5: 0.3224,
                    YHP1: 0.1733,
                    YOX1: 0.7296,
                    ZAP1: 0.1042
                }
            },
            degradation_rates: {
                data: {
                    ACE2: 0.1118,
                    ASH1: 0.2166,
                    CIN5: 0.1005,
                    GCR2: 0.0963,
                    GLN3: 0.1612,
                    HAP4: 0.1359,
                    HMO1: 0.0495,
                    MSN2: 0.2039,
                    SFP1: 0.3466,
                    STB5: 0.07,
                    SWI4: 0.1415,
                    SWI5: 0.1612,
                    YHP1: 0.0866,
                    YOX1: 0.3648,
                    ZAP1: 0.0521
                }
            },
            threshold_b: {
                data: {
                    ACE2: 0,
                    ASH1: 0,
                    CIN5: 0,
                    GCR2: 0,
                    GLN3: 0,
                    HAP4: 0,
                    HMO1: 0,
                    MSN2: 0,
                    SFP1: 0,
                    STB5: 0,
                    SWI4: 0,
                    SWI5: 0,
                    YHP1: 0,
                    YOX1: 0,
                    ZAP1: 0
                }
            },
            optimized_production_rates: {
                data: {
                    ACE2: 0.20169762419350315,
                    ASH1: 1.6768486409669303,
                    CIN5: 0.6556267091220588,
                    GCR2: 0.23152673595955778,
                    GLN3: 0.3021286014805124,
                    HAP4: 1.3023118610453017,
                    HMO1: 0.306714161040741,
                    MSN2: 2.5565636401035774,
                    SFP1: 1.5545497700062894,
                    STB5: 0.11973367529569069,
                    SWI4: 0.31578067239915536,
                    SWI5: 1.9213457884406318,
                    YHP1: 0.20798709920402955,
                    YOX1: 1.3911530501950775,
                    ZAP1: 0.12824047744417516
                }
            },
            optimized_threshold_b: {
                data: {
                    ACE2: 0.8985074404608185,
                    ASH1: 2.582256164350256,
                    CIN5: -0.47809974269974775,
                    GCR2: 0,
                    GLN3: 0.6938748471300857,
                    HAP4: 3.6111966650086016,
                    HMO1: 1.646242008629014,
                    MSN2: -1.4614909506841134,
                    SFP1: -0.29390942840265133,
                    STB5: -1.5957182619990407,
                    SWI4: -0.9018653333598061,
                    SWI5: -1.7844108724165049,
                    YHP1: -0.3135477599840303,
                    YOX1: -0.4477341100226453,
                    ZAP1: 0
                }
            }
        },
        expression: {
            wt_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        0.6139,
                        -1.0689,
                        0.1906,
                        -0.398,
                        0.5827,
                        null,
                        -0.3947,
                        -0.6264,
                        0.3377,
                        0.817,
                        0.5566,
                        -0.4357,
                        -1.2497
                    ],
                    ASH1: [
                        0.97,
                        0.3043,
                        -0.9904,
                        -0.2636,
                        -0.382,
                        0.4206,
                        -0.4911,
                        -0.1284,
                        -0.7236,
                        -1.3477,
                        -1.0468,
                        -1.0978,
                        -0.9248
                    ],
                    CIN5: [
                        -0.1373,
                        -0.0997,
                        1.2386,
                        1.3909,
                        -0.4224,
                        0.5461,
                        1.0285,
                        1.2338,
                        2.2159,
                        2.1796,
                        0.8447,
                        2.4687,
                        1.4785
                    ],
                    GCR2: [
                        0.5064,
                        0.8905,
                        -0.1242,
                        -1.1405,
                        0.3837,
                        0.8525,
                        0.0988,
                        -0.3273,
                        -0.2982,
                        -0.315,
                        -0.5999,
                        -0.9447,
                        -0.3585
                    ],
                    GLN3: [
                        -1.3141,
                        0.3939,
                        0.1439,
                        -0.5133,
                        -0.7004,
                        -0.2467,
                        1.4085,
                        0.9733,
                        0.6504,
                        0.2025,
                        0.8924,
                        0.9007,
                        0.1953
                    ],
                    HAP4: [
                        0.5138,
                        1.9214,
                        -0.8859,
                        -2.6542,
                        0.138,
                        1.5184,
                        0.2794,
                        -2.5135,
                        -1.1181,
                        0.2225,
                        -1.0353,
                        -0.2074,
                        -1.8463
                    ],
                    HMO1: [
                        0.3058,
                        0.2392,
                        1.8398,
                        1.2493,
                        -0.9525,
                        1.405,
                        1.3109,
                        1.2569,
                        1.9007,
                        1.4816,
                        0.938,
                        1.8391,
                        2.2172
                    ],
                    MSN2: [
                        -1.0625,
                        0.9246,
                        0.1666,
                        -0.2696,
                        0.3585,
                        0.9514,
                        0.1233,
                        1.2802,
                        -0.6808,
                        0.7634,
                        1.3451,
                        0.8355,
                        -0.1271
                    ],
                    SFP1: [
                        0.0307,
                        2.1525,
                        1.2789,
                        -0.4526,
                        0.6917,
                        0.5342,
                        2.2598,
                        -0.9232,
                        0.8293,
                        1.3828,
                        0.9004,
                        0.8888,
                        -1.0367
                    ],
                    STB5: [
                        -1.6758,
                        -0.4986,
                        0.38,
                        -0.1274,
                        -2.5269,
                        -1.9189,
                        0.5443,
                        0.0845,
                        0.0407,
                        -1.3691,
                        -2.6627,
                        0.2028,
                        -0.2748
                    ],
                    SWI4: [
                        -0.9286,
                        -0.023,
                        -0.3651,
                        -0.3278,
                        -0.4798,
                        0.2047,
                        0.3222,
                        -0.2377,
                        -0.6369,
                        -1.4226,
                        -0.5294,
                        0.2996,
                        0.2812
                    ],
                    SWI5: [
                        -0.7675,
                        -0.2033,
                        -0.9106,
                        -0.7234,
                        -1.9049,
                        0.7854,
                        -0.257,
                        -0.1687,
                        -1.0667,
                        0.1028,
                        -0.0286,
                        0.4798,
                        0.097
                    ],
                    YHP1: [
                        -1.1269,
                        -0.21,
                        -0.6676,
                        -1.6964,
                        -0.3496,
                        1.2371,
                        0.9432,
                        -0.3621,
                        -1.8086,
                        0.6617,
                        0.6192,
                        0.205,
                        -0.725
                    ],
                    YOX1: [
                        -0.2025,
                        -1.0587,
                        -0.6402,
                        -2.2532,
                        -0.083,
                        -1.6117,
                        -0.104,
                        -0.1487,
                        -0.9394,
                        -0.5901,
                        0.1329,
                        -0.7222,
                        -0.5117
                    ],
                    ZAP1: [
                        0.6594,
                        0.6135,
                        0.3238,
                        -0.3712,
                        1.4712,
                        1.9049,
                        0.599,
                        -0.2354,
                        -0.394,
                        2.9606,
                        3.5569,
                        1.3863,
                        null
                    ]
                }
            },
            dcin5_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        -0.1718,
                        -0.2792,
                        -0.1752,
                        -0.6884,
                        -0.2436,
                        0.1581,
                        -0.4253,
                        null,
                        0.5682,
                        0.1646,
                        -0.3202,
                        -0.3888
                    ],
                    ASH1: [
                        -1.3229,
                        -0.4236,
                        -1.8945,
                        -1.6929,
                        -2.2704,
                        -1.0939,
                        -1.3098,
                        -1.017,
                        -1.7106,
                        -1.7777,
                        -1.9029,
                        -1.3284
                    ],
                    CIN5: [
                        -0.6685,
                        null,
                        -0.4322,
                        -0.1191,
                        -0.383,
                        0.2693,
                        -0.0757,
                        0.5975,
                        null,
                        -0.3216,
                        0.0805,
                        0.4778
                    ],
                    GCR2: [
                        -0.3155,
                        1.4649,
                        -0.8029,
                        0.5141,
                        -0.7654,
                        -1.1456,
                        0.5096,
                        -0.2957,
                        -0.2257,
                        -0.9404,
                        -1.3326,
                        0.1689
                    ],
                    GLN3: [
                        0.9621,
                        -0.3518,
                        0.3101,
                        -0.1589,
                        0.5869,
                        0.0341,
                        0.486,
                        0.4342,
                        1.0717,
                        0.0559,
                        1.1548,
                        0.5446
                    ],
                    HAP4: [
                        0.0633,
                        0.1712,
                        -1.9531,
                        -0.2151,
                        -1.463,
                        0.3025,
                        -2.2646,
                        1.4417,
                        -1.2318,
                        -0.1403,
                        -1.9814,
                        -1.2117
                    ],
                    HMO1: [
                        -0.9169,
                        1.2958,
                        0.427,
                        -0.0712,
                        1.5911,
                        1.2566,
                        0.391,
                        -0.3126,
                        1.5823,
                        2.7767,
                        0.9466,
                        1.4665
                    ],
                    MSN2: [
                        null,
                        -0.5489,
                        0.2491,
                        0.9036,
                        -0.5302,
                        0.016,
                        -0.0997,
                        1.0787,
                        -0.1371,
                        0.029,
                        0.4011,
                        0.0603
                    ],
                    SFP1: [
                        1.0932,
                        0.4726,
                        1.1255,
                        0.6263,
                        0.5256,
                        -0.3325,
                        1.6525,
                        -0.1135,
                        0.61,
                        0.6721,
                        0.9582,
                        0.3127
                    ],
                    STB5: [
                        1.259,
                        1.0717,
                        0.916,
                        0.804,
                        -1.9025,
                        -0.4406,
                        0.5659,
                        1.258,
                        0.4927,
                        0.2925,
                        1.6588,
                        1.1319
                    ],
                    SWI4: [
                        -0.4763,
                        -0.4529,
                        -0.3336,
                        -0.5489,
                        2.5266,
                        0.4041,
                        0.0257,
                        -0.2142,
                        -0.3101,
                        0.905,
                        0.092,
                        0.2312
                    ],
                    SWI5: [
                        -0.1331,
                        0.1802,
                        -0.3214,
                        -0.0182,
                        0.8526,
                        -0.4332,
                        0.2249,
                        -0.7035,
                        0.0663,
                        -0.4419,
                        0.9222,
                        0.209
                    ],
                    YHP1: [
                        -1.2421,
                        0.3344,
                        -0.735,
                        0.2935,
                        -1.2684,
                        -0.8782,
                        1.0021,
                        -0.7668,
                        0.9796,
                        -0.0528,
                        -0.8693,
                        0.5579
                    ],
                    YOX1: [
                        -1.3434,
                        -0.9354,
                        -1.7084,
                        -0.2822,
                        -0.0589,
                        -0.7158,
                        -0.1155,
                        -2.4802,
                        0.6657,
                        0.5316,
                        -1.3987,
                        0.2985
                    ],
                    ZAP1: [
                        0.8344,
                        0.8398,
                        0.9184,
                        0.4747,
                        2.3845,
                        0.1525,
                        0.6511,
                        -0.8263,
                        0.3113,
                        -0.0906,
                        0.9699,
                        -0.0441
                    ]
                }
            },
            dgln3_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        -0.8095,
                        -0.6243,
                        -1.1296,
                        -1.1113,
                        -1.408,
                        2.6021,
                        -0.4079,
                        1.2346,
                        1.1846,
                        -0.0588,
                        0.4404,
                        -0.1933
                    ],
                    ASH1: [
                        -1.0181,
                        -0.3813,
                        0.5164,
                        -0.17,
                        0.4056,
                        -0.3139,
                        -1.1147,
                        -0.9282,
                        0.9089,
                        -0.5136,
                        -0.6743,
                        -1.3101
                    ],
                    CIN5: [
                        1.452,
                        0.3668,
                        0.1465,
                        1.0023,
                        1.662,
                        2.9945,
                        1.3996,
                        1.9426,
                        0.2912,
                        0.6282,
                        3.2391,
                        2.5788
                    ],
                    GCR2: [
                        -0.5184,
                        1.3267,
                        1.0101,
                        -0.0616,
                        null,
                        -0.1998,
                        1.1081,
                        0.1989,
                        1.6447,
                        -1.6054,
                        0.7045,
                        0.7673
                    ],
                    GLN3: [
                        0.5957,
                        0.8549,
                        -0.6759,
                        0.6343,
                        -0.0861,
                        -1.0684,
                        0.3023,
                        0.4177,
                        0.1085,
                        -0.446,
                        0.8018,
                        -0.161
                    ],
                    HAP4: [
                        3.3136,
                        1.8683,
                        0.9064,
                        0.2848,
                        1.2426,
                        1.4451,
                        0.9148,
                        -0.0132,
                        1.2979,
                        0.1059,
                        -0.2976,
                        0.2256
                    ],
                    HMO1: [
                        0.9772,
                        1.4618,
                        -0.7156,
                        0.7899,
                        1.5735,
                        1.1125,
                        1.1016,
                        0.5146,
                        1.3433,
                        0.9501,
                        1.5648,
                        1.7134
                    ],
                    MSN2: [
                        1.0775,
                        -1.2575,
                        0.9656,
                        0.1669,
                        0.9394,
                        0.6417,
                        0.5814,
                        2.5089,
                        0.8539,
                        1.4608,
                        0.7794,
                        -0.287
                    ],
                    SFP1: [
                        -0.4157,
                        0.884,
                        1.2987,
                        1.3916,
                        1.055,
                        -0.6434,
                        2.4701,
                        2.3169,
                        1.2748,
                        1.2483,
                        0.2385,
                        1.2221
                    ],
                    STB5: [
                        0.8397,
                        0.8573,
                        0.2292,
                        null,
                        1.1875,
                        0.2161,
                        0.0347,
                        0.9642,
                        0.7419,
                        0.1088,
                        0.6585,
                        0.2671
                    ],
                    SWI4: [
                        0.1741,
                        -0.5323,
                        -1.2532,
                        -0.0805,
                        -0.3044,
                        0.44,
                        -1.0187,
                        -0.5621,
                        -0.8838,
                        0.9617,
                        -0.8963,
                        -0.2724
                    ],
                    SWI5: [
                        -0.5215,
                        -1.3444,
                        0.4807,
                        0.0665,
                        -0.0551,
                        -0.2995,
                        -0.4057,
                        -0.4289,
                        null,
                        -0.9991,
                        0.4751,
                        0.2162
                    ],
                    YHP1: [
                        -0.7022,
                        0.5408,
                        -0.0443,
                        0.5406,
                        0.8118,
                        0.9184,
                        2.4355,
                        1.1496,
                        1.0066,
                        -0.2962,
                        0.3564,
                        1.0391
                    ],
                    YOX1: [
                        null,
                        0.5644,
                        -0.0194,
                        0.8211,
                        1.1649,
                        0.3713,
                        0.6099,
                        0.9206,
                        0.9647,
                        0.491,
                        0.9253,
                        1.2979
                    ],
                    ZAP1: [
                        -1.2207,
                        -0.2262,
                        null,
                        0.405,
                        -0.5982,
                        1.7576,
                        null,
                        1.3799,
                        -1.6436,
                        -0.5111,
                        -1.0852,
                        null
                    ]
                }
            },
            dhap4_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        -0.558,
                        -0.313,
                        -0.0886,
                        0.5674,
                        -0.448,
                        -0.4768,
                        -0.598,
                        -0.1176,
                        -0.2783,
                        -0.6083,
                        -0.6331,
                        0.1985
                    ],
                    ASH1: [
                        -1.5401,
                        -0.0523,
                        -0.7026,
                        -0.4933,
                        -0.8167,
                        -0.0028,
                        -0.6568,
                        -1.0267,
                        -1.9867,
                        -1.5253,
                        -1.0837,
                        -1.5982
                    ],
                    CIN5: [
                        -0.3943,
                        3.098,
                        -0.7818,
                        0.5366,
                        1.0477,
                        1.9388,
                        1.9985,
                        1.948,
                        2.8678,
                        3.26,
                        2.2513,
                        1.9187
                    ],
                    GCR2: [
                        1.5094,
                        0.4057,
                        0.5999,
                        1.291,
                        1.5787,
                        -0.5042,
                        1.659,
                        1.728,
                        0.4889,
                        -0.2991,
                        0.9863,
                        0.9578
                    ],
                    GLN3: [
                        -0.4169,
                        0.6492,
                        -0.1259,
                        0.7149,
                        0.0457,
                        0.2932,
                        -0.3901,
                        0.2321,
                        0.9238,
                        0.3174,
                        -0.0252,
                        1.0246
                    ],
                    HAP4: [
                        0.4102,
                        -0.9203,
                        0.3786,
                        -0.8169,
                        0.0301,
                        -1.4462,
                        -0.3025,
                        -0.3727,
                        -0.2195,
                        -1.1639,
                        0.2619,
                        -0.5285
                    ],
                    HMO1: [
                        2.9631,
                        0.0054,
                        1.0227,
                        -1.8079,
                        2.6496,
                        1.8897,
                        1.3275,
                        -2.4363,
                        1.3018,
                        -0.2604,
                        2.3205,
                        -0.2676
                    ],
                    MSN2: [
                        0.8346,
                        0.5458,
                        -0.4035,
                        0.5827,
                        1.0075,
                        0.8038,
                        1.1451,
                        0.6532,
                        1.4213,
                        0.7549,
                        0.3324,
                        0.3404
                    ],
                    SFP1: [
                        0.475,
                        0.8935,
                        0.0344,
                        0.9253,
                        -0.2822,
                        0.8125,
                        0.4466,
                        0.3866,
                        -0.1762,
                        0.4906,
                        0.4941,
                        0.4523
                    ],
                    STB5: [
                        -0.1941,
                        -0.1977,
                        0.3222,
                        null,
                        0.4058,
                        -0.84,
                        0.4143,
                        null,
                        null,
                        -0.1119,
                        0.4121,
                        0.1617
                    ],
                    SWI4: [
                        0.857,
                        0.3944,
                        -0.0101,
                        -0.8563,
                        -0.1573,
                        -0.1339,
                        -0.1171,
                        null,
                        0.3775,
                        0.4539,
                        0.3331,
                        0.2096
                    ],
                    SWI5: [
                        null,
                        0.1491,
                        -0.9615,
                        0.6945,
                        -1.177,
                        0.155,
                        -1.3155,
                        -0.1184,
                        -1.0331,
                        0.07,
                        -0.7403,
                        0.728
                    ],
                    YHP1: [
                        -0.8778,
                        -0.5421,
                        -1.4449,
                        -0.6419,
                        -0.986,
                        -0.0224,
                        -0.4459,
                        -0.1383,
                        0.9324,
                        1.2889,
                        0.6571,
                        0.9774
                    ],
                    YOX1: [
                        -1.7099,
                        -1.3898,
                        -2.1356,
                        -1.6842,
                        -0.1238,
                        -1.0174,
                        0.37,
                        -1.6723,
                        -0.259,
                        -0.2008,
                        -1.5284,
                        -1.0413
                    ],
                    ZAP1: [
                        -1.903,
                        null,
                        1.5545,
                        -0.0849,
                        -0.6127,
                        1.2343,
                        -0.5888,
                        -0.8746,
                        -0.8822,
                        0.6754,
                        -0.7341,
                        -0.5958
                    ]
                }
            },
            dhmo1_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        0.2392,
                        -0.3695,
                        -1.0907,
                        0.1755,
                        0.527,
                        -0.1989,
                        -0.9593,
                        -0.2329,
                        0.0175,
                        -0.4998,
                        -0.2991,
                        -0.2388
                    ],
                    ASH1: [
                        0.2718,
                        1.0969,
                        0.0825,
                        -0.4366,
                        -2.2907,
                        0.5026,
                        -0.2715,
                        -0.5741,
                        -1.5159,
                        0.4211,
                        1.7901,
                        -0.8754
                    ],
                    CIN5: [
                        0.6239,
                        0.8184,
                        1.4916,
                        -0.8397,
                        0.8867,
                        1.2387,
                        2.2606,
                        0.3293,
                        1.2067,
                        1.7983,
                        -0.7066,
                        1.0148
                    ],
                    GCR2: [
                        -0.5316,
                        -0.2221,
                        1.0726,
                        -0.9918,
                        0.3892,
                        0.3353,
                        -0.2957,
                        -0.4503,
                        0.2892,
                        1.2637,
                        0.0502,
                        -0.8057
                    ],
                    GLN3: [
                        -0.3938,
                        0.0786,
                        -0.9799,
                        0.3603,
                        -0.5682,
                        -0.0728,
                        -0.186,
                        0.6306,
                        0.2917,
                        -0.1706,
                        0.2925,
                        0.8914
                    ],
                    HAP4: [
                        0.2944,
                        -1.0325,
                        -0.3442,
                        0.8937,
                        -1.578,
                        -1.4498,
                        -0.7384,
                        -0.2666,
                        -1.5417,
                        -3.0545,
                        1.8973,
                        -0.8844
                    ],
                    HMO1: [
                        1.0058,
                        -0.0317,
                        2.0181,
                        0.7888,
                        -0.2066,
                        0.3846,
                        0.0914,
                        0.1787,
                        0.1767,
                        0.4898,
                        0.8354,
                        0.4644
                    ],
                    MSN2: [
                        -0.3229,
                        -0.3717,
                        -0.8013,
                        0.4516,
                        -0.3778,
                        -0.3248,
                        -0.4761,
                        0.9505,
                        -0.2303,
                        -0.5603,
                        1.2227,
                        0.5789
                    ],
                    SFP1: [
                        1.2329,
                        2.2441,
                        0.4948,
                        -0.6945,
                        -0.8346,
                        1.8561,
                        -0.5287,
                        -0.6066,
                        0.9984,
                        1.3966,
                        -0.1514,
                        -0.5851
                    ],
                    STB5: [
                        1.5366,
                        0.5574,
                        null,
                        null,
                        0.297,
                        0.1843,
                        0.1582,
                        null,
                        1.7097,
                        0.6198,
                        null,
                        null
                    ],
                    SWI4: [
                        0.5249,
                        0.1762,
                        -0.1695,
                        0.3361,
                        1.0117,
                        -0.5471,
                        -0.1491,
                        0.2608,
                        0.7408,
                        -0.5783,
                        0.4557,
                        0.5229
                    ],
                    SWI5: [
                        -1.5273,
                        -0.0479,
                        -0.4886,
                        -0.0472,
                        -0.3741,
                        -0.8655,
                        -1.1639,
                        -0.2628,
                        -0.6299,
                        0.0682,
                        0.3035,
                        -0.5416
                    ],
                    YHP1: [
                        -0.182,
                        -1.0702,
                        -0.8447,
                        -1.0068,
                        0.1177,
                        -0.3511,
                        0.0224,
                        -0.6165,
                        0.7703,
                        -1.1442,
                        -0.8058,
                        0.1403
                    ],
                    YOX1: [
                        -2.4929,
                        -0.4533,
                        -0.2265,
                        -1.1137,
                        -0.9117,
                        -0.248,
                        -0.0783,
                        -1.7543,
                        -0.7781,
                        -0.3231,
                        0.2596,
                        -2.0924
                    ],
                    ZAP1: [
                        -0.2308,
                        -0.3917,
                        -1.0017,
                        0.1766,
                        0.0117,
                        0.1751,
                        -0.9756,
                        -0.5304,
                        0.4411,
                        -0.709,
                        -0.0099,
                        0.8415
                    ]
                }
            },
            dzap1_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                data: {
                    id: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60],
                    ACE2: [
                        -0.2778,
                        -0.804,
                        -0.3835,
                        0.328,
                        -0.6418,
                        -0.8003,
                        -3.4693,
                        -1.458,
                        0.2762,
                        -0.7411,
                        -1.2214,
                        -0.5369
                    ],
                    ASH1: [
                        1.3934,
                        -0.5424,
                        0.2105,
                        2.8875,
                        0.6473,
                        -0.8143,
                        0.2084,
                        -0.8951,
                        -0.0794,
                        -1.7999,
                        -0.441,
                        -1.2416
                    ],
                    CIN5: [
                        null,
                        2.4162,
                        1.1741,
                        0.7413,
                        1.7565,
                        2.5972,
                        0.8693,
                        2.4257,
                        1.5716,
                        3.7502,
                        2.3832,
                        2.675
                    ],
                    GCR2: [
                        0.6693,
                        0.4593,
                        -0.1973,
                        1.153,
                        -0.1936,
                        0.3101,
                        0.9935,
                        0.3293,
                        0.2218,
                        -0.2001,
                        0.8909,
                        0.6109
                    ],
                    GLN3: [
                        0.4944,
                        0.6415,
                        -0.1257,
                        0.9388,
                        0.6684,
                        0.4256,
                        0.198,
                        0.5877,
                        0.5854,
                        0.178,
                        0.0267,
                        1.0084
                    ],
                    HAP4: [
                        0.9889,
                        1.6616,
                        0.5464,
                        1.3427,
                        0.0359,
                        -0.3139,
                        0.246,
                        -1.816,
                        -0.1356,
                        -0.6358,
                        -0.2169,
                        -1.1214
                    ],
                    HMO1: [
                        0.3519,
                        1.4939,
                        2.1933,
                        0.7561,
                        0.3961,
                        1.6777,
                        1.8124,
                        0.7252,
                        1.168,
                        2.1741,
                        2.2209,
                        2.0417
                    ],
                    MSN2: [
                        -0.1455,
                        0.7077,
                        -0.3519,
                        0.9785,
                        1.0745,
                        0.5327,
                        0.5032,
                        1.0997,
                        1.1006,
                        0.4626,
                        -0.2581,
                        0.848
                    ],
                    SFP1: [
                        0.5518,
                        0.6949,
                        0.4098,
                        0.5577,
                        0.82,
                        1.0041,
                        1.372,
                        1.4371,
                        -0.6863,
                        0.0001,
                        0.3495,
                        0.5506
                    ],
                    STB5: [
                        0.3316,
                        -3.3906,
                        0.8183,
                        -0.0735,
                        -0.161,
                        0.5405,
                        0.5489,
                        0.5018,
                        -0.5358,
                        -0.1065,
                        1.1893,
                        0.1914
                    ],
                    SWI4: [
                        -0.0389,
                        -0.9307,
                        0.4958,
                        -0.0196,
                        0.4521,
                        -0.6053,
                        -0.7988,
                        -0.1749,
                        0.3006,
                        0.0909,
                        -0.7866,
                        0.2419
                    ],
                    SWI5: [
                        -1.0275,
                        -0.3405,
                        -1.2339,
                        -0.6617,
                        1.0472,
                        -0.2527,
                        -0.8267,
                        -0.5495,
                        -0.217,
                        -0.1531,
                        -0.3907,
                        -0.2836
                    ],
                    YHP1: [
                        -0.7061,
                        -0.8436,
                        -2.1758,
                        -1.6097,
                        -0.7422,
                        0.4833,
                        0.6116,
                        -0.0835,
                        -0.4454,
                        0.3472,
                        0.7491,
                        0.6957
                    ],
                    YOX1: [
                        -1.7194,
                        -0.4979,
                        -1.2355,
                        -1.9155,
                        -0.5178,
                        0.6255,
                        -0.8938,
                        -0.5063,
                        -1.0352,
                        0.8516,
                        -0.3387,
                        -1.0581
                    ],
                    ZAP1: [
                        null,
                        0.1287,
                        0.7379,
                        0.7652,
                        -1.2348,
                        -0.2555,
                        -5.062,
                        -0.2373,
                        null,
                        0.6914,
                        -2.676,
                        -0.8246
                    ]
                }
            }
        }
    };
    return processDemo(path, res, app, workbook2);
};

var demoWorkbook3 = function (path, res, app) {
    let workbook3 = {
        genes: [
            {name: "ABF1"}, {name: "ACE2"},
            {name: "AFT1"}, {name: "CIN5"},
            {name: "CUP9"}, {name: "FHL1"},
            {name: "GTS1"}, {name: "HAL9"},
            {name: "HSF1"}, {name: "MAC1"},
            {name: "MSN1"}, {name: "MSN4"},
            {name: "NRG1"}, {name: "PHD1"},
            {name: "RAP1"}, {name: "REB1"},
            {name: "ROX1"}, {name: "RPH1"},
            {name: "SKN7"}, {name: "YAP1"},
            {name: "YAP6"}
        ],
        links: [
            {
                source: 2,
                target: 2,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 14,
                target: 2,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 20,
                target: 3,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 9,
                target: 4,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 13,
                target: 4,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 0,
                target: 5,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 11,
                target: 5,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 15,
                target: 6,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 14,
                target: 8,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 0,
                target: 10,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 3,
                target: 10,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 7,
                target: 11,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 13,
                target: 11,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 14,
                target: 11,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 12,
                target: 12,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 18,
                target: 12,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 14,
                target: 14,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 8,
                target: 15,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 3,
                target: 16,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 18,
                target: 16,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 19,
                target: 16,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 20,
                target: 16,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 14,
                target: 17,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 1,
                target: 19,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 18,
                target: 19,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 3,
                target: 20,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 4,
                target: 20,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 12,
                target: 20,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 16,
                target: 20,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 19,
                target: 20,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            },
            {
                source: 20,
                target: 20,
                value: 1,
                type: "arrowhead",
                stroke: "black"
            }
        ],
        errors: [],
        warnings: [],
        positiveWeights: [
            1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1
        ],
        negativeWeights: [],
        sheetType: "unweighted",
        network: {
            genes: [
                {name: "ABF1"}, {name: "ACE2"},
                {name: "AFT1"}, {name: "CIN5"},
                {name: "CUP9"}, {name: "FHL1"},
                {name: "GTS1"}, {name: "HAL9"},
                {name: "HSF1"}, {name: "MAC1"},
                {name: "MSN1"}, {name: "MSN4"},
                {name: "NRG1"}, {name: "PHD1"},
                {name: "RAP1"}, {name: "REB1"},
                {name: "ROX1"}, {name: "RPH1"},
                {name: "SKN7"}, {name: "YAP1"},
                {name: "YAP6"}
            ],
            links: [
                {
                    source: 2,
                    target: 2,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 14,
                    target: 2,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 20,
                    target: 3,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 9,
                    target: 4,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 13,
                    target: 4,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 0,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 11,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 15,
                    target: 6,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 14,
                    target: 8,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 0,
                    target: 10,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 3,
                    target: 10,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 11,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 13,
                    target: 11,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 14,
                    target: 11,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 12,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 18,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 14,
                    target: 14,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 8,
                    target: 15,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 3,
                    target: 16,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 18,
                    target: 16,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 19,
                    target: 16,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 20,
                    target: 16,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 14,
                    target: 17,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 1,
                    target: 19,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 18,
                    target: 19,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 3,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 4,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 12,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 16,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 19,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 20,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                }
            ],
            errors: [],
            warnings: [],
            positiveWeights: [
                1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1
            ],
            negativeWeights: [],
            sheetType: "unweighted",
        },
        meta: {
            data: {
                b_or_tau: 1,
                alpha: 0.01,
                kk_max: 1,
                MaxIter: 1000000,
                TolFun: 0.00001,
                MaxFunEval: 1000000,
                TolX: 0.00001,
                species: "Saccharomyces cerevisiae",
                taxon_id: 559292
            }
        },
        two_column_sheets: {},
        expression: {
            wt_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [0, 10, 30, 120],
                data: {
                    id: [0, 10, 30, 120],
                    ABF1: [
                        1.62100239431284,
                        -0.353687539565399,
                        -0.269044119924831,
                        -1.25384057214548
                    ],
                    ACE2: [
                        -0.542362088105436,
                        -0.024845402327843,
                        -0.415369492445345,
                        -0.348747330119644
                    ],
                    AFT1: [
                        -0.32846952226327,
                        0.396464433219304,
                        0.115818662039867,
                        0.0584412557129884
                    ],
                    CIN5: [
                        -0.234991516395649,
                        -0.0741113127178069,
                        -0.0456720820000205,
                        0.48435089511121
                    ],
                    CUP9: [
                        0.432641651272595,
                        -0.0306684879168197,
                        -0.163122922364141,
                        -0.817933175949085
                    ],
                    FHL1: [
                        -0.54635409361384,
                        -0.177702175440022,
                        -0.236781583878199,
                        -0.751479125253624
                    ],
                    GTS1: [
                        -0.337423546808216,
                        -0.189417763962253,
                        0.122361891604149,
                        0.85617821882841
                    ],
                    HAL9: [
                        0.196713085663481,
                        -0.215311204378079,
                        0.0859259727424874,
                        -0.358468456146476
                    ],
                    HSF1: [
                        -0.0038567306292019,
                        -0.145983117508207,
                        -0.779872170815164,
                        -0.374270428724199
                    ],
                    MAC1: [
                        -0.779864532809714,
                        -0.177416307045288,
                        0.0760943634025481,
                        0.584918721333908
                    ],
                    MSN1: [
                        -0.141570298797228,
                        -0.413937835310377,
                        0.0893084356432152,
                        0.0470133268739051
                    ],
                    MSN4: [
                        -0.00706690156554253,
                        0.296882160436477,
                        0.257649229127733,
                        1.12483724822588
                    ],
                    NRG1: [
                        -0.441265482179999,
                        -0.123917260489536,
                        0.515307647088341,
                        -0.302597361137033
                    ],
                    PHD1: [
                        -0.0206431602418844,
                        0.324677303691349,
                        0.570684021129667,
                        0.107597435636844
                    ],
                    RAP1: [
                        -0.224725358749457,
                        -0.0227383896555908,
                        0.339727876333176,
                        0.551358674550414
                    ],
                    REB1: [
                        0.0752458674357781,
                        0.199156621227008,
                        0.266716184238132,
                        0.349108820266887
                    ],
                    ROX1: [
                        -0.350702902328527,
                        -0.292895449041907,
                        0.234339552687139,
                        -0.211670470560137
                    ],
                    RPH1: [
                        0.676566698424775,
                        1.13625391278637,
                        0.895202253528928,
                        0.703203788797659
                    ],
                    SKN7: [
                        0.188432613719977,
                        0.0354687767265247,
                        0.168518582758726,
                        0.935178846216626
                    ],
                    YAP1: [
                        -0.652493101169251,
                        0.189695406533886,
                        0.309696954756946,
                        1.34992757953657
                    ],
                    YAP6: [
                        0.13453506928279,
                        -0.254310531526817,
                        0.077965858058162,
                        0.282016616624998
                    ]
                }
            }
            ,
            concentration_sigmas: {
                errors: [],
                warnings: [],
                timePoints: [0, 10, 30, 120],
                data: {
                    id: [0, 10, 30, 120],
                    ABF1: [
                        2.71777487986611,
                        0.27986899329142,
                        0.522748783650324,
                        0.557745230046718
                    ],
                    ACE2: [
                        0.658658387432468,
                        0.55974171992608,
                        1.31944253637848,
                        1.28722744723447
                    ],
                    AFT1: [
                        0.103060414661444,
                        0.480576075674813,
                        0.92592442334034,
                        0.61484906015845
                    ],
                    CIN5: [
                        1.1214181944664,
                        0.558525389688959,
                        0.350440081828329,
                        0.701132306058484
                    ],
                    CUP9: [
                        0.571588126574505,
                        0.476862766516651,
                        0.532731837558382,
                        0.642550174780571
                    ],
                    FHL1: [
                        0.551809714876473,
                        0.310907213630283,
                        0.413596971972307,
                        0.27838685574573
                    ],
                    GTS1: [
                        0.637543946091396,
                        0.638136472103346,
                        0.370920859082731,
                        0.632145164213578
                    ],
                    HAL9: [
                        0.750681842690564,
                        0.567425433190303,
                        0.1720359102785,
                        0.830032748552491
                    ],
                    HSF1: [
                        0.472374289194041,
                        0.125353640504095,
                        0.61688474848807,
                        0.428234964372342
                    ],
                    MAC1: [
                        0.490871273599627,
                        0.523819809707266,
                        0.702698300915048,
                        0.294308256089014
                    ],
                    MSN1: [
                        0.517686892672434,
                        0.569467167631612,
                        0.573163984104746,
                        0.0487954337992431
                    ],
                    MSN4: [
                        0.700989492431559,
                        0.350390201827997,
                        0.838657384548128,
                        0.496035887397783
                    ],
                    NRG1: [
                        0.950326141853446,
                        0.637115835913111,
                        1.34022471629282,
                        0.870955863181198
                    ],
                    PHD1: [
                        0.783181044878409,
                        0.855458717149537,
                        0.72016694852558,
                        0.144887569263751
                    ],
                    RAP1: [
                        0.497380582214743,
                        0.580584775493954,
                        1.20966001285646,
                        0.321909569769086
                    ],
                    REB1: [
                        0.927724627097144,
                        0.688247241774659,
                        0.483605565314633,
                        0.559449434883519
                    ],
                    ROX1: [
                        0.0859670402509422,
                        0.406601545483622,
                        0.523734279115329,
                        0.609092088578692
                    ],
                    RPH1: [
                        0.304433908079434,
                        0.583135799611055,
                        0.600871248901484,
                        0.187674264335184
                    ],
                    SKN7: [
                        1.465354044073,
                        0.310892835523475,
                        0.824353528992211,
                        0.808151408745322
                    ],
                    YAP1: [
                        2.12082639039796,
                        0.706426447456865,
                        0.674225402017788,
                        1.08585354534919
                    ],
                    YAP6: [
                        0.531097939780894,
                        1.73130881011747,
                        0.587484769050016,
                        0.317738773448307
                    ]
                }
            }

        }

    };
    return processDemo(path, res, app, workbook3);
};

var demoWorkbook4 = function (path, res, app) {
    let workbook4 = {
        genes: [
            {name: "ABF1"}, {name: "ACE2"},
            {name: "AFT1"}, {name: "CIN5"},
            {name: "CUP9"}, {name: "FHL1"},
            {name: "GTS1"}, {name: "HAL9"},
            {name: "HSF1"}, {name: "MAC1"},
            {name: "MSN1"}, {name: "MSN4"},
            {name: "NRG1"}, {name: "PHD1"},
            {name: "RAP1"}, {name: "REB1"},
            {name: "ROX1"}, {name: "RPH1"},
            {name: "SKN7"}, {name: "YAP1"},
            {name: "YAP6"}
        ],
        links: [
            {
                source: 2,
                target: 2,
                value: -0.896555677681216,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 14,
                target: 2,
                value: -0.403028621528307,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 20,
                target: 3,
                value: -0.0450315496331435,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 9,
                target: 4,
                value: -0.18820887875915,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 13,
                target: 4,
                value: -0.650955288189242,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 0,
                target: 5,
                value: 0.15615434905189,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 11,
                target: 5,
                value: 0.612066547080511,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 15,
                target: 6,
                value: 0.0778458823380613,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 14,
                target: 8,
                value: -1.23208587861177,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 0,
                target: 10,
                value: -2.97067736065784,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 3,
                target: 10,
                value: 0.939294826447273,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 7,
                target: 11,
                value: 1.4282638085008,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 13,
                target: 11,
                value: 0.544681505712239,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 14,
                target: 11,
                value: 1.01307889311721,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 12,
                target: 12,
                value: 1.23409866344768,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 18,
                target: 12,
                value: -0.185164874102172,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 14,
                target: 14,
                value: -0.889049094686067,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 8,
                target: 15,
                value: -0.0101948512124708,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 3,
                target: 16,
                value: -0.927789501254435,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 18,
                target: 16,
                value: 0.574424645342421,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 19,
                target: 16,
                value: -0.431504375436921,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 20,
                target: 16,
                value: -0.507074385510923,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 14,
                target: 17,
                value: 1.49988232490169,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 1,
                target: 19,
                value: -1.3615135448899,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 18,
                target: 19,
                value: -0.408190452912878,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 3,
                target: 20,
                value: -0.531223672159855,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 4,
                target: 20,
                value: -0.129252218618744,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 12,
                target: 20,
                value: 0.62145042255407,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 16,
                target: 20,
                value: -0.750331369063822,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            },
            {
                source: 19,
                target: 20,
                value: 0.0145922505908641,
                type: "arrowhead",
                stroke: "rgb(195, 61, 61)"
            },
            {
                source: 20,
                target: 20,
                value: -0.302673111220415,
                type: "repressor",
                stroke: "rgb(51, 124, 183)"
            }
        ],
        errors: [],
        warnings: [],
        positiveWeights: [
            0.15615434905189,
            0.612066547080511,
            0.0778458823380613,
            0.939294826447273,
            1.4282638085008,
            0.544681505712239,
            1.01307889311721,
            1.23409866344768,
            0.574424645342421,
            1.49988232490169,
            0.62145042255407,
            0.0145922505908641
        ],
        negativeWeights: [
            -0.896555677681216, -0.403028621528307,
            -0.0450315496331435, -0.18820887875915,
            -0.650955288189242, -1.23208587861177,
            -2.97067736065784, -0.185164874102172,
            -0.889049094686067, -0.0101948512124708,
            -0.927789501254435, -0.431504375436921,
            -0.507074385510923, -1.3615135448899,
            -0.408190452912878, -0.531223672159855,
            -0.129252218618744, -0.750331369063822,
            -0.302673111220415
        ],
        sheetType: "weighted",
        network: {
            genes: [
                {name: "ABF1"}, {name: "ACE2"},
                {name: "AFT1"}, {name: "CIN5"},
                {name: "CUP9"}, {name: "FHL1"},
                {name: "GTS1"}, {name: "HAL9"},
                {name: "HSF1"}, {name: "MAC1"},
                {name: "MSN1"}, {name: "MSN4"},
                {name: "NRG1"}, {name: "PHD1"},
                {name: "RAP1"}, {name: "REB1"},
                {name: "ROX1"}, {name: "RPH1"},
                {name: "SKN7"}, {name: "YAP1"},
                {name: "YAP6"}
            ],
            links: [
                {
                    source: 2,
                    target: 2,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 14,
                    target: 2,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 20,
                    target: 3,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 9,
                    target: 4,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 13,
                    target: 4,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 0,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 11,
                    target: 5,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 15,
                    target: 6,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 14,
                    target: 8,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 0,
                    target: 10,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 3,
                    target: 10,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 7,
                    target: 11,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 13,
                    target: 11,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 14,
                    target: 11,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 12,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 18,
                    target: 12,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 14,
                    target: 14,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 8,
                    target: 15,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 3,
                    target: 16,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 18,
                    target: 16,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 19,
                    target: 16,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 20,
                    target: 16,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 14,
                    target: 17,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 1,
                    target: 19,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 18,
                    target: 19,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 3,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 4,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 12,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 16,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 19,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                },
                {
                    source: 20,
                    target: 20,
                    value: 1,
                    type: "arrowhead",
                    stroke: "black"
                }
            ],
            errors: [],
            warnings: [],
            positiveWeights: [
                1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1
            ],
            negativeWeights: [],
            sheetType: "unweighted",
        },
        networkOptimizedWeights: {
            genes: [
                {name: "ABF1"}, {name: "ACE2"},
                {name: "AFT1"}, {name: "CIN5"},
                {name: "CUP9"}, {name: "FHL1"},
                {name: "GTS1"}, {name: "HAL9"},
                {name: "HSF1"}, {name: "MAC1"},
                {name: "MSN1"}, {name: "MSN4"},
                {name: "NRG1"}, {name: "PHD1"},
                {name: "RAP1"}, {name: "REB1"},
                {name: "ROX1"}, {name: "RPH1"},
                {name: "SKN7"}, {name: "YAP1"},
                {name: "YAP6"}
            ],
            links: [
                {
                    source: 2,
                    target: 2,
                    value: -0.896555677681216,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 14,
                    target: 2,
                    value: -0.403028621528307,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 20,
                    target: 3,
                    value: -0.0450315496331435,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 9,
                    target: 4,
                    value: -0.18820887875915,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 13,
                    target: 4,
                    value: -0.650955288189242,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 0,
                    target: 5,
                    value: 0.15615434905189,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 11,
                    target: 5,
                    value: 0.612066547080511,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 15,
                    target: 6,
                    value: 0.0778458823380613,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 14,
                    target: 8,
                    value: -1.23208587861177,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 0,
                    target: 10,
                    value: -2.97067736065784,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 3,
                    target: 10,
                    value: 0.939294826447273,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 7,
                    target: 11,
                    value: 1.4282638085008,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 13,
                    target: 11,
                    value: 0.544681505712239,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 14,
                    target: 11,
                    value: 1.01307889311721,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 12,
                    target: 12,
                    value: 1.23409866344768,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 18,
                    target: 12,
                    value: -0.185164874102172,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 14,
                    target: 14,
                    value: -0.889049094686067,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 8,
                    target: 15,
                    value: -0.0101948512124708,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 3,
                    target: 16,
                    value: -0.927789501254435,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 18,
                    target: 16,
                    value: 0.574424645342421,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 19,
                    target: 16,
                    value: -0.431504375436921,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 20,
                    target: 16,
                    value: -0.507074385510923,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 14,
                    target: 17,
                    value: 1.49988232490169,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 1,
                    target: 19,
                    value: -1.3615135448899,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 18,
                    target: 19,
                    value: -0.408190452912878,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 3,
                    target: 20,
                    value: -0.531223672159855,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 4,
                    target: 20,
                    value: -0.129252218618744,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 12,
                    target: 20,
                    value: 0.62145042255407,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 16,
                    target: 20,
                    value: -0.750331369063822,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                },
                {
                    source: 19,
                    target: 20,
                    value: 0.0145922505908641,
                    type: "arrowhead",
                    stroke: "rgb(195, 61, 61)"
                },
                {
                    source: 20,
                    target: 20,
                    value: -0.302673111220415,
                    type: "repressor",
                    stroke: "rgb(51, 124, 183)"
                }
            ],
            errors: [],
            warnings: [],
            positiveWeights: [
                0.15615434905189,
                0.612066547080511,
                0.0778458823380613,
                0.939294826447273,
                1.4282638085008,
                0.544681505712239,
                1.01307889311721,
                1.23409866344768,
                0.574424645342421,
                1.49988232490169,
                0.62145042255407,
                0.0145922505908641
            ],
            negativeWeights: [
                -0.896555677681216, -0.403028621528307,
                -0.0450315496331435, -0.18820887875915,
                -0.650955288189242, -1.23208587861177,
                -2.97067736065784, -0.185164874102172,
                -0.889049094686067, -0.0101948512124708,
                -0.927789501254435, -0.431504375436921,
                -0.507074385510923, -1.3615135448899,
                -0.408190452912878, -0.531223672159855,
                -0.129252218618744, -0.750331369063822,
                -0.302673111220415
            ],
            sheetType: "weighted",
        },
        meta: {
            data: {
                b_or_tau: 1,
                alpha: 0.01,
                kk_max: 1,
                MaxIter: 1000000,
                TolFun: 0.00001,
                MaxFunEval: 1000000,
                TolX: 0.00001,
                species: "Saccharomyces cerevisiae",
                taxon_id: 559292
            }
        },
        two_column_sheets: {},
        expression: {
            wt_log2_expression: {
                errors: [],
                warnings: [],
                timePoints: [0, 10, 30, 120],
                data: {
                    id: [0, 10, 30, 120],
                    ABF1: [
                        1.62100239431284,
                        -0.353687539565399,
                        -0.269044119924831,
                        -1.25384057214548
                    ],
                    ACE2: [
                        -0.542362088105436,
                        -0.024845402327843,
                        -0.415369492445345,
                        -0.348747330119644
                    ],
                    AFT1: [
                        -0.32846952226327,
                        0.396464433219304,
                        0.115818662039867,
                        0.0584412557129884
                    ],
                    CIN5: [
                        -0.234991516395649,
                        -0.0741113127178069,
                        -0.0456720820000205,
                        0.48435089511121
                    ],
                    CUP9: [
                        0.432641651272595,
                        -0.0306684879168197,
                        -0.163122922364141,
                        -0.817933175949085
                    ],
                    FHL1: [
                        -0.54635409361384,
                        -0.177702175440022,
                        -0.236781583878199,
                        -0.751479125253624
                    ],
                    GTS1: [
                        -0.337423546808216,
                        -0.189417763962253,
                        0.122361891604149,
                        0.85617821882841
                    ],
                    HAL9: [
                        0.196713085663481,
                        -0.215311204378079,
                        0.0859259727424874,
                        -0.358468456146476
                    ],
                    HSF1: [
                        -0.0038567306292019,
                        -0.145983117508207,
                        -0.779872170815164,
                        -0.374270428724199
                    ],
                    MAC1: [
                        -0.779864532809714,
                        -0.177416307045288,
                        0.0760943634025481,
                        0.584918721333908
                    ],
                    MSN1: [
                        -0.141570298797228,
                        -0.413937835310377,
                        0.0893084356432152,
                        0.0470133268739051
                    ],
                    MSN4: [
                        -0.00706690156554253,
                        0.296882160436477,
                        0.257649229127733,
                        1.12483724822588
                    ],
                    NRG1: [
                        -0.441265482179999,
                        -0.123917260489536,
                        0.515307647088341,
                        -0.302597361137033
                    ],
                    PHD1: [
                        -0.0206431602418844,
                        0.324677303691349,
                        0.570684021129667,
                        0.107597435636844
                    ],
                    RAP1: [
                        -0.224725358749457,
                        -0.0227383896555908,
                        0.339727876333176,
                        0.551358674550414
                    ],
                    REB1: [
                        0.0752458674357781,
                        0.199156621227008,
                        0.266716184238132,
                        0.349108820266887
                    ],
                    ROX1: [
                        -0.350702902328527,
                        -0.292895449041907,
                        0.234339552687139,
                        -0.211670470560137
                    ],
                    RPH1: [
                        0.676566698424775,
                        1.13625391278637,
                        0.895202253528928,
                        0.703203788797659
                    ],
                    SKN7: [
                        0.188432613719977,
                        0.0354687767265247,
                        0.168518582758726,
                        0.935178846216626
                    ],
                    YAP1: [
                        -0.652493101169251,
                        0.189695406533886,
                        0.309696954756946,
                        1.34992757953657
                    ],
                    YAP6: [
                        0.13453506928279,
                        -0.254310531526817,
                        0.077965858058162,
                        0.282016616624998
                    ]
                }
            }
            ,
            concentration_sigmas: {
                errors: [],
                warnings: [],
                timePoints: [0, 10, 30, 120],
                data: {
                    id: [0, 10, 30, 120],
                    ABF1: [
                        2.71777487986611,
                        0.27986899329142,
                        0.522748783650324,
                        0.557745230046718
                    ],
                    ACE2: [
                        0.658658387432468,
                        0.55974171992608,
                        1.31944253637848,
                        1.28722744723447
                    ],
                    AFT1: [
                        0.103060414661444,
                        0.480576075674813,
                        0.92592442334034,
                        0.61484906015845
                    ],
                    CIN5: [
                        1.1214181944664,
                        0.558525389688959,
                        0.350440081828329,
                        0.701132306058484
                    ],
                    CUP9: [
                        0.571588126574505,
                        0.476862766516651,
                        0.532731837558382,
                        0.642550174780571
                    ],
                    FHL1: [
                        0.551809714876473,
                        0.310907213630283,
                        0.413596971972307,
                        0.27838685574573
                    ],
                    GTS1: [
                        0.637543946091396,
                        0.638136472103346,
                        0.370920859082731,
                        0.632145164213578
                    ],
                    HAL9: [
                        0.750681842690564,
                        0.567425433190303,
                        0.1720359102785,
                        0.830032748552491
                    ],
                    HSF1: [
                        0.472374289194041,
                        0.125353640504095,
                        0.61688474848807,
                        0.428234964372342
                    ],
                    MAC1: [
                        0.490871273599627,
                        0.523819809707266,
                        0.702698300915048,
                        0.294308256089014
                    ],
                    MSN1: [
                        0.517686892672434,
                        0.569467167631612,
                        0.573163984104746,
                        0.0487954337992431
                    ],
                    MSN4: [
                        0.700989492431559,
                        0.350390201827997,
                        0.838657384548128,
                        0.496035887397783
                    ],
                    NRG1: [
                        0.950326141853446,
                        0.637115835913111,
                        1.34022471629282,
                        0.870955863181198
                    ],
                    PHD1: [
                        0.783181044878409,
                        0.855458717149537,
                        0.72016694852558,
                        0.144887569263751
                    ],
                    RAP1: [
                        0.497380582214743,
                        0.580584775493954,
                        1.20966001285646,
                        0.321909569769086
                    ],
                    REB1: [
                        0.927724627097144,
                        0.688247241774659,
                        0.483605565314633,
                        0.559449434883519
                    ],
                    ROX1: [
                        0.0859670402509422,
                        0.406601545483622,
                        0.523734279115329,
                        0.609092088578692
                    ],
                    RPH1: [
                        0.304433908079434,
                        0.583135799611055,
                        0.600871248901484,
                        0.187674264335184
                    ],
                    SKN7: [
                        1.465354044073,
                        0.310892835523475,
                        0.824353528992211,
                        0.808151408745322
                    ],
                    YAP1: [
                        2.12082639039796,
                        0.706426447456865,
                        0.674225402017788,
                        1.08585354534919
                    ],
                    YAP6: [
                        0.531097939780894,
                        1.73130881011747,
                        0.587484769050016,
                        0.317738773448307
                    ]
                }
            }

        }
    };
    return processDemo(path, res, app, workbook4);
};

module.exports = function (path, res, app, workbook) {
    if (path === "test-files/demo-files/15-genes_28-edges_db5_Dahlquist-data_input.xlsx") {
        return demoWorkbook1(path, res, app, workbook);
    } else if (path === "test-files/demo-files/15-genes_28-edges_db5_Dahlquist-data_estimation_output.xlsx") {
        return demoWorkbook2(path, res, app, workbook);
    } else if (path === "test-files/demo-files/21-genes_31-edges_Schade-data_input.xlsx") {
        return demoWorkbook3(path, res, app, workbook);
    } else if (path === "test-files/demo-files/21-genes_31-edges_Schade-data_estimation_output.xlsx") {
        return demoWorkbook4(path, res, app, workbook);
    }
};
