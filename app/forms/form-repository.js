formsModule.factory('formRepository', function() {
    return {
        get: function (formId) {
            return {
                pages: [
                    {
                        rows: [
                            {
                                columns: [
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
                                            ]
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
                                ]
                            },
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
                                            textBox: {lines: 5},
                                            validation: {
                                                minlength: 20,
                                                maxlength: 500
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        width: 12,
                                        field: {
                                            id: 50,
                                            displayName: 'Recommendations',
                                            label: 'Recommendations',
                                            textBox: {lines: 5},
                                            validation : {
                                                requiredValueRules: {
                                                    validationMessage: 'Recommendations is required when "Yes" is selected for "Recommendations to be Provided"',
                                                    rules: [
                                                        {
                                                            conditions: [
                                                                {fieldId: 2, value: 'Yes'}
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }
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
                                                required: true,
                                                min: 20,
                                                max: 60
                                            }
                                        }
                                    },
                                    {
                                        width: 3,
                                        field: {
                                            id: 8,
                                            dataType: 'decimal',
                                            label: 'Jim\'s age',
                                            textBox: {lines: 1},
                                            validation: {
                                                min: 20,
                                                max: 60
                                            }
                                        }
                                    },
                                    {
                                        width: 3,
                                        field: {
                                            id: 9,
                                            label: 'Bob is so old!',
                                            displayRules: [
                                                {
                                                    conditions: [
                                                        {compareFieldId1: 7, compareFieldId2: 8, comparison: '>='}
                                                    ]
                                                }
                                            ]

                                        }
                                    },
                                    {
                                        width: 3,
                                        field: {
                                            id: 10,
                                            label: 'Bob is so very very old!',
                                            displayRules: [
                                                {
                                                    conditions: [
                                                        {compareFieldId1: 7, comparison: '>=', value: 50}
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
                                            id: 11,
                                            dataType: 'date',
                                            label: 'Bob\'s birth date',
                                            textBox: {lines: 1},
                                            validation: {
                                                min: '1954-01-01',
                                                max: '2004-01-01'
                                            }
                                        }
                                    },
                                    {
                                        width: 3,
                                        field: {
                                            id: 12,
                                            dataType: 'date',
                                            label: 'Jim\'s birth date',
                                            textBox: {lines: 1},
                                            validation: {
                                                min: '1954-01-01',
                                                max: '2004-01-01'
                                            }
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
                                                        {compareFieldId1: 11, compareFieldId2: 12, comparison: '>'}
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
                                            id: 14,
                                            label: 'SSN',
                                            textBox: {lines: 1},
                                            validation: {
                                                pattern: 'abc123'
                                            }
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