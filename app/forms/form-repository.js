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
                                        label: 'Opinion of Overall Risk:',
                                        options: [
                                            {label: 'Very High', value: 'Very High'},
                                            {label: 'High', value: 'High'},
                                            {label: 'Medium', value: 'Medium'},
                                            {label: 'Low', value: 'Low'}
                                        ]
                                    }
                                },
                                {
                                    width: 9,
                                    field: {
                                        id: 2,
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
                                            label: 'Bob\'s age',
                                            textBox: {lines: 1}
                                        }
                                    },
                                    {
                                        width: 3,
                                        field: {
                                            id: 8,
                                            label: 'Jim\'s age',
                                            textBox: {lines: 1}
                                        }
                                    },
                                    {
                                        width: 6,
                                        field: {
                                            id: 9,
                                            label: 'Bob is sooo old!',
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
                            {
                                columns: [
                                    {
                                        width: 3,
                                        field: {
                                            id: 10,
                                            label: 'Jim\'s birth date',
                                            textBox: {lines: 1}
                                        }
                                    },
                                    {
                                        width: 3,
                                        field: {
                                            id: 11,
                                            label: 'Bob\'s birth date',
                                            textBox: {lines: 1}
                                        }
                                    },
                                    {
                                        width: 6,
                                        field: {
                                            id: 12,
                                            label: 'Jim is so young!',
                                            displayRules: [
                                                {
                                                    conditions: [
                                                        {dateCompareFieldId1: 10, dateCompareFieldId2: 11, comparison: '>'}
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