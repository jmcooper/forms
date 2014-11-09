formsModule.factory('formRepository', function() {
    return {
        get: function (formId) {
            return {
                pages: [
                    {
                        rows: [
                            {columns: [
                                {
                                    width: 3,
                                    field: {
                                        id: 1,
                                        displayName: 'Overall Risk',
                                        label: 'Opinion of Overall Risk:',
                                        //dateType: 'Number|Date|undefined',
                                        options: [
                                            {label: 'Very High', value: 'Very High'},
                                            {label: 'High', value: 'High'},
                                            {label: 'Medium', value: 'Medium'},
                                            {label: 'Low', value: 'Low'}
                                        ],
//                                        validation: {
//                                            required: true,
//                                            minValue: 'number|date',
//                                            maxValue: 'number|date',
//                                            regex: 'abc',
//                                            requiredRules: [
//                                                {
//                                                    or: true,
//                                                    conditions: [
//                                                        {fieldId: 2, value: 'Yes'}
////*************                                                        //{fieldId: 2, operator: '>=', value: 10} //need to do this
//                                                    ]
//                                                }
//                                            ],
                                            requiredValueRules: {
                                                expectedValue: 'foo',
                                                rules: [
                                                {
                                                    or: true,
                                                    conditions: [
                                                        {fieldId: 2, value: 'Yes'}
                                                    ]
                                                }]
                                            }
                                        }
                                    },
                                {
                                    width: 3,
                                    field: {
                                        id: 2,
                                        displayName: 'Recommendations Provided',
                                        label: 'Recommendations to be Provided:',
                                        options: [{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]
                                    }
                                }
                            ]},
                            {
                                columns: [
                                    {
                                        width: 12,
                                        field: {
                                            id: 3,
                                            label: 'If Yes is selected for recommendations, then be sure to complete the recommendations section on the last page of this form.',
                                            displayRules: [
                                                {
                                                    or: true,
                                                    conditions: [
                                                        {fieldId: 2, value: 'Yes'}
                                                    ]
                                                }
                                            ]

                                        }
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        width: 12,
                                        field: {
                                            id: 4,
                                            label: 'If Very High is selected for Overall Risk AND Yes is selected for Recommendations, then...',
                                            displayRules: [
                                                {
                                                    conditions: [
                                                        {fieldId: 1, value: 'Very High'},
                                                        {fieldId: 2, value: 'Yes'}
                                                    ]
                                                }
                                            ]

                                        }
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        width: 12,
                                        field: {
                                            id: 5,
                                            label: 'If Very High is selected for Overall Risk OR Yes is selected for Recommendations, then...',
                                            displayRules: [
                                                {
                                                    or: true,
                                                    conditions: [
                                                        {fieldId: 1, value: 'Very High'},
                                                        {fieldId: 2, value: 'Yes'}
                                                    ]
                                                }
                                            ]

                                        }
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        width: 12,
                                        field: {
                                            id: 6,
                                            displayName: 'Business Description',
                                            label: 'Describe business operations, business description, services and products offered, and surrounding buildings/exposures, etc.',
                                            textBox: {lines: 5}
                                        }
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        width: 3,
                                        field: {
                                            id: 7,
                                            dataType: 'integer',
                                            label: 'Bob\'s age',
                                            textBox: {lines: 1},
                                            validation: {
                                                required: true
                                            }
                                        }
                                    },
                                    {
                                        width: 3,
                                        field: {
                                            id: 8,
                                            dataType: 'decimal',
                                            label: 'Jim\'s age',
                                            textBox: {lines: 1}
                                        }
                                    },
                                    {
                                        width: 6,
                                        field: {
                                            id: 9,
                                            label: 'Bob is so old!',
                                            displayRules: [
                                                {
                                                    conditions: [
                                                        {numericCompareFieldId1: 7, numericCompareFieldId2: 8, comparison: '>='}
                                                    ]
                                                }
                                            ]

                                        }
                                    }
                                ]
                            },
                            //{
                            //    columns: [
                            //        ,
                            //        {
                            //            width: 6,
                            //            field: {
                            //                id: 10,
                            //                label: 'Bob is so very very old!',
                            //                displayRules: [
                            //                    {
                            //                        conditions: [
                            //                            {numericCompareFieldId1: 7, comparison: '>=', value: 10}
                            //                        ]
                            //                    }
                            //                ]
                            //
                            //            }
                            //        }
                            //    ]
                            //},
                            {
                                columns: [
                                    {
                                        width: 3,
                                        field: {
                                            id: 11,
                                            dataType: 'date',
                                            label: 'Jim\'s birth date',
                                            textBox: {lines: 1}
                                        }
                                    },
                                    {
                                        width: 3,
                                        field: {
                                            id: 12,
                                            dataType: 'date',
                                            label: 'Bob\'s birth date',
                                            textBox: {lines: 1}
                                        }
                                    },
                                    {
                                        width: 6,
                                        field: {
                                            id: 13,
                                            label: 'Jim is so young!',
                                            displayRules: [
                                                {
                                                    conditions: [
                                                        {dateCompareFieldId1: 11, dateCompareFieldId2: 12, comparison: '>'}
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        }
    };
});