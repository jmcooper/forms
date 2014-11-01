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
                                    width: 4,
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
                                            label: 'If Yes is selected for recommendations, then be sure to complete the recommendations section on the last page of this form.'
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
                                            label: 'Describe business operations, business description, services and products offered, and surrounding buildings/exposures, etc.',
                                            textBox: {lines: 5}
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