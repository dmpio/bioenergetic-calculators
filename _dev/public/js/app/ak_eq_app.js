$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    new Clipboard('.btn');
    $('#topForm').bootstrapValidator({
        fields: {
            tempC: {
                validators: {
                    notEmpty: {
                        message: 'A Temperature is required'
                    },
                    lessThan: {
                        value: 150,
                        inclusive: true,
                        message: 'Must be ≤ 150°C'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: true,
                        message: 'Must be ≥ 0°C'
                    }
                }
            },
            pH: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    lessThan: {
                        value: 9,
                        inclusive: true,
                        message: 'Must be ≤ 9'
                    },
                    greaterThan: {
                        value: 5,
                        inclusive: true,
                        message: 'Must be ≥ 5'
                    }
                }                
            },
            bfrIS: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 10,
                        inclusive: true,
                        message: 'Must be ≥ 10 mM'
                    }
                }                
            },
            mg: {
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: 'Required'
                    }
                }                
            }
        }
    });
});

function bv_validate(){
    var topForm_validation = $('#topForm').data('bootstrapValidator').validate();
    
    if (topForm_validation.$invalidFields.length > 0){
        console.log('invalid form');
        return
    } else {
        returnArray = {};
        topFormArray = $('#topForm').serializeArray();
        for (var i = 0; i < topFormArray.length; i++){
            returnArray[topFormArray[i]['name']] = topFormArray[i]['value'];
        }
        startCalc(returnArray);
    }
}

function generate_output(Keq_AK){
    //******Reveal the output fields******//
    $('#outputForm').show();
    
        
    //******Format the output******//
    $("[id ='output_keq_ak']").val((Keq_AK*1).toFixed(2));
    
    
};